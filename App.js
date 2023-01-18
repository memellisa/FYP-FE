import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './screens/login';
import Signup from './screens/signup';
import Main from './screens/Main';
import Home from './screens/Home';
import Risk from './screens/Risk';
import User from './screens/User';
import Genetics from './screens/Genetics';
import Community from './screens/Community';
import UserDetails from './screens/user-pages/UserHealthDetails';
import GeneticsData from './screens/user-pages/GeneticsData';
// import BotNavbar from './components/BotNavbar';
import { useFonts } from 'expo-font';

 
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
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Risk" component={Risk} options={{ headerShown: false }} />
            <Stack.Screen name="Genetics" component={Genetics} options={{ headerShown: false }} />
            <Stack.Screen name="Community" component={Community} options={{ headerShown: false }} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="User & Health Details" component={UserDetails} />
            <Stack.Screen name="Genetics Data" component={GeneticsData} />
          </Stack.Navigator>
          {/* <BotNavbar /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
};
