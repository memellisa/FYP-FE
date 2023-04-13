import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CarrierStatusCard from '../components/CarrierStatusCard';
import DataCard from '../components/DataCard';
import Header from '../components/Header';

export default function Genetics({headerTitle, headerSubtitle}) {
      const leftComponent = <View style={{width:200}}>
                              <Text style={styles.heading}>{headerTitle}</Text>
                              <Text style={styles.subheading}>{headerSubtitle}</Text>
                            </View>
    
    return (
      <ScrollView style={styles.container}>
        <Header leftComponent={leftComponent} rightComponent={{}}/>

        <Text style={{...styles.heading,fontSize: 20, marginLeft: 20, marginTop: 10}}>Carrier Status</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: 'center', justifyContent: 'center'}}>
            <CarrierStatusCard disease="Coronary Heart Disease" />
            <CarrierStatusCard disease="Stroke" />
            <CarrierStatusCard disease="Type 2 Diabetes" status={false} />
        </View>
        
        <Text style={{...styles.heading,fontSize: 20, marginLeft: 20, marginTop: 10}}>Disease Risks</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap-reverse", alignItems: 'center', justifyContent: 'center'}}>
            <DataCard title="Diabetes" numbers="32.6" units="%" width={'42%'} note="Average: 30.1%"/>
            <DataCard title="Cancer" numbers="2.2" units="%" width={'42%'} note="Average: 1.1%"/>
            <DataCard title="CHD" numbers="22.3" units="%" width={'42%'} note="Average: 20.9%"/>
            <DataCard title="Stroke" numbers="29.6" units="%" width={'42%'} note="Average: 30.3%"/>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
  
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

});