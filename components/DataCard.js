import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';

const DataCard = ({title, numbers, units, note, width}) => {
    var contents = []

    if (Array.isArray(numbers)){
        for(let i = 0; i < numbers?.length; i++){
            contents.push(<Text style={styles.number} key={`num${i}`}>{numbers[i]}</Text>)
            contents.push(<Text style={styles.unit} key={`unit${i}`}>{units[i]}</Text>)
        }
    } else {
        contents.push(<Text style={styles.number} key='num'>{numbers}</Text>)
        contents.push(<Text style={styles.unit} key='unit'>{units}</Text>)
    }
    
    return (
        <Card containerStyle={{ width: width, ...styles.container}} >
            <Card.Title style={styles.title}>{title}</Card.Title>
            <View style={styles.contentView}>  
                <View style={styles.content}>
                    {contents}
                </View>
                {note && (<Text style={styles.note}>{note}</Text>)}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom:10, 
        paddingRight:20,
        borderRadius:10,
    },

    title: {
        fontSize: 18
    },

    contentView: {
        alignItems: 'center', 
        justifyContent: 'center'
    },

    content: {
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    number: {
        fontSize: 23,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Bold'

    },
    unit: {
        color: '#c4c4c4',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    note: {
        fontSize: 16,
        color: '#808080',
        fontFamily: 'Poppins-Regular'
    }
});

export default DataCard;