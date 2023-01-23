import React from "react";
//necessary MUI Components
import { Typography, Box, IconButton, Checkbox, Stack } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const AnswerCard = ({text, id, onDelete, correct}) => {

    //this component will render the options and their right/wrong 
    //status to show the user how many options they have created

    return(
        <Box 
            sx={{ border: '1px solid grey', borderRadius: 1 }}
            mt= {5} mr={5}
        >
            <Stack direction="row" justifyContent="space-between">
                <Typography 
                    sx={{ textAlign: 'left'}} 
                    pt={1} pb={1} pl={2}
                >
                        {text}
                </Typography>
                {/*clicking this icon will remove the option that was previously created*/}
                <IconButton color="disabled" onClick={()=> onDelete(id)}><DeleteOutlineIcon /></IconButton>

            </Stack>

            <Box 
                style={{ background: '#f5f5f5' }}
                sx={{pl: { xs: 13, md: 12, lg: 13 }}}
                >
                <Typography 
                    sx={{ textAlign: 'right'}} 
                    pt={1} pb={1} 
                    justifyContent="flex-end" 
                    variant="caption"
                >
                    Correct Answer 
                    <Checkbox size="small" checked={correct ? true : false} /> 
                </Typography>
            </Box>

        </Box>
    )
}