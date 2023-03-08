import React, { useEffect, useState } from 'react';
import { Tab as TabComponent, TabView } from '@rneui/themed';
import Home from './Home';
import Genetics from './Genetics';
import Risk from './Risk';
import Community from './Community';
import {  Alert, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import { getProfile } from '../utils/api/fitbit.api';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Main = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [userData, setUserData] = useState(null)

    const iconSize = 35;

    const getUserData = async () => {
        try {
          const fetchedUserData = await AsyncStorage.getItem('userData')
          if (fetchedUserData && fetchedUserData !== "{}"){
            if (fetchedUserData !== userData){
              setUserData(JSON.parse(fetchedUserData))
            }
          } else {
            const fetchUser = async() => {
              const result = await getUser()
              
              if (!result.error){
                try {
                  await AsyncStorage.setItem('userData', JSON.stringify(result.data))
                } catch (e) {
                  getUserData()
                  // Alert.alert('Something went wrong. Please try again')
                }
              } else {
                  Alert.alert('Something went wrong. Please try again')
              }
            }
            fetchUser()
          }
          return userData === null ? null : JSON.parse(userData) ;
        } catch(e) {
          // error reading value
        }
      }
  
      useEffect(() => {
        getUserData()
      }, [])
  
    
    return (
        <>
            <TabView value={index} onChange={setIndex} disableSwipe={true} disableTransition={true}>
                <TabView.Item style={{width: '100%'}}>
                    <Home userData={userData} headerSubtitle={"Your daily statistics"} navigation={navigation}/>
                </TabView.Item>
                <TabView.Item style={{width: '100%'}}>
                    <Genetics headerTitle={"Genetic Report"} headerSubtitle={"From 23andMe"} navigation={navigation}/>
                </TabView.Item>
                <TabView.Item style={{width: '100%'}}>
                    <Risk headerTitle={"10-Year CHD Risk"} headerSubtitle={""} navigation={navigation}/>
                </TabView.Item>
                <TabView.Item style={{width: '100%'}}>
                    <Community headerTitle={"Welcome to Community"} headerSubtitle={"Your home for fitness related news, local events, connecting with friends, and discovering groups"} navigation={navigation}/>
                </TabView.Item>
            </TabView>

            <TabComponent
                value={index}
                containerStyle={styles.container}
                onChange={(e) => setIndex(e)}
                disableIndicator={true}
                variant="primary">
                <TabComponent.Item
                    title="Home"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.textStyle}
                    icon={<Icon color='#FFFFFF' name='home' size={ iconSize }></Icon>}/>
                <TabComponent.Item
                    title="Genetics"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.textStyle}
                    icon={<Icon color='#FFFFFF' name='graph' type='simple-line-icon' size={ iconSize }></Icon>}/>
                <TabComponent.Item
                    title="Risk"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.textStyle}
                    icon={<Icon color='#FFFFFF' name='heartbeat' type='font-awesome' size={ iconSize }></Icon>}/>
                <TabComponent.Item
                    title="Community"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.textStyle}
                    icon={<Icon color='#FFFFFF' name='groups' size={ iconSize }></Icon>}/>
            </TabComponent>
        </>
    );
};


const styles = StyleSheet.create({ 
    container: { 
        paddingBottom: 20,
    },
    buttonStyle: {
        paddingStart:0,
        paddingEnd:0
    },
    textStyle: {
        fontSize: 12,
        padding: 0,
        margin:0
    },
})
export default Main;