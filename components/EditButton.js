import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const EditButton = ({navigation, name, route, data}) => {
    return (
        <Button
            onPress={() => navigation.navigate(name, { data: data })}
            color="#fff"
            style={styles.button}
            >
            <Text style={styles.text}>Edit</Text>
            <Icon name='navigate-next' size={25} color="#0096FF"/>
        </Button>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    button:{
        width: 60,
        padding: 0,
        margin: 0,
        left: 10
    },

    text: {
        color: '#0096FF', 
        fontSize: 18,
    },

});

export default EditButton;