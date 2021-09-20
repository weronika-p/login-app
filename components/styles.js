import styled from "styled-components";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#5793ce",
    secondary: "#173d7a",
    tertiary: "#cee6f6",
    accent: "#ff2c9c",
    contrastAccent: "#fff",
    grey: "#474747",
    google: "#4285F4"
}

const {primary, secondary, tertiary, accent, contrastAccent, grey, google} = Colors

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
    width: 150px;
    height: 100px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${secondary};
    padding: 10px;
`

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${accent};
`

export const StyledFormArea = styled.View`
    width: 90%;
`

export const StyledTextInput = styled.TextInput`
    background-color: ${contrastAccent};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-bottom: 10px;
    color: ${secondary};
`

export const StyledInputLabel = styled.Text`
    color: ${primary};
    font-size: 13px;
    text-align: left;
`

export const LeftIcon = styled.View`
    left: 15px;
    top: 30px;
    position: absolute;
    z-index: 1;
`

export const RighttIcon = styled.TouchableOpacity`
    right: 15px;
    top: 30px;
    position: absolute;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${accent};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${google};
        flex-direction: row;
        justify-content: center;
    `}
`

export const ButtonText = styled.Text`
    color: ${contrastAccent};
    font-size: 16px;

    ${(props) => props.google == true && `
        padding: 25px;
    `}
`

export const MessageBox = styled.Text`
    text-align: center;
    font-size: 13px;
`

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${grey};
    margin-vertical: 10px;
`

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

export const ExtraText = styled.Text`
    justify-content: center;
    align-items: center;
    color: ${primary}
    font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const TextLinkContent = styled.Text`
    color: ${accent}
    font-size: 15px;
`