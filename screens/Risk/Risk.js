import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from '@rneui/base'

import LineChart from '../../components/LineChart';
import Header from '../../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { labelMonth, processRiskData } from '../../utils/functions';
import { getDailyRisk, getMonthlyRisk, getOneRisk, postRisk } from '../../utils/api/risk.api';
import RiskCard from '../../components/RiskCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Risk({headerTitle, headerSubtitle, focused, navigation}) {
  const [monthlyRisk, setMonthlyRisk] = useState()
  const [dailyRisk, setDailyRisk] = useState()
  const [todayRisk, setTodayRisk] = useState()
  const [yesterdayRisk, setYesterdayRisk] = useState(0)
  const [lastMonthRisk, setlastMonthRisk] = useState(0)

  const [currentChart, setCurrentChart] = useState('year')

  const leftComponent = <View style={{width:"300%"}}>
                          <Text style={styles.heading}>{headerTitle}</Text>
                          <Text style={styles.subheading}>{headerSubtitle}</Text>
                        </View>

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; 

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  const fetchOneYearRisk = async() => {
    const today = new Date()
    const result = await getMonthlyRisk(today.getFullYear())
    if (!result.error) {
      setMonthlyRisk(processRiskData(result, (val) => labelMonth(val), 12))
    } 
    else {
      // Alert.alert('Something went wrong getting ONE YEAR. Please try again')
    }
  }

  const fetchOneMonthRisk = async() => {
    const result = await getDailyRisk()
    if (!result.error) {
      setDailyRisk(processRiskData(result, null, daysInCurrentMonth))
    } 
    else {
      // Alert.alert('Something went wrong getting ONE MONTH. Please try again')
    }
  }

  const fetchOneDayRisk = async (date, setData) => {
    const result = await getOneRisk(date)
    if (!result.error) {
      setData(result)
    } 
    else {
      // Alert.alert('Something went wrong getting ONE MONTH. Please try again')
    }
  }

  const calculateRisk = async (date, setData) => {
    const result = await postRisk(date)
    if (!result.error) {
      setData(result.data.risk)
    } 
    else {
      // Alert.alert('Something went wrong getting ONE MONTH. Please try again')
    }
  }


  const checkYesterdayRisk = async () => {
    const yesterdayUpdate = await AsyncStorage.getItem('yesterdayRiskUpdate')
    if (!(yesterdayUpdate === today.toLocaleDateString('sv',  {timeZone: "Asia/Hong_Kong"}))) {
      return false
    }
    else {
      return true
    }
  }

  const changeChart = async () => {
    if (currentChart == 'year'){
      fetchOneYearRisk()
    } else fetchOneMonthRisk()
    setCurrentChart(currentChart == 'year' ? 'month' : 'year')
    
  }

  useEffect(() => {
    const today = new Date()
    const lastMonth = today.getMonth()
    const lastMonthYear = lastMonth == 12 ? today.getFullYear() - 1 : today.getFullYear()
    const daysInLastMonth = getDaysInMonth(lastMonthYear, lastMonth);
    const lastMonthFullDate = `${lastMonthYear}${lastMonth < 10 ? "0"+lastMonth : lastMonth}${daysInLastMonth}`

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayFullDate = `${yesterday.getFullYear()}${yesterday.getMonth()+1 < 10 ? "0"+(yesterday.getMonth()+1) : yesterday.getMonth()+1}${yesterday.getDate()}`


    if (focused) {
      fetchOneYearRisk()
      fetchOneMonthRisk()
      calculateRisk({"date": today.toLocaleDateString('sv',  {timeZone: "Asia/Hong_Kong"})}, setTodayRisk) 

      if (checkYesterdayRisk()) {
        fetchOneDayRisk(yesterdayFullDate, setYesterdayRisk)
      } else {
        async () => {
          calculateRisk(yesterday, setYesterdayRisk)
          await AsyncStorage.setItem('yesterdayRiskUpdate', today.toLocaleDateString('sv',  {timeZone: "Asia/Hong_Kong"}))
        }
        
      }
      fetchOneDayRisk(lastMonthFullDate, setlastMonthRisk)
    }
    
  }, [focused])
  
  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <Header leftComponent={leftComponent} rightComponent={{}}/>
        {
          currentChart == 'year' ?
          <LineChart data={monthlyRisk} domainX={["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]}/>
          : <LineChart data={dailyRisk} domainX={Array.from({length: daysInCurrentMonth}, (_, i) => i + 1)}/>
        }
        
        <Button radius={8}  containerStyle={styles.button} onPress={changeChart}>
              <Text style={styles.buttonText}>{`View one ${currentChart == 'year' ? 'month' : 'year'} trend`}</Text>
        </Button>

        <Text style={{...styles.heading,fontSize: 20, marginLeft: 20, marginTop: 10}}>Your Risk Summary</Text>
        <RiskCard today={todayRisk ? (todayRisk * 100) : 0} yesterday={yesterdayRisk ? (yesterdayRisk * 100) : 0} lastMonth={lastMonthRisk ? (lastMonthRisk * 100) : 0}/>

        <Button radius={8} containerStyle={styles.button} onPress={() => navigation.push("All Risk")}>
              <Text style={styles.buttonText}>Show all data</Text>
              <Icon style={styles.icon} color='white' name='navigate-next' size={25} />
        </Button>
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
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold'
  },
  subheading: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-Regular'
  },
  button: {
    marginVertical: 5,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 8,
    // borderColor: '#c4c4c4',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: 5
  },

});

