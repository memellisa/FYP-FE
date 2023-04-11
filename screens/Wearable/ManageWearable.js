// import { TouchableHighlight, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';


// TODO: detect whether there is already a wearable connected to the account or not
export default function ManageWearable({ route, navigation }) {
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
    if (route.params?.hideBackButton) {
        navigation.setOptions({ header: () => (<View style={{ height: 55 }}/>) })
    }
      
    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                {/* {
                    route.params?.hideBackButton ? navigation.setOptions({ headerLeft: () => null,  headerRight: null }) : ""
                } */}

                <Text style={styles.heading}>Which wearable would you like to connect to?</Text>
                
                <TouchableHighlight  underlayColor="#f3f6f4" style={styles.button} onPress={() => navigation.push("Confirm Auth")}>
                        <Text style={styles.text}>Fitbit</Text>
                </TouchableHighlight>

                <Text style={styles.subtitle}>
                    We keep on improving our application and will add more compatible wearables in the future
                </Text>

                
            </View>
        </SafeAreaProvider>
    
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        // paddingHorizontal: 35,
        // justifyContent: 'center',
        // marginTop: -65,
        flex: 1,
        backgroundColor: '#fff',
    },

    optionView: {
        // position: 'relative',
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        // paddingHorizontal: 20,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
        // paddingTop:5,
        
        fontFamily: 'Poppins-SemiBold',
        width: '40%'
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
        width: '45%',
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    heading: {
        color: '#0F52BA',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 30,
        paddingHorizontal: 35,
    },

    button: {
        marginVertical: 10,
        width: '70%',
        // height: 70,
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#c4c4c4',

    },

    text: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: 5
    },
    subtitle: {
        color: 'grey',
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: '15%'
    },

})