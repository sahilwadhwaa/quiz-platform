import React from "react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleActive, deleteQuiz, editQuiz } from "../../features/quiz/quizSlice";
import { DeleteQuiz } from "../Modals/DeleteQuiz";
import { EditPage } from "./EditPage";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';

//MUI icons to show different actions users can take
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


export const QuizItems = ({ title, serial, active, id, date }) => {

  //This component renders the Quiz table items by taking props from QuizPage component

  //initialized dispatch to dispatch the state when an event occurs
  const dispatch= useDispatch()

  //state for Delete Modal
  const [modal, setModal] = useState(false)

  //state and handle function for edit Modal
  //this state was used to set the edit state, but the edit functionality is not yet available so this state shows the quiz questions
  const [edit, setEdit]= useState(false)
  //this function will send the id of the quiz that is clicked to the redux state
  const handleEdit = () => {
    setEdit(!edit)
    dispatch(editQuiz(id))
  }

  //function to delete the quiz
  const delQuiz = () => {
    dispatch(deleteQuiz(id))
  }
  //function to cancel deletion
  const handleDelete = () => {
    setModal(!modal)
  }
/*This component displays the title, status, date of creation and quiz actions */
  return (
      <TableRow
          key={id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              <TableCell align="center" >{serial}.</TableCell>
              <TableCell align="center">{title}</TableCell>
              <TableCell align="center">
              {/*clicking this switch button will toggle the active status of the quiz */}
                  <FormControlLabel 
                      control={<Switch
                                  checked={active}
                                  onClick={()=> dispatch(toggleActive(id))}
                                  inputProps={{ 'aria-label': 'controlled' }}
                              />} 
                      label={active? "Active": "Inactive"} 
                  />
              </TableCell>

              <TableCell align="center">{date}</TableCell>
              <TableCell align="center">
                <NavLink to="/play-quiz">
                  <IconButton aria-label="delete">
                    <PlayArrowIcon />
                  </IconButton>
                </NavLink>

                <IconButton onClick={()=> handleEdit()}>
                  <VisibilityIcon />
                </IconButton>

                <IconButton aria-label="delete" onClick={()=>setModal(!modal)}>
                  <DeleteIcon />
                </IconButton>

              </TableCell>

              {/*This will display the delete modal or the show questions modal depending on which icon is clicked*/}
              {modal && <DeleteQuiz modal={modal} handleDelete={handleDelete} delQuiz={delQuiz} id={id} />}
              {edit && <EditPage edit={edit} handleEdit={handleEdit} /> }
              
          </TableRow>
  )
}