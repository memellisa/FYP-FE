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
                        <Text style={styles.number}>{data.toFixed(2) + '%'}</Text>
                    </View>
                    {note && (<Text style={styles.note}>{note}</Text>)}
                    
                </View>
            </>
        )
    }

    return (
        <Card containerStyle={styles.container} >
            {renderContent('Today:', today, `Exercise more to reduce your risk!`)}
            {renderContent('Yesterday:', yesterday, `Your risk is ${dayDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(dayDiff).toFixed(2)}% than yesterday`)}
            {renderContent('Last Month:', lastMonth, `Your risk is ${monthDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(monthDiff).toFixed(2)}% than last month`)}
        </Card>
    );
};

const styles = StyleSheet.create({
    RCcontainer: {
        marginBottom:10, 
        paddingTop: 0,
        paddingLeft: 20,
        borderRadius:10,
    },

    RCtitle: {
        fontSize: 18
    },

    RCheading: {
        color: '#0F52BA',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
      },
    RCcontentView: {
        marginTop: 20,
        justifyContent: 'center'
    },

    RCcontent: {
        flexDirection: "row", 
        alignItems: 'center', 
        
    },

    RCnumber: {
        fontSize: 21,
        paddingHorizontal: 15,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    },
    RCunit: {
        color: '#c4c4c4',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    RCnote: {
        fontSize: 15,
        color: '#808080',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10
    }
});

export default RiskCard;