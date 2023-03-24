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
              console.log('USERR SET', JSON.stringify(result.data))
              setUserData(result.data)
            } catch (e) {
              fetchUser()
              console.log(e)
              // Alert.alert('Something went wrong. Please try again')
            }
          }
        } 
        else {
          Alert.alert('Something went wrong getting USER. Please try again')
        }
    }

    if (update) {
        console.log("UPDATE")
        fetchUser()
    } else {
        try {
            const fetchedUserData = await AsyncStorage.getItem('userData')
            console.log('FETCHEDUSERR', (fetchedUserData))
            if (fetchedUserData && fetchedUserData !== "{}"){
              if (!isEqual(JSON.parse(fetchedUserData), userData)){
                setUserData(JSON.parse(fetchedUserData))
              }
            } else {
              fetchUser()
            }
        } catch(e) {
            getUserData(setUserData, userData, update)
            console.log("HERE BRO", e)
        // error reading value
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
    return tempAge
}

const countBMI = (height, weight) => (weight/(height*height*0.0001)).toFixed(2)


export { getUserData, calculateAge, countBMI }