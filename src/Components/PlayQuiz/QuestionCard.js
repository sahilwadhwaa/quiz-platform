import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QnA } from './QnA';
import { ResultModal } from './ResultModal';
import { setFinalAnswer } from '../../features/quiz/quizSlice';
import { resetAnswer } from '../../features/quiz/quizSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import { Box, Typography, Button, Stack } from '@mui/material/';

export const QuestionCard= () => {

    //bg-color
    const theme = createTheme({
        palette:{
            background: {
                default: "#f5f5f5"
            }   
        }
    })

    //answer, quiz and names are fetched from states
    const dispatch= useDispatch()
    const quiz = useSelector((state) => state.quiz.playquiz)
    const answer= useSelector((state) => state.quiz.answer)
    const name= useSelector((state) => state.quiz.name)
    

    // these are the states and data which is to be shown and played //
    const [count, setCount] = useState(0)
    const [modal, setModal]= useState(false)
    //console.log(count)

    //variables are assigned questions and options and updated depending on the count value
    const Question= quiz.questions
    const question = Question[count].question
    const options = Question[count].options
    

    const nextQuestionHandler = () => {

        //increases count value on pressing next ques button
        //increasing count value will change the value of variables to the next question

        //dispatch the user's selected options 
        dispatch(setFinalAnswer(answer))
        dispatch(resetAnswer())

        //if count value exceeds the question.length then show the results modal
        //else update count value
        if (count >= Question.length - 1) {
            setModal(true);
            setCount((prev) => prev);
        } else {
            setCount((prevCount) => prevCount + 1);
            }
        }


    //handle the modal state
    const handleModal = () => {
        setModal((prevModal) => !prevModal)
    }


  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* conditional operator to check modal state.
            if modal state is false then render next question.
            else render the results page*/}

        {
         modal===false ? 
         <Box 
            sx={{ 
                ml: {xs: 2, md: 15, lg: 40},
                mr: {xs: 2, md: 15, lg: 40},
                mt: {xs: 10, md: 30, lg: 10}
            }}   
            bgcolor={"white"}
        >
            <Typography 
                sx={{
                    textAlign: 'center',
                    typography: { xs: 'h5', md: 'h4', lg: 'h4'},
                    pt: {xs: 2, md: 4, lg: 3},
                    pb: {xs: 2, md: 2, lg: 5}
                    }}   
            >
                <span style={{ fontWeight: 'bold' }}>{quiz.title}</span>
            </Typography>

            {/* this component renders the questions and options of the quiz*/}
            <QnA 
                count={count}
                question={question}
                options={options}
            />

            <Stack spacing={4} pt={7} pb={4} direction="row" justifyContent="center" alignItems="center">
                <Typography 
                    sx={{typography: { xs: 'h6', md: 'h5', lg: 'h5'},}} 
                >
                    <span style={{ fontWeight: 'bold' }}>Question {count + 1}</span>/{quiz.questions.length}
                </Typography>

                {/*pressing this button will take user to the next question.
                    if the question is last one in the quiz state, then change button value to submit*/}
                <Button 
                    variant="contained" 
                    color="primary"
                    disabled={answer ? false : true}
                    onClick={() => nextQuestionHandler()}
                >
                    {count===Question.length-1 ? "Submit" : "Next Question"}
                </Button>
            </Stack>
        </Box> : <ResultModal modal={modal} handleModal={handleModal} name={name}/>
    }  
    </ThemeProvider>
  );
}