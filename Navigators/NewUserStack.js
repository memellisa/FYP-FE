import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import GeneticsDataForm from '../screens/self-input-forms/GeneticsDataForm';
import HealthDetailsForm from '../screens/self-input-forms/HealthDetailsForm';
import PersonalDetailsForm from '../screens/self-input-forms/PersonalDetailsForm';

const Stack = createNativeStackNavigator();
 
export default function NewUserStack() {
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Black.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Quicksand': require('../assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf'),
    'SourceSansPro': require('../assets/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack.Navigator screenOptions={{ animation: 'none'}}>
      <Stack.Screen name="Personal Form" component={PersonalDetailsForm} options={{ headerTitle: 'Personal Data' }} />
      <Stack.Screen name="Health Form" component={HealthDetailsForm} options={{ headerTitle: 'Health Data' }} />
      <Stack.Screen name="Genetics Form" component={GeneticsDataForm} options={{ headerShown: 'Genetics Data' }} />
      
      
    </Stack.Navigator>
  );
};
