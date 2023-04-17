import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getWeeklyAverageCalories } from '../../utils/api/fitbit.api';
import { jsonToArray } from '../../utils/functions';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const RiskDetail = ({ route }) => {
    var riskDetail = route.params
    delete riskDetail.params["activity"]
    const riskParams = jsonToArray(riskDetail.params)
    
    const [caloriesAverage, setCaloriesAverage] = useState(0)

    const fetchAverageCalories = async () => {
        const result = await getWeeklyAverageCalories(riskDetail.time.replaceAll("/", ""))
        if (!result.error) {
            setCaloriesAverage(result.data)
        } else {
            // Error handling here
        }

    }


    useEffect(() => {
        fetchAverageCalories()
    }, [])

    return (
        <SafeAreaProvider>
            <View
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
            <View style={styles.fieldView} key={"Risk"}>
                <Text style={styles.resultTitle}>{"Risk"}</Text>
                <Text style={styles.resultValue}>{(riskDetail.result  * 100 ).toFixed(5) + '%'}</Text>
            </View>

            <View style={styles.fieldView} key={"Date"}>
                <Text style={styles.resultTitle}>{"Date"}</Text>
                <Text style={styles.resultValue}>{riskDetail.time}</Text>
            </View>
            

            <Text style={styles.heading}>Factors:</Text>

            {riskParams.map((obj) => 
                <View style={styles.fieldView} key={obj[0]}>
                    <Text style={styles.fieldTitle}>{obj[0]}</Text>
                    <Text style={styles.valueText}>{obj[0] == 'BMI' ? obj[1].toFixed(2) : obj[1]}</Text>
                </View>)
            }

            { caloriesAverage ? 
                <View style={styles.fieldView} key={"Average Calories"}>
                    <Text style={styles.fieldTitle}>{"Average Calories"}</Text>
                    <Text style={styles.valueText}>{caloriesAverage.toFixed(2)}</Text>
                </View>
                : null 
            }
            </View>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 18, 
        fontFamily: "Poppins-Bold", 
        color: '#0F52BA'
    },

    container: {
        paddingVertical: 5,
        width: '90%',
        marginBottom:5, 
        borderRadius:10, 
        alignSelf: 'center',
        borderColor: '#fff'
    },

    fieldView: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'flex-start'
    },

    fieldTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        width: '50%',
        marginRight: 10
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },

    resultValue: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        flex: 1,
        flexWrap: 'wrap',
        color: '#0F52BA'
    },

    resultTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        width: '50%',
        marginRight: 10
    },

    heading: {
        color: '#0F52BA',
        fontSize: 23,
        textAlign: 'left',
        paddingTop: 25,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold'
      },
});

export default RiskDetail;