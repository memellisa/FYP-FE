import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';

const CarrierStatusCard = ({disease, status=true}) => {
    return (
    <>
        <Card containerStyle={styles.container} >
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
        width: '85%', 
        marginBottom:5, 
        borderRadius:10, 
        paddingVertical:15, 
        paddingHorizontal:10
    },

    disease: {
        fontSize: 17,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Bold'

    },
    status: {
        fontSize: 18,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Bold',
        alignSelf: 'flex-end'

    },
});

export default CarrierStatusCard;