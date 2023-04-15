import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import NavigateButton from './NavigateButton';
import labels from '../utils/labels';

const DetailsCard = ({title, data, navigation, dataToShow}) => {

    const renderBool = (val) => {
        return val ? 'Yes' : 'No'
    }

    const renderFrequencySmoking = (val) => {
        switch(val){
            case 0:
                return 'Never'
            case 1:
                return 'Previous'
            case 2:
                return 'Current'
            default:
                return '-'
        } 
    }

    const renderFrequency = (val) => {
        switch(val){
            case 0:
                return 'Never'
            case 1:
                return 'Previous'
            case 2:
                return 'Occasionally'
            case 3:
                return 'Frequent'
            default:
                return '-'
        } 
    }

    const renderSex = (val) => {
        return val === "F" ? "Female" : val === "M" ? "Male" : '-'
    } 

    const jsonToArray = (dataToShow) => {
        const arr = []; 
        for(let i in dataToShow) {
            if (i === "alcoholConsumption") 
                arr.push([labels[i], renderFrequency(dataToShow[i])])
            else if (i === "smokingStatus") 
            arr.push([labels[i], renderFrequencySmoking(dataToShow[i])])
            else if (i === "sex")
                arr.push([labels[i], renderSex(dataToShow[i])])
            else 
                arr.push([labels[i], typeof dataToShow[i] == "boolean" ? renderBool(dataToShow[i]) :
                                    typeof dataToShow[i] == "number" && dataToShow[i] ? dataToShow[i] :
                                    dataToShow[i] ? dataToShow[i] : '-' ])
        }
        return arr
    }
    
     
    const arrayData = jsonToArray(dataToShow)

    return (
    <>
        <Card containerStyle={styles.container} >
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{title}</Text>
                <NavigateButton name='Edit' nav={`Edit ${title}`} navigation={navigation} data={data} />
            </View>
            
            {arrayData.map((obj, i) => 
                <View style={styles.optionView} key={i}>
                    <Text style={styles.optionText}>{obj[0]}</Text>
                    <Text style={styles.valueText}>{obj[1]}</Text>
                </View>)
            }
        </Card>
    </>
    );
};

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 18, 
        fontFamily: "Poppins-Bold", 
        color: '#0F52BA'
    },

    container: {
        paddingVertical: 5,
        width: '90%',
        marginBottom:5, 
        borderRadius:10, 
        alignSelf: 'center',
        borderColor: '#fff'
    },

    optionView: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'flex-start'
    },

    optionText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        width: '50%',
        marginRight: 10
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default DetailsCard;