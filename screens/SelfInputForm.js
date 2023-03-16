import { Modal, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../components/NavigationButton';
import DatePicker from 'react-native-modern-datepicker'
import { getFormatedDate } from 'react-native-modern-datepicker'


const countBMI = (height, weight) => weight/(height*height)

const dietData = [
    { label: 'No Restrictions', value: 'No Restrictions' },
    { label: 'Keto', value: 'Keto' },
    { label: 'Paleo', value: 'Paleo' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Mediterranean', value: 'Mediterranean' },
    { label: 'Low Carb', value: 'Low Carb' },
    { label: 'No Sugar', value: 'No Sugar' },
];

const smokingData = [
    { label: 'Never', value: 'Never' },
    { label: 'Heavy', value: 'Heavy' },
    { label: 'Light', value: 'Light' },
];

const bloodPressureData = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Elevated', value: 'Elevated' },
    { label: 'HBP Stage 1', value: 'HBP Stage 1' },
    { label: 'HBP Stage 2', value: 'HBP Stage 2' },
    { label: 'HBP Stage 3', value: 'HBP Stage 3' },
];

const sexData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

const bloodData = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
]


export default function SelfInputForm({ route, navigation }) {
    // const otherData = route.params.data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [diet, setDiet] = useState('')
    const [smokingStatus, setSmokingStatus] = useState('')
    const [alcoholConsumption, setAlcoholConsumption] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [sex, setSex] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [age, setAge] = useState(null)
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBMI] = useState('')
    const [formData, setFormData] = useState('')

    const today = new Date()
    const endDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
    const [dateOfBirth, setDateOfBirth] = useState(endDate)
    const [openModal, setOpenModal] = useState(false)

    const onPress = () => {
        console.log('ALL DATA',formData)
        // send data to db
        navigation.navigate("Main")
    }

    useEffect(() => {
        setBMI(countBMI(height, weight).toFixed(2))
    }, [height, weight])

    useEffect(() => {
        setFormData( {
            'personal-data':{
                'first_name': firstName,
                'last_name': lastName,
                'dob':  dateOfBirth,
            },
            'health-data': {
                'diet': diet,
                'smoking_status': smokingStatus,
                'alcohol-consumption': alcoholConsumption,
                'blood-pressure': bloodPressure,
                'sex': sex,
                'blood-type': bloodType,
                'age': age,
                'height': height,
                'weight': weight,
                'bmi': bmi
            }
        })
    }, [firstName,lastName, dateOfBirth, diet, smokingStatus, alcoholConsumption, bloodPressure, sex,bloodType, age, weight, height, bmi])

    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={onPress}/> 
        });
    }, [])

    const renderDropDown = (text, value, data, setOnChange) => {
        return(
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
                    setOnChange(item.value);
                }}
            />
        </View>)
    }


    const renderText = (text, value, onChangeText) => {
        return (
        <View style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
            <TextInput style={styles.valueText} value={value} onChangeText={onChangeText} multiline={true}/>
        </View>
    )}

    const handleOnPress = () => {
        setOpenModal(!openModal)
        calculateAge()
    }

    const handleChangeDOB = (propDate) => {
        setDateOfBirth(propDate)
    }
    
    const renderDatePicker = (text) => {
        return (
        <View style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
            <TouchableOpacity onPress={handleOnPress}>
                <Text style={styles.valueText}>{dateOfBirth} </Text>
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
                        selected={dateOfBirth}
                        onDateChange={handleChangeDOB}
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

    const calculateAge = () => {
        const birthDate = new Date(dateOfBirth);
        console.log("DATES",today, birthDate)
        var tempAge = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            tempAge--
        }
        setAge(tempAge)
    }

    return (
        <SafeAreaProvider>
            <ScrollView
                    style={styles.screenContainer}
                    hasSafeArea={false}
                    keyboardDismissMode="interactive"
                    automaticallyAdjustKeyboardInsets={true}
                >
                
                <Text style={styles.title}> 
                    Please fill in the fields below to allow us to better understand you
                </Text>
                

                {renderText('First Name', firstName, setFirstName)}

                {renderText('Last Name', lastName, setLastName)}

                {renderDatePicker('Date of Birth', dateOfBirth, setDateOfBirth)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Age*</Text>
                    <Text style={styles.valueText}>{age != null ? age : '-'}</Text>
                </View>

                {renderDropDown("Diet", diet, dietData, setDiet)}

                {renderDropDown("Smoking Status", smokingStatus, smokingData, setSmokingStatus)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Alcohol Consumption/L</Text>
                    <TextInput style={styles.valueText} onChangeText={setAlcoholConsumption} value={alcoholConsumption} keyboardType='decimal-pad'/>
                </View>

                {renderDropDown("Blood Pressure", bloodPressure, bloodPressureData, setBloodPressure)}
                

                {renderDropDown("Sex", sex, sexData, setSex)}
                {renderDropDown("Blood Type", bloodType, bloodData, setBloodType)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Height (m)</Text>
                    <TextInput style={styles.valueText} onChangeText={setHeight} value={height} keyboardType='decimal-pad'/>
                </View>

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Weight (kg)</Text>
                    <TextInput style={styles.valueText} onChangeText={setWeight} value={weight} keyboardType='decimal-pad'/>
                </View>
                
            
                <View style={styles.optionView}>
                    <Text style={styles.optionText}>BMI**</Text>
                    <Text style={styles.valueText}>{(height && weight && isFinite(bmi)) ? bmi : '-'}</Text>
                </View>

                <View style={{marginBottom: 40, marginTop: 20}}>
                    <Text style={styles.infoText}> 
                        *Age is calculated from the inputted date of birth
                    </Text>
                    <Text style={styles.infoText}> 
                        **BMI is calculated from the inputted height and weight
                    </Text>
                </View>
                
            </ScrollView>
        </SafeAreaProvider>
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        // alignItems: 'center',
        // marginTop: -65,
        
        flex: 1,
        backgroundColor: '#fff',
    },

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

    dropdown: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        paddingRight: 5,
        flex:1
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 190,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    closeModalText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    infoText: {
        color: 'grey', 
        marginHorizontal: 28, 
        marginTop: 10, 
        textAlign: 'justify'
    },
    title: {
        fontSize: 19, 
        fontFamily: "Poppins-Bold", 
        color: '#0F52BA',
        alignSelf: 'center',
        textAlign:'center',
        paddingTop: 10,
        paddingHorizontal: 30
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
    }


})