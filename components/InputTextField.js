import { Icon } from '@rneui/base';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Input } from '@rneui/base';
import { Dropdown } from 'react-native-element-dropdown';

const InputTextField = (text, value, onChangeText, errorMessage, handleBlur) => {
    const isNumber = text === 'Height (cm)' || text === 'Weight (kg)'
    return (
        <View>
            <View style={styles.inputView}>
                <View style={styles.inputTitleView}>
                    <Text style={styles.inputText}>{text}</Text>
                    {/* <Icon name="help" color="#0F52BA" size='19'/> */}
                </View>
                    <TextInput 
                        style={styles.valueText} 
                        value={value.toString()} 
                        onChangeText={onChangeText} 
                        multiline={isNumber ? false : true} 
                        keyboardType={isNumber ? 'decimal-pad' : 'default'}
                        onBlur={handleBlur}
                    />
                    
                    
            </View>
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    
)}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center'
    },

    inputText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        paddingRight: 5
    },

    errorText: {
        color: 'red',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        marginLeft: 170,
        marginBottom: 0
    },

    inputTitleView: {
        width: 140, 
        alignItems: 'flex-start'
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