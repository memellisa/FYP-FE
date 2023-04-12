import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"
import { getUser } from "./api/user.api"
import { isEqual } from 'lodash'

const getUserData = async (setUserData, userData=null, update=false) => {
    const fetchUser = async() => {
        const result = await getUser()
        
        if (!result.error) {
          if (result.data.info.firstName){
            try {
              await AsyncStorage.setItem('userData', JSON.stringify(result.data))
              setUserData(result.data)
            } catch (e) {
              fetchUser()
            }
          }
        } 
        else {
          Alert.alert('Something went wrong getting USER. Please try again')
        }
    }

    if (update) {
        fetchUser()
    } else {
        try {
            const fetchedUserData = await AsyncStorage.getItem('userData')
            if (fetchedUserData && fetchedUserData !== "{}"){
              if (!isEqual(JSON.parse(fetchedUserData), userData)){
                setUserData(JSON.parse(fetchedUserData))
              }
            } else {
              fetchUser()
            }
        } catch(e) {
            getUserData(setUserData, userData, update)
        }
    }
}


const calculateAge = (birthday) => {
    const today = new Date()
    const birthDate = new Date(birthday);
    var tempAge = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        tempAge--
    }
    return tempAge ? tempAge : 0
}

const countBMI = (height, weight) => height && weight ? (weight/(height*height*0.0001)).toFixed(2) : 0

const labelMonth = (month) => {
  switch (month) { 
    case 1:
      return "JAN"
    case 2:
      return "FEB"
    case 3:
      return "MAR"
    case 4:
      return "APR"
    case 5:
      return "MAY"
    case 6:
      return "JUN"
    case 7:
      return "JUL"
    case 8:
      return "AUG"
    case 9:
      return "SEP"
    case 10:
      return "OCT"
    case 11:
      return "NOV"
    case 12:
      return "DEC"
    default:
      return '' 
  }
}

const processRiskData =  (data, label, index) => {
  var res = []
  for (let i = 1; i <= index; i++){
    const val = data[i.toString()]
    if (val){
      res.push(
        {
          time: label ? label(i) : i,
          risk: parseFloat((val * 100).toFixed(2))
        }
      )
    } else break
  }
  return res
}
export { getUserData, calculateAge, countBMI, labelMonth, processRiskData }