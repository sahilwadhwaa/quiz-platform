import { createSlice } from "@reduxjs/toolkit";

//  this is our initital state of the app //
const initialState = {
    quiz: [],
    latestquiz: [],
    name: "",
    playquiz: [],
    editquiz: [],
    answer : "",
    finalanswers: []
}

export const quizSlice= createSlice({
    name: 'quiz',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        getName: (state, {payload}) => {
            //this reducer saves the name of the quiz-taker in redux state
            state.name = payload
        },

        addQuiz: (state, {payload}) => {
            //saves the quiz created in the Create New Quiz Page
            state.quiz= [...state.quiz, payload]
        },

        latestQuiz: (state, {payload}) => {
            //saves the quiz that was last created to show the saved questions
            state.latestquiz= payload
        },

        toggleActive: (state, {payload}) => {
            //to toggle the status of the quiz
            state.quiz.map((el)=>{
                if(el.id===payload) el.isActive=!el.isActive
                return el
            })
        },

        deleteQuiz: (state, {payload}) => {
            //to delete the quiz
            const filteredArr = state.quiz.filter((el) => el.id !== payload)
            state.quiz= [...filteredArr]
        },

        editQuiz: (state, {payload}) => {
            //to show Questions in the My Quizzes page
            //originally intended to save the quiz that was about to be edited
            state.editquiz= state.quiz.filter((el) => el.id === payload)
        },

        playQuiz: (state, {payload}) => {
            //the quiz that's about to be played by the user
            state.playquiz= state.quiz.find((el)=> el.id===payload)
        },

        setAnswer: (state, {payload}) => {
            //option selected while playing the quiz
            state.answer = payload
        },
        setFinalAnswer: (state, {payload}) => {
            //saving the final answers submitted by the user
            state.finalanswers= [...state.finalanswers, payload]
        },

        resetAnswer: (state) => {
            //resetting the answer state to hold the answer for next question
            state.answer= ""
        },

        resetQuiz: (state) => {
            //resetting answer and finalanswer when the quiz finishes 
            state.answer= ""
            state.finalanswers= []
        }
    }
})

//exporting all the reducers
export const {getName, addQuiz, latestQuiz, toggleActive, deleteQuiz, editQuiz, playQuiz, setAnswer, setFinalAnswer, resetAnswer, resetQuiz}= quizSlice.actions
export default quizSlice.reducer;