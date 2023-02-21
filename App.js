import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Main from './screens/Main';
import Home from './screens/Home';
import Risk from './screens/Risk';
import Profile from './screens/User/Profile';
import Genetics from './screens/Genetics';
import Community from './screens/Community';
import GeneticsData from './screens/User/user-pages/GeneticsData';
// import BotNavbar from './components/BotNavbar';
import { useFonts } from 'expo-font';
import { Button, Text } from '@rneui/base';
import PersonalDetails from './screens/User/user-pages/PersonalDetails';
import DoneButton from './components/DoneButton';
import HealthDetails from './screens/User/user-pages/HealthDetails';
import ManageWearable from './screens/Wearable/ManageWearable';
import ConfirmAuth from './screens/Wearable/ConfirmAuth';
import SuccessSplash from './screens/Wearable/SuccessSplash';

const dummydata = {
  first_name : "John",
  last_name : "Doe",
  dob: "1/1/2000",
  username: "johndoe"
}
const Stack = createNativeStackNavigator();
 
export default function App() {
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
          <Stack.Navigator screenOptions={{ animation: 'none'}}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{headerBackTitle: ''}} />
            <Stack.Screen name="Personal Details" component={PersonalDetails} options={({ route, navigation }) => ({ headerBackTitle: '', headerRight: () => <DoneButton name="Profile" navigation={navigation} route={route}/> })}/>
            <Stack.Screen name="Health Details" component={HealthDetails} options={({ route, navigation }) => ({ headerBackTitle: '', headerRight: () => <DoneButton name="Profile" navigation={navigation} route={route}/>})}/>
            <Stack.Screen name="Genetics Data" component={GeneticsData} options={({ route, navigation }) => ({ headerBackTitle: '', headerRight: () => <DoneButton name="Profile" navigation={navigation} route={route}/>})}/>
            <Stack.Screen name="Manage Wearable" component={ManageWearable} options={{headerBackTitle: ''}} />
            <Stack.Screen name="Confirm Auth" component={ConfirmAuth} options={{headerBackTitle: '', title: '' }} />
            <Stack.Screen name="Success Splash" component={SuccessSplash} options={{ headerShown: false }} />
          </Stack.Navigator>
          {/* <BotNavbar /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
};
