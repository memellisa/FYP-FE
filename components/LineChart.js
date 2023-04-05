import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const LineChart = ({data, domainX}) =>  {
  const domain = data ? {} : {y: []}
  return (
    <View style={styles.container}>
      <VictoryChart 
      
        width={420}  
        minDomain={{ y: 0 }} 
        padding={{left: 47, right: 50, bottom: 60, top: 5}}
        height={300}  
        theme={VictoryTheme.material}>
        <VictoryLine
            data={data ? data : []} 
            domain={domain}
            style={{
                data: {stroke: "#c43a31" },
            }}
            x="time" 
            y="risk" 
            />
            <VictoryAxis
              style={{
                tickLabels: {fontSize: 9, padding: 5}
              }}
              tickValues={domainX}
              tickFormat={(t) => typeof t == 'string' || t % 5 == 0 || t == 1 ? t : ''}
            />
            <VictoryAxis dependentAxis/>
        </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start"
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