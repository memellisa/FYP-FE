import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserHealth } from '../../../utils/api/user.api';
import InputTextField from '../../../components/InputTextField';
import DropDownField from '../../../components/DropdownField';
import { Formik } from 'formik';
import { userHealthValidationSchema } from '../../../utils/validation';
import { bloodData, booleanData, dietData, formInfoMsgs, frequencyData, sexData } from '../../../utils/constants';
import { countBMI } from '../../../utils/functions';
import { Icon } from '@rneui/base';
import InfoOverlay from '../../../components/InfoOverlay';
import { useState } from 'react';


export default function EditHealthDetails({ route, navigation }) {
    const data = route.params.data
    const [infoVisible, setInfoVisible] = useState(false);
    const [infoMsg, setInfoMsg] = useState(false);

    const onPress = async (newData) => {
        // const tempppp = {
        //     "insulin": insulin,
        //     "cholesterol": cholesterol,
        //     "diet": diet,
        //     "smokingStatus": smokingStatus,
        //     "alcoholConsumption": alcoholConsumption,
        //     "bloodPressure": bloodPressure,
        //     "sex": sex,
        //     "height": 190,
        //     "weight": 86,
        //     "bloodType": bloodType
        // }
        // console.log("NEW DATA:::",newData)
        const result = await putUserHealth({
            "alcoholConsumption": parseInt(newData.alcoholConsumption) ,
            "bloodPressure": parseInt(newData.bloodPressure) ? true : false,
            "bloodType": newData.bloodType,
            "cholesterol": parseInt(newData.cholesterol) ? true : false,
            "diet": newData.diet,
            "height": parseFloat(newData.height),
            "insulin": parseInt(newData.insulin) ? true : false,
            "sex": newData.sex,
            "smokingStatus": parseInt(newData.smokingStatus),
            "weight": parseFloat(newData.weight)
        })
        console.log("EDIT HEALTH:::",result)
        if (!result.error){
            // console.log('EDItted USERR', JSON.stringify(result.data))
            navigation.navigate("Profile", { update: true })
        } else {
            // console.log(result.error)
            Alert.alert('Something went wrong. Please try again')
        }
    }

    const toggleOverlay = () => {
        setInfoVisible(!infoVisible);
      };

    const onIconPress = (msg) => {
        setInfoMsg(msg)
        toggleOverlay()
    }

    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
                keyboardDismissMode="interactive"
                automaticallyAdjustKeyboardInsets={true}
            >

            <Formik
                validateOnMount={true}
                validationSchema={userHealthValidationSchema}
                initialValues={{ 
                    insulin: data.insulin ? '1' : '0', 
                    cholesterol: data.cholesterol ? '1' : '0', 
                    diet: data.diet, 
                    smokingStatus: data.smokingStatus.toString(), 
                    alcoholConsumption: data.alcoholConsumption.toString(), 
                    bloodPressure: data.bloodPressure ? '1' : '0', 
                    sex: data.sex, 
                    height: data.height,
                    weight: data.weight, 
                    bloodType: data.bloodType}}
                onSubmit={values => onPress(values)}
                >
                    {({ handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid, }) => (
                    <>
                    {InfoOverlay(infoVisible, toggleOverlay, infoMsg)}
                        {
                            isValid ? navigation.setOptions({ 
                                        headerBackTitle: '', 
                                        headerRight: () => <NavigationButton buttonName="Done" onPressHandler={handleSubmit}/>}) 
                                    : navigation.setOptions({ headerBackTitle: '',  headerRight: null })
                        }

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
                            values.alcoholConsumption, 
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
                            (errors.bloodPressure && touched.bloodPressure) ? errors.bloodPressure : '',
                            () => onIconPress(formInfoMsgs.medication))}

                        {DropDownField(
                            "Insulin", 
                            values.insulin, 
                            booleanData, 
                            handleChange('insulin'),  
                            () => touched.insulin = true, 
                            (errors.insulin && touched.insulin) ? errors.insulin : '',
                            () => onIconPress(formInfoMsgs.medication))}

                        {DropDownField(
                            "Cholesterol", 
                            values.cholesterol, 
                            booleanData, 
                            handleChange('cholesterol'),  
                            () => touched.cholesterol = true, 
                            (errors.cholesterol && touched.cholesterol) ? errors.cholesterol : '',
                            () => onIconPress(formInfoMsgs.medication))}

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

                        {InputTextField(
                            'Height (cm)', 
                            values.height, 
                            handleChange('height'), 
                            (errors.height && touched.height) ? errors.height : '', 
                            handleBlur('height'))}

                        {InputTextField(
                            'Weight (kg)', 
                            values.weight, 
                            handleChange('weight'), 
                            (errors.weight && touched.weight) ? errors.weight : '', 
                            handleBlur('weight'))}

                        <View style={styles.optionView}>
                            <View style={styles.inputTitleView}>
                                <Icon name="help" color="#0F52BA" size='18' onPress={() => onIconPress(formInfoMsgs.bmi)}/>
                                <Text style={styles.optionText}>BMI</Text>
                            </View>
                            <Text style={styles.valueText}>{(values.height && values.weight && isFinite(countBMI(values.height, values.weight))) ? countBMI(values.height, values.weight) : '-'}</Text>
                        </View>

                        <View style={{marginBottom: 50}}/>
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
        marginHorizontal: 20,
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
    infoText: {
        color: 'grey', 
        marginHorizontal: 28, 
        marginTop: 10, 
        textAlign: 'justify'
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 190,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    inputTitleView: {
        width: 140, 
        flexDirection: 'row',
        alignItems: 'center',
    },

})