import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';

const RiskCard = ({today, yesterday, lastMonth}) => {
    const dayDiff = today-yesterday
    const monthDiff = today-lastMonth

    const renderContent = (title, data, note) => {
        return (
            <>
                
                <View style={styles.contentView}>  
                    <View style={styles.content}>
                        <Text style={styles.heading}>{title}</Text>
                        <Text style={styles.number}>{data + '%'}</Text>
                    </View>
                    {note && (<Text style={styles.note}>{note}</Text>)}
                    
                </View>
            </>
        )
    }

    return (
        <Card containerStyle={styles.container} >

            {renderContent('Today:', today)}
            {renderContent('Yesterday:', yesterday, `Your risk is ${dayDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(dayDiff)}% than yesterday`)}
            {renderContent('Last Month:', lastMonth, `Your risk is ${monthDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(monthDiff)}% than last month`)}
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom:10, 
        paddingTop: 0,
        paddingLeft: 20,
        borderRadius:10,
    },

    title: {
        fontSize: 18
    },

    heading: {
        color: '#0F52BA',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
      },
    contentView: {
        // alignItems: 'center', 
        marginTop: 20,
        justifyContent: 'center'
    },

    content: {
        flexDirection: "row", 
        alignItems: 'center', 
        
    },

    number: {
        fontSize: 21,
        paddingHorizontal: 15,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    },
    unit: {
        color: '#c4c4c4',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    note: {
        fontSize: 15,
        color: '#808080',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10
    }
});

export default RiskCard;