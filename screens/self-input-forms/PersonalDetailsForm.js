import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../components/NavigationButton';




const socioEconomicData = [
    { label: 'Rich', value: 'Rich' },
    { label: 'Upper Middle Class', value: 'Upper Middle Class' },
    { label: 'Lower Middle Class', value: 'Lower Middle Class' },
    { label: 'Poor', value: 'Poor' },
];



export default function PersonalDetailsForm({ route, navigation }) {
    // const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [email, setEmail] = useState('') // probably get data from sign up somehow, and set to cannot be changed
    const [phoneNumber, setPhoneNumber] = useState('')
    const [formData, setFormData] = useState('')

    // const [socioEconomicStatus, setSocioEconomicStatus] = useState('')

    const onPress = () => {
        // console.log(formData)
        navigation.navigate("Health Form", { data: formData })
    }

    useEffect(() => {
        setFormData( {
            'personal-data':{
                'first_name': firstName,
                'last_name': lastName,
                'dob':  dateOfBirth,
                'email': email,
                'phone_number': phoneNumber,
        }})
        // console.log(formData)
    }, [firstName,lastName, dateOfBirth, email, phoneNumber])
    

    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Next" onPressHandler={onPress}/> 
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

                    {renderText('E-mail', email, setEmail)}
               
                    <View style={styles.optionView}>
                        <Text style={styles.optionText}>Phone Number</Text>
                        <TextInput style={styles.valueText} value={phoneNumber}  onChangeText={setPhoneNumber} multiline={true} keyboardType='phone-pad'/>
                    </View>
                
                
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