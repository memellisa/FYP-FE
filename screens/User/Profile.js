import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { Icon } from 'react-native-elements'
import { Avatar, Button, Divider } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import BotNavbar from '../../components/BotNavbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetailsCard from '../../components/DetailsCard';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth';



const countBMI = (height, weight) => weight/(height*height)



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

const personaldata = {
    first_name: "John",
    last_name: "Doe",
    dob: "1/1/2000",
    username: "johndoe",
    socio_economic_status: "Rich",
    phone_number: 98237191,
    email: "johndoe@mail.com"
}

const healthdata = {
    diet: "Keto",
    smoking_status: "Heavy",
    alcohol_consumption: 0.5,
    blood_pressure: "Normal"
}

const geneticsdata = {
    age: 22,
    sex: "Male",
    height: 1.80,
    weight: 75,
    blood_type: "O+"
}

export default function Profile({ navigation, route }) {

    // const personaldata2 = jsonToArray(personaldata1)
    // const healthdata2 = jsonToArray(healthdata1)
    // const geneticsdata2 = jsonToArray(geneticsdata1)

    const bmi = countBMI(geneticsdata.height, geneticsdata.weight)
    geneticsdata.bmi= bmi.toFixed(2)

    const auth = getAuth();

    const logout = () => {
        signOut(auth)
        .then(() => {
            navigation.replace("Login");
            console.log('User signed out!')
        });
    }

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.screenContainer} /* hasSafeArea={false} */ >
                <View style={styles.container}>
                    <Avatar
                        size={100}
                        rounded
                        source={{uri:"https://randomuser.me/api/portraits/men/36.jpg"}}/>
                    <Text style={styles.avatarName}>
                        John Doe
                    </Text>
                    {/* <Button title="Edit Profile" containerStyle={styles.editProfile} 
                        buttonStyle={{borderRadius: 40}}
                        type="outline" /> */}
                </View>

                <DetailsCard title={"Edit Personal Details"} data={personaldata} route={route} navigation={navigation}/>
                
                <DetailsCard title={"Edit Health Details"} data={healthdata} route={route} navigation={navigation}/>

                <DetailsCard title={"Edit Genetics Data"} data={geneticsdata} route={route} navigation={navigation}/>

                <Button radius={8} color="#fff" style={styles.button} onPress={() => navigation.push("Manage Wearable")}>
                        <Text style={styles.buttonText}>Manage Wearable</Text>
                </Button>

                <Button radius={8} color="#fff" style={{...styles.button, marginBottom: 30}} onPress={logout} >
                        <Text style={{...styles.buttonText, color: 'red'}}>Sign Out</Text>
                </Button>
                {/* <View style={styles.optionContainer}> */}

                    {/* <TouchableHighlight style={styles.touchable} onPress={() => navigation.push("Personal Details",{ data: personaldata })} underlayColor={'#ffff'} >
                        <View style={styles.view}>
                            <Text style={styles.optionText}>Personal Details</Text>
                            <Icon name='navigate-next' size={25}/>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.touchable} onPress={() => navigation.push("Health Details",{ data: healthdata })} underlayColor={'#ffff'}>
                        <View style={styles.view}>
                            <Text style={styles.optionText}>Health Details</Text>
                            <Icon name='navigate-next' size={25}/>
                        </View>
                    </TouchableHighlight> */}

                    {/* <TouchableHighlight style={styles.touchable} onPress={() => navigation.push("Genetics Data")} underlayColor={'#ffff'}>
                        <View style={styles.view}>
                            <Text style={styles.optionText}>Genetics Data</Text>
                            <Icon name='navigate-next' size={25}/>
                        </View>
                    </TouchableHighlight> */}


                    {/* <TouchableHighlight style={styles.touchable}>
                        <View style={styles.view}>
                            <Text style={styles.optionText}>Manage Fitbit</Text>
                            <Icon name='navigate-next' size={25}/>
                        </View>
                    </TouchableHighlight>


                    <TouchableHighlight style={styles.touchable}>
                        <View style={styles.view}>
                            <Text style={styles.optionText}>Medical ID</Text>
                            <Icon name='navigate-next' size={25}/>
                        </View>
                    </TouchableHighlight> */}
                    
                    

                {/* </View> */}
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
        marginTop: 10,
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