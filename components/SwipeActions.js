import React from "react"
import { StyledLeftAction, StyledRightAction, Colors } from "./styles"
import { Animated, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

const { contrastAccent, error } = Colors

export const LeftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });
    
    return (
        <StyledLeftAction>
            <AnimatedIcon
                name='edit'
                size={30}
                color={contrastAccent}
                style={styles.actionIcon}
            />
        </StyledLeftAction>
    )
}

export const RightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <StyledRightAction style={{backgroundColor: error}}>
            <AnimatedIcon
                name='delete'
                size={30}
                color={contrastAccent}
                style={styles.actionIcon}
            />
        </StyledRightAction>
    )
}

const styles = StyleSheet.create({
    actionIcon: {
        width: 30,
        marginHorizontal: 10
    }
})