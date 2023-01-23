import { configureStore } from '@reduxjs/toolkit';
import quizReducer from "../features/quiz/quizSlice"
import modalReducer from "../features/modal/ModalSlice"

//A store is an immutable object tree in Redux. 
//A store is a state container which holds the application's state. 
//Redux can have only a single store in your application.
export const store = configureStore({
  //the reducers are needed to be specified in store
  reducer: {
    quiz : quizReducer,
    modal: modalReducer
  },
});
