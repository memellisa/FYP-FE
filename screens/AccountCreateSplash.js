import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from '../config';

const AccountCreateSplash = ({ route, navigation }) => {
    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                <Text style={styles.heading}>You have successfully created an account! Redirecting to the next screen</Text>
                
            </View>
        </SafeAreaProvider>
    
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        // paddingHorizontal: 35,
        justifyContent: 'center',
        // marginTop: -65,
        flex: 1,
        backgroundColor: '#fff',
    },

    heading: {
        color: '#0F52BA',
        fontSize: 27,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 30,
        paddingHorizontal: 35,
    },

})

export default AccountCreateSplash