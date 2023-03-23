import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
// import { Icon } from 'react-native-elements'
import { Avatar, Button, Divider } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TouchableHighlight, Alert } from 'react-native';
import BotNavbar from '../../components/BotNavbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetailsCard from '../../components/DetailsCard';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config"
import { signOut } from 'firebase/auth';
import axios from 'axios';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { flaskURL } from '../../utils/constants';
import { getUser, getUserInfo } from '../../utils/api/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const countBMI = (height, weight) => (weight/(height*height*0.0001)).toFixed(2)

const calculateAge = (birthday) => {
    const today = new Date()
    const birthDate = new Date(birthday);
    var tempAge = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        tempAge--
    }
    return tempAge
}

export default function Profile({ navigation, route }) {
    // const data = route.params.data
    console.log("DATA PARAMS::", route.params)

    // const [image, setImage] = useState(null);
    // const [personalData, setPersonalData] = useState(null)
    const [userData, setUserData] = useState(null);

    const isFocused = useIsFocused()

    const [profile, setProfile] = useState('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
    const [uploading, setUploading] = useState(false)
    // const auth = getAuth();

    // STILL NEED TO BE FIXED, HOW TO USE AXIOS GET???
    useEffect(() => {
        getUserData()
        console.log("FOCUSED")
    }, [isFocused])

    const getUserData = async () => {
        const fetchUser = async() => {
            const result = await getUser()

            // console.log("WENMT HERERERE")
            
            if (!result.error){
              try {
                await AsyncStorage.setItem('userData', JSON.stringify(result.data))
                setUserData(result.data)
                console.log('USERR', JSON.stringify(result.data))
              } catch (e) {
                fetchUser()
                // Alert.alert('Something went wrong. Please try again')
              }
            } else {
                Alert.alert('1Something went wrong. Please try again')
            }
        }

        if (route.params && route.params.update) {
            console.log("UPDATE")
            fetchUser()
        } else {
            try {
                const fetchedUserData = await AsyncStorage.getItem('userData')
                console.log('FETCHEDUSERR', (fetchedUserData))
                if (fetchedUserData && fetchedUserData !== "{}"){
                  if (!isEqual(JSON.parse(fetchedUserData), userData)){
                    setUserData(JSON.parse(fetchedUserData))
                  }
                } else {
                  fetchUser()
                }
              } catch(e) {
                  fetchUser()
                  console.log("HERE BRO")
                // error reading value
              }
        }
      }

    // const getUserPersonalData = async () => {
    //     const resultInfo = await getUserInfo()
    //     console.log("RESULT INFO BEFORE EDIT", JSON.stringify(resultInfo))
    //     setPersonalData(resultInfo)
    // }

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
    
        console.log({ pickerResult });
    
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
            console.log(e);
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

            console.log("Image URI: " + JSON.stringify(response.data))
            await AsyncStorage.setItem('userData', JSON.stringify(response.data))
            getUserData()
            return 
        } catch (error) {
            console.log('RESP',error.response)
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

                <Button radius={8} color="#fff" style={{...styles.button, marginBottom: 30}} onPress={logout} >
                        <Text style={{...styles.buttonText, color: 'red'}}>Sign Out</Text>
                </Button>
        </ScrollView>

        </SafeAreaProvider>
        
  
    );
}

const styles = StyleSheet.create({
    // imageBackground: {
    //     width: '100%',
    //     height: 220,
    // },

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
        // backgroundColor: '#fff',
    },

    // optionContainer: {
        // paddingLeft: 20,
        // paddingRight: 20
    // },

    containerSignOut: {
        bottom: 10,
        borderColor: 'red',
        color: 'red',
        alignItems: 'center',
        
        // marginTop: -65,
    },

    // avatar: {
    //     height: 130,
    //     width: 130,
    //     borderColor: 'black',
    //     borderRadius: 80
    // },

    avatarName: {
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        // marginTop: 10,
        fontFamily: 'Poppins-SemiBold'
    },  

    editProfile: {
        width: 200,
        // borderRadius: 'solid 1px black 40',
        borderColor: 'black'
    },

    // touchableFirst: {
    //     // borderTopWidth: 1,
    //     paddingVertical: 12,
    //     marginTop: 32,
    //     borderColor: '#c4c4c4'
    // },

    button: {
        marginVertical: 5,
        width: 350,
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
        // color: 'red',
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: 5
    },
  
    icon: {
        height: 24,
        width: 24,
    },
});