import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const CommunityCard = ({ imgURI, title, text, minWidth}) => {
    return (
    <>  
        <Card containerStyle={{ width: minWidth, marginBottom:10, borderRadius:10, alignItems:'center' }} >
            <Image
                style={styles.tinyLogo}
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
    },
    tinyLogo: {
        width: 300,
        height: 200,
        marginVertical: 10
    },
});

export default CommunityCard;