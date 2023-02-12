import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const DataCard = ({title, number, unit, note, minWidth}) => {
    return (
    <>
        <Card containerStyle={{ width: minWidth, marginBottom:10, paddingRight:20, borderRadius:10 }} >
            <Card.Title style={{fontSize: 18}}>{title}</Card.Title>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>  
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.number}>{number}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
                {note && (<Text style={styles.note}>{note}</Text>)}
            </View>

            
        </Card>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    number: {
        fontSize: 23,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Bold'

    },
    unit: {
        color: '#c4c4c4',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    note: {
        fontSize: 16,
        color: '#808080',
        fontFamily: 'Poppins-Regular'
    }
});

export default DataCard;