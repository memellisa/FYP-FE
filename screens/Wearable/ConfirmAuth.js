// import { TouchableHighlight, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';


// TODO: detect whether there is already a wearable connected to the account or not
export default function ConfirmAuth({ route }) {
    // const data = route.params.data

    // const [diet, setDiet] = useState(data.diet)
    // const [smokingStatus, setSmokingStatus] = useState(data.smoking_status)
    // const [alcoholConsumption, setAlcoholConsumption] = useState(data.alcohol_consumption.toString())
    // const [bloodPressure, setBloodPressure] = useState(data.blood_pressure)

    // useEffect(() => {
    //     const newData = {diet: diet, smoking_status: smokingStatus, alcohol_consumption: alcoholConsumption, blood_pressure: bloodPressure}
    //     route.params.data = newData
    //     console.log(route.params.data)
    // }, [diet, smokingStatus, alcoholConsumption, bloodPressure])


    const [result, setResult] = useState(null);
    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://expo.dev');
        setResult(result);
      };
      
    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                <View style={styles.promptView}>
                    <Image source={require('../../assets/Fitbit_logo_RGB.png')} style={styles.logo} />
                    <Text style={styles.subtitle}>
                        Connect your Fitbit account to track your physical activities. 
                        Activity recorded on Fitbit will count towards your Coronary Heart Disease risk calculation. 
                        Click Connect below to sign in to your Fitbit account and authorize access
                    </Text>
                </View>


                <TouchableHighlight underlayColor="#DDDDDD" style={styles.button} onPress={_handlePressButtonAsync}>
                        <Text style={styles.text}>Connect</Text>
                </TouchableHighlight>

                
            </View>
        </SafeAreaProvider>
    
      );
}

const styles = StyleSheet.create({
    logo: {
        width: '100%', 
        height: 40,
        resizeMode: 'contain',
    },
    screenContainer: {
        paddingHorizontal: 30,
        // justifyContent: 'center',
        // marginTop: -65,
        flex: 1,
        backgroundColor: '#fff',
    },

    promptView: {
        // position: 'relative',
        marginTop: 100,
        marginHorizontal: 10,
        // paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },

    optionText: {
        fontSize: 16,
        // paddingTop:5,
        fontFamily: 'Poppins-SemiBold',
        width: 140
    },

    dropdown: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        paddingRight: 5,
        flex:1
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 190,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    subtitle: {
        color: 'black',
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
    },

    button: {
        marginVertical: 10,
        width: 260,
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        // borderWidth: 1.5,
        backgroundColor:'#0F52BA',
        borderRadius: 10,
        // borderColor: '#c4c4c4',
        position: 'absolute',
        bottom:40,

    },

    text: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: 5,
        color: 'white'
    },

})