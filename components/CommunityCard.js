import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Text, Card } from '@rneui/themed';

const CommunityCard = ({ imgURI, title, text, width, onPress}) => {
    return (
    <>  
        <Pressable onPress={onPress} >
            <Card containerStyle={{ ...styles.container, width: width}}  >
                <Image
                    style={styles.image}
                    source={{uri: imgURI}}/>
                <View style={{ alignItems:'center' }}>  
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Card>
        </Pressable>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom:10, 
        borderRadius:10,
        alignItems:'center',
        alignSelf: 'center'
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
        maxWidth: '95%',
        height: 200,
        marginVertical: 10
    },
});

export default CommunityCard;