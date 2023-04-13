import { Icon } from '@rneui/base';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputTextField = ({text, value, onChangeText, errorMessage, handleBlur}) => {
    const isNumber = text === 'Height (cm)' || text === 'Weight (kg)'
    return (
        <View>
            <View style={styles.inputView}>
                <View style={styles.inputTitleView}>
                    <Text style={styles.inputText}>{text}</Text>
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
        marginHorizontal: 20,
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
        marginLeft: '40%',
        marginBottom: 0
    },

    inputTitleView: {
        width: '35%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: '57%',
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
    },
    
})

export default InputTextField