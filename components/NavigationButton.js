import { StyleSheet } from 'react-native';
import { Text, Button } from '@rneui/themed';

const NavigationButton = ({ buttonName, onPressHandler, disabled=false }) => {
    return (
        <Button
            // onPress={() => navigation.navigate(name, { data: route.params.data })}
            onPress={disabled ? ()=>{} : onPressHandler}
            color="#fff"
            style={styles.button}
            >
            <Text style={{...styles.text, color: disabled ? 'grey' : '#0096FF'}}>{buttonName}</Text>
        </Button>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        width: 100,
        padding: 0,
        margin: 0,
        left: 30
    },

    text: {
        // color: '#0096FF', 
        fontSize: 18,
    },

});
export default NavigationButton;