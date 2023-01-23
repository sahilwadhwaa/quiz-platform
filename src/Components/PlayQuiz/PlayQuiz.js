import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getName, playQuiz } from "../../features/quiz/quizSlice";
import { Typography, Box, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

export const PlayQuiz= () => {

    //initiliased dispatch and navigate to dispatch the selected quiz and then route to the quiz questions
    const dispatch= useDispatch()
    const navigate= useNavigate()

    //fetch the quizzes from the quiz state
    const quiz = useSelector((state)=> state.quiz.quiz)
    //console.log(quiz)

    //save the selected quiz to local state
    const [inputValue, setInputValue]= useState("")

    //set bg color
    const theme = createTheme({
        palette:{
            background: {
                default: "#f5f5f5"
            }   
        }
    })

    //this fn renders a list of Quizzes that are active and playable
    const RenderQuizNames= ({title, id}) => {

        return (
            <Box
                bgcolor={"#f5f5f5"} 
                sx={{ 
                    textAlign: 'left',
                    mr: {xs: 0, md: 60, lg: 100},
                    mt: {xs: 1, md: 2, lg: 2}
                }}  
                pt={1.5} pb={1.5} pl={1.5} pr={1.5}
            >
                <input 
                    type="radio"
                    name="quiz-options"
                    value={title}
                    onClick={() => dispatch(playQuiz(id))}
            />{title}
            </Box>
        )
    }


    //this fn executes when user presses start quiz button
    //it routes to the quiz page but before that user has to enter their name
    const startQuiz = () => {

        // if there id no name entered then do nothing except an alert //
        //if name value is >5 characters and <50 than dispatch the user name and route to the Quiz Page
    
        if (inputValue === "") {
          alert("Please enter a name!")
          return
        } else if(inputValue.length<5 || inputValue.length>50) {
            alert("Name should be minimum 5 characters and maximum of 50 characters")
        } else if (quiz.length > 0) {
            dispatch(getName(inputValue))
            navigate("/quiz");
        }
        
      }

    //renders the empty message if no quizzes are available
    const emptyMsg = (
    <Typography color={"red"} sx={{ textAlign: 'left' }} pt={3} pb={4}>Currently there are no quizes!</Typography>
    )

      
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
           
            <Box
                sx={{ 
                    ml: {xs: 1, md: 5, lg: 20},
                    mr: {xs: 1, md: 5, lg: 20},
                    mt: {xs: 3, md: 3, lg: 4}
                }}   
                bgcolor={"white"}
            >
                    <Box 
                        sx={{  
                            pt: {xs: 2, md: 3, lg: 4},
                            pb: {xs: 2, md: 3, lg: 4},
                            pl: {xs: 1, md: 2, lg: 6},
                            pr: {xs: 1, md: 2, lg: 6}
                        }}
                    >
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                typography: { xs: 'h5', md: 'h4', lg: 'h4'}, 
                                textAlign: { xs: 'center', md: 'left', lg: 'left'} , 
                                pb:{ xs: 2, md: 4, lg: 4}}}
                        >
                            <span style={{ fontWeight: 'bold' }}>Title of the Quiz</span>
                        </Typography>
                            
                    {/* some randomly generated text is shown here, 
                    just for the sake of UI as it was shown in the alma better project page
                    I would remove it once I'm sure what text should be displayed instead of that */} 

                        <Typography 
                            component="div" 
                            sx={{ 
                                textAlign: 'left', 
                                typography: { xs: 'caption', md: 'subtitle1', lg: 'subtitle1'} 
                                }}
                            pb={2}
                        >
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
                            ullam deserunt labore perspiciatis praesentium? Perferendis fugit
                            excepturi quod, assumenda, tempora eos ad dolore, quos porro a facere
                            deleniti. Esse sint asperiores modi ipsa veritatis accusamus veniam
                            illo distinctio quia repudiandae quam nam ad ipsum, facilis beatae
                            aliquid aperiam vero eligendi error? Quas vitae, natus voluptatum
                            reiciendis repudiandae fuga sunt unde, officiis officia autem quia
                            eligendi error possimus et quasi libero! Amet reiciendis impedit,
                            soluta nisi harum voluptatibus vero saepe dicta quae excepturi dolorum
                            placeat, praesentium facilis labore asperiores. A, dolores
                            voluptatibus accusamus laboriosam quam placeat odio sapiente
                            voluptatem sed hic tenetur laborum cumque saepe natus nostrum,
                            repellat ipsa eos ipsum provident. Sapiente dolore quis consequuntur
                            dolor dolorem fugit doloremque velit molestiae perferendis aspernatur,
                            consequatur itaque quas ad atque, distinctio ipsam. Dolorum aspernatur
                            dolorem accusantium libero nulla exercitationem facere maiores quis
                            natus alias ratione quae harum, magnam omnis quo praesentium unde?
                        </Typography>

                    {/*quiz options avaliable to play from are rendered here*/}
                        {quiz.length===0 ? 
                            emptyMsg :
                            quiz
                                .filter((el) => el.isActive === true)
                                .map((el) => (
                                    <RenderQuizNames title={el.title} key= {el.id} id={el.id} />
                                ))
                        }
    
                    {/*enter your name here to play the quiz*/}
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography sx={{ fontWeight: 'bold' }} pb={2} pt={2}>Enter your name</Typography>
                            <TextField id="outlined-basic" size="small" variant="outlined" value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />   
                        </Box>

                    {/*Click this button to start the quiz*/}
                        <Box sx={{ textAlign: 'left' }} pt={2} pb={2}>
                            <Button variant="contained" onClick={startQuiz} >Start Quiz</Button>
                        </Box> 
                    </Box>
                </Box>       
        </ThemeProvider>       
    )
}