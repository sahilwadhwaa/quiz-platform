import React from 'react';
import { Typography } from '@mui/material';
import { OptionCard } from './OptionCard';

export const QnA = ({count, question, options}) => {

//this component renders the questions and has a nested component that renders the options
    return (
        <>
            <Typography 
                pl={7} 
                sx={{ 
                    textAlign: 'left',
                    pl: {xs: 3, md: 5, lg: 7},
                    pb: {xs: 2, md: 2, lg: 2}
                }}
            >
                <span style={{ fontWeight: 'bold' }}>{count +1}. {question}</span>
            </Typography>
            {options.map((el, i) => (
                <OptionCard
                    key={el.id}
                    id={el.id}
                    correct={el.correct}
                    opt={el.opt}
                 />
            ))}
        </>
    )
}