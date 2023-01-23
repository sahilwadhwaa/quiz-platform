import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//required reducers are imported
import { addQuiz, latestQuiz } from "../../features/quiz/quizSlice";

import { AnswerCard } from "./AnswerCard"
import { SaveQuiz } from "../Modals/SaveQuiz";

//required MUI components
import { Typography, Box, TextField, Button, IconButton, Checkbox , Stack} from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import "./styles.css"



export const NewQuiz= () => {

    //dispatch is initialised
    const dispatch = useDispatch()
    
    //capture states of questions answers, options, title and description etc
    const [count, setCount] = useState(1)

    //contains array of options of one question
    const [option, setOption] = useState([])

    //contains set of questions belonging to one quiz
    const [ques, setQues]= useState([])

    //this value will trigger useEffect hook
    const [add, setAdd]= useState(false)
    const [answerLength, setanswerLength] = useState(false)

    //contains the current active option that is being added
    const [optVal, setOptVal]= useState('')

    //contains current checked option's value
    const [checked, setChecked] = useState(false)

    //contains the ongoing question
    const [que, setQue]= useState('')

    //contains the title of the quiz
    const [title, setTitle]= useState('')

     //contains the description of the quiz
    const [desc, setDesc]= useState('')

    //contains the modal state that will be displayed when save button is clicked
    const [openModal, setOpenModal] = useState(false)

    //set state of the checked option
    const handleChange = (event) => {
      setChecked(event.target.checked)
    }

    //was looking to use localStorage to store the questions but it was getting too complex, hence used the useState hook
   /*useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(ques));
    }, [ques])*/

    //this useEffect hook depends on a side effect that when a question is added to the local state
    //display a message that question is added for one second
    //dependency array includes add and answerLength values

    useEffect(() => {
        const timeOut = setTimeout(() => {
          if (add) {
            setAdd(false);
          }
        }, 1000);
    
        const timeOut2 = setTimeout(() => {
          if (answerLength) {
            setanswerLength(false);
          }
        }, 1000);
    
        return () => {
          clearTimeout(timeOut);
          clearTimeout(timeOut2);
        };
      }, [add, answerLength]);


    //function to convert Date to a displayable format
    function formatDate(newDate) {
        const months = {
          0: 'January',
          1: 'February',
          2: 'March',
          3: 'April',
          4: 'May',
          5: 'June',
          6: 'July',
          7: 'August',
          8: 'September',
          9: 'October',
          10: 'November',
          11: 'December',
        }
        const d = newDate
        const date = d.getDate()
        const monthName = months[d.getMonth()]
        const hours= d.getHours()
        const minutes= d.getMinutes()
        const formatted = `${date} ${monthName}, ${hours<10 ? `0${hours}`: `${hours}`}:${minutes<10 ? `0${minutes}`: `${minutes}` } `
        return formatted.toString()
      }

    //  these are all the handlers used to get user info and update the complex state of our app //
    const addOption = () => {

        //fn to add optVal to the local state of optVal
        if (optVal === "") {
            alert('Enter a value to add')
            return
          }
      
        if (option.length >= 4) {
            setOption((prevOption) => [...prevOption])
            alert('You can have at most 4 options')
        }

        //making an Option object containing relevant info
        else {
            const Option= {
                opt: optVal,
                correct: checked,
                id: Math.random() * 10
            }

            //adding the options to the option state
            setOption((prevOption) => [...prevOption, Option])
            //console.log(optVal)
        }

        //resetting the Optval and checked state
        setOptVal("")
        setChecked(false)
    }

    const addQuestion= () => {

        //if no question is typed and the user hits add question, run this
        if (que === "" || option.length === 0) {
            //setQue('')
            alert('Enter a Question to add it!')
            return
        }

        //add a question object to the Ques state only when more than 2 options are rendered
        if (option.length > 2) {
        const Question = {
            question: que,
            options: option,
            id: count
        };
        //console.log(Question)

        //update the question no. count
        setCount((prevCount) => prevCount + 1)
        setQues((prevQues) => [...prevQues, Question])

        //resetting the options state
        setOption([])

        //display the message written in useEffect hook
        setAdd(true)
        setQue('')
        } else {
        setanswerLength(true)
        }
    }


    const onDelete = (id) => {

        //remove the option by filtering out the id from the option state array
        const filteredArr = option.filter((el) => el.id !== id)
        setOption(filteredArr)
    }


    const onSave= () => {

        if (title === "" || ques.length <= 0) {
            alert("Fill out all the fields")
            return
        }

        //save the date of the quiz creation in Quiz object
        const date= new Date()

        //save all the necessary info about the quiz in this Quiz object
        const Quiz = {
            title: title,
            description: desc,
            questions: ques,
            id: Math.random(),
            createdOn: formatDate(date),
            isActive: true
        }
        
        //update the redux state with Quiz object
        dispatch(addQuiz(Quiz))

        //update latestquiz to display the questions previously entered
        dispatch(latestQuiz(Quiz))

        //reset all the local state values
        setQues([])
        setCount(1)
        setTitle('')
        setDesc('')

        //display the view questions modal
        handleModal()
    }

    const handleModal = () => {
        setOpenModal(!openModal)
        //console.log(openModal)
    }


    return (

        //MUI box component with responsive padding values
        <Box 
            sx={{  
                pt: {xs: 2, md: 3, lg: 4},
                pb: {xs: 2, md: 3, lg: 4},
                pl: {xs: 1, md: 2, lg: 6},
                pr: {xs: 1, md: 2, lg: 6}
            }}
        >
            <Box sx={{ 
                textAlign: 'left',
                border: '1px solid',
                borderColor: 'grey.500',
                borderRadius: 1
                }} pb={3}>

                {/*Text field where user will enter the title of the quiz */}

                <Box pt={2} pl={1} pr={1}>
                    <TextField fullWidth label="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Box>  

                {/*Text field where user will enter the description of the quiz */}
                <Box pt={2} pl={1} pr={1}>
                    <TextField fullWidth label="Add Description" id="description" multiline={true} rows="3" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                </Box>
            </Box>

                {/*Text field where user will enter the questions to be added */}
                <Box 
                    pt={2}
                    sx={{pl: {xs: 0, md: 1, lg: 1}}}
                 >
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'right'}} pb={2}>Question {count} </Typography>
                    <TextField size="small" fullWidth id="question" value={que} onChange={(e) => setQue(e.target.value)} />
                </Box> 

                {/*This message will pop up whenever you add a question to the state*/}
                {add && <Typography sx={{ color: 'success.main' }} pb={2} pt={2}>Question has been added! </Typography> }

                {/*The answer card that will render the entered option and the checkbox showing whether it's correct or not is rendered here*/}
                <Stack 
                    direction= 'row'  
                    sx={{
                        flexWrap:{xs: 'wrap', md: 'wrap', lg: 'nowrap'}, 
                        justifyContent:{xs: 'center', md: 'left', lg: 'center'}
                    }}
                >
                    {option.map((el, i)=>(
                        <AnswerCard 
                        text={el.opt}
                        id={el.id}
                        key={i}
                        correct={el.correct}
                        onDelete={onDelete}
                        />  
                    ))}
                </Stack>
                
                <Box pt={4} sx={{textAlign: 'center'}}>

                {/*checking this option will send to the 'checked' state that this option is the correct one*/}
                    <Typography variant="caption">
                        Correct 
                        <Checkbox size="small" checked={checked} onChange={handleChange} />
                    </Typography>
                
                {/* user can enter their options in this text field*/}
                {/*to confirm the addition of the option, click on the + icon and it will be displayed*/}
                    <TextField
                        label="New Answer"
                        id="outlined-size-small"
                        size="small"
                        value={optVal}
                        onChange={(e) => setOptVal(e.target.value)}
                    />
                    <IconButton color="primary" onClick={addOption}><AddBoxOutlinedIcon /></IconButton>
                    </Box>
                
                {/*Clicking on this button will add the question and it's options to the "Ques state" */}
                <Box pt={2} pl={1} pr={1} sx={{textAlign: 'center'}}>
                    <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} onClick={addQuestion} > Add Question</Button>
                </Box>

                {/*saving the quiz will dispatch the addQuiz reducer and update the redux state*/}
                {/*all the local states will be reset*/}
                <Box sx={{ textAlign: 'right' }} pt={2} pl={1} pr={1}>
                    <Button variant="contained" onClick={onSave} >Save</Button>
                </Box>

                {/*on clicking save, a copy of the state will be sent to latestquiz, which will display the questions previously entered*/}
                {/*this will open a modal having two questions of either viewing the questions or close the modal*/}
                {openModal && <SaveQuiz open={openModal} handleModal={handleModal}/>}            
        </Box>      
    )
}