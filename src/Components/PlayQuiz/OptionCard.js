import React from 'react';
import { useDispatch } from 'react-redux';
import { setAnswer } from '../../features/quiz/quizSlice';
import { Box } from '@mui/material';

export const OptionCard = ({ id, correct, opt }) => {

    //this component renders the Quiz options and dispatches the options to the redux state's answer
    const dispatch= useDispatch()
    const onClickHandler = () => {

        //answer object containing the option value, correct/incorrect status and id to identify it
        const Answer = {
            answer: opt,
            correct: correct,
            id: id
        }
        dispatch(setAnswer(Answer))
    }

    return (
        <Box 
            bgcolor={"#f5f5f5"} 
            sx={{ 
                textAlign: 'left',
                mr: {xs: 5, md: 30, lg: 60},
                mt: {xs: 1, md: 2, lg: 3},
                ml: {xs: 3, md: 5, lg: 7},
                p: {xs: 1, md: 1.5, lg: 1.5}
            }}   
        >
            <input
                type="radio"
                name="options"
                value={opt}
                onClick={onClickHandler}
            /> {opt}
        </Box>
    )
}