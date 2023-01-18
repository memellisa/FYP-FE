import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Emoji from './Emoji';
//  
const MotivationCard = ({ title, text, minWidth}) => {
    return (
    <>  
        <Card containerStyle={{ width: minWidth, marginBottom:10, paddingRight:20, borderRadius:10 }} >
            
            <View style={{flexDirection:'row', alignItems:'center'}}>  
                <Emoji symbol="🎉" label="confetti" />
                <View style={{paddingLeft: 20}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </Card>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold'

    },
    text: {
        color: '#808080',
        fontSize: 16,
        paddingEnd: 10,
        fontFamily: 'Poppins-Regular'
    }
});

export default MotivationCard;