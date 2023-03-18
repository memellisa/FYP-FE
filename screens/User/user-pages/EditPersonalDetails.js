import { Button, Divider } from '@rneui/base'
import { Image, Alert, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserInfo } from '../../../utils/api/user.api';



export default function EditPersonalDetails({ route, navigation }) {
    const data = route.params.data
    console.log("DATA BEFORE", data)

    const [firstName, setFirstName] = useState(data.firstName)
    const [lastName, setLastName] = useState(data.lastName)
    const [dateOfBirth, setDateOfBirth] = useState(data.dob)
    const [age, setAge] = useState(null)


    const onPress = async () => {
        const newData = {
            "firstName": firstName,
            "lastName": lastName,
            "dob": dateOfBirth,
            "email": data.email,
            "img": data.img
          }
          
        console.log(newData)
        const result = await putUserInfo(newData)
        if (!result.error){
            try {
              console.log('EDItted USERR info', JSON.stringify(result.data))
            } catch (e) {
              Alert.alert('Something went wrong. Please try again')
            }
          } else {
            console.log(result.error)
              Alert.alert('Something went wrong. Please try again')
          }
        navigation.navigate("Profile", { data: route.params.data })
    }
 
    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={onPress}/> 

        });
    }, [])


    const renderText = (text, value, onChangeText) => {
        return (
        <View style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
            <TextInput style={styles.valueText} value={value} onChangeText={onChangeText} multiline={true}/>
        </View>
    )}

    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                {renderText('First Name', firstName, setFirstName)}

                {renderText('Last Name', lastName, setLastName)}

                {renderText('Date of Birth', dateOfBirth, setDateOfBirth)}
                
            </ScrollView>
        </SafeAreaProvider>
        
    
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        // alignItems: 'center',
        // marginTop: -65,
        flex: 1,
        backgroundColor: '#fff',
    },

    optionView: {
        // position: 'relative',
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 30,
        // paddingHorizontal: 20,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
        // paddingTop:5,
        fontFamily: 'Poppins-SemiBold',
        width: 140
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
        width: 190,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

})