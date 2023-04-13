import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';;
import { Avatar } from '@rneui/themed';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import BarGraph from '../components/BarGraph';
import DataCard from '../components/DataCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getActivities, getWeeklySteps } from '../utils/api/fitbit.api';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getUser } from '../utils/api/user.api';
import { isEqual } from 'lodash'
import { getUserData } from '../utils/functions';


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


const Home = ({ headerSubtitle, navigation, route, focused}) => {
    const [userData, setUserData] = useState(null);
    const [fitbitTokens, setFitbitTokens] = useState(null)
    // const [userActivity, setUserActivity] = useState(null);
    const [summaryActivity, setSummaryActivity] = useState(null);
    const [weeklySteps, setWeeklySteps] = useState(null)


    const processSummaryActivity = (data) => {
      var totalDistance = 0
      for(let i = 0; i < 7; i++){
        if (data?.distances[i].activity == 'total'){
          totalDistance = data?.distances[i].distance 
        }
      }
      
      const totalActiveMinutes = data?.lightlyActiveMinutes + data?.fairlyActiveMinutes + data?.veryActiveMinutes

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
          value: data?.steps,
          unit: 'steps'
        },
        'activityCalories': {
          value: data?.activityCalories,
          unit: 'cals'
        },
        'calories': {
          value: data?.caloriesOut,
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

        if (fetchedFitbitTokens && fetchedFitbitTokens !== "{}"){
          if (fitbitTokens !== fetchedFitbitTokens) {
            setFitbitTokens(fetchedFitbitTokens)
          }
        }
      } catch(e) {
        // console.log(e)
        // error reading value
      }
    }

    const fetchActivities = async() => {
      const result = await getActivities()
      if (!result.error){
        if (!isEqual(result.data.summary, summaryActivity)) {
          setSummaryActivity(processSummaryActivity(result.data.summary))
        }
      } else {
          // Alert.alert('Something went wrong getting Activities. Please try again')
      }
    }

    const fetchWeeklySteps = async() => {
      const result = await getWeeklySteps()
      if (!result.error){
        if (result.data != userData) {
          setWeeklySteps(result.data)
        }
      } else {
          // Alert.alert('Something went wrong getting weekly steps. Please try again')
      }
    }


    useEffect(() => {
      getFitbitTokens()
      getUserData(setUserData, userData, route?.params?.update)
      
    }, [focused])

    useEffect(() => {
      fetchActivities()
      fetchWeeklySteps()
    }, [fitbitTokens])

    // useFocusEffect( 
    //   useCallback(() => {

    //     const fetchActivities = async() => {
    //         const result = await getActivities()
            
    //         if (!result.error){
    //           if (!isEqual(result.data.summary, summaryActivity)) {
    //             console.log("SUMMARY",typeof result.data)
    //             setSummaryActivity(processSummaryActivity(result.data.summary))
    //           }
    //         } else {
    //             // Alert.alert('Something went wrong getting Activities. Please try again')
    //         }
    //     }

    //     const fetchWeeklySteps = async() => {
    //       const result = await getWeeklySteps()
    //       if (!result.error){
    //         if (result.data != userData) {
    //           setWeeklySteps(result.data)
    //         }
    //       } else {
    //           // Alert.alert('Something went wrong getting weekly steps. Please try again')
    //       }
    //     }

    //     fetchActivities()
    //     fetchWeeklySteps()

    //   }, [fitbitTokens])
    // )

    const leftComponent = <View style={{width:'250%'}}>
      <Text style={{...styles.heading, fontSize: 25}}>Hi, {userData?.info.firstName}</Text>
      <Text style={styles.subheading}>{headerSubtitle}</Text>
    </View>
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Header leftComponent={leftComponent} rightComponent={
            <Avatar
              size={64}
              rounded
              source={{uri: userData?.info.img ? userData?.info.img : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }}
              onPress={() => navigation.push("Profile")}
              containerStyle={{ backgroundColor: '#6733b9' }}
            />
          }/>
          <View style={{ flexDirection: "row", flexWrap: "wrap-reverse", alignItems: 'center', justifyContent: 'center'}}>
            <DataCard title="Active Calories" numbers={summaryActivity ? summaryActivity.activityCalories.value : 0} units={summaryActivity ? summaryActivity.activityCalories.unit : 'cals'} width={'50%'}/>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap-reverse", alignItems: 'center', justifyContent: 'center'}}>
            <DataCard title="Steps" numbers={summaryActivity ? summaryActivity.steps.value : 0} units={summaryActivity ? summaryActivity.steps.unit : 'steps'} width={'40%'}/>
            <DataCard title="Calories" numbers={summaryActivity ? summaryActivity.calories.value : 0} units={summaryActivity ? summaryActivity.calories.unit : 'cals'} width={'40%'}/>
            <DataCard title="Distance" numbers={summaryActivity ? summaryActivity.distance.value : 0} units={summaryActivity ? summaryActivity.distance.unit : 'km'} width={'40%'}/>

            <DataCard title="Activity" numbers={summaryActivity ? summaryActivity.activity.value : ['0', '0']} units={summaryActivity ? summaryActivity.activity.unit : ['h', 'm']} width={'40%'}/>
          </View>
          
          <Text style={{...styles.heading,fontSize: 20, marginLeft: 20, marginTop: 10}}>Weekly Log Steps</Text>
          <View>
            <BarGraph data={weeklySteps ? weeklySteps : emptyWeeklySteps}/>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    color: 'black',
    
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold'
  },

  warningGraph: {
    width: '50%',
    textAlign: 'center',
    position: 'absolute',
    top: '20%',
    left: '30%',
    right: 0,
    padding: 'auto',
    margin: 'auto',
    color: 'gray',
    zIndex: 100,
  },

  subheading: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-Regular'
  },

      
});

export default Home;