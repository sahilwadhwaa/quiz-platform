import * as React from 'react';
import { useSelector } from 'react-redux';
import { EditDetails } from './EditDetails';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//basic styling of the edit Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: 380, md: 800, lg: 1000},
  bgcolor: 'background.paper',
  border: '2px solid #f5f5f5',
  boxShadow: 24,
  p: {xs: 1.5, md: 3, lg: 4} ,
  height:'100%',
  maxHeight: {xs: 450, md: 500, lg: 500},
  display:'block',
  overflow : 'scroll'
};

export const EditPage = ({edit, handleEdit}) => {

  //redux state is fetched that was sent when the edit button was clicked in the QuizItems component  
  const Quiz = useSelector((state) => state.quiz.editquiz)

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={edit}
        onClose={handleEdit}
        closeAfterTransition
        style={{ backdropFilter: "blur(4px)" }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={edit}>
          <Box sx={style} >
          <Typography 
            id="transition-modal-title" 
            variant="h5" component="h2" 
            sx={{fontWeight: 'bold', textAlign: 'center'}}>
                {Quiz[0].title}
            </Typography>

          {/* the questions and options will be rendered in the below component */}
            {Quiz[0].questions.map(({question, options}, index) => (
                <EditDetails
                  question={question}
                  options={options}
                  index={index}
                  key={index}
                />))} 
           
              <Box 
                textAlign='right' 
              >
              <Button 
                variant="outlined" color="error" 
                sx={{ 
                  mt: {xs: 2,lg: 5}
                 }}
                onClick={()=> handleEdit()}
              >
                Close
              </Button>
              </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}