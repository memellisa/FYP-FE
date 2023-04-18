import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';


const DetailsCard = ({title, dataToShow, button=null}) => {
    return (
    <>
        <Card containerStyle={styles.container} >
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{title}</Text>
                {button}
            </View>
            
            {dataToShow.map((obj, i) => 
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