import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const CarrierStatusCard = ({disease, status=true}) => {
    return (
    <>
        <Card containerStyle={{ width: 380, marginBottom:5, borderRadius:10, paddingVertical:15, paddingHorizontal:10 }} >
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>  
                <Text style={styles.disease}>{disease}</Text>
                <Text style={{...styles.status, color: status ? 'red' : 'green'}}>{status ? 'Present' : 'Absent'}</Text>
            </View>

            
        </Card>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    disease: {
        fontSize: 18,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Bold'

    },
    status: {
        fontSize: 20,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Bold',
        alignSelf: 'flex-end'

    },
});

export default CarrierStatusCard;