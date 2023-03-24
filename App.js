import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerRootComponent } from 'expo';

import Main from './screens/Main';
import Profile from './screens/User/Profile';
import { useFonts } from 'expo-font';
import Login from './screens/Login';
import Signup from './screens/Signup';
import EditPersonalDetails from './screens/User/user-pages/EditPersonalDetails';
import EditHealthDetails from './screens/User/user-pages/EditHealthDetails';
import ManageWearable from './screens/Wearable/ManageWearable';
import ConfirmAuth from './screens/Wearable/ConfirmAuth';
import SuccessSplash from './screens/Wearable/SuccessSplash';
import { View } from 'react-native';
import SelfInputForm from './screens/SelfInputForm';
import AccountCreateSplash from './screens/AccountCreateSplash';

const dummydata = {
  first_name : "John",
  last_name : "Doe",
  dob: "1/1/2000",
  username: "johndoe"
}
const Stack = createNativeStackNavigator();
 
export default RootNavigator = () => {
    const loggedIn = false // implementation to be changed later 
    //MAYBE ADD onAuthStateChange here and passed down loggedIn variable to all the screen ??

    const [fontsLoaded] = useFonts({
      'Lato': require('./assets/fonts/Lato/Lato-Black.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
      'Quicksand': require('./assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf'),
      'SourceSansPro': require('./assets/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf'),
    });

    if (!fontsLoaded) {
      return null;
    }
    return (
      <SafeAreaProvider>
        <NavigationContainer> 
          <Stack.Navigator screenOptions={{ animation: 'none'}} >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={Main} options={{ 
              header: () =>
              (<View style={{ height: 35 }}/>)
            }} 
            />
            <Stack.Screen name="Profile" component={Profile} options={{headerBackTitle: ''}} />
            
            <Stack.Screen name="Edit Personal Details" component={EditPersonalDetails}/>
            <Stack.Screen name="Edit Health Details" component={EditHealthDetails}/>

            <Stack.Screen name="Manage Wearable" component={ManageWearable} options={{headerBackTitle: ''}} />
            <Stack.Screen name="Confirm Auth" component={ConfirmAuth} options={{headerBackTitle: '', title: '' }} />
            <Stack.Screen name="Success Splash" component={SuccessSplash} options={{ headerShown: false }} />
            <Stack.Screen name="Create Account Splash" component={AccountCreateSplash} options={{ headerShown: false }} />

            <Stack.Screen name="Self Input Form" component={SelfInputForm} options={{ 
              gestureEnabled: false,
              header: () =>
              (<View style={{ height: 55 }}/>)
            }} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
};
