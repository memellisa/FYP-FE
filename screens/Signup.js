import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input } from '@rneui/base';

import { Formik } from 'formik'
import { signupValidationSchema } from '../utils/validation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';

import { flaskURL } from '../utils/constants';
import axios from 'axios';

export default function Signup({navigation}) {
  const onPress = async (values) => {
    if (values.email === '' || values.password === '' || values.confirmPassword === '') {
      Alert.alert('Email or password is empty')
      return
    }
    let payload = JSON.stringify({ 'email': values.email, 'password': values.password })
    try {
        const response = await axios.post(`${flaskURL}/auth/signup`, payload,{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data == "Account successfully created") {
          // alert("Account successfully created, you wil be logged in now")
          // Login directly if successful in creating account 
          signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
              // Signed in and will trigger onAuthStateChanged
              navigation.push("Create Account Splash")
              setTimeout(() => {
                // should show the Connected Manage Wearable page instead later
                // navigation.navigate("Profile");
                navigation.navigate("Self Input Form", {data: values})
              }, 3000);


          })
          .catch((error) => {
              // Log the error
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                  Alert.alert('Email or password is incorrect')
              } else {
                  Alert.alert('Something went wrong during sign in, please sign in again')
                  navigation.replace("Login")
              }
          });
        }
        else {
          // console.log(response)
          alert("Error creating account \n Reason: " + response.data)
        }
    } catch (error) {
      alert("Error creating account \n Reason: " + error)
    } 
  }

  return (
    <View style={styles.container}>
      <Formik
            validateOnMount={true}
            validationSchema={signupValidationSchema}
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            // onSubmit={values => navigation.navigate("Personal Form", {data: values})}
            onSubmit={values => onPress(values)}
          >
            {({ handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid, }) => {
              return <>
                <View style={styles.inputView} >
                  <Input value={values.email} 
                      onChangeText={handleChange('email')}  
                      onBlur={handleBlur('email')} 
                      keyboardType="email-address" 
                      placeholder='Email' 
                      style={styles.input} 
                      inputContainerStyle={{borderBottomWidth: 0}}
                      errorMessage={(errors.email && touched.email) ? errors.email : ''}
                  />
                  <Input onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password} 
                      placeholder='Password' 
                      style={styles.input} 
                      secureTextEntry={true} 
                      inputContainerStyle={{borderBottomWidth: 0}}
                      errorMessage={(errors.password && touched.password) ? errors.password : ''}
                    />
                  <Input onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword} 
                      placeholder='Confirm Password' 
                      style={styles.input} 
                      secureTextEntry={true} 
                      inputContainerStyle={{borderBottomWidth: 0}}
                      errorMessage={(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ''}
                    />
                </View>
                
                <Button title="Signup" buttonStyle={styles.button} 
                  onPress={handleSubmit}
                  disabled={!isValid || values.email === '' || values.password === '' || values.confirmPassword === ''}
                />
                <Button 
                  title="Have an account? Login instead!" 
                  buttonStyle={styles.button} 
                  onPress={() => navigation.navigate('Login')}
                />
              </>
              }}
          </Formik>
      <StatusBar style="auto" />
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    width: 320,
    justifyContent: 'center',
  },

  input: {
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingLeft: 20,
  },


  button: {
    margin: 10,
    width: '90%',
    borderRadius: 5,
  }
});

