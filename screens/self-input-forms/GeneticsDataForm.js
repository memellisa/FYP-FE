import { Button, Divider } from '@rneui/base'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationButton from '../../components/NavigationButton';


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


export default function GeneticsDataForm({ route, navigation }) {
    const otherData = route.params.data
    const [sex, setSex] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBMI] = useState('')
    const [formData, setFormData] = useState('')


    const onPress = () => {
        console.log('ALL DATA',{...otherData, ...formData})
        // send data to db
        navigation.navigate("Main")
    }

    useEffect(() => {
        setFormData( {
            'genetics-data': {
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