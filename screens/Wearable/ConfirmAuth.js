import { Image, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { getAuthURL, postAccessToken, storeFitbitAccRefToken } from '../../utils/api/fitbit.api';
import { auth } from '../../config';

export default function ConfirmAuth({ route, navigation }) {
    const [authCode, setAuthCode] = useState('')
    const [pressed, setPressed] = useState(false)


    
    useEffect( () => {
        if (authCode !== ''){
            (async () => {
                const result = await postAccessToken(JSON.stringify({ 'authCode': authCode, 'uid': auth.currentUser.uid }))
                let jsonResult = JSON.parse(result.data)
                if (!result.error){
                    try {
                        const fitbitTokens = JSON.stringify({"accessToken": jsonResult.access_token, "refreshToken": jsonResult.refresh_token})
                        const result = await storeFitbitAccRefToken(fitbitTokens)
                        if (result.data != "Success store token") {
                            Alert.alert('Error trying to store access token in database, please login again to Fitbit')
                        }
                    } catch (e) {
                        Alert.alert('Error trying to store access token in database, please login again to Fitbit')
                    }
                    navigation.push("Success Splash")
                } else {
                    Alert.alert('Something went wrong. Please try again')
            }})()
        }

    }, [authCode])

    useEffect(() => {
        const linkingEvent = Linking.addEventListener('url', handlePressButtonAsync);
        if (pressed) {
            Linking.getInitialURL()
            .then(handlePressButtonAsync())
        }
        return () => {
           setPressed(false)
           linkingEvent.remove();
        };
     }, [pressed, handlePressButtonAsync]);
     
    
    const handlePressButtonAsync = async () => {
        const res = await getAuthURL(auth.currentUser.uid)

        if (res.error) return
        let response = await WebBrowser.openAuthSessionAsync(res.data, Linking.createURL())
        
        if (response && response.type == 'success'){
            const url = response.url
            const aCode = url.split('code=')[1].replace('#_=_','')
            setAuthCode(aCode.split('code=')[0])
        }
        
        WebBrowser.dismissBrowser()
    };
      
    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                <View style={styles.promptView}>
                    <Image source={require('../../assets/Fitbit_logo_RGB.png')} style={styles.logo} transition={false}/>
                    <Text style={styles.subtitle}>
                        Connect your Fitbit account to track your physical activities. 
                        Activity recorded on Fitbit will count towards your Coronary Heart Disease risk calculation. 
                        Click Connect below to sign in to your Fitbit account and authorize access
                    </Text>
                </View>


                <TouchableHighlight underlayColor="#DDDDDD" style={styles.button} onPress={()=>setPressed(true)}>
                        <Text style={styles.text}>Connect</Text>
                </TouchableHighlight>

                
            </View>
        </SafeAreaProvider>
    
      );
}

const styles = StyleSheet.create({
    logo: {
        width: '100%', 
        height: '15%',
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
    subtitle: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
    },

    button: {
        marginVertical: 10,
        width: '75%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor:'#0F52BA',
        borderRadius: 10,
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