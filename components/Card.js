import React from 'react';
import { TaskCard, CardContent } from './styles';

const Card = props => {
    return(
        <TaskCard priority={props.priority}>
            <CardContent>
                { props.children }
            </CardContent>
        </TaskCard>
    )
}

export default Card