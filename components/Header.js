import { StatusBar } from 'expo-status-bar';
import React from 'react';
import PropTypes from 'prop-types';

import { Header as HeaderComponent } from '@rneui/themed';
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { View, Text, StyleSheet } from 'react-native';
import BotNavbar from './BotNavbar';
import BarGraph from './BarGraph';


const Header = ({leftComponent, rightComponent}) => {
    return (
      <HeaderComponent
        ViewComponent={LinearGradient} // Don't forget this!
        containerStyle={styles.headerContainer}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        linearGradientProps={{
          // colors: ['#f2f3f5', '#f2f3f5'],
          colors: ['#ffff', '#ffff'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      />
    );
}


const styles = StyleSheet.create({
      headerContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        paddingLeft: 25,
        paddingVertical: 25,
      },
      
});

BarGraph.propTypes = {
  leftComponent: PropTypes.object,
  rightComponent: PropTypes.object
};


export default Header;