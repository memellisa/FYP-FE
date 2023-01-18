import { Button } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BotNavbar from '../components/BotNavbar';
import CommunityCard from '../components/CommunityCard';
import Header from '../components/Header';

// imgURIs will be passed down as prop array
export default function Genetics({headerTitle, headerSubtitle}) {
      // this is just dummy
      const leftComponent = <View style={{width:350}}>
                              <Text style={styles.heading}>{headerTitle}</Text>
                              <Text style={styles.subheading}>{headerSubtitle}</Text>
                            </View>
    
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Header leftComponent={leftComponent} rightComponent={{}}/>
          <View style={{alignItems: 'center',}}>
            <CommunityCard 
              imgURI='https://static01.nyt.com/images/2016/12/14/well/move/14physed-running-photo/14physed-running-photo-superJumbo.jpg'
              title="Cardio"
              text="Regular cardio-based physical activity enables the heart to achieve improved blood flow"
              minWidth={350} />
            <CommunityCard 
              imgURI='https://assets.sweat.com/html_body_blocks/images/000/013/890/original/EasyHealthySnacks_en65ab5213130c9862172ac11435f055d9_en38b28edc7b2830a46f6e00bfeceeb1b6.jpg?1596090039https://www.freepik.com/free-photo/outdoor-shot-active-dark-skinned-man-running-morning-has-regular-trainings-dressed-tracksuit-comfortable-sneakers-concentrated-into-distance-sees-finish-far-away_12204561.htm#query=person%20running&position=4&from_view=keyword'
              title="Healthy Snacking"
              text="Snacking can help fuel your body - and your brain"
              minWidth={350} />
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
    color: '#0096FF',
    fontSize: 15,
    // width: 250,
    fontFamily: 'Poppins-Regular'
  },

});