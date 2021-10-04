import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksList from "../screens/TasksList";
import DoneTasksList from "../screens/DoneTasksList";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from "../components/styles";

const { accent, secondary } = Colors

export default function TabStack() {
    const Tab = createBottomTabNavigator()
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ size, focused }) => {
                let iconName
                let color

                if(route.name === 'TasksList') {
                    iconName = 'list'
                } else {
                    iconName = 'playlist-add-check'
                }
                color = focused ? accent : secondary
                return <MaterialIcons name={iconName} size={24} color={color}/>
            },
            headerShown: false
        })}>
            <Tab.Screen name='TasksList' component={TasksList} options={{ title: 'Active Tasks' }}/>
            <Tab.Screen name='DoneTasksList' component={DoneTasksList} options={{ title: 'Finished Tasks' }} />
        </Tab.Navigator>
    )
}