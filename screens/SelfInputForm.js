import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getFormatedDate } from 'react-native-modern-datepicker'
import DatePickerField from '../components/DatePickerField';
import DropDownField from '../components/DropdownField';
import InputTextField from '../components/InputTextField';
import { Button } from '@rneui/base';
import { Formik } from 'formik';
import { userHealthValidationSchema, userInfoValidationSchema } from '../utils/validation';
import { createUser } from '../utils/api/user.api';
import { bloodData, booleanData, dietData, frequencyData, sexData } from '../utils/constants';
import { calculateAge, countBMI } from '../utils/functions';

export default function SelfInputForm({ route, navigation }) {

    const today = new Date()
    const endDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
    const [openModal, setOpenModal] = useState(false)

    const handleOnPress = () => {
        setOpenModal(!openModal)
    }

    const onPressDone = async (newData) => {
        const temp = {
            "info": {
                "dob": newData.dob,
                "firstName": newData.firstName,
                "lastName": newData.lastName,
                "img": null,
            },
            "health": {
                "alcoholConsumption": parseInt(newData.alcoholConsumption) ,
                "bloodPressure": parseInt(newData.bloodPressure) ? true : false,
                "bloodType": newData.bloodType,
                "cholesterol": parseInt(newData.cholesterol) ? true : false,
                "diet": newData.diet,
                "insulin": parseInt(newData.insulin) ? true : false,
                "sex": newData.sex,
                "smokingStatus": parseInt(newData.smokingStatus),
                "height": parseFloat(newData.height),
                "weight": parseFloat(newData.weight)
            }
         }
        sendData(temp)
    }

    const sendData = async (newData) => {
        // console.log("NEW DATA:::",newData)
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
                    initialValues={{ 
                        firstName:'', 
                        lastName:'', 
                        dob:endDate, 
                        insulin:'',
                        cholesterol:'', 
                        diet:'', 
                        smokingStatus:'', 
                        alcoholConsumption:'', 
                        bloodPressure:'', 
                        sex:'', 
                        height:'', 
                        weight:'', 
                        bloodType:''}}
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
                        {InputTextField('First Name', values.firstName, handleChange('firstName'), (errors.firstName && touched.firstName) ? errors.firstName : '', handleBlur('firstName'))}

                        {InputTextField('Last Name', values.lastName, handleChange('lastName'), (errors.lastName && touched.lastName) ? errors.lastName : '', handleBlur('lastName'))}

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
                            (val) => touched.diet = val, 
                            (errors.diet && touched.diet) ? errors.diet : '')}
                     
                        {DropDownField(
                            "Smoking Status", 
                            values.smokingStatus, 
                            frequencyData, 
                            handleChange('smokingStatus'),  
                            (val) => touched.smokingStatus = val, 
                            (errors.smokingStatus && touched.smokingStatus) ? errors.smokingStatus : '')}

                        {DropDownField(
                            "Alcohol Consumption", 
                            values.alcoholConsumption, 
                            frequencyData, 
                            handleChange('alcoholConsumption'),  
                            (val) => touched.alcoholConsumption = val, 
                            (errors.alcoholConsumption && touched.alcoholConsumption) ? errors.alcoholConsumption : '')}

                        {DropDownField(
                            "Blood Pressure", 
                            values.bloodPressure, 
                            booleanData, 
                            handleChange('bloodPressure'),  
                            (val) => touched.bloodPressure = val, 
                            (errors.bloodPressure && touched.bloodPressure) ? errors.bloodPressure : '')}

                        {DropDownField(
                            "Insulin", 
                            values.insulin, 
                            booleanData, 
                            handleChange('insulin'),  
                            (val) => touched.insulin = val, 
                            (errors.insulin && touched.insulin) ? errors.insulin : '')}

                        {DropDownField(
                            "Cholesterol", 
                            values.cholesterol, 
                            booleanData, 
                            handleChange('cholesterol'),  
                            (val) => touched.cholesterol = val, 
                            (errors.cholesterol && touched.cholesterol) ? errors.cholesterol : '')}

                        {DropDownField(
                            "Sex", 
                            values.sex, 
                            sexData, 
                            handleChange('sex'),  
                            (val) => touched.sex = val, 
                            (errors.sex && touched.sex) ? errors.sex : '')}

                        {DropDownField(
                            "Blood Type", 
                            values.bloodType, 
                            bloodData, 
                            handleChange('bloodType'),  
                            (val) => touched.bloodType = val, 
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
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
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