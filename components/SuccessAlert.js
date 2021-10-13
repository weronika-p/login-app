import { Alert } from "react-native";

const successAlert = (navigation, text) => {
    Alert.alert(
        'SUCCESS!',
        text,
        [{
            text: 'Back to Task List page',
            onPress: () => navigation.navigate('ListOfTask')
        }],
        { cancelable: false }
    )
}

export default successAlert