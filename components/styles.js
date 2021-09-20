import styled from "styled-components";
import { View, Image, Text } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#5793ce",
    secondary: "##173d7a",
    tertiary: "#cee6f6",
    accent: "#ff2c9c",
}

const {primary, secondary, tertiary, accent} = Colors

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${tertiary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${accent};
    padding: 10px;
`