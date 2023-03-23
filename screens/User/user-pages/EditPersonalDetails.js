import { Button, Divider } from '@rneui/base'
import { Image, Alert, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserInfo } from '../../../utils/api/user.api';
import DatePickerField from '../../../components/DatePickerField';
import InputTextField from '../../../components/InputTextField';
import { Formik } from 'formik';
import { userInfoValidationSchema } from '../../../utils/validation';


export default function EditPersonalDetails({ route, navigation }) {
    const data = route.params.data
    const [openModal, setOpenModal] = useState(false)

    const calculateAge = (birthday) => {
        const today = new Date()
        const birthDate = new Date(birthday);
        var tempAge = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            tempAge--
        }
        return tempAge
    }

    const handleOnPress = () => {
        setOpenModal(!openModal)
    }

    const onPress = async (newData) => {
        // const tempppp = {
        //     "firstName": "Jane",
        //     "lastName":"Doe",
        //     "dob": "2001/03/04",
        //     "email": "fyp@hku.hk",
        //     "img": "test"
        // }
        // console.log("NEW DATA:::",newData)
        const result = await putUserInfo({...newData, "img": data.img})
        console.log(result)
        if (!result.error){
            try {
                // console.log('EDItted USERR', JSON.stringify(result.data))
                navigation.navigate("Profile", { update: true })
            } catch (e) {
                Alert.alert('Something went wrong. Please try again')
            }
        } else {
            // console.log(result.error)
            Alert.alert('Something went wrong. Please try again')
        }
    }


    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                <Formik
                    validateOnMount={true}
                    validationSchema={userInfoValidationSchema}
                    initialValues={{ firstName: data.firstName, lastName: data.lastName, dob: data.dob}}
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
                        {isValid ? navigation.setOptions({ 
                            headerBackTitle: '', 
                            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={handleSubmit}/>}) : 
                            navigation.setOptions({ headerBackTitle: '',  headerRight: null })
                        }

                        {InputTextField('First Name', values.firstName, handleChange('firstName'), (errors.firstName && touched.firstName) ? errors.firstName : '', handleBlur('firstName'))}

                        {InputTextField('Last Name', values.lastName, handleChange('lastName'), (errors.lastName && touched.lastName) ? errors.lastName : '', handleBlur('lastName'))}

                        {DatePickerField('Date of Birth', openModal, handleOnPress, values.dob, handleChange('dob'))}

                        <View style={styles.optionView}>
                            <Text style={styles.optionText}>Age</Text>
                            <Text style={styles.valueText}>{ !isNaN(values.dob) || !isNaN(calculateAge(values.dob)) ? calculateAge(values.dob) : '-'}</Text>
                        </View>
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

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

})