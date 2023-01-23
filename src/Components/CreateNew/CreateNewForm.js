//import the necessary hooks and reducers
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modal/ModalSlice";
import { NewQuiz } from "./NewQuiz";
//import the necessary MUI components
import { Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

export const CreateNewForm = () =>{

    //whenever this page loads a modal will open asking to select the Question type
    const dispatch= useDispatch();

    //useEffect will help us achieve that
    //body of useEffect has a dispatch function that will dispatch the state of modal to redux
    //when page first loads, OpenModal is called that will set the isOpen state to true

    useEffect(()=>{
        dispatch(openModal())
    }, [dispatch])

    //MUI theme to change bg color to grey
    const theme = createTheme({
        palette:{
            background: {
                default: "#f5f5f5"
            }   
        }
    })
    
    return (
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* box and typography components have responsive values and will change corresponding to the screen sizes*/}

            <Typography 
            variant="h4"  
            sx={{ 
                textAlign: 'left', 
                typography: { xs: 'h6', md: 'h4', lg: 'h4'},
                pt: {xs: 4, md: 6, lg: 5},
                pl: {xs: 2, md: 6, lg: 20},
                pb: {xs: 1, md: 2, lg: 2},
                }} 
            >
            <span style={{ fontWeight: 'bold' }}>Create New Quiz</span>
            </Typography>

            {/*This box contains NewQuiz component that will render the form and the logic to save the form state */}
            <Box
                sx={{ 
                ml: {xs: 1, md: 5, lg: 20},
                mr: {xs: 1, md: 5, lg: 20},
                }}   
                bgcolor={"white"}>
                    <NewQuiz />
                </Box>       
        </ThemeProvider>
    )
}