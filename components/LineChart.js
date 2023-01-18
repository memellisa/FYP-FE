import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from "react-native";
import { Bar, VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLegend } from "victory-native";


const windowWidth = Dimensions.get('window').width;

const LineChart = ({data, average}) =>  {
    var tempData = [...data]
    tempData.splice(0,1)
    const labelData = data.map((e, i) => {
            return i == data.length - 1 ? {...e, 'diff': (e.risk - data[i-1].risk).toString()+'%\n(than last month)'} : e})

  return (
    <View style={styles.container}>
      <VictoryChart  minDomain={{ y: 0 }} height={300}  theme={VictoryTheme.material}>
      <VictoryLegend x={25} y={2}
            orientation="horizontal"
            gutter={15}
            style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
            data={[
            { name: "Your 10-Year CHD Risk (%)", symbol: { fill: "#c43a31" } },
            { name: "Average population risk", symbol: { fill: "#00D100" } },
            ]}
        />
        <VictoryLine
            style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"},
                labels: { padding: 0 } 
            }}
            
            data={labelData} 
            
            x="month" 
            y="risk" 
            labels={({datum}) => datum.diff}
            labelComponent={
                <VictoryLabel
                dy={15}
                textAnchor="end"
                verticalAnchor="middle"/>}
            />
        <VictoryLine
            style={{
                data: { stroke: "#00D100" },
                parent: { border: "1px solid #ccc"}
            }}
            data={average} 
            x="month" 
            y="risk" />
        
        </VictoryChart>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  data: {
     fill: "#0047AB" 
  },
});

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      risk: PropTypes.number
    })
  )
};

export default LineChart;