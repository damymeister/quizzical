import React from "react";
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import Navbar from "./components/Navbar"
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
export default function App() {
  const [allData, setAllData] = React.useState([])
  const [quizStart, setQuizStart] = React.useState(false)
  const [resetQuiz, setResetQuiz] = React.useState(false)
  
  function viewChange(propsQuestionsAnswers) {
    setAllData(propsQuestionsAnswers)
    setQuizStart(true)
  }

  function Quizreset(){
    setResetQuiz(true)
    setQuizStart(false);
  }
  return (
    <div className="app-main">
      <div className="container">
        <Navbar />
      {quizStart && allData.length !==0 ? <Quiz allData={allData} Quizreset = {Quizreset} /> : <Home viewChange={viewChange} />}
      </div>
    </div>
  )
}
