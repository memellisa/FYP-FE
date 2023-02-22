import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const SuccessSplash = ({ route, navigation }) => {
    setTimeout(() => {
        // should show the Connected Manage Wearable page instead later
        navigation.navigate("Profile");
      }, 3000);

    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                <Text style={styles.heading}>You have successfully connected your device!</Text>
                
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

export default SuccessSplash