import { Button } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

export default function GeneticsData({ route }) {
    const data = route.params.data

    const [sex, setSex] = useState(data.sex)
    const [bloodType, setBloodType] = useState(data.blood_type)
    const [age, setAge] = useState(data.age.toString())
    const [height, setHeight] = useState(data.height.toString())
    const [weight, setWeight] = useState(data.weight.toString())
    const [bmi, setBMI] = useState(data.bmi.toString())

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
            <TextInput style={styles.valueText} value={value} onChangeText={onChangeText} multiline={true} keyboardType='decimal-pad'/>
        </View>
    )}

    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Age</Text>
                    <TextInput style={styles.valueText} onChangeText={setAge} value={age} keyboardType='number-pad'/>
                </View>

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
                <Text style={{color: 'grey', marginHorizontal: 28, marginTop: 10, marginBottom: 0, textAlign: 'justify'}}> 
                    BMI is calculated from the inputted height and weight above, make sure that the data inputted above is correct so that your BMI measurement is also accurate
                </Text>
                
            </ScrollView>
        </SafeAreaProvider>



        // <ScrollView
        //     style={styles.screenContainer}
        //     scrollable={true}
        //     hasSafeArea={false}
        // >
        //     {/* <Text>Genetics Data</Text> */}
        //     <View style={styles.container} >
        //         {/* ----- Age Option ------ */}
        //         <TouchableHighlight style={styles.touchableFirst} >
        //             <View style={styles.optionView}>
        //                 <Text style={styles.optionText}> Age </Text>
        //                 <TextInput style={styles.valueText} onChangeText={setAgeValue} value={ageValue} />
        //                 {/* <Text style={styles.valueText}> 22 </Text> */}
        //             </View>
        //         </TouchableHighlight>
        //         {/* ----- Sex Option ------ */}
        //         <TouchableHighlight style={styles.touchable} >
        //             <View style={styles.optionView}>
        //                 <Text style={styles.optionText}> Sex </Text>
        //                 <Text style={styles.valueTextWithDropdown}> {sexValue} </Text>
        //                 <Dropdown 
        //                     style={styles.dropdown} 
        //                     selectedTextStyle={styles.selectedTextStyle}
        //                     placeholder=""
        //                     data={sexData}
        //                     labelField="label"
        //                     valueField="value"
        //                     onChange={item => {
        //                         console.log(item.value)
        //                         setSexValue(item.value)
        //                     }}
        //                 />
        //             </View>
        //         </TouchableHighlight>
        //         {/* ----- Height Option ------ */}
        //         <TouchableHighlight style={styles.touchable} >
        //             <View style={styles.optionView}>
        //                 <Text style={styles.optionText}> Height </Text>
        //                 <TextInput style={styles.valueText} onChangeText={setHeightValue} value={heightValue} />
        //                 {/* <Text style={styles.valueText}> 180 </Text> */}
        //             </View>
        //         </TouchableHighlight>
        //         {/* ----- Weight Option ------ */}
        //         <TouchableHighlight style={styles.touchable} >
        //             <View style={styles.optionView}>
        //                 <Text style={styles.optionText}> Weight </Text>
        //                 <TextInput style={styles.valueText} onChangeText={setWeightValue} value={weightValue} />
        //             </View>
        //         </TouchableHighlight>
        //         {/* ----- Blood Type Option ------ */}
        //         <TouchableHighlight style={styles.touchable} >
        //             <View style={styles.optionView}>
        //                 <Text style={styles.optionText}> Blood Type </Text>
        //                 <Text style={styles.valueTextWithDropdown}> {bloodtypeValue} </Text>
        //                 <Dropdown 
        //                     style={styles.dropdown} 
        //                     selectedTextStyle={styles.selectedTextStyle}
        //                     placeholder=""
        //                     data={bloodData}
        //                     labelField="label"
        //                     valueField="value"
        //                     onChange={item => {
        //                         console.log(item)
        //                         setBloodtypeValue(item.value)
        //                     }}
        //                 />
        //             </View>
        //         </TouchableHighlight>
        //     </View>

        //     <Text style={{color: 'grey', marginLeft: 35, marginRight: 35, marginTop: 20, marginBottom: 0, textAlign: 'justify'}}> 
        //         BMI is calculated from the inputted height and weight above, make sure that the data inputted above is correct so that your BMI measurement is also accurate.
        //     </Text>
        //     <View style={styles.container} >
        //         {/* ----------- */}
        //         <TouchableHighlight style={styles.touchableFirst} >
        //             <View style={styles.optionView}>
        //                 <Text style={styles.optionText}> BMI </Text>
        //                 <Text style={styles.valueText}> 24.5 </Text>
        //             </View>
        //         </TouchableHighlight>
        //     </View>
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