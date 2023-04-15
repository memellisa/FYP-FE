import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Icon } from '@rneui/base'

import LineChart from '../../components/LineChart';
import Header from '../../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { labelMonth, processRiskData } from '../../utils/functions';
import { getDailyRisk, getMonthlyRisk, getOneRisk, postRisk } from '../../utils/api/risk.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from 'luxon'

const RiskCard = ({today, yesterday, lastMonth, enableIcon, handleIconPress}) => {
  const dayDiff = today-yesterday
  const monthDiff = today-lastMonth

  const renderContent = (title, data, note) => {
      return (
          <>
              <View style={styles.RCcontentView}>  
                  <View style={styles.RCcontent}>
                      <Text style={styles.RCheading}>{title}</Text>
                        
                      <Text style={styles.RCnumber}>{data ? data.toFixed(2) + '%' : '-'}</Text>
                      {
                          title=='Today:' ?
                          <Button 
                            radius={'sm'}
                            onPress={handleIconPress}
                            disabled={!enableIcon}
                            color='white'
                            
                          >
                            <Text style={{...styles.iconText, color: enableIcon ? '#0F52BA' : 'grey',}}> Refresh  </Text>
                            <Icon 
                              name="refresh" 
                              color={enableIcon ? "#0F52BA" : 'grey'}
                              /> 

                          </Button>
                            
                            : null
                        }
                  </View>
                  {note && (<Text style={styles.RCnote}>{note}</Text>)}
                  
              </View>
          </>
      )
  }

  return (
      <Card containerStyle={styles.RCcontainer} >
          {renderContent('Today:', today, '')}

          {yesterday ? renderContent('Yesterday:', yesterday, `Your risk is ${dayDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(dayDiff).toFixed(2)}% than yesterday`) 
          : renderContent('Yesterday:', null, `No data available from yesterday`)}

          {lastMonth ? renderContent('Last Month:', lastMonth, `Your risk is ${monthDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(monthDiff).toFixed(2)}% than last month`) 
          : renderContent('Last Month:', null, `No data available from last month`)}
      </Card>
  );
};

export default function Risk({headerTitle, headerSubtitle, focused, navigation}) {
  const [monthlyRisk, setMonthlyRisk] = useState()
  const [dailyRisk, setDailyRisk] = useState()
  const [todayRisk, setTodayRisk] = useState()
  const [yesterdayRisk, setYesterdayRisk] = useState(0)
  const [lastMonthRisk, setlastMonthRisk] = useState(0)
  const [enableRiskCalculate, setEnableRiskCalculate] = useState(true)

  const [currentChart, setCurrentChart] = useState('year')

  const leftComponent = <View style={{width:"310%"}}>
                          <Text style={styles.heading}>{headerTitle}</Text>
                          <Text style={styles.subheading}>{headerSubtitle}</Text>
                        </View>

  const today = DateTime.now().setLocale('zh')
  const currentYear = today.year;
  const currentMonth = today.month; 

  const daysInCurrentMonth = DateTime.local(currentYear, currentMonth).daysInMonth;

  const fetchOneYearRisk = async() => {
    const result = await getMonthlyRisk(today.year)
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

  const fetchOneDayRisk = async (date) => {
    const result = await getOneRisk(date)
    if (!result.error) {
      return result.data
    } 
    else {
      return null
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
    if (!(yesterdayUpdate === today.toFormat("yyyy-MM-dd"))) {
      return false
    }
    return true
  }

  const changeChart = async () => {
    if (currentChart == 'year'){
      fetchOneYearRisk()
    } else fetchOneMonthRisk()
    setCurrentChart(currentChart == 'year' ? 'month' : 'year')
    
  }

  const fetchTodayRisk = async () => {
      calculateRisk({"date": today.toFormat("yyyy-MM-dd")}, setTodayRisk)
      await AsyncStorage.setItem("todayRiskUpdate", (new Date()).toString())
  }

  const checkLastUpdate = async () => {
    const lastUpdate = await AsyncStorage.getItem("todayRiskUpdate")

    if (!todayRisk || !lastUpdate || new Date() - new Date(lastUpdate) > 10*60*1000) {
      setEnableRiskCalculate(true)
    }
    else {
      setEnableRiskCalculate(false)
      console.log("RISK NOT 10 MINS")
    }
  }

  useEffect(() => {
    checkLastUpdate()
  }, [todayRisk])

  useEffect(() => {
    const today = DateTime.now().setLocale('zh')
    const lastMonth = today.month === 1 ? 12 : today.month - 1
    const lastMonthYear = lastMonth == 12 ? today.year - 1 : today.year
    const daysInLastMonth = DateTime.local(lastMonthYear, lastMonth).daysInMonth
    
    const lastMonthFullDate = `${lastMonthYear}${lastMonth < 10 ? "0"+lastMonth : lastMonth}${daysInLastMonth}`

    const yesterday = DateTime.now().minus({days: 1}).setLocale('zh')
    const yesterdayFullDate = `${yesterday.year}${yesterday.month < 10 ? "0"+(yesterday.month) : yesterday.month}${yesterday.day}`

    if (focused) {
      fetchOneYearRisk()
      fetchOneMonthRisk()
      
      checkLastUpdate()
      
      checkYesterdayRisk().then(
        (updated) => {
          fetchOneDayRisk(yesterdayFullDate).then(
            (res) => {
              if (res){
                if (updated || !yesterdayRisk){
                  setYesterdayRisk(res)
                } else {
                  calculateRisk({"date": yesterday.toFormat("yyyy-MM-dd")}, setYesterdayRisk)
                  AsyncStorage.setItem('yesterdayRiskUpdate', today.toFormat("yyyy-MM-dd"))
                }
              }
            }
          )
        }
      )
      fetchOneDayRisk(lastMonthFullDate, setlastMonthRisk).then((res) => setlastMonthRisk(res))
     
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
        <RiskCard 
          today={todayRisk ? (todayRisk * 100) : 0} 
          yesterday={yesterdayRisk ? (yesterdayRisk * 100) : 0} 
          lastMonth={lastMonthRisk ? (lastMonthRisk * 100) : 0} 
          enableIcon={enableRiskCalculate} 
          handleIconPress={fetchTodayRisk}/>

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

  RCcontainer: {
        marginBottom:10, 
        paddingTop: 0,
        paddingLeft: 20,
        borderRadius:10,
    },

    RCtitle: {
        fontSize: 18
    },

    RCheading: {
        color: '#0F52BA',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
      },
    RCcontentView: {
        marginTop: 10,
        justifyContent: 'center'
    },

    RCcontent: {
        flexDirection: "row", 
        alignItems: 'center', 
        
    },

    RCnumber: {
        fontSize: 21,
        paddingHorizontal: 15,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    },
    RCnote: {
        fontSize: 15,
        color: '#808080',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10,
        marginVertical: 10
    },

    iconText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 17,
    }

});

