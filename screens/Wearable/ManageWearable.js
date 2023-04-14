// import { TouchableHighlight, Divider } from '@rneui/base'
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function ManageWearable({ route, navigation }) {
    useEffect(() => {
        if (route.params?.hideBackButton) {
            navigation.setOptions({ header: () => (<View style={{ height: 55 }}/>) })
        }

    }, [route, navigation])
    
      
    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >

                <Text style={styles.heading}>Which wearable would you like to connect to?</Text>
                
                <TouchableHighlight  underlayColor="#f3f6f4" style={styles.button} onPress={() => navigation.push("Confirm Auth")}>
                        <Text style={styles.text}>Fitbit</Text>
                </TouchableHighlight>

                <Text style={styles.subtitle}>
                    We keep on improving our application and will add more compatible wearables in the future
                </Text>

                
            </View>
        </SafeAreaProvider>
    
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    optionView: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        width: '40%'
    },

    dropdown: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        paddingRight: 5,
        flex:1
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: '45%',
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    heading: {
        color: '#0F52BA',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 30,
        paddingHorizontal: 35,
    },

    button: {
        marginVertical: 10,
        width: '60%',
        height: '8%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#c4c4c4',

    },

    text: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    subtitle: {
        color: 'grey',
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: '15%'
    },

})