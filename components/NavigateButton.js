import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';

const NavigateButton = ({navigation, nav, name, data}) => {
    return (
        <Button
            onPress={() => navigation.navigate(nav, { data: data })}
            color="#fff"
            style={styles.button}
            >
            <Text style={styles.text}>{name}</Text>
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

export default NavigateButton;