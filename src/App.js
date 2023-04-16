import React from "react";
import Home from "./components/Home"
import Quiz from "./components/Quiz"

export default function App() {
  const [allData, setAllData] = React.useState([])
  const [quizStart, setQuizStart] = React.useState(false)
  function viewChange(propsQuestionsAnswers) {
    setAllData(propsQuestionsAnswers)
    setQuizStart(true)
  }
  return (
    <div className="app-main">
      <div className="container">
        {quizStart ? <Quiz allData={allData} /> : <Home viewChange={viewChange} />}
      </div>
    </div>
  )
}
