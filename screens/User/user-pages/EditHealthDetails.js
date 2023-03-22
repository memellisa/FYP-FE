import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';
import { putUserHealth } from '../../../utils/api/user.api';


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

const booleanData = [
    { label: 'True', value: 'True' },
    { label: 'False', value: 'False' },
];

const countBMI = (height, weight) => weight/(height*height)

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

export default function EditHealthDetails({ route, navigation }) {
    const data = route.params.data

    const [insulin, setInsulin] = useState(data.insulin)
    const [cholesterol, setCholesterol] = useState(data.cholesterol)
    const [sex, setSex] = useState(data.sex)
    const [height, setHeight] = useState(data.height)
    const [weight, setWeight] = useState(data.weight)
    const [bmi, setBMI] = useState(data.bmi.toString())
    const [bloodType, setBloodType] = useState(data.bloodType)
    const [diet, setDiet] = useState(data.diet)
    const [smokingStatus, setSmokingStatus] = useState(data.smokingStatus)
    const [alcoholConsumption, setAlcoholConsumption] = useState(data.alcoholConsumption.toString())
    const [bloodPressure, setBloodPressure] = useState(data.bloodPressure)
    const [medications, setMedications] = useState(data.medications)
    

    
    const onPress = async (newData) => {
        // const tempppp = {
        //     "firstName": "Jane",
        //     "lastName":"Doe",
        //     "dob": "2001/03/04",
        //     "email": "fyp@hku.hk",
        //     "img": "test"
        // }
        // console.log("NEW DATA:::",newData)
        const result = await putUserHealth(newData)
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
    }, [])

    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            headerRight: () => <NavigationButton buttonName="Done" onPressHandler={onPress}/> 

        });
    }, [])


    const DropDownField = (text, value, data, setOnChange) => {
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

    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                {DropDownField("Diet", diet, dietData, setDiet)}

                {DropDownField("Smoking Status", smokingStatus, smokingData, setSmokingStatus)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Alcohol Consumption/L</Text>
                    <TextInput style={styles.valueText} onChangeText={setAlcoholConsumption} value={alcoholConsumption} keyboardType='decimal-pad'/>
                </View>

                {DropDownField("Blood Pressure", bloodPressure, bloodPressureData, setBloodPressure)}


                {DropDownField("Sex", sex, sexData, setSex)}
                {DropDownField("Blood Type", bloodType, bloodData, setBloodType)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Height (m)</Text>
                    <TextInput style={styles.valueText} onChangeText={setHeight} value={height} keyboardType='decimal-pad'/>
                </View>

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Weight (kg)</Text>
                    <TextInput style={styles.valueText} onChangeText={setWeight} value={weight} keyboardType='decimal-pad'/>
                </View>


                <View style={styles.optionView}>
                    <Text style={styles.optionText}>BMI**</Text>
                    <Text style={styles.valueText}>{(height && weight && isFinite(bmi)) ? bmi : '-'}</Text>
                </View>

                <Text style={styles.infoText}> 
                    **BMI is calculated from the inputted height and weight
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

})