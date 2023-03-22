import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import EditButton from './EditButton';
import labels from '../utils/labels';

const DetailsCard = ({title, data, navigation, route, dataToShow}) => {

    const renderBool = (val) => {
        return val ? 'Yes' : 'No'
    }

    const renderValue = (val) => {
        switch(val){
            case 0:
                return 'Never'
            case 1:
                return 'Previous'
            case 2:
                return 'Occasionally'
            case 3:
                return 'Frequent'
        } 
    }

    const jsonToArray = (dataToShow) => {
        const arr = []; 
        for(let i in dataToShow) {
            if (i === "alcoholConsumption" || i === "smokingStatus") 
                arr.push([labels[i], renderValue(dataToShow[i])])
            else 
                arr.push([labels[i], typeof dataToShow[i] == "boolean" ? renderBool(dataToShow[i]) :
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
                <EditButton name={`Edit ${title}`} navigation={navigation} route={route} data={data} />
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
        width: 350, 
        marginBottom:5, 
        borderRadius:10, 
        alignSelf: 'center',
        borderColor: '#fff'
    },

    touchableFirst: {
        borderTopWidth: 0,
        paddingTop: 12,
        paddingBottom: 12,
        borderColor: '#bdbdbd'
    },

    touchable: {
        paddingVertical: 12,
        borderBottomWidth: 0.4,
        borderColor: '#D3D3D3'
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
        width: 140,
        marginRight: 10
    },

    dropdown: {
        top: -9,
        right: 0,
        height: 0,
        width: '100%'
    },

    valueTextWithDropdown: {
        position: 'absolute',
        right: 20,
        color: '#263cff'
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },

    selectedTextStyle: {
        opacity: 0
    }
});

export default DetailsCard;