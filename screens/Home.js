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



const Home = ({headerTitle, headerSubtitle, navigation}) => {
  // only for trial
    // const result = useGetHello()
    const [userData, setUserData] = useState(null);
    const [tokens, setTokens] = useState(null)
    const [userActivity, setUserActivity] = useState(null);
    const [summaryActivity, setSummaryActivity] = useState(null);
    const [weeklySteps, setWeeklySteps] = useState(null)

    const iconSize = 35;


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

    const getTokens = async () => {
      try {
        const fetchedTokens = await AsyncStorage.getItem('fitbitTokens')
        // console.log("TOKENS", tokens)
        if (fetchedTokens && fetchedTokens !== "{}"){
          if (tokens !== fetchedTokens) {
              setTokens(fetchedTokens)
          }
        }
        return tokens === null ? null : JSON.parse(tokens) ;
      } catch(e) {
        // error reading value
      }
    }

    useFocusEffect( () => {
      getTokens()
    })

 
    useFocusEffect( 
      useCallback(() => {
        const fetchProfile = async() => {
          if (tokens && tokens !== "{}"){
            const result = await getProfile(JSON.parse(tokens) )
            // console.log("PROFILE:::",JSON.stringify(result))
            if (!result.error){
              if (result.data != userData) {
                setUserData(result.data.user)
              }
            } else {
                Alert.alert('Something went wrong. Please try again')
            }
        }}

        const fetchActivities = async() => {
          if (tokens && tokens !== "{}"){
            const result = await getActivities(JSON.parse(tokens))
            // console.log("ACTIVITY:::",JSON.stringify(result))
            if (!result.error){
              if (result.data != userActivity) {
                setUserActivity(result.data)
                setSummaryActivity(processSummaryActivity(result.data.summary))
              }
            } else {
                Alert.alert('Something went wrong. Please try again')
            }
        }}

        const fetchWeeklySteps = async() => {
          if (tokens && tokens !== "{}"){
            const result = await getWeeklySteps(JSON.parse(tokens) )
            // console.log("STEPS:::",JSON.stringify(result.data))
            if (!result.error){
              if (result.data != userData) {
                setWeeklySteps(result.data)
              }
            } else {
                Alert.alert('Something went wrong. Please try again')
            }
        }}

        fetchProfile()
        fetchActivities()
        fetchWeeklySteps()
      }, [tokens])
    )
    
    const leftComponent = <View style={{width:180}}>
    <Text style={{...styles.heading, fontSize: 25}}>Hi, {userData?.firstName}</Text>
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
              source={{uri:userData ? userData.avatar640 : "https://randomuser.me/api/portraits/men/36.jpg"}}
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