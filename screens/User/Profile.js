import React, { useState, useEffect } from 'react';
// import { Icon } from 'react-native-elements'
import { Avatar, Button } from '@rneui/base'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetailsCard from '../../components/DetailsCard';
import { auth } from "../../config"
import { signOut } from 'firebase/auth';
import axios from 'axios';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { flaskURL } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useIsFocused } from '@react-navigation/native';
import { calculateAge, countBMI, getUserData } from '../../utils/functions';


export default function Profile({ navigation, route }) {
    // const data = route.params.data
    console.log("DATA PARAMS::", route.params)

    // const [image, setImage] = useState(null);
    // const [personalData, setPersonalData] = useState(null)
    const [userData, setUserData] = useState(null);

    const isFocused = useIsFocused()

    const [profile, setProfile] = useState('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
    const [uploading, setUploading] = useState(false)
  
    useEffect(() => {
        getUserData(setUserData, userData, route?.params?.update)
        // console.log("FOCUSED")
    }, [isFocused])


    // async function getProfilePicture() {
    //     // const auth = getAuth();
    //     let payload = JSON.stringify({ 'img': auth.currentUser?.uid })
    //     let user = auth.currentUser?.uid
    //     try {
    //         console.log(payload)
    //         const response = await axios.get(`${flaskURL}/image/${user}`, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         console.log("Image URI: " + response.data)
    //         setProfile(response.data)
    //     } catch (error) {
    //         console.log('ERROR',error.response)
    //         setProfile('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
    //     } 
    // }

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
    
        // console.log({ pickerResult });
    
        handleImagePicked(pickerResult);
    };
    
    const handleImagePicked = async (pickerResult) => {
        try {
            setUploading(true)

            if (!pickerResult.cancelled) {
                const resultURL = await uploadImageAsync(pickerResult.uri);
                setProfile(resultURL)
            }
        } catch (e) {
            // console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false)
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

            // console.log("Image URI: " + JSON.stringify(response.data))
            await AsyncStorage.setItem('userData', JSON.stringify(response.data))
            getUserData(setUserData, userData, true)
            return 
        } catch (error) {
            // console.log('RESP',error.response)
        } 
    }

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.screenContainer} /* hasSafeArea={false} */ >
                <View style={styles.container}>
                    <Avatar
                        size={100}
                        rounded
                        source={{uri: userData?.info.img ? userData.info.img : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }}
                    />
                    <Button radius={8} color="#f2f2f6" onPress={pickImage}>
                        <Text style={{color:'#0095FE'}}>Edit image</Text>
                    </Button>
                </View>

                <DetailsCard 
                    title={"Personal Details"} 
                    data={userData?.info} 
                    route={route} 
                    navigation={navigation} 
                    dataToShow={{
                        "firstName": userData?.info.firstName,
                        "lastName": userData?.info.lastName,
                        "dob": userData?.info.dob,
                        "age": calculateAge(userData?.info.dob)}}/>
                
                <DetailsCard 
                    title={"Health Details"} 
                    data={userData?.health} 
                    route={route} 
                    navigation={navigation}
                    dataToShow={{
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
                    }}/>

                <Button radius={8} color="#fff" style={styles.button} onPress={() => navigation.push("Manage Wearable")}>
                        <Text style={styles.buttonText}>Manage Wearable</Text>
                </Button>

                <Button radius={8} color="#fff" style={styles.button} onPress={() => navigation.push("Change Password")}>
                        <Text style={styles.buttonText}>Change Password</Text>
                </Button>

                <Button radius={8} color="#fff" style={{...styles.button, marginBottom: 30}} onPress={logout} >
                        <Text style={{...styles.buttonText, color: 'red'}}>Sign Out</Text>
                </Button>
        </ScrollView>

        </SafeAreaProvider>
        
  
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        // alignItems: 'center',
        // marginTop: -65,
        flex: 1,
        // backgroundColor: '#fff',
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
        // width: 200,
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