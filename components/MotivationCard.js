import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';
import Emoji from './Emoji';
//  
const MotivationCard = ({ title, text, minWidth}) => {
    return (
    <>  
        <Card containerStyle={{...styles.container, width: minWidth, }} >
            <View style={styles.content}>  
                <Emoji symbol="🎉" label="confetti" />
                <View style={styles.textView}>
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
        marginBottom:10, 
        paddingRight:20, 
        borderRadius:10, 
        alignSelf: 'center'
    },

    content: {
        flexDirection:'row', 
        alignItems:'center'
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
    },

    textView: {
        paddingLeft: 20
    }

});

export default MotivationCard;