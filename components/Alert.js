import React, { useContext } from "react";
import { Alert } from "react-native";

const successAlert = (navigation, email) => {
    Alert.alert(
        'SUCCESS!',
        'Task has just been updated successfuly',
        [{
            text: 'Back to Task List',
            onPress: () => navigation.navigate('TasksList', email)
        }],
        { cancelable: false }
    )
}

export default successAlert