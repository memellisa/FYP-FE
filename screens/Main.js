import React, { useState } from 'react';
import { Tab as TabComponent, TabView } from '@rneui/themed';
import Home from './Home';
import Genetics from './Genetics';
import Risk from './Risk';
import Community from './Community';
import {  Alert, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import { getProfile } from '../utils/api/fitbit.api';
import { useFocusEffect } from '@react-navigation/native';


const Main = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);

    const iconSize = 35;
    
    return (
        <>
            <TabView value={index} onChange={setIndex} disableSwipe={true} disableTransition={true}>
                <TabView.Item style={{width: '100%'}}>
                    <Home headerTitle={"Hi, John"} headerSubtitle={"Your daily statistics"} navigation={navigation}/>
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