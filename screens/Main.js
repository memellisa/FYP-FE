import React, { useEffect, useState } from 'react';
import { Tab as TabComponent, TabView } from '@rneui/themed';
import Home from './Home';
// import Genetics from './Genetics';
import Risk from './Risk/Risk';
import Community from './Community/Community';
import {  StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { signOut } from 'firebase/auth';

import axios from 'axios';
import { flaskURL } from '../utils/constants';
import { auth } from '../config';


const Main = ({ navigation }) => {
    const [index, setIndex] = useState(0);

    const iconSize = 35;

    async function checkUserData() {
        try {
            let user = auth.currentUser?.uid
            const response = await axios.get(`${flaskURL}/user/verifyData/${user}`);
            let hasData = response.data
            if (hasData) {
                let responseWearable = await axios.get(`${flaskURL}/user/verifyWearable/${user}`);
                if (!responseWearable.data) {
                    navigation.push("Manage Wearable", {"hideBackButton": true})
                }
                return
            } else {
                navigation.push("Self Input Form")
            }
        } catch(error) {
            // In case there is an error, that means server is not ready
            signOut(auth)
            .then(() => {
                Alert.alert("The server is currently down, please try again later!")
                AsyncStorage.clear();
                navigation.navigate("Login"); // CAN MAYBE USE REPLACE TO DELETE PREVIOUS DATA, AFRAID THERE IS BUG
                console.log('Signed out user because server is not ready!')
            });
            return 
        }
    }

    useEffect(() => {
        checkUserData()
    }, [])
    
    return (
        <>
            <TabView value={index} onChange={setIndex} disableSwipe={true} disableTransition={true}>
                <TabView.Item style={{width: '100%'}}>
                    <Home headerSubtitle={"Your daily statistics"} navigation={navigation} focused={index == 0}/>
                </TabView.Item>
                {/* <TabView.Item style={{width: '100%'}}>
                    <Genetics headerTitle={"Genetic Report"} headerSubtitle={"From 23andMe"} navigation={navigation}/>
                </TabView.Item> */}
                <TabView.Item style={{width: '100%'}}>
                    <Risk headerTitle={"10-Year CHD Risk"} headerSubtitle={""} navigation={navigation} focused={index == 1}/>
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
                {/* <TabComponent.Item
                    title="Genetics"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.textStyle}
                    icon={<Icon color='#FFFFFF' name='graph' type='simple-line-icon' size={ iconSize }></Icon>}/> */}
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