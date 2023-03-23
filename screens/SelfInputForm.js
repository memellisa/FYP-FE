import { Modal, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../components/NavigationButton';
import DatePicker from 'react-native-modern-datepicker'
import { getFormatedDate } from 'react-native-modern-datepicker'
import DatePickerField from '../components/DatePickerField';
import DropDownField from '../components/DropdownField';
import InputTextField from '../components/InputTextField';
import { Button } from '@rneui/base';
import { Formik } from 'formik';
import { userHealthValidationSchema, userInfoValidationSchema } from '../utils/validation';
import { createUser } from '../utils/api/user.api';


const countBMI = (height, weight) => (weight/(height*height*0.0001)).toFixed(2)

const dietData = [
    { label: 'No Restrictions', value: 'normal' },
    { label: 'Keto', value: 'Keto' },
    { label: 'Paleo', value: 'Paleo' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Mediterranean', value: 'Mediterranean' },
    { label: 'Low Carb', value: 'Low Carb' },
    { label: 'No Sugar', value: 'No Sugar' },
];

const sexData = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
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

const frequencyData = [
    { label: 'Never', value: '0' },
    { label: 'Previous', value: '1' },
    { label: 'Seldom', value: '2' },
    { label: 'Frequent', value: '3' },
];

const booleanData = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
];

export default function SelfInputForm({ route, navigation }) {
    // const otherData = route.params.data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [diet, setDiet] = useState('')
    const [smokingStatus, setSmokingStatus] = useState('')
    const [alcoholConsumption, setAlcoholConsumption] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [insulin, setInsulin] = useState('')
    const [cholesterol, setCholesterol] = useState('')
    const [sex, setSex] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [age, setAge] = useState(null)
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBMI] = useState('')
    const [formData, setFormData] = useState('')
    const [done, setDone] = useState(null)


    const today = new Date()
    const endDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
    const [dateOfBirth, setDateOfBirth] = useState(endDate)
    const [openModal, setOpenModal] = useState(false)

    // useEffect(() => {
    //     setBMI(countBMI(height, weight))
    // }, [height, weight])

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

    // useEffect(() => {
    //     navigation.setOptions({ 
    //         headerBackTitle: '', 
    //         // headerRight: () => <NavigationButton buttonName="Done" onPressHandler={onPress}/> 
    //     });
    // }, [])

    

    const handleOnPress = () => {
        setOpenModal(!openModal)
        // calculateAge()
    }

    const handleChangeDOB = (propDate) => {
        setDateOfBirth(propDate)
    }

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        // console.log("DATES",today, birthDate)
        var tempAge = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            tempAge--
        }
        // setAge(tempAge)
        return tempAge
    }

    const onPressDone = async (newData) => {
        const temp = {
            "info": {
                "dob": newData.dob,
                "firstName": newData.firstName,
                "lastName": newData.lastName,
                "img": null,
                // "email": ''
            },
            "health": {
                "alcoholConsumption": parseInt(newData.alcoholConsumption) ,
                "bloodPressure": parseInt(newData.bloodPressure) ? true : false,
                "bloodType": newData.bloodType,
                "cholesterol": parseInt(newData.cholesterol) ? true : false,
                "diet": newData.diet,
                "height": parseInt(newData.height),
                "insulin": parseInt(newData.insulin) ? true : false,
                "sex": newData.sex,
                "smokingStatus": parseInt(newData.smokingStatus),
                "weight": parseInt(newData.weight)
            }
         }
        //  console.log("TO BE SENT::",temp)
        sendData(temp)
    }

    const sendData = async (newData) => {
        console.log("NEW DATA:::",newData)
        const result = await createUser(newData)
        // console.log("EDIT HEALTH:::",result)
        if (!result.error){
            console.log('CREATED USERR', JSON.stringify(result.data))
            navigation.navigate('Main')
           
        } else {
            console.log(result.error)
            Alert.alert('Something went wrong. Please try again')
        }
    }

    // useEffect(() => {
    //     if (done) {

    //         onPressDone({
    //         })
    //     }
    // }, [done])

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
                <Formik
                    validateOnMount={true}
                    validationSchema={userInfoValidationSchema.concat(userHealthValidationSchema)}
                    initialValues={{ firstName:'', lastName:'', dob:endDate, insulin:'',cholesterol:'', diet:'', smokingStatus:'', alcoholConsumption:'', bloodPressure:'', sex:'', height:'', weight:'', bloodType:''}}
                    onSubmit={values => onPressDone(values)}
                >
                    {({ handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid, }) => (
                    <>
                        {/* {console.log(values)} */}
                        {InputTextField('First Name', values.firstName, handleChange('firstName'), (errors.firstName && touched.firstName) ? errors.firstName : '', handleBlur('firstName'))}

                        {InputTextField('Last Name', values.lastName, handleChange('lastName'), (errors.lastName && touched.lastName) ? errors.lastName : '', handleBlur('lastName'))}

                        {/* {DatePickerField('Date of Birth', openModal, handleOnPress, dateOfBirth, handleChangeDOB)} */}
                        {DatePickerField('Date of Birth', openModal, handleOnPress, values.dob, handleChange('dob'))}


                        <View style={styles.optionView}>
                            <Text style={styles.optionText}>Age</Text>
                            <Text style={styles.valueText}>{ !isNaN(values.dob) || !isNaN(calculateAge(values.dob)) ? calculateAge(values.dob) : '-'}</Text>
                        </View>

                        {DropDownField(
                            "Diet", 
                            values.diet, 
                            dietData, 
                            handleChange('diet'),  
                            () => touched.diet = true, (errors.diet && touched.diet) ? errors.diet : '')}
                     
                        {DropDownField(
                            "Smoking Status", 
                            values.smokingStatus, 
                            frequencyData, 
                            handleChange('smokingStatus'),  
                            () => touched.smokingStatus = true, (errors.smokingStatus && touched.smokingStatus) ? errors.smokingStatus : '')}

                        {DropDownField(
                            "Alcohol Consumption", 
                            alcoholConsumption, 
                            frequencyData, 
                            handleChange('alcoholConsumption'),  
                            () => touched.alcoholConsumption = true, 
                            (errors.alcoholConsumption && touched.alcoholConsumption) ? errors.alcoholConsumption : '')}

                        {DropDownField(
                            "Blood Pressure", 
                            values.bloodPressure, 
                            booleanData, 
                            handleChange('bloodPressure'),  
                            () => touched.bloodPressure = true, 
                            (errors.bloodPressure && touched.bloodPressure) ? errors.bloodPressure : '')}

                        {DropDownField(
                            "Insulin", 
                            values.insulin, 
                            booleanData, 
                            handleChange('insulin'),  
                            () => touched.insulin = true, 
                            (errors.insulin && touched.insulin) ? errors.insulin : '')}

                        {DropDownField(
                            "Cholesterol", 
                            values.cholesterol, 
                            booleanData, 
                            handleChange('cholesterol'),  
                            () => touched.cholesterol = true, 
                            (errors.cholesterol && touched.cholesterol) ? errors.cholesterol : '')}

                        {DropDownField(
                            "Sex", 
                            values.sex, 
                            sexData, 
                            handleChange('sex'),  
                            () => touched.sex = true, 
                            (errors.sex && touched.sex) ? errors.sex : '')}

                        {DropDownField(
                            "Blood Type", 
                            values.bloodType, 
                            bloodData, 
                            handleChange('bloodType'),  
                            () => touched.bloodType = true, 
                            (errors.bloodType && touched.bloodType) ? errors.bloodType : '')}

                        {InputTextField('Height (cm)', values.height, handleChange('height'), (errors.height && touched.height) ? errors.height : '', handleBlur('height'))}

                        {InputTextField('Weight (kg)', values.weight, handleChange('weight'), (errors.weight && touched.weight) ? errors.weight : '', handleBlur('weight'))}

                        
                    
                        <View style={styles.optionView}>
                            <Text style={styles.optionText}>BMI</Text>
                            <Text style={styles.valueText}>{(values.height && values.weight && isFinite(countBMI(values.height, values.weight))) ? countBMI(values.height, values.weight) : '-'}</Text>
                        </View>

                        {/* <View style={{marginBottom: 40, marginTop: 20}}>
                            <Text style={styles.infoText}> 
                                *Age is calculated from the inputted date of birth
                            </Text>
                            <Text style={styles.infoText}> 
                                **BMI is calculated from the inputted height and weight
                            </Text>
                        </View> */}
                        <Button 
                            title="Done" 
                            buttonStyle={styles.button} 
                            // onPress={() => setDone(true)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        />
                    </>)}
                </Formik>
            </ScrollView>
        </SafeAreaProvider>
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        
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
    },

    button: {
        marginTop: 30,
        marginBottom: 40,
        width: 180,
        height: 50,
        borderRadius: 5,
        alignSelf: 'center'
    },


})