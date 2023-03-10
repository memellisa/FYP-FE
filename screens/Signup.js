import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/base';

import { Formik } from 'formik'
import { signupValidationSchema } from '../utils/validation';

export default function Signup({navigation}) {
  return (
    <View style={styles.container}>
      <Formik
            validateOnMount={true}
            validationSchema={signupValidationSchema}
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            // onSubmit={values => navigation.navigate("Personal Form", {data: values})}
            onSubmit={values => navigation.navigate("Self Input Form", {data: values})}
          >
            {({ handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid, }) => (
              <>
                <View style={styles.inputView} >
                  <Input  value={values.email} 
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
                  // onPress={() => navigation.replace("Personal Form")}
                  onPress={handleSubmit}
                  disabled={!isValid || values.email === ''}
                />
                <Button 
                  title="Have an account? Login instead!" 
                  buttonStyle={styles.button} 
                  onPress={() => navigation.navigate('Login')}
                />
              </>
            )}
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
    width: 300,
    borderRadius: 5,
  }
});

