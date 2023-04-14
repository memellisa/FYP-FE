import Constants from 'expo-constants';

const { manifest } = Constants;

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

const frequencyDataSmoking = [
    { label: 'Never', value: '0' },
    { label: 'Previous', value: '1' },
    { label: 'Current', value: '2' },
];

const frequencyData = [
    { label: 'Never', value: '0' },
    { label: 'Previous', value: '1' },
    { label: 'Seldom', value: '2' },
    { label: 'Frequent', value: '3' },
];

const booleanData = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
];

const flaskURL = 'http://' + manifest.debuggerHost.split(":")[0] + ':8080'

const formInfoMsgs = {
    age: "Age is automatically calculated from the inputted date of birth",
    bmi: "BMI is automatically calculated from the inputted height and weight",
    medication: "Select 'Yes' if you are regularly taking any related medication, and 'No' otherwise"
}

export { dietData, sexData, bloodData, frequencyData, booleanData, flaskURL, formInfoMsgs, frequencyDataSmoking }