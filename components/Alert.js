import { Alert } from "react-native";

const successAlert = (navigation, email, text) => {
    Alert.alert(
        'SUCCESS!',
        text,
        [{
            text: 'Back to Welcome page',
            onPress: () => navigation.navigate('Welcome', email)
        }],
        { cancelable: false }
    )
}

export default successAlert