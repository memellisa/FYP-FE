import { Button, Divider } from '@rneui/base'
import { Image, Alert, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserInfo } from '../../../utils/api/user.api';
import DatePickerField from '../../../components/DatePickerField';
import InputTextField from '../../../components/InputTextField';


export default function EditPersonalDetails({ route, navigation }) {
    const data = route.params.data

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [age, setAge] = useState(null)
    const [done, setDone] = useState(null)

    const calculateAge = () => {
        const today = new Date()
        const birthDate = new Date(dateOfBirth);
        console.log("DATES",today, birthDate)
        var tempAge = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            tempAge--
        }
        setAge(tempAge)
    }
                            

    const handleOnPress = () => {
        setOpenModal(!openModal)
        calculateAge()
    }

    const handleChangeDOB = (propDate) => {
        setDateOfBirth(propDate)
    }
    
    const onPress = async (newData) => {
        // const tempppp = {
        //     "firstName": "Jane",
        //     "lastName":"Doe",
        //     "dob": "2001/03/04",
        //     "email": "fyp@hku.hk",
        //     "img": "test"
        // }
        // console.log("NEW DATA:::",newData)
        const result = await putUserInfo(newData)
        console.log(result)
        if (!result.error){
            try {
                // console.log('EDItted USERR', JSON.stringify(result.data))
                navigation.navigate("Profile", { update: true })
            } catch (e) {
                Alert.alert('Something went wrong. Please try again')
            }
        } else {
            // console.log(result.error)
            Alert.alert('Something went wrong. Please try again')
        }
    }
 
    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={() => setDone(true)}/> 

        });
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setDateOfBirth(data.dob)
    }, [])

    useEffect(() => {
        if (done) {
            onPress({
                "firstName": firstName,
                "lastName": lastName,
                "dob": dateOfBirth,
                "email": data.email,
                "img": data.img
            })
        }
    }, [done])


    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                {InputTextField('First Name', firstName, setFirstName)}

                {InputTextField('Last Name', lastName, setLastName)}

                {DatePickerField('Date of Birth', openModal, handleOnPress, dateOfBirth, handleChangeDOB)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Age*</Text>
                    <Text style={styles.valueText}>{age != null ? age : '-'}</Text>
                </View>
                
            </ScrollView>
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