//import the required libraries/components

import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import myquiz from "../../images/my_quiz.jpg"
import newquiz from "../../images/new_quiz.jpg"
import playquiz from "../../images/play_quiz.jpg"
import {HomeCard} from "./HomeCard"

// this is our homepage which will route us to different pages
//This component has a reusable component which in turn displays the homepage. 
//Props are passed to the HomeCard component

export const Home= () => {
  return (

      <Grid container 
        flexDirection= "row" 
        justifyContent={"center"} 
        alignItems="center" 
        style={{ minHeight: '100vh' }}
        >
        <Grid>
            <HomeCard
                heading= "Create New Quiz"
                image= {newquiz}
                path="create-new"
                delay={0.25} 
            />
        </Grid>

        <Grid>  
          <HomeCard
            heading= "My Quizzes" 
            image={myquiz}
            path="my-quizes"
            delay={0.35}
            /> 
        </Grid>

        <Grid>  
          <HomeCard
                heading= "Play Quiz" 
                image={playquiz}
                path= "play-quiz"
                delay={0.45}
            />  
        </Grid>

      </Grid>
  );
}
