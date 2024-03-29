import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../screens/Login";
import SignUp from "../screens/Signup";
import Welcome from "../screens/Welcome";
import TasksList from "../screens/TasksList";
import EditTask from "../screens/EditTask";
import CalendarView from "../screens/Calendar";
import AboutMe from "../components/AboutMe";
import DoneTasksList from "../screens/DoneTasksList";
import TabStack from "./TabStack";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    },
                    headerShadowVisible: false
                }}
                initialRouteName='Login'
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="ListOfTask" component={TabStack} />
                <Stack.Screen name="EditTask" component={EditTask} />
                <Stack.Screen name="Calendar" component={CalendarView} />
                <Stack.Screen name="AboutMe" component={AboutMe} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack