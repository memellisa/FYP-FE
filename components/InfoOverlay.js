import { Overlay } from "@rneui/base"
import { StyleSheet, Text, Button, View, ScrollView, Alert } from 'react-native';


const InfoOverlay = (visible, toggleOverlay, message) => {
    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.container}  >
            <Text style={styles.infoText}>
                {message}
            </Text>
            <Button
                title="OK"
                onPress={toggleOverlay}
            />
        </Overlay>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        borderRadius: 10
    },
    infoText: {
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
        width: '80%',
        padding: 5,
        textAlign: 'center'
    },
});

export default InfoOverlay
