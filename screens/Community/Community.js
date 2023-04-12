
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
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

      const leftComponent = <View style={{width:'480%'}}>
                              <Text style={styles.heading}>{headerTitle}</Text>
                              <Text style={styles.subheading}>{headerSubtitle}</Text>
                            </View>
    
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <Header leftComponent={leftComponent} rightComponent={{}}/>
          <View style={{alignItems: 'center',}}>
          {forumList.map((groups) => {
            return <View key={Math.floor(Math.random() * 10000)}>
              {Object.entries(groups).map((group) => {
                return <CommunityCard 
                          key={Math.floor(Math.random() * 10000)}
                          imgURI={group[1].img_url}
                          title={group[0]}
                          text={group[1].description}
                          width={'95%'}
                          navigation={navigation}
                          onPress={() => navigation.push("Group", { forumName: group[0] })}/>
              })}
              </View> 
          })}

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