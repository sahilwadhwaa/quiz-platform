import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//css logic for the delete modal
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

export const DeleteQuiz = ({modal, handleDelete, delQuiz, id}) => {

  //this component will lt us delete a quiz and will be rendered when the user presses delete icon in My Quizzes section
  //takes props from the my Quizzes page 
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={handleDelete}
        closeAfterTransition
        style={{ backdropFilter: "blur(4px)" }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style} >
            <Typography 
            id="transition-modal-title" 
             component="h2" 
            sx={{ 
                pb: {xs: 1, md: 2, lg: 3}, 
                typography: { xs: 'h6', lg: 'h5' }
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Are you sure you want to delete?</span>
            </Typography>

            <Typography
              sx={{typography: { xs: 'subtitle2', lg: 'body1' }}}
            >
              Deleting this will result in loosing the file permanently and is not recoverable
            </Typography>
            
            <Box textAlign={'right'}>

            {/*pressing yes will dispatch the id of the selected quiz to 
            the redux state where delQuiz reducer will delete the quiz associated with the sent id*/}
              <Button 
                variant="contained"
                color="error"
                sx={{ mt: {xs: 2, md: 4, lg: 5} }} 
                onClick={()=> delQuiz(id)}
              >
                Yes
              </Button>

                {/*this will close the delete modal*/}
              <Button 
                variant="contained" color="error" 
                sx={{ mt: {xs: 2, md: 4, lg: 5}, ml: {xs: 2, md: 4, lg: 5} }} 
                onClick={()=> handleDelete()}
              >
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}