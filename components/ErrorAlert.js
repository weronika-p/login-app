import { Alert } from "react-native";

const errorAlert = text => {
    Alert.alert(
        'ERROR!',
        text,
        [{
            text: 'OK'
        }],
        { cancelable: false }
    )
}

export default errorAlert