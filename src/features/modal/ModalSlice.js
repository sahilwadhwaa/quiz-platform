import { createSlice } from "@reduxjs/toolkit";

//modal's initial state
const initialState={
    isOpen: false
}

//this redux state is only used for one Modal
//i.e. the Select Question Type Modal
//because it renders as soon as the Create New Quiz Page is loaded
const modalSlice= createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openModal: (state)=>{
            state.isOpen= true
        },
        closeModal: (state)=>{
            state.isOpen= false
        }
    }
})

export const {openModal, closeModal}= modalSlice.actions
export default modalSlice.reducer