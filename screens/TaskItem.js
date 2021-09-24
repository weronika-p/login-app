import React from 'react';
import { ExtraText, StyledContainer, SubTitle, TaskCard } from '../components/styles';

export default function TaskItem({ route }) {
    const { title, category, priority, endDate } = route.params

    return(
        <StyledContainer>
            <TaskCard priority={priority}>
                <SubTitle>
                    {title}
                </SubTitle>
                <ExtraText>
                    Category: {category}
                </ExtraText>
                <ExtraText>
                    Due date: {new Date(endDate).toLocaleDateString()}
                </ExtraText>
            </TaskCard>
        </StyledContainer>
    )
}