import React from "react";
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import Stats from "./components/Stats";
import Registration from "./components/authentication/Registration";
import Login from "./components/authentication/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
  const [allData, setAllData] = React.useState([])
  const [quizStart, setQuizStart] = React.useState(false)
  const [resetQuiz, setResetQuiz] = React.useState(false)
  const [ifTrueFalseS, setIfTrueFalseS] = React.useState(false)
  function viewChange(propsQuestionsAnswers) {
    setAllData(propsQuestionsAnswers)
    setQuizStart(true)
  }
  function ifTrueFalse(value){
    if(value === "multiple"){
      setIfTrueFalseS(false)
    }
    else{
      setIfTrueFalseS(true)
    }
  }

  function Quizreset(){
    setResetQuiz(true)
    setQuizStart(false);
  }
  return (
    <div className="app-main">
     <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={quizStart && allData.length !==0 ? <Quiz allData={allData} Quizreset = {Quizreset} ifTrueFalseS= {ifTrueFalseS}/> : <Home viewChange={viewChange} ifTrueFalse = {ifTrueFalse}/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}
