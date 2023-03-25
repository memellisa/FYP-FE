import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserInfo } from '../../../utils/api/user.api';
import DatePickerField from '../../../components/DatePickerField';
import InputTextField from '../../../components/InputTextField';
import { Formik } from 'formik';
import { userInfoValidationSchema } from '../../../utils/validation';
import { calculateAge } from '../../../utils/functions';
import { Icon } from '@rneui/base';
import { formInfoMsgs } from '../../../utils/constants';
import InfoOverlay from '../../../components/InfoOverlay';


export default function EditPersonalDetails({ route, navigation }) {
    const data = route.params.data
    const [openModal, setOpenModal] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false);
    const [infoMsg, setInfoMsg] = useState(false);

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
            >
                <Formik
                    validateOnMount={true}
                    validationSchema={userInfoValidationSchema}
                    initialValues={{ 
                        firstName: data.firstName, 
                        lastName: data.lastName, 
                        dob: data.dob}}
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

                        {InputTextField('First Name', values.firstName, handleChange('firstName'), (errors.firstName && touched.firstName) ? errors.firstName : '', handleBlur('firstName'))}

                        {InputTextField('Last Name', values.lastName, handleChange('lastName'), (errors.lastName && touched.lastName) ? errors.lastName : '', handleBlur('lastName'))}

                        {DatePickerField('Date of Birth', openModal, handleOnPress, values.dob, handleChange('dob'))}

                        <View style={styles.optionView}>
                            <View style={styles.inputTitleView}>
                                <Icon name="help" color="#0F52BA" size='18' onPress={() => onIconPress(formInfoMsgs.age)}/>
                                <Text style={styles.fieldText}>Age</Text>
                            </View>
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
        marginHorizontal: 20,
        alignItems: 'center'
    },

    fieldText: {
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

    inputTitleView: {
        width: 140, 
        flexDirection: 'row',
        alignItems: 'center',
    },

})