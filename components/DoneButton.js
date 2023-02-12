import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const DoneButton = ({navigation, name, route}) => {
    return (
        <Button
            onPress={() => navigation.navigate(name, { data: route.params.data })}
            color="#fff"
            style={styles.button}
            >
            <Text style={styles.text}>Done</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    button:{
        width: 100,
        padding: 0,
        margin: 0,
        left: 30
    },

    text: {
        color: '#0096FF', 
        fontSize: 18,
    },

});

export default DoneButton;