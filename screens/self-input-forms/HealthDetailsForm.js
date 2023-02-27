import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../components/NavigationButton';


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



export default function HealthDetailsForm({ route, navigation }) {
    const otherData = route.params.data
    const [diet, setDiet] = useState('')
    const [smokingStatus, setSmokingStatus] = useState('')
    const [alcoholConsumption, setAlcoholConsumption] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [formData, setFormData] = useState('')

    const onPress = () => {
        // const formData = {
        //     otherData,
        //     'health-data': {
        //         'diet': diet,
        //         'smoking_status': smokingStatus,
        //         'alcohol-consumption': alcoholConsumption,
        //         'blood-pressure': bloodPressure
        //     }
        // }
        console.log(formData)
        navigation.push("Genetics Form", { data: {...otherData, ...formData} })
    }

    useEffect(() => {
        setFormData( {
            'health-data': {
                'diet': diet,
                'smoking_status': smokingStatus,
                'alcohol-consumption': alcoholConsumption,
                'blood-pressure': bloodPressure
            }
        })
    }, [diet,smokingStatus, alcoholConsumption, bloodPressure])

    useEffect(() => {
        console.log("DATA FROM PREV PAGE",otherData)
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

    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                {renderDropDown("Diet", diet, dietData, setDiet)}

                {renderDropDown("Smoking Status", smokingStatus, smokingData, setSmokingStatus)}

                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Alcohol Consumption/L</Text>
                    <TextInput style={styles.valueText} onChangeText={setAlcoholConsumption} value={alcoholConsumption} keyboardType='decimal-pad'/>
                </View>
            
                {renderDropDown("Blood Pressure", bloodPressure, bloodPressureData, setBloodPressure)}
                
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