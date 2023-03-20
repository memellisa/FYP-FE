import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
// import { Icon } from 'react-native-elements'
import { Avatar, Button, Divider } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import BotNavbar from '../../components/BotNavbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetailsCard from '../../components/DetailsCard';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config"
import { signOut } from 'firebase/auth';
import axios from 'axios';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import { getUserInfo } from '../../utils/api/user.api';

const { manifest } = Constants;

const countBMI = (height, weight) => weight/(height*height)

const flaskURL = 'http://' + manifest.debuggerHost.split(":")[0] + ':8080'


// dummy data
// const personaldata = [
//     {label: "First Name", value: "John"},
//     {label: "Last Name", value: "Doe"},
//     {label: "Date of Birth", value: "1/1/2000"},
//     {label: "Username", value: "johndoe"},
//     {label: "Socio-Economic Status", value: "Rich"},
//     {label: "Phone Number", value: 98237191},
//     {label: "Email", value: "johndoe@mail.com"}
// ]

// const healthdata = [
//     {label: "Diet", value : "Keto"},
//     {label: "Smoking Status", value : "Heavy"},
//     {label: "Alcohol Consumption/L", value: "0.5"},
//     {label: "Blood Pressure", value: "Normal"},
// ]

// const geneticsdata = [
//     {label: "Age", value : 22},
//     {label: "Sex", value : "Male"},
//     {label: "Height (m)", value: 1.80},
//     {label: "Weight (kg)", value: 75},
//     {label: "Blood Type", value: "O+"},
    
// ]

// const personaldata = {
//     first_name: "John",
//     last_name: "Doe",
//     dob: "1/1/2000",
//     username: "johndoe",
//     socio_economic_status: "Rich",
//     phone_number: 98237191,
//     email: "johndoe@mail.com"
// }

const healthdata = {
    diet: "Keto",
    smoking_status: "Heavy",
    alcohol_consumption: 0.5,
    blood_pressure: "Normal",
    age: 22,
    sex: "Male",
    height: 1.80,
    weight: 75,
    blood_type: "O+"
}

// const geneticsdata = {
//     age: 22,
//     sex: "Male",
//     height: 1.80,
//     weight: 75,
//     blood_type: "O+"
// }

export default function Profile({ navigation, route }) {
    // const data = route.params.data
    // console.log("DATA PROFILE::", data)

    const [image, setImage] = useState(null);
    const [personalData, setPersonalData] = useState(null)
    // const personaldata2 = jsonToArray(personaldata1)
    // const healthdata2 = jsonToArray(healthdata1)
    // const geneticsdata2 = jsonToArray(geneticsdata1)
    

    const [profile, setProfile] = useState('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
    const [uploading, setUploading] = useState(false)

    const bmi = countBMI(healthdata.height, healthdata.weight)
    healthdata.bmi= bmi.toFixed(2)

    // const auth = getAuth();

    // STILL NEED TO BE FIXED, HOW TO USE AXIOS GET???
    useEffect(() => {
        getProfilePicture()
        getUserPersonalData()
    }, [])

    const getUserPersonalData = async () => {
        const resultInfo = await getUserInfo()
        console.log("RESULT INFO BEFORE EDIT", JSON.stringify(resultInfo))
        setPersonalData(resultInfo)
    }

    async function getProfilePicture() {
        // const auth = getAuth();
        let payload = JSON.stringify({ 'img': auth.currentUser?.uid })
        let user = auth.currentUser?.uid
        try {
            console.log(payload)
            const response = await axios.get(`${flaskURL}/image/${user}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Image URI: " + response.data)
            setProfile(response.data)
        } catch (error) {
            console.log('ERROR',error.response)
            setProfile('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')
        } 
    }

    const logout = () => {
        signOut(auth)
        .then(() => {
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

            console.log("Image URI: " + response.data)
            return response.data
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
                        source={{uri: profile}}/>
                    <Button radius={8} color="#f2f2f6" onPress={pickImage}>
                        <Text style={{color:'#0095FE'}}>Edit image</Text>
                    </Button>
                </View>

                <DetailsCard 
                    title={"Personal Details"} 
                    data={personalData} 
                    route={route} 
                    navigation={navigation} 
                    dataToShow={{
                        "firstName": personalData?.firstName,
                        "lastName": personalData?.lastName,
                        "dob": personalData?.dateOfBirth}}/>
                
                <DetailsCard 
                    title={"Health Details"} 
                    data={healthdata} 
                    route={route} 
                    navigation={navigation}/>

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