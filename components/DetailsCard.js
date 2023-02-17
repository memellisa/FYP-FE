import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import EditButton from './EditButton';
import labels from '../utils/labels';

const DetailsCard = ({title, data, navigation, route, key}) => {

    const jsonToArray = (data) => {
        const arr = []; 
        for(let i in data) {
            arr.push([labels[i], data[i]]); 
        }
        
        return arr
    }
    
     
    const arrayData = jsonToArray(data)

    return (
    <>
        <Card containerStyle={styles.container} >
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{title}</Text>
                <EditButton name={title} navigation={navigation} route={route} data={data} />
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
        // alignSelf: 'flex-start', 
        color: '#0F52BA'
        // color: '#0047AB'
        // color: '#4169E1'
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
        // marginTop: 32,
        borderColor: '#bdbdbd'
    },

    touchable: {
        paddingVertical: 12,
        borderBottomWidth: 0.4,
        borderColor: '#D3D3D3'
    },

    optionView: {
        // position: 'relative',
        flexDirection: 'row',
        // marginTop: 10,
        // marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // justifyContent:'space-between',
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
        // bottom: -7,
        // transform: [{ rotate: "-90deg" }]
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

        // position: 'absolute',
        // top: -4,
        // right: 0,
        // color: '#263cff'
    },

    selectedTextStyle: {
        opacity: 0
    }
});

export default DetailsCard;