import { Alert, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SaveButton from '../../../components/SaveButton';
import { putUserInfo } from '../../../utils/api/user.api';
import DatePickerField from '../../../components/DatePickerField';
import InputTextField from '../../../components/InputTextField';
import { Formik } from 'formik';
import { userInfoValidationSchema } from '../../../utils/validation';
import { calculateAge } from '../../../utils/functions';
import { Icon } from '@rneui/base';
import { formInfoMsgs } from '../../../utils/constants';
import InfoOverlay from '../../../components/InfoOverlay';
import { useHeaderHeight } from '@react-navigation/elements'


export default function EditPersonalDetails({ route, navigation }) {
    const data = route.params.data
    const [openModal, setOpenModal] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false);
    const [infoMsg, setInfoMsg] = useState(false);
    const height = useHeaderHeight()

    const handleOnPress = () => {
        setOpenModal(!openModal)
    }

    const onPress = async (newData) => {
        const result = await putUserInfo({...newData, "img": data.img})

        if (!result.error){
            navigation.navigate("Profile", { update: true })
        } else {
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
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.OS === 'ios' ? height : height + 60}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.screenContainer}
                enabled>
                    <ScrollView
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
                                <InfoOverlay visible={infoVisible} toggleOverlay={toggleOverlay} message={infoMsg} />
                                
                                {
                                    useEffect(() => {
                                        navigation.setOptions({ 
                                            headerBackTitle: '', 
                                            headerRight: () => 
                                                <SaveButton 
                                                    onPressHandler={handleSubmit}
                                                    disabled={!isValid}/>}) 
                                            
                                    }, [isValid])
                            }
                                <InputTextField 
                                        text={"First Name"} 
                                        value={values.firstName} 
                                        onChangeText={handleChange('firstName')} 
                                        errorMessage={(errors.firstName && touched.firstName) ? errors.firstName : ''} 
                                        handleBlur={handleBlur('firstName')} />
                                
                                <InputTextField 
                                        text={"Last Name"} 
                                        value={values.lastName} 
                                        onChangeText={handleChange('lastName')} 
                                        errorMessage={(errors.lastName && touched.lastName) ? errors.lastName : ''} 
                                        handleBlur={handleBlur('lastName')} />

                                <DatePickerField text={"Date of Birth"} openModal={openModal} handleOnPress={handleOnPress} date={values.dob} handleChangeDate={handleChange('dob')} />

                                <View style={styles.optionView}>
                                    <Text style={styles.fieldText}>Age</Text>
                                    <Text style={styles.valueText}>{ !isNaN(values.dob) || !isNaN(calculateAge(values.dob)) ? calculateAge(values.dob) : '-'}</Text>
                                    <Icon name="help" color="#0F52BA" onPress={() => onIconPress(formInfoMsgs.age)}/>
                                </View>
                            </>)}
                        </Formik>
                    </ScrollView>
            </KeyboardAvoidingView>
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
        width: '40%'
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
        marginRight: 5,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
    },
    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    inputTitleView: {
        width: '35%',
        flexDirection: 'row',
        alignItems: 'center',
    },

})