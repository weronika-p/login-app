import React from "react"
import { PageTitle, StyledContainer, SubTitle, AboutMeImage } from "./styles"

const AboutMe = () => {
    return(
        <StyledContainer>
            <AboutMeImage source={require('../assets/profile-pic.png')}></AboutMeImage>
            <PageTitle>Hey!</PageTitle>
            <SubTitle style={{textAlign: 'center'}}>My name is Weronika and I'm a creator of that app.</SubTitle>
            <SubTitle style={{textAlign: 'center'}}>Have fun with it! :)</SubTitle>
        </StyledContainer>
    )
}

export default AboutMe