import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-modern-datepicker'
import { getFormatedDate } from 'react-native-modern-datepicker'

const today = new Date()
const endDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')

const DatePickerField = (text, openModal, handleOnPress, date, handleChangeDate) => {
    return (
    <View style={styles.optionView}>
        <Text style={styles.optionText}>{text}</Text>
        <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.valueText}>{date} </Text>
        </TouchableOpacity>
        <Modal
            animationType='slide'
            transparent={true}
            visible={openModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <DatePicker
                    mode='calendar'
                    selected={date}
                    onDateChange={handleChangeDate}
                    maximumDate={endDate}
                    options={{
                        textHeaderColor: '#0F52BA',
                        textDefaultColor: '#0F52BA',
                        selectedTextColor: '#fff',
                        mainColor: '#0F52BA',
                        textSecondaryColor: '#0F52BA',
                      }}>
                </DatePicker>
                <TouchableOpacity onPress={handleOnPress}>
                    <Text style={styles.closeModalText}>{'Done'}</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
    
)}

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 190,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        color: '#0F52BA'
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

export default DatePickerField