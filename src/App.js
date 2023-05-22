import React from "react";
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import Stats from "./components/Stats";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
     <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={quizStart && allData.length !==0 ? <Quiz allData={allData} Quizreset = {Quizreset} /> : <Home viewChange={viewChange} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}
