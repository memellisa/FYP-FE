
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CommunityCard from '../../components/CommunityCard';
import Header from '../../components/Header';
import { getAllForumFromDB } from '../../utils/api/community.api';

export default function Community({navigation, headerTitle, headerSubtitle}) {
  const [forumList, setForumList] = useState([])

  const fetchForum = async () => {
    const result = await getAllForumFromDB()
        
    if (!result.error) {
      setForumList(result.data)
    } 
    else {
      Alert.alert('Something went wrong getting USER. Please try again')
    }
  }

  useEffect(() => {
    fetchForum()
  }, [])

      const leftComponent = <View style={{width:350}}>
                              <Text style={styles.heading}>{headerTitle}</Text>
                              <Text style={styles.subheading}>{headerSubtitle}</Text>
                            </View>
    
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Header leftComponent={leftComponent} rightComponent={{}}/>
          <View style={{alignItems: 'center',}}>
          {forumList.map((groups) => {
            console.log("GROUP", groups)
            return <View>
              {Object.entries(groups).map((group) => {
                return <CommunityCard 
                          imgURI={group[1].img_url}
                          title={group[0]}
                          text={group[1].description}
                          width={350}
                          navigation={navigation}
                          onPress={() => navigation.push("Group", { forumName: group[0] })}/>
              })}
              </View> 
          })}

            {/* <CommunityCard 
              imgURI='https://static01.nyt.com/images/2016/12/14/well/move/14physed-running-photo/14physed-running-photo-superJumbo.jpg'
              title="Cardio"
              text="Regular cardio-based physical activity enables the heart to achieve improved blood flow"
              width={350}
              navigation={navigation}
              onPress={() => navigation.push("Group")} />
            <CommunityCard 
              imgURI='https://assets.sweat.com/html_body_blocks/images/000/013/890/original/EasyHealthySnacks_en65ab5213130c9862172ac11435f055d9_en38b28edc7b2830a46f6e00bfeceeb1b6.jpg?1596090039https://www.freepik.com/free-photo/outdoor-shot-active-dark-skinned-man-running-morning-has-regular-trainings-dressed-tracksuit-comfortable-sneakers-concentrated-into-distance-sees-finish-far-away_12204561.htm#query=person%20running&position=4&from_view=keyword'
              title="Healthy Snacking"
              text="Snacking can help fuel your body - and your brain"
              width={350} /> */}
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
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold'
  },
  subheading: {
    color: '#0096FF',
    fontSize: 15,
    fontFamily: 'Poppins-Regular'
  },

});