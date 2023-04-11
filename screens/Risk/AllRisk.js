import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAllRisk } from '../../utils/api/risk.api';
import { Divider } from '@rneui/base';


export default function AllRisk({ route, navigation }) {
  const [allRisk, setAllRisk] = useState([])

    const fetchAllRisk = async() => {
        const result = await getAllRisk()
        if (!result.error) {
          setAllRisk(result)
        } 
        else {
        //   Alert.alert('Something went wrong getting USER. Please try again')
        }
      }
    
    useEffect(() => {
        fetchAllRisk()
    }, [])

    var content = []

    for (let i = 0; i < allRisk.length; i++){
        content.push(
            <View style={i == allRisk.length - 1 ? {...styles.rowView, marginBottom: 50} : styles.rowView} key={i}>
                <View style={styles.optionView}>
                    <Text style={styles.fieldText}>{allRisk[i].time}</Text>
                    <Text style={styles.valueText}>{(allRisk[i].result  * 100 ).toFixed(5) + '%'}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaProvider>
            <ScrollView
                style={styles.screenContainer}
                scrollable={true}
                hasSafeArea={false}
            >
                {content}
            </ScrollView>
        </SafeAreaProvider>
      );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    rowView: {
        marginTop: 25,
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: '0.2',
        width: '90%',
        alignSelf: 'center'
    },

    optionView: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },

    fieldText: {
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
        color: '#0F52BA',
    },

    dropdown: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        paddingRight: 5,
        flex:1
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
    },
    itemStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },

    titleView: {
        width: '40%', 
        flexDirection: 'row',
        alignItems: 'center',
    },

})