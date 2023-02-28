import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../../components/NavigationButton';


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

export default function EditHealthDetails({ route, navigation }) {
    const data = route.params.data

    const [diet, setDiet] = useState(data.diet)
    const [smokingStatus, setSmokingStatus] = useState(data.smoking_status)
    const [alcoholConsumption, setAlcoholConsumption] = useState(data.alcohol_consumption.toString())
    const [bloodPressure, setBloodPressure] = useState(data.blood_pressure)

    // useEffect(() => {
    //     const newData = {diet: diet, smoking_status: smokingStatus, alcohol_consumption: alcoholConsumption, blood_pressure: bloodPressure}
    //     route.params.data = newData
    //     console.log(route.params.data)
    // }, [diet, smokingStatus, alcoholConsumption, bloodPressure])
    
    const onPress = () => {
        navigation.navigate("Profile", { data: route.params.data })
    }

    useEffect(() => {
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
            // <Text style={{color: 'black', marginLeft: 35, marginRight: 35, marginTop: 20, marginBottom: 0, textAlign: 'justify', fontSize: 15}}> 
            //     Health Details
            // </Text>
            // <View style={styles.container} >
            //     {/* ----- Diet Option ------ */}
            //     <TouchableHighlight style={styles.touchableFirst} >
            //         <View style={styles.optionView}>
            //             <Text style={styles.optionText}> Diet </Text>
            //             <Text style={styles.valueTextWithDropdown}> {diet} </Text>
            //             <Dropdown 
            //                 style={styles.dropdown} 
            //                 selectedTextStyle={styles.selectedTextStyle}
            //                 placeholder=""
            //                 data={dietData}
            //                 labelField="label"
            //                 valueField="value"
            //                 onChange={item => {
            //                     console.log(item.value)
            //                     setDiet(item.value)
            //                 }}
            //             />
            //         </View>
            //     </TouchableHighlight>
            //     {/* ----- Smoking Option ------ */}
            //     <TouchableHighlight style={styles.touchable} >
            //         <View style={styles.optionView}>
            //             <Text style={styles.optionText}> Smoking </Text>
            //             <Text style={styles.valueTextWithDropdown}> {smoking} </Text>
            //             <Dropdown 
            //                 style={styles.dropdown} 
            //                 selectedTextStyle={styles.selectedTextStyle}
            //                 placeholder=""
            //                 data={smokingData}
            //                 labelField="label"
            //                 valueField="value"
            //                 onChange={item => {
            //                     console.log(item.value)
            //                     setSmoking(item.value)
            //                 }}
            //             />
            //         </View>
            //     </TouchableHighlight>
            //     {/* ----- Alcohol Consumption Option ------ */}
            //     <TouchableHighlight style={styles.touchable} >
            //         <View style={styles.optionView}>
            //             <Text style={styles.optionText}> Alcohol Consumption/L </Text>
            //             <TextInput style={styles.valueText} onChangeText={setAlcohol} value={alcohol} />
            //             {/* <Text style={styles.valueText}> 180 </Text> */}
            //         </View>
            //     </TouchableHighlight>
            //     {/* ----- Blood Pressure Option ------ */}
            //     <TouchableHighlight style={styles.touchable} >
            //         <View style={styles.optionView}>
            //             <Text style={styles.optionText}> Blood Pressure </Text>
            //             <Text style={styles.valueTextWithDropdown}> {bloodPressure} </Text>
            //             <Dropdown 
            //                 style={styles.dropdown} 
            //                 selectedTextStyle={styles.selectedTextStyle}
            //                 placeholder=""
            //                 data={bloodPressureData}
            //                 labelField="label"
            //                 valueField="value"
            //                 onChange={item => {
            //                     console.log(item.value)
            //                     setBloodPressure(item.value)
            //                 }}
            //             />
            //         </View>
            //     </TouchableHighlight>
            // </View>
        // </ScrollView>
    
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