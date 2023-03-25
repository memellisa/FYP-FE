import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Accelerometer } from 'expo-sensors';

export const AccelerometerPage = ({ headerSubtitle, navigation, route}) => {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });

    const [subscription, setSubscription] = useState(null);
    const _interval = () => Accelerometer.setUpdateInterval(115); // Set interval of checking every 5 seconds

    const _subscribe = () => {
        setSubscription(
          Accelerometer.addListener(setData)
        );
    };
    
    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };
    
    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {x}</Text>
            <Text style={styles.text}>y: {y}</Text>
            <Text style={styles.text}>z: {z}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                <Text>{subscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_interval} style={[styles.button, styles.middleButton]}>
                <Text>Set Interval</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },    

    title: {
        fontSize: 19, 
        fontFamily: "Poppins-Bold", 
        color: '#0F52BA',
        alignSelf: 'center',
        textAlign:'center',
        paddingTop: 100,
        paddingHorizontal: 30
    },

    text: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        width: 1400
    },

    button: {
        marginTop: 30,
        marginBottom: 40,
        width: 180,
        height: 50,
        borderRadius: 5,
        alignSelf: 'center'
    },

}); 