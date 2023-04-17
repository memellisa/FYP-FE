import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getWeeklyAverageCalories } from '../../utils/api/fitbit.api';



export default function RiskDetail({ route, navigation }) {
    const riskDetail = route.params
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
        fetchAverageCalories();
    }, [])
    console.log(riskDetail)

    return (
        <View>
            <Text>
                {JSON.stringify(riskDetail)}
            </Text>
            <Text>
                Average Calories:
                {caloriesAverage}
            </Text>
        </View>
    )
}
