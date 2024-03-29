import React, { useState, useEffect } from 'react';
import { Avatar, Button } from '@rneui/base'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetailsCard from '../../components/DetailsCard';
import { auth } from "../../config"
import { signOut } from 'firebase/auth';
import axios from 'axios';
import NavigateButton from '../../components/NavigateButton';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { flaskURL } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useIsFocused } from '@react-navigation/native';
import { calculateAge, countBMI, getUserData, jsonToArray } from '../../utils/functions';


export default function Profile({ navigation, route }) {

    const [userData, setUserData] = useState(null);

    const isFocused = useIsFocused()
    useEffect(() => {
        getUserData(setUserData, userData, route?.params?.update)
    }, [isFocused])


    const logout = () => {
        signOut(auth)
        .then(() => {
            AsyncStorage.clear();
            navigation.navigate("Login"); // CAN MAYBE USE REPLACE TO DELETE PREVIOUS DATA, AFRAID THERE IS BUG
            console.log('User signed out!')
        });
    }

    const pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        handleImagePicked(pickerResult);
    };
    
    const handleImagePicked = async (pickerResult) => {
        try {
            if (!pickerResult.cancelled) {
                const resultURL = await uploadImageAsync(pickerResult.uri);
            }
        } catch (e) {
            alert("Upload failed, sorry :(");
        } 
    };

    async function uploadImageAsync(uri) {
        const data = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

        let payload = JSON.stringify({ 'img': data, 'uid': auth.currentUser?.uid })

        try {
            const response = await axios.post(`${flaskURL}/image`, payload, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            await AsyncStorage.setItem('userData', JSON.stringify(response.data))
            getUserData(setUserData, userData, true)
            return 
        } catch (error) {
            // console.log('RESP',error.response)
        } 
    }

    const healthData = {
        "insulin": userData?.health.insulin,
        "cholesterol": userData?.health.cholesterol,
        "diet": userData?.health.diet,
        "smokingStatus": userData?.health.smokingStatus,
        "alcoholConsumption": userData?.health.alcoholConsumption,
        "bloodPressure": userData?.health.bloodPressure,
        "sex": userData?.health.sex,
        "bloodType": userData?.health.bloodType,
        "height": userData?.health.height,
        "weight": userData?.health.weight,
        "bmi": countBMI(userData?.health.height, userData?.health.weight)
    }
    
    const personalData = {
        "firstName": userData?.info.firstName,
        "lastName": userData?.info.lastName,
        "dob": userData?.info.dob,
        "age": calculateAge(userData?.info.dob)
    }

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.screenContainer} >
                <View style={styles.container}>
                    <Avatar
                        size={100}
                        rounded
                        source={{uri: userData?.info.img ? userData.info.img : "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" }}
                    />
                    <Button radius={8} color="#f2f2f6" onPress={pickImage}>
                        <Text style={{color:'#0095FE'}}>Edit image</Text>
                    </Button>
                </View>

                <DetailsCard 
                    title={"Personal Details"} 
                    button={<NavigateButton name='Edit' nav={"Edit Personal Details"} navigation={navigation} data={userData?.info} />}
                    dataToShow={jsonToArray(personalData)}/>
                
                <DetailsCard 
                    title={"Health Details"} 
                    button={<NavigateButton name='Edit' nav={"Edit Health Details"} navigation={navigation} data={userData?.health} />}
                    dataToShow={jsonToArray(healthData)}/>

                <Button radius={8} color="#fff" containerStyle={styles.button} onPress={() => navigation.push("Manage Wearable")}>
                        <Text style={styles.buttonText}>Manage Wearable</Text>
                </Button>

                <Button radius={8} color="#fff" containerStyle={styles.button} onPress={() => navigation.push("Change Password")}>
                        <Text style={styles.buttonText}>Change Password</Text>
                </Button>

                <Button radius={8} color="#fff" containerStyle={{...styles.button, marginBottom: 30}} onPress={logout} >
                        <Text style={{...styles.buttonText, color: 'red'}}>Sign Out</Text>
                </Button>
        </ScrollView>

        </SafeAreaProvider>
        
  
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f2f2f6',

    },

    container: {
        alignItems: 'center',
        marginTop: 10,
    },

    containerSignOut: {
        bottom: 10,
        borderColor: 'red',
        color: 'red',
        alignItems: 'center',
    },


    avatarName: {
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        // marginTop: 10,
        fontFamily: 'Poppins-SemiBold'
    },  

    editProfile: {
        width: '70%',
        borderColor: 'black'
    },

    button: {
        marginVertical: 5,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.4,
        borderRadius: 8,
        borderColor: '#c4c4c4'
    },

    view: {
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
    },

    optionText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },

    buttonText: {
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: 5
    },
});