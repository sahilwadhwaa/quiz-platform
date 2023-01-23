import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { QuizItems } from "./QuizItems";
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

//MUI table components to show the Quiz data
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './styles.css'

export const QuizPage= () => {
    //This component renders the Quizzes that are created and displays an error message when there's no quiz to show

    //all the created quizzes are fetched from redux state
    const Quiz = useSelector((state)=> state.quiz.quiz)
    
    //an MUI theme with a grey background is created
    const theme = createTheme({
        palette:{
            background: {
                default: "#f5f5f5"
            }   
        }
    })

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            
            <Grid 
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    marginTop : {
                        xs: 5,
                        md: 6,
                        lg: 6
                    },
                    marginLeft :{
                        xs: 1,
                        md:1,
                        lg: 31
                    },
                    marginRight :{
                        xs: 1,
                        md:1,
                        lg: 34
                    }
                }}    
            >
            
                <Typography sx={{ 
                        typography: { 
                        sm: 'h5', xs: 'h6', lg: 'h4' 
                        }
                        }}
                        >
                    <span style={{ fontWeight: 'bold' }}>My Quizes</span>
                </Typography>
                
                <NavLink className='newquiz' to="/create-new">
                {/* This button will take you to Create New Quiz Page */}
                   <Button 
                    variant="contained"  
                    sx={{
                        fontSize:{
                            xs: 8,
                            md: 12,
                            lg:15
                        }}}
                    >
                        Create New Quiz
                    </Button>
                </NavLink>
            
            </Grid>

            {/* If quiz length is >0, then render the quizzes, otherwise display the error message */}

            {Quiz.length===0 ? <Typography 
                                    sx={{
                                        margin:{xs:1, md:3, lg: 30 }, 
                                        marginTop:{xs:12, md:8, lg: 4}, 
                                        padding:{xs:2, md:3, lg:4}}} 
                                        bgcolor={'white'} color={"red"}
                                >
                                    Currently there are no quizes!
                                </Typography>

                                 : <div 
                                        style={{width: 'auto', overflowX: 'scroll'}}
                                    >
                                    {/* This is a MUI Component which will render the quizzes in the form of a table*/
                                     /* To make this table responsive, width value will be auto when screen sizes decreases and scroll will be active */
                                    }

                                        <TableContainer
                                            sx={{ 
                                                minWidth: 650, 
                                                mt: {xs:6, lg:6}, 
                                                marginLeft:'auto', marginRight: 'auto', 
                                                width: {xs: 'auto', md:'auto', lg: 1200}
                                                }} 
                                            component={Paper}>
                                            <Table aria-label="simple table" >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" sx={{fontWeight:'bold'}}>Quiz No</TableCell>
                                                        <TableCell align="center" sx={{fontWeight:'bold'}}>Title</TableCell>
                                                        <TableCell align="center" sx={{fontWeight:'bold'}}>Status</TableCell>
                                                        <TableCell align="center" sx={{fontWeight:'bold'}}>Created on</TableCell>
                                                        <TableCell align="center" sx={{fontWeight:'bold'}}>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody scope="row">
                                                    {Quiz.map((el, i) => (
                                                        <QuizItems
                                                            key={el.id}
                                                            title={el.title}
                                                            id={el.id}
                                                            active={el.isActive}
                                                            date={el.createdOn}
                                                            serial={i + 1}
                                                        />
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                }      
        </ThemeProvider>       
    )
}