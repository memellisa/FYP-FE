import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const BarGraph = ({data}) =>  {
  const windowWidth = Dimensions.get('window').width;

  const findMax = () => {
    var maxSteps = 2000
    for (let i = 0; i < data.length; i++){
      if (data[i].steps > maxSteps) 
        maxSteps = data[i].steps + 500
    }
    return maxSteps
  }

  const max = findMax()
  const chartWidth = windowWidth - (findMax() < 10000 ? 15 : 20)

  const onBarPressed = () => {
    return [
    {
      target: "labels",
      mutation: (props) => ({ text:  props.datum.steps })
    }, 
    {
      target: "data",
      mutation: () => ({ style: { fill: "orange" }})
    }];
  }

  const onBarNotPressed = () => { 
    return [
    {
      target: "labels",
      mutation: () => null
    }, 
    {
      target: "data",
      mutation: () => null 
    }];
  }

  return (
    <View style={styles.container}>
      <VictoryChart 
          padding={{left: 50, bottom:40, top: 20, right: 10}}
          width={chartWidth} 
          height={300}
          theme={VictoryTheme.material}
          >
      <VictoryBar 
          name="Bar"
          barWidth={35} 
          domainPadding={{x: 23}}
          style={
              { data:  styles.data }
          } 
          domain={{y: [0, max]}}
          data={data} 
          x="day" 
          y="steps" 
          labels={() => ""}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: onBarPressed,
                onPressOut: onBarNotPressed
              }
            }
          ]}
          />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10
  },
  data: {
     fill: "#0047AB" 
  },
});

export default BarGraph;