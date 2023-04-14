import React from 'react';

import { Header as HeaderComponent } from '@rneui/themed';
import {LinearGradient} from 'expo-linear-gradient';

import { StyleSheet } from 'react-native';


const Header = ({leftComponent, rightComponent}) => {
    return (
      <HeaderComponent
        ViewComponent={LinearGradient} 
        containerStyle={styles.headerContainer}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        linearGradientProps={{
          colors: ['#ffff', '#ffff'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      />
    );
}


const styles = StyleSheet.create({
      headerContainer: {
        width: '100%',
        paddingLeft: 25,
        paddingVertical: 25,
      },
      
});


export default Header;