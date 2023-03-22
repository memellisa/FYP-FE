import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const InputTextField = (text, value, onChangeText) => {
    const isNumber = text === 'Height (cm)' || text === 'Weight (kg)'
    return (
    <View style={styles.optionView}>
        <Text style={styles.optionText}>{text}</Text>
        <TextInput style={styles.valueText} value={value.toString()} onChangeText={onChangeText} multiline={isNumber ? false : true} keyboardType={isNumber ? 'decimal-pad' : 'default'}/>
    </View>
)}

const styles = StyleSheet.create({
    optionView: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
        // paddingTop:5,
        fontFamily: 'Poppins-SemiBold',
        width: 140
    },
    
    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },


    dropdown: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        paddingRight: 5,
        flex:1
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },


    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 190,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    closeModalText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },


})

export default InputTextField