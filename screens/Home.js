import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';;
import { Avatar } from '@rneui/themed';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import BotNavbar from '../components/BotNavbar';
import BarGraph from '../components/BarGraph';
import DataCard from '../components/DataCard';
import MotivationCard from '../components/MotivationCard';
import { useGetHello } from '../utils/api/hello.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getActivities, getProfile, getWeeklySteps } from '../utils/api/fitbit.api';
import { useFocusEffect } from '@react-navigation/native';
import { flaskURL }  from '../utils/constants'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config"
import axios from 'axios';
import { getUserInfo, getUser } from '../utils/api/user.api';


// to be replaced by real data
const emptyWeeklySteps = [
  { day: "SUN", steps: 0 },
  { day: "MON", steps: 0 },
  { day: "TUE", steps: 0 },
  { day: "WED", steps: 0 },
  { day: "THU", steps: 0 },
  { day: "FRI", steps: 0 },
  { day: "SAT", steps: 0 },
];


const Home = ({ headerSubtitle, navigation}) => {
  // only for trial
    // const result = useGetHello()

    // const results = getUserInfo()
    // console.log("INFO",results)

    const [profile, setProfile] = useState('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
    const [userData, setUserData] = useState(null);
    const [fitbitTokens, setFitbitTokens] = useState(null)
    const [userActivity, setUserActivity] = useState(null);
    const [summaryActivity, setSummaryActivity] = useState(null);
    const [weeklySteps, setWeeklySteps] = useState(null)

    const iconSize = 35;
    // const auth = getAuth();


    const processSummaryActivity = (data) => {
      var totalDistance = 0
      for(let i = 0; i < 7; i++){
        if (data.distances[i].activity == 'total'){
          totalDistance = data.distances[i].distance 
        }
      }
      
      const totalActiveMinutes = data.lightlyActiveMinutes + data.fairlyActiveMinutes + data.veryActiveMinutes

      var hours = Math.floor(totalActiveMinutes/60)
      if (hours < 10){
        hours = `0${hours}`
      }

      var mins =totalActiveMinutes%60
      if (mins < 10){
        mins = `0${mins}`
      }
      const totalActiveTime = [hours, mins]

      const summary = {
        'steps': {
          value: data.steps,
          unit: 'steps'
        },
        'calories': {
          value: data.caloriesOut,
          unit: 'cals'
        },
        'distance': {
          value: totalDistance,
          unit: 'km'
        },
        'activity': {
          value: totalActiveTime,
          unit: ['h', 'm']
        },
      }
      return summary
    }

    const getFitbitTokens = async () => {
      try {
        const fetchedFitbitTokens = await AsyncStorage.getItem('fitbitTokens')
        // console.log("TOKENS", fitbitTokens)
        if (fetchedFitbitTokens && fetchedFitbitTokens !== "{}"){
          if (fitbitTokens !== fetchedFitbitTokens) {
            setFitbitTokens(fetchedFitbitTokens)
          }
        }
        // return fitbitTokens === null ? null : JSON.parse(fitbitTokens) ;
      } catch(e) {
        // error reading value
      }
    }

    const getUserData = async () => {
      try {
        const fetchedUserData = await AsyncStorage.getItem('userData')
        console.log('FETCHEDUSERR', (fetchedUserData))
        if (fetchedUserData && fetchedUserData !== "{}"){
          if (fetchedUserData !== userData){
            setUserData(JSON.parse(fetchedUserData))
          }
        } else {
          const fetchUser = async() => {
            const result = await getUser()
            
            if (!result.error){
              try {
                await AsyncStorage.setItem('userData', JSON.stringify(result.data))
                console.log('USERR', JSON.stringify(result.data))
              } catch (e) {
                getUserData()
                // Alert.alert('Something went wrong. Please try again')
              }
            } else {
                Alert.alert('Something went wrong. Please try again')
            }
          }
          fetchUser()
        }
        // return userData === null ? null : JSON.parse(userData) ;
      } catch(e) {
        console.log("HERE BRO")
        // error reading value
      }
    }

    

    useEffect(() => {
      getUserData()
    }, [])

    useFocusEffect( () => {
      getFitbitTokens()
    })
 
    useFocusEffect( 
      useCallback(() => {
        // const fetchProfile = async() => {
        //   if (tokens && tokens !== "{}"){
        //     const result = await getProfile(JSON.parse(tokens) )
        //     // console.log("PROFILE:::",JSON.stringify(result))
        //     if (!result.error){
        //       let jsonResponse = JSON.parse(result.data)
        //       if (jsonResponse != userData) {
        //         setUserData(jsonResponse.user)
        //       }
        //     } else {
        //         Alert.alert('Something went wrong. Please try again')
        //     }
        // }}

        const fetchActivities = async() => {
          if (fitbitTokens && fitbitTokens !== "{}"){
            const result = await getActivities(JSON.parse(fitbitTokens))
            // console.log("ACTIVITY:::",JSON.stringify(result))
            if (!result.error){
              let jsonResponse = JSON.parse(result.data)
              if (jsonResponse != userActivity) {
                setUserActivity(jsonResponse)
                setSummaryActivity(processSummaryActivity(jsonResponse.summary))
              }
            } else {
                Alert.alert('Something went wrong. Please try again')
            }
        }}

        const fetchWeeklySteps = async() => {
          if (fitbitTokens && fitbitTokens !== "{}"){
            const result = await getWeeklySteps(JSON.parse(fitbitTokens) )
            // console.log("STEPS:::",JSON.stringify(result.data))
            if (!result.error){
              if (result.data != userData) {
                setWeeklySteps(result.data)
              }
            } else {
                Alert.alert('Something went wrong. Please try again')
            }
        }}

        const fetchProfilePicture  = async() => {
          let payload = JSON.stringify({ 'user': auth.currentUser?.uid })
          let user = auth.currentUser?.uid
          try {
              console.log(payload)
              const response = await axios.get(`${flaskURL}/image/${user}`, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });

              console.log("Image URI: " + response.data)
              setProfile(response.data)
          } catch (error) {
              console.log('ERROR',error)
              setProfile('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
          } 
        }

        // fetchProfile()
        fetchActivities()
        fetchWeeklySteps()
        fetchProfilePicture()
      }, [fitbitTokens])
    )
    
    const leftComponent = <View style={{width:180}}>
    <Text style={{...styles.heading, fontSize: 25}}>Hi, {userData ? userData.info.firstName :"LOADING"}</Text>
    <Text style={styles.subheading}>{headerSubtitle}</Text>
    </View>
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Header leftComponent={leftComponent} rightComponent={
            <Avatar
              size={64}
              rounded
              // style={styles.avatar}
              source={{uri: profile}}
              onPress={() => navigation.push("Profile")}
              containerStyle={{ backgroundColor: '#6733b9' }}
            />
          }/>
          <View style={{ flexDirection: "row", flexWrap: "wrap-reverse", alignItems: 'center', justifyContent: 'center'}}>
            <DataCard title="Steps" numbers={summaryActivity ? summaryActivity.steps.value : 0} units={summaryActivity ? summaryActivity.steps.unit : 'steps'} minWidth={160}/>
            <DataCard title="Calories" numbers={summaryActivity ? summaryActivity.calories.value : 0} units={summaryActivity ? summaryActivity.calories.unit : 'cals'} minWidth={160}/>
            <DataCard title="Distance" numbers={summaryActivity ? summaryActivity.distance.value : 0} units={summaryActivity ? summaryActivity.distance.unit : 'km'} minWidth={160}/>
            {/* <DataCard title="Floors" numbers="11" minWidth={160}/> */}
            <DataCard title="Activity" numbers={summaryActivity ? summaryActivity.activity.value : ['0', '0']} units={summaryActivity ? summaryActivity.activity.unit : ['h', 'm']} minWidth={160}/>
          </View>
          
          <Text style={{...styles.heading,fontSize: 20, marginLeft: 20, marginTop: 10}}>Weekly Log Steps</Text>
          <BarGraph data={weeklySteps ? weeklySteps : emptyWeeklySteps}/>
          <MotivationCard title="Keep the progress!" text="You have 47% more steps than last week!" minWidth={350}/>
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    color: 'black',
    
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold'
  },
  subheading: {
    color: 'black',
    fontSize: 18,
    // width: 250,
    fontFamily: 'Poppins-Regular'
  },

      
});

export default Home;