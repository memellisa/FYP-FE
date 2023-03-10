import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../components/NavigationButton';
import DateTimePicker from '@react-native-community/datetimepicker';



const countBMI = (height, weight) => weight/(height*height)

const dietData = [
    { label: 'No Restrictions', value: 'No Restrictions' },
    { label: 'Keto', value: 'Keto' },
    { label: 'Paleo', value: 'Paleo' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Mediterranean', value: 'Mediterranean' },
    { label: 'Low Carb', value: 'Low Carb' },
    { label: 'No Sugar', value: 'No Sugar' },
];

const smokingData = [
    { label: 'Never', value: 'Never' },
    { label: 'Heavy', value: 'Heavy' },
    { label: 'Light', value: 'Light' },
];

const bloodPressureData = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Elevated', value: 'Elevated' },
    { label: 'HBP Stage 1', value: 'HBP Stage 1' },
    { label: 'HBP Stage 2', value: 'HBP Stage 2' },
    { label: 'HBP Stage 3', value: 'HBP Stage 3' },
];

const sexData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

const bloodData = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
]


export default function SelfInputForm({ route, navigation }) {
    // const otherData = route.params.data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [email, setEmail] = useState('') // probably get data from sign up somehow, and set to cannot be changed
    const [phoneNumber, setPhoneNumber] = useState('')
    const [diet, setDiet] = useState('')
    const [smokingStatus, setSmokingStatus] = useState('')
    const [alcoholConsumption, setAlcoholConsumption] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [sex, setSex] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBMI] = useState('')
    const [formData, setFormData] = useState('')
    
    const sourceDate = sourceMoment.local().toDate();
  const [date, setDate] = useState(sourceDate);

    const onPress = () => {
        console.log('ALL DATA',formData)
        // send data to db
        navigation.navigate("Main")
    }

    useEffect(() => {
        setFormData( {
            'personal-data':{
                'first_name': firstName,
                'last_name': lastName,
                'dob':  dateOfBirth,
            },
            'health-data': {
                'diet': diet,
                'smoking_status': smokingStatus,
                'alcohol-consumption': alcoholConsumption,
                'blood-pressure': bloodPressure,
                'sex': sex,
                'blood-type': bloodType,
                'age': age,
                'height': height,
                'weight': weight,
                'bmi': bmi
            }
        })
    }, [sex,bloodType, age, weight, height, bmi])

    useEffect(() => {
        // console.log("DATA FROM PREV PAGE",otherData)
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={onPress}/> 
        });
    }, [])

    const renderDropDown = (text, value, data, setOnChange) => {
        return(
        <View style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
            <Dropdown 
                style={styles.dropdown}
                itemTextStyle={styles.itemStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={value}
                onChange={item => {
                    setOnChange(item.value);
                }}
            />
        </View>)
    }


    const renderText = (text, value, onChangeText) => {
        return (
        <View style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
            <TextInput style={styles.valueText} value={value} onChangeText={onChangeText} multiline={true}/>
        </View>
    )}

    const onChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
          setShow(false);
        }
        if (event.type === 'dismissed') {
          Alert.alert(
            'picker was dismissed',
            undefined,
            [
              {
                text: 'great',
              },
            ],
            {cancelable: true},
          );
          return;
        }
    
        if (event.type === 'neutralButtonPressed') {
          setDate(new Date(0));
        } else {
          setDate(selectedDate);
        }
      };
    
    const renderDatePicker = (text, value, onChangeText) => {
        return (
        <View style={styles.optionView}>
            <Text style={styles.optionText}>{text}</Text>
            <DateTimePicker
                  testID="dateTimePicker"
                //   timeZoneOffsetInMinutes={tzOffsetInMinutes}
                //   minuteInterval={interval}
                //   maximumDate={maximumDate}
                //   minimumDate={minimumDate}
                  value={date}
                  mode={mode}
                //   is24Hour
                //   display={display}
                  onChange={onChange}
                //   textColor={textColor || undefined}
                //   accentColor={accentColor || undefined}
                //   neutralButton={{label: neutralButtonLabel}}
                //   negativeButton={{label: 'Cancel', textColor: 'red'}}
                //   disabled={disabled}
                />
        </View>
    )}

    return (
        <SafeAreaProvider>
            <ScrollView
                    style={styles.screenContainer}
                    hasSafeArea={false}
                    keyboardDismissMode="interactive"
                    automaticallyAdjustKeyboardInsets={true}
                >
                
                <Text style={styles.title}> 
                    Please fill in the fields below to allow us to better understand you
                </Text>
                

                {renderText('First Name', firstName, setFirstName)}

                {renderText('Last Name', lastName, setLastName)}

                {renderDatePicker('Date of Birth', dateOfBirth, setDateOfBirth)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Age</Text>
                    <TextInput style={styles.valueText} onChangeText={setAge} value={age} keyboardType='number-pad'/>
                </View>

                {/* {renderText('E-mail', email, setEmail)} */}

                {/* <View style={styles.optionView}>
                    <Text style={styles.optionText}>Phone Number</Text>
                    <TextInput style={styles.valueText} value={phoneNumber}  onChangeText={setPhoneNumber} multiline={true} keyboardType='phone-pad'/>
                </View> */}
                {renderDropDown("Diet", diet, dietData, setDiet)}

                {renderDropDown("Smoking Status", smokingStatus, smokingData, setSmokingStatus)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Alcohol Consumption/L</Text>
                    <TextInput style={styles.valueText} onChangeText={setAlcoholConsumption} value={alcoholConsumption} keyboardType='decimal-pad'/>
                </View>

                {renderDropDown("Blood Pressure", bloodPressure, bloodPressureData, setBloodPressure)}
                

                {renderDropDown("Sex", sex, sexData, setSex)}

                {renderText('Height (m)', height, (val) => {
                    setHeight(val)
                    setBMI(countBMI(val, weight).toFixed(2))}
                )}

                {renderText('Weight (kg)', weight, (val) => {
                    setWeight(val)
                    setBMI(countBMI(height, val).toFixed(2))}
                )}

                {renderDropDown("Blood Type", bloodType, bloodData, setBloodType)}
            
                <View style={styles.optionView}>
                    <Text style={styles.optionText}>BMI</Text>
                    <Text style={styles.valueText}>{bmi}</Text>
                </View>
                <Text style={styles.infoText}> 
                    BMI is calculated from the inputted height and weight above, make sure that the data inputted above is correct so that your BMI measurement is also accurate
                </Text>
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

    infoText: {
        color: 'grey', 
        marginHorizontal: 28, 
        marginTop: 10, 
        marginBottom: 60, 
        textAlign: 'justify'
    },
    title: {
        fontSize: 19, 
        fontFamily: "Poppins-Bold", 
        color: '#0F52BA',
        alignSelf: 'center',
        textAlign:'center',
        paddingTop: 10,
        paddingHorizontal: 30
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
})