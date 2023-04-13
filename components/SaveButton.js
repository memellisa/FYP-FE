import { StyleSheet } from 'react-native';
import { Text, Button } from '@rneui/themed';

const SaveButton = ({ onPressHandler, disabled=false }) => {
    return (
        <Button
            onPress={disabled ? () => {} : onPressHandler}
            color="#fff"
            >
            <Text style={{...styles.text, color: disabled ? 'grey' : '#0096FF'}}>Save</Text>
        </Button>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        fontSize: 18,
    },

});
export default SaveButton;