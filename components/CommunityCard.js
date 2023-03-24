import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from '@rneui/themed';

const CommunityCard = ({ imgURI, title, text, minWidth}) => {
    return (
    <>  
        <Card containerStyle={{ ...styles.container, width: minWidth}} >
            <Image
                style={styles.image}
                source={{uri: imgURI}}/>
            <View style={{ alignItems:'center' }}>  
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        </Card>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom:10, 
        borderRadius:10,
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
    
    image: {
        width: 300,
        height: 200,
        marginVertical: 10
    },
});

export default CommunityCard;