import * as React from 'react';
import { useState } from 'react';
import { EditModal } from './EditModal';
//MUI components
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

//styling code to make the UI responsive
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: 370, md: 500, lg: 500},
  bgcolor: 'background.paper',
  border: '2px solid #f5f5f5',
  boxShadow: 24,
  p: {xs: 2, md: 3, lg: 4}
};

export const SaveQuiz = ({open, handleModal}) => {
    
    //this modal displays an option to view the previously entered questions

    //this state will handle the display of questions
    const [edit, setEdit]= useState(false)
    const handleEdit = () => {
        setEdit(!edit)
    }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        style={{ backdropFilter: "blur(4px)" }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} >
            <Typography 
            id="transition-modal-title" 
            align="center"
            sx={{ 
                pb: {xs: 1, md: 2, lg: 3}, 
                typography: { xs: 'h6', lg: 'h5' }
                }}
          >
                <span style={{ fontWeight: 'bold' }}>Quiz created successfully!</span>
            </Typography>

            {/*clicking on view ques will open this modal and display the questions entered by the user*/}
            {edit && <EditModal edit={edit} handleEdit={handleEdit} /> }
            <Stack 
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{mt: {xs:3, md:5, lg:5}}}
            >
              <Button 
                  variant="outlined"
                  color="secondary" 
                  onClick={()=> handleEdit()}
                  >
                  View Questions
                  </Button>
                  <Button 
                  variant="outlined" color="error" 
                  onClick={()=> handleModal()}
                  >
                  Close
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}