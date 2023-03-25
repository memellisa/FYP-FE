import { Icon } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropDownField = (text, value, data, setOnChange, handleOnFocus, errorMessage, onIconPress=null) => {

    return(
        <View>
            <View style={styles.optionView}>
                <View style={styles.inputTitleView}>
                    {onIconPress ?
                        <Icon name="help" color="#0F52BA" size='18' onPress={onIconPress}/> : null}
                    <Text style={styles.optionText}>{text}</Text>
                   
                </View>
                <Dropdown
                    style={styles.dropdown}
                    itemTextStyle={styles.itemStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onChange={item => {
                        setOnChange(item.value)
                    }}
                    onFocus={() =>{
                        handleOnFocus(true)
                        setOnChange(value)
                    }}
                />
            </View>
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    
    
    )
}

const styles = StyleSheet.create({
    optionView: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 20,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        width: 115
    },
    
    inputTitleView: {
        width: 140, 
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    errorText: {
        color: 'red',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        marginLeft: 170,
        marginBottom: 0
    },

    dropdown: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        paddingRight: 5,
        marginLeft: 10,
        flex:1
    },
})

export default DropDownField