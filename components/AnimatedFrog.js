import React, { useRef } from "react"
import { Colors } from "./styles"
import { Animated, Easing } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

const { accent } = Colors

const Frog = () => {
    const top = useRef(new Animated.Value(0)).current
    Animated.loop(Animated.sequence([
        Animated.timing(top, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease
        }),
        Animated.timing(top, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease
        })
    ])).start()

    return (
        <AnimatedIcon 
            name='frog'
            size={26}
            color={accent}
            style={{ transform: [{translateY: top}] }}
        />
    )
}

export default Frog