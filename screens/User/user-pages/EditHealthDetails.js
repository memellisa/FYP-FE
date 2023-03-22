import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserHealth } from '../../../utils/api/user.api';
import InputTextField from '../../../components/InputTextField';
import DropDownField from '../../../components/DropdownField';


const dietData = [
    { label: 'No Restrictions', value: 'Normal' },
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

const countBMI = (height, weight) => (weight/(height*height*0.0001)).toFixed(2)

const sexData = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
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

const frequencyData = [
    { label: 'Never', value: 0 },
    { label: 'Previous', value: 1 },
    { label: 'Seldom', value: 2 },
    { label: 'Frequent', value: 3 },
];


const booleanData = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export default function EditHealthDetails({ route, navigation }) {
    const data = route.params.data
    console.log("DATA PARAMS HEALTH::",data)

    const [insulin, setInsulin] = useState('')
    const [cholesterol, setCholesterol] = useState('')
    const [sex, setSex] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBMI] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [diet, setDiet] = useState('')
    const [smokingStatus, setSmokingStatus] = useState('')
    const [alcoholConsumption, setAlcoholConsumption] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    // const [medications, setMedications] = useState(null)
    const [done, setDone] = useState(null)

    
    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={() => setDone(true)}/> 

        });
        setInsulin(data.insulin)
        setCholesterol(data.cholesterol)
        setSex(data.sex)
        setHeight(data.height)
        setWeight(data.weight)
        setBMI(countBMI(data.height, data.weight).toString())
        setBloodType(data.bloodType)
        setDiet(data.diet)
        setSmokingStatus(data.smokingStatus)
        setAlcoholConsumption(data.alcoholConsumption)
        setBloodPressure(data.bloodPressure)
    }, [])

    
    const onPress = async (newData) => {
        // const tempppp = {
        //     "insulin": insulin,
        //     "cholesterol": cholesterol,
        //     "diet": diet,
        //     "smokingStatus": smokingStatus,
        //     "alcoholConsumption": alcoholConsumption,
        //     "bloodPressure": bloodPressure,
        //     "sex": sex,
        //     "height": 190,
        //     "weight": 86,
        //     "bloodType": bloodType
        // }
        // console.log("NEW DATA:::",newData)
        const result = await putUserHealth(newData)
        // console.log("EDIT HEALTH:::",result)
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
        setBMI(countBMI(height, weight))
    }, [height, weight])

    useEffect(() => {
        if (done) {
            onPress({
                "insulin": insulin,
                "cholesterol": cholesterol,
                "diet": diet,
                "smokingStatus": smokingStatus,
                "alcoholConsumption": alcoholConsumption,
                "bloodPressure": bloodPressure,
                "sex": sex,
                "height": parseInt(height),
                "weight": parseInt(weight),
                "bloodType": bloodType
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

                {DropDownField("Insulin", insulin, booleanData, setInsulin)}
                {DropDownField("Cholesterol", cholesterol, booleanData, setCholesterol)}

                {/* <Text style={styles.infoText}> 
                    Are you using Insulin for medical purposes?
                </Text> */}

                {DropDownField("Diet", diet, dietData, setDiet)}

                {DropDownField("Smoking Status", smokingStatus, frequencyData, setSmokingStatus)}

                {DropDownField("Alcohol Consumption", alcoholConsumption, frequencyData, setAlcoholConsumption)}

                {DropDownField("Blood Pressure", bloodPressure, booleanData, setBloodPressure)}

                {DropDownField("Sex", sex, sexData, setSex)}
                {DropDownField("Blood Type", bloodType, bloodData, setBloodType)}

                {InputTextField('Height (cm)', height, setHeight)}

                {InputTextField('Weight (kg)', weight, setWeight)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>BMI</Text>
                    <Text style={styles.valueText}>{(height && weight && isFinite(bmi)) ? bmi : '-'}</Text>
                </View>

                <Text style={styles.infoText}> 
                    BMI is calculated from the inputted height and weight
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
    infoText: {
        color: 'grey', 
        marginHorizontal: 28, 
        marginTop: 10, 
        textAlign: 'justify'
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