import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from '@rneui/base'

import LineChart from '../../components/LineChart';
import Header from '../../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { labelMonth, processRiskData } from '../../utils/functions';
import { getDailyRisk, getMonthlyRisk, getOneRisk } from '../../utils/api/risk.api';
import RiskCard from '../../components/RiskCard';

export default function Risk({headerTitle, headerSubtitle, focused, navigation}) {
  const [monthlyRisk, setMonthlyRisk] = useState()
  const [dailyRisk, setDailyRisk] = useState()
  const [todayRisk, setTodayRisk] = useState()
  const [yesterdayRisk, setYesterdayRisk] = useState(0)
  const [lastYearRisk, setLastYearRisk] = useState(0)

  const [currentChart, setCurrentChart] = useState('year')

  const leftComponent = <View style={{width:250}}>
                          <Text style={styles.heading}>{headerTitle}</Text>
                          <Text style={styles.subheading}>{headerSubtitle}</Text>
                        </View>

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  }

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1; 

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  const fetchOneYearRisk = async() => {
    const today = new Date()
    const result = await getMonthlyRisk(today.getFullYear())
    if (!result.error) {
      setMonthlyRisk(processRiskData(result, (val) => labelMonth(val), 12))
      console.log(processRiskData(result))
    } 
    else {
      // Alert.alert('Something went wrong getting ONE YEAR. Please try again')
    }
  }

  const fetchOneMonthRisk = async() => {
    const result = await getDailyRisk()
    if (!result.error) {
      setDailyRisk(processRiskData(result, null, 31))
      console.log(processRiskData(result))
    } 
    else {
      // Alert.alert('Something went wrong getting ONE MONTH. Please try again')
    }
  }

  const fetchOneDayRisk = async (date, setData) => {
    const result = await getOneRisk(date.replaceAll('/', ''))
    if (!result.error) {
      console.log("HOIHHIHIHIH:::",result)
      setData(result)
    } 
    else {
      // Alert.alert('Something went wrong getting ONE MONTH. Please try again')
    }
  }

  const changeChart = async () => {
    if (currentChart == 'year'){
      fetchOneYearRisk()
    } else fetchOneMonthRisk()
    setCurrentChart(currentChart == 'year' ? 'month' : 'year')
    
  }


  const formatDate = (day, month, year) => {
    if (day < 10) {
      day = '0' + day;
    }
    
    if (month < 10) {
        month = `0${month}`;
    }
    
    return `${year}/${month}/${day}`;
  }

  useEffect(() => {
    if (focused) {
      fetchOneYearRisk()
      fetchOneMonthRisk()
    }

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const formatToday = formatDate(today.getDay(), today.getMonth()+1, today.getFullYear())
    const formatYesterday = formatDate(yesterday.getDay(), yesterday.getMonth()+1, yesterday.getFullYear())
    const formatLastYear = formatDate( 31,today.getMonth(), today.getMonth() == 12 ? today.getFullYear() - 1 : today.getFullYear())
    
    fetchOneDayRisk(formatToday, setTodayRisk)
    fetchOneDayRisk(formatYesterday, setYesterdayRisk)
    fetchOneDayRisk(formatLastYear, setLastYearRisk)
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
        
        <Button radius={8}  style={styles.button} onPress={changeChart}>
              <Text style={styles.buttonText}>{`View one ${currentChart == 'year' ? 'month' : 'year'} trend`}</Text>
        </Button>

        <Text style={{...styles.heading,fontSize: 20, marginLeft: 20, marginTop: 10}}>Your Risk Summary</Text>
        <RiskCard today={todayRisk ? (todayRisk * 100).toFixed(2) : 0} yesterday={yesterdayRisk ? (yesterdayRisk * 100).toFixed(2) : 0} lastMonth={lastYearRisk ? (lastYearRisk * 100).toFixed(2) : 0}/>

        <Button radius={8} style={styles.button} onPress={() => navigation.push("All Risk")}>
              <Text style={styles.buttonText}>Show all data</Text>
              <Icon style={styles.icon} color='white' name='navigate-next' size={25} />
        </Button>

        {/* <MotivationCard title="Suggestion" text="20 more active minutes can reduce 0.5% more risk" width={350}/> */}
        {/* <StatusBar style="auto" /> */}
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
    fontSize: 25,
    // width: 250,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold'
  },
  subheading: {
    color: 'black',
    fontSize: 18,
    // width: 250,
    fontFamily: 'Poppins-Regular'
  },
  button: {
    marginVertical: 5,
    width: 350,
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

