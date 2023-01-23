import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetQuiz } from "../../features/quiz/quizSlice";
import Congrats from "../../images/party_popper.jpg"
import { Box, Typography, Button } from '@mui/material/';
import './styles.css'

//importing the animation package
import { motion } from "framer-motion";

export const ResultModal = ({modal, handleModal, name}) => {

    const dispatch= useDispatch()
    const navigate= useNavigate()

    //the finalanswers that were submitted to the redux state are fetched
    const results= useSelector((state) => state.quiz.finalanswers)

    //only the correct answers are filtered out
    const marks= results.map((el) => el.correct) 

    //this fn runs when user clicks on Go back to homepage button
    //it resets the states of answers and finalanswers
    const resetQuizHandler = () => {
        dispatch(resetQuiz())
        navigate("/")
        handleModal(!modal)
    }

    //this component renders the quiz results

    return (  
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
        >
            <Box
                sx={{ 
                    ml: {xs: 2, md: 15, lg: 40},
                    mr: {xs: 2, md: 15, lg: 40},
                    mt: {xs: 15, md: 20, lg: 10}
                }}   
                bgcolor={"white"}
            >
                

            {/*a party popper image is loaded */}
            <Box>
                <img src={Congrats} alt="Party-Popper" className="congrats-image" />
            </Box>

            <Typography 
                sx={{
                    pt: {xs: 3, md: 5, lg: 5},
                    pb: {xs: 2, md: 3, lg: 3}
                }}
                color={"red"} variant="h6" 
            >
                Congratulations {name}!
            </Typography>

            {/*marks are rendered here*/}
            <Typography  
                sx={{
                    fontWeight: "bold", 
                    typography: { xs: 'h6', md: 'h4', lg: 'h4'},
                    pb: {xs: 5, md: 7, lg: 7}
                }}
            >
                <span style={{ fontWeight: 'bold' }}>
                    You've scored {marks.filter((el) => el === true).length} out of{" "} {marks.length}
                </span>
            </Typography>

            {/*this button resets the answers and finalanswers state and takes back user to the homepage*/}
            <Box sx={{pb: {xs: 4, md: 5, lg: 5}}}>
                <Button 
                    variant="contained" color="error"
                    onClick={()=> resetQuizHandler()}>
                    Go Back to Homepage
                </Button>
            </Box>
        </Box>
    </motion.div>
    )
}