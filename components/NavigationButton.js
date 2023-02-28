import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const NavigationButton = ({ buttonName, onPressHandler }) => {
    return (
        <Button
            // onPress={() => navigation.navigate(name, { data: route.params.data })}
            onPress={onPressHandler}
            color="#fff"
            style={styles.button}
            >
            <Text style={styles.text}>{buttonName}</Text>
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

export default NavigationButton;