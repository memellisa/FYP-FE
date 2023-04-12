import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Formik } from 'formik';
import { auth } from "../../config";
import { updatePassword, signOut, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { changePasswordValidationScheme } from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationButton from "../../components/NavigationButton";

const ChangePassword = ({navigation}) => {
    const changePassword = (values) => {
        if (values.password === '' || values.newPassword === '') {
            Alert.alert('Email or password is required')
        }
        else {
            const user = auth.currentUser;
            var credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                values.password
            );
            reauthenticateWithCredential(user, credential).then(() => {
                // User re-authenticated.
                updatePassword(user, values.newPassword).then(() => {
                    signOut(auth)
                        .then(() => {
                            // setLoading(false)
                            AsyncStorage.clear();
                            navigation.navigate("Login"); // CAN MAYBE USE REPLACE TO DELETE PREVIOUS DATA, AFRAID THERE IS BUG
                        });
                  }).catch((error) => {
                        alert("Please try again. An error occured updating your password: " + error)
                  });
              }).catch((error) => {
                alert("Your current password is incorrect")
            });
        }
    }

    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                hasSafeArea={false}
            >
                <Formik
                    validateOnMount={true}
                    validationSchema={changePasswordValidationScheme}
                    initialValues={{ 
                        password: '',
                        newPassword:'', 
                        confirmNewPassword:''}} 
                    onSubmit={values => changePassword(values)}
                >
                    {({ handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid, }) => (
                    <>

                        {   
                            useEffect(() => {
                                navigation.setOptions({ 
                                    headerBackTitle: '', 
                                    headerRight: () => 
                                        <NavigationButton 
                                            buttonName="Done" 
                                            onPressHandler={handleSubmit}
                                            disabled={!isValid}/>}) 
                                    
                            }, [isValid])
                        }
                        
                        <View>
                            <View style={styles.inputView}>
                                <View style={styles.inputTitleView}>
                                    <Text style={styles.inputText}>Current Password</Text>
                                </View>
                                    <TextInput 
                                        style={styles.valueText} 
                                        value={values.password} 
                                        onChangeText={handleChange('password')} 
                                        onBlur={handleBlur('password')}
                                        secureTextEntry={true}
                                    />
                            </View>
                            <Text style={styles.errorText}>{(errors.password && touched.password) ? errors.password : ''}</Text>
                        </View>

                        <View>
                            <View style={styles.inputView}>
                                <View style={styles.inputTitleView}>
                                    <Text style={styles.inputText}>New Password</Text>
                                </View>
                                    <TextInput 
                                        style={styles.valueText} 
                                        value={values.newPassword} 
                                        onChangeText={handleChange('newPassword')} 
                                        onBlur={handleBlur('newPassword')}
                                        secureTextEntry={true}
                                    />
                            </View>
                            <Text style={styles.errorText}>{(errors.newPassword && touched.newPassword) ? errors.newPassword : ''}</Text>
                        </View>

                        <View>
                            <View style={styles.inputView}>
                                <View style={styles.inputTitleView}>
                                    <Text style={styles.inputText}>Confirm New Password</Text>
                                </View>
                                    <TextInput 
                                        style={styles.valueText} 
                                        value={values.confirmNewPassword} 
                                        onChangeText={handleChange('confirmNewPassword')} 
                                        onBlur={handleBlur('confirmNewPassword')}
                                        secureTextEntry={true}
                                    />
                            </View>
                            <Text style={styles.errorText}>{(errors.confirmNewPassword && touched.confirmNewPassword) ? errors.confirmNewPassword : ''}</Text>
                        </View>

                        <Text style={styles.info}> 
                            You will be logged out of the current session if the password change is successful, please login again with your new password. 
                            {"\n\n"}
                            Your password must be at least six characters. Please also ensure that you input the same password for confirmation in the confirmation field.
                        </Text>
                    </>)}
                </Formik>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    inputView: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 20,
        alignItems: 'center'
    },

    inputText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        paddingRight: 5
    },

    errorText: {
        color: 'red',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        marginLeft: '40%',
        marginBottom: 0
    },

    inputTitleView: {
        width: '35%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: '57%',
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
    },

    info: {
        color: 'grey',
        fontSize: 14,
        textAlign: 'left',
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontFamily: 'Poppins-Regular',
    },
});

export default ChangePassword;