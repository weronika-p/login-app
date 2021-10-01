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
    google: "#4285F4",
    error: "#DB4437"
}

const {primary, secondary, tertiary, accent, contrastAccent, grey, google, error} = Colors

const priorityColors = {
    1: secondary,
    2: "#27538F",
    3: "#3768A4",
    4: "#477EB9",
    5: primary
}

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${tertiary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 5px;
    justify-content: center;
`

export const PageLogo = styled.Image`
    width: 150px;
    height: 100px;
`

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
`

export const WelcomeImage = styled.Image`
    margin-top: 40px;
    height: 30%;
    width: 100%;
`

export const AboutMeImage = styled.Image`
    margin-top: 40px;
    height: 52%;
    width: 100%;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${secondary};
    padding: 10px;

    ${(props) => props.welcome && `
        font-size: 35px;
    `}
`

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${accent};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
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
    width: 100%;
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
    font-size: 20px;

    ${(props) => props.google == true && `
        padding: 25px;
    `}
`

export const MessageBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? google : error}
`

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${secondary};
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

export const TaskCard = styled.View`
    border-radius: 7px;
    color: ${contrastAccent};
    margin: 15px 4px;
    ${props => props.priority === 1 &&`
        background-color: ${secondary}
    `}
    ${props => props.priority === 2 &&`
        background-color: ${priorityColors[2]}
    `}
    ${props => props.priority === 3 &&`
        background-color: ${priorityColors[3]}
    `}
    ${props => props.priority === 4 &&`
        background-color: ${priorityColors[4]}
    `}
    ${props => props.priority === 5 &&`
        background-color: ${priorityColors[5]}
    `}

`

export const CardContent = styled.View`
    margin: 18px 20px;
    flex-direction: row;
    justify-content: space-between;
`

export const StyledAdd = styled.View`
    margin: 50px;
    background-color: ${accent};
    padding: 10px;
    border-radius: 10px;
    align-self: flex-end;
`

export const StyledLeftAction = styled.View`
    background-color: ${accent};
    justify-content: flex-start;
    flex: 1;
    border-radius: 7px;
    margin: 15px 4px;
    align-items: center;
    flex-direction: row;
`

export const StyledRightAction = styled.View`
    background-color: ${accent};
    justify-content: flex-end;
    flex: 1;
    border-radius: 7px;
    margin: 15px 4px;
    align-items: center;
    flex-direction: row;
`