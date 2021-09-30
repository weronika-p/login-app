import React from "react"
import { PageTitle, StyledContainer, SubTitle, WelcomeImage } from "./styles"

const AboutMe = () => {
    return(
        <StyledContainer>
            <WelcomeImage source={require('../assets/profile-pic.png')}></WelcomeImage>
            <PageTitle>Hey!</PageTitle>
            <SubTitle style={{textAlign: 'center'}}>My name is Weronika and I'm a creator of that app.</SubTitle>
            <SubTitle style={{textAlign: 'center'}}>Have fun with it! :)</SubTitle>
        </StyledContainer>
    )
}

export default AboutMe