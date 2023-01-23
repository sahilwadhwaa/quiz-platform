import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import { Home } from './Components/HomePage/Home';
import { Navbar } from './Components/Navbar/Navbar';
import { QuizPage } from './Components/MyQuiz/QuizPage';
import { CreateNewForm } from './Components/CreateNew/CreateNewForm'
import { CreateNewModal } from './Components/Modals/CreateNewModal';
import { PlayQuiz } from './Components/PlayQuiz/PlayQuiz';
import { Quiz } from './Components/PlayQuiz/Quiz';
import { QuestionCard } from './Components/PlayQuiz/QuestionCard';
import { useSelector } from 'react-redux';

function App(){

  //the modal's redux state is selected
  const { isOpen }= useSelector((store)=> store.modal )

  return (
    //Navbar is rendered here to make it present in all the routed web pages
    <div className="App">
      <Navbar />
      {/*render the Select Question Type Modal if redux state's value is true*/}
      {isOpen && <CreateNewModal />}

      {/*different routes required for the Quiz App to run */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-quizes" element={<QuizPage />} />
        <Route path="/create-new" element={<CreateNewForm />} />
        <Route path='/play-quiz' element={<PlayQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/start-quiz" element={<QuestionCard />} />
      </Routes>
    </div>
  )
}

export default App;
