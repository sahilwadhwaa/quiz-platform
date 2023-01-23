import React from "react"
import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material"

export const EditDetails = ({question, options, index}) => {

    //this component takes props from the EditPage component and renders them
    
    return (
        <>
            <Box>
                <Typography sx={{ fontWeight: 'bold' }} pt={3}>{index+1}.{question}</Typography>
            </Box>
            <Box pb={0.5} pt={0.5}>
            
    {/* options are rendered with the help of checkboxes but they're disabled so as the user can only view and not edit */}

                {options.map((option, index)=>{ 
                    return <FormControlLabel disabled control={ <Checkbox checked={option.correct ? true : false} />} key={index} label={option.opt} />
                })}  
            </Box>
                  
        </>
    )
}