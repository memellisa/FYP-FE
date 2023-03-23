import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropDownField = (text, value, data, setOnChange, handleOnFocus, errorMessage) => {

    return(
        <View>
            <View style={styles.optionView}>
                <Text style={styles.optionText}>{text}</Text>
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
        // position: 'relative',
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        // paddingHorizontal: 20,
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

export default DropDownField