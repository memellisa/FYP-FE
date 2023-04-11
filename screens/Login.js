import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input } from '@rneui/base';

import { signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../config';


import { Formik } from 'formik'
import { loginValidationSchema } from '../utils/validation';

export default function Login({navigation}) {
  const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(false)
        unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(true)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log("LOGGED IN")
                setTimeout(() => {
                  // should show the Connected Manage Wearable page instead later
                  // navigation.navigate("Profile");
                  setLoading(false)
                  navigation.navigate("Main");
                }, 2000);
                // ...
            } else {
                console.log("LOGGED OUT")
                navigation.navigate("Login")
            }
        });
    }, []);
    

    const login = (values) => {
        setLoading(true)
        if (values.email === '' || values.password === '') {
            Alert.alert('Email or password is required')
        }
        else {
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in and will trigger onAuthStateChanged
                
            })
            .catch((error) => {
                // Log the error
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode)
                // console.log(errorMessage)
                if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                    Alert.alert('Email or password is incorrect')
                } else {
                    Alert.alert('Something went wrong')
                }
            });
            setLoading(false);
        }
    }
  

    return (
        <View style={styles.container}>
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => login(values)}
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

                    <Input 
                      value={values.email} 
                      onChangeText={handleChange('email')}  
                      onBlur={handleBlur('email')} 
                      keyboardType="email-address" 
                      placeholder='Email' 
                      style={styles.input} 
                      inputContainerStyle={{borderBottomWidth: 0}}
                      errorMessage={(errors.email && touched.email) ? errors.email : ''}
                    />
                    <Input 
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password} 
                      placeholder='Password' 
                      style={styles.input} 
                      secureTextEntry={true} 
                      inputContainerStyle={{borderBottomWidth: 0}}
                      errorMessage={(errors.password && touched.password) ? errors.password : ''}
                    />
                    
                </View>
            
                <Button title="Login" buttonStyle={styles.button} 
                    // onPress={() => navigation.replace("Main")}
                    // onPress={() => {onLogin()}}
                    // onPress={() => login()}
                    loading={loading}
                    onPress={handleSubmit}
                    disabled={!isValid || values.email === ''}
                />
                <Button 
                    title="Don't have an account? Signup today!" 
                    buttonStyle={styles.button} 
                    onPress={() => {
                      // unsubscribe()
                      navigation.navigate('Signup')
                    }}
                />

                
              </>
            )}
          </Formik>
          <StatusBar style="auto" />
          {/* { loading && <LoadingAnimation/> } */}
        </View>
    )
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
    // padding: 0,
    // margin: 0
    // justifyContent: 'center',
  },

  input: {
    borderWidth: 0.2,
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 5
  },

  button: {
    margin: 10,
    width: '90%',
    borderRadius: 5,
  },

  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontSize: 12,
    color: 'red',
  },
});

