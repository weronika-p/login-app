import React, { useContext } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/auth-context";

export default function SuccessAlert(navigation) {
    const authContext = useContext(AuthContext)

    return Alert.alert(
        'SUCCESS!',
        'Task has just been updated successfuly',
        [{
            text: 'Back to Task List',
            onPress: () => navigation.navigate('TasksList', authContext.email)
        }]
    )
}