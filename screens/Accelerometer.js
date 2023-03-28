import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';
// import { Dirs, FileSystem } from 'react-native-file-access';


// var blob = new Blob(["Welcome to Websparrow.org."],
//                 { type: "text/plain;charset=utf-8" });
//                 let fileUri = FileSystem.documentDirectory + "accelerometerData.txt";
//                 await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
//         _subscribe();

export const AccelerometerPage = ({ headerSubtitle, navigation, route}) => {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });

    const [subscription, setSubscription] = useState(null);
    const _interval = () => Accelerometer.setUpdateInterval(5000); // Set interval of checking every 5 seconds

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
        emptyFileData()
        _subscribe();
        Accelerometer.setUpdateInterval(5000);
        return () => _unsubscribe();
    }, []);

    const emptyFileData = async () => {
        let fileUri = FileSystem.documentDirectory + "accelerometerData.txt";
        await FileSystem.writeAsStringAsync(fileUri, "", { encoding: FileSystem.EncodingType.UTF8 });
    }

    const saveData = async (data) => {
        let fileUri = FileSystem.documentDirectory + "accelerometerData.txt";
        let currentData;
        await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 }).then(data => {
            currentData = data // are you sure you want to resolve the data and not the base64 string? 
        }).catch(err => {
            console.log("​getFile -> err", err)
        });
        console.log(currentData)
        await FileSystem.writeAsStringAsync(fileUri, currentData + "\n" + JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 });
    }

    useEffect(() => { // This gets triggered everytime the data changes, which is a 5 second interval
        saveData(data)
    }, [data]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {data.x}</Text>
            <Text style={styles.text}>y: {data.y}</Text>
            <Text style={styles.text}>z: {data.z}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                <Text>{subscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_interval} style={[styles.button, styles.middleButton]}>
                <Text>Set Interval</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                let fileUri = FileSystem.documentDirectory + "accelerometerData.txt";
                FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 }).then(data => {
                    console.log(data) // are you sure you want to resolve the data and not the base64 string? 
                }).catch(err => {
                    console.log("​getFile -> err", err)
                });
            }} style={[styles.button, styles.middleButton]}>
                <Text>Read File and Log Content</Text>
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