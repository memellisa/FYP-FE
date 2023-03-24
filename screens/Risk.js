import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LineChart from '../components/LineChart';
import Header from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MotivationCard from '../components/MotivationCard';


// to be replaced by real data
const dummydata = [
  { month: "JAN", risk: 40 },
  { month: "FEB", risk: 37 },
  { month: "MAR", risk: 33 },
  { month: "APR", risk: 28 },
  { month: "MAY", risk: 24 },
];

const dummyavg = [
  { month: "JAN", risk: 14 },
  { month: "FEB", risk: 14 },
  { month: "MAR", risk: 14 },
  { month: "APR", risk: 14 },
  { month: "MAY", risk: 14 },
];

export default function Genetics({headerTitle, headerSubtitle}) {
      // this is just dummy
      const leftComponent = <View style={{width:250}}>
                              <Text style={styles.heading}>{headerTitle}</Text>
                              <Text style={styles.subheading}>{headerSubtitle}</Text>
                            </View>
    
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Header leftComponent={leftComponent} rightComponent={{}}/>
          <LineChart data={dummydata} average={dummyavg}/>
          <MotivationCard title="Suggestion" text="20 more active minutes can reduce 0.5% more risk" minWidth={350}/>
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

});