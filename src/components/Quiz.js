import React from "react";
import Home from "./Home"
import { decode } from 'html-entities';

export default function Quiz(props){
    const allData = props.allData;
    const [allAnswers, setAllAnswers] = React.useState([]);
    const [selectedAnswerIndexes, setSelectedAnswerIndexes] = React.useState([]);
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [allAnswersChecked, setAllAnswersChecked] = React.useState(false)
    const [endGame, setendGame] = React.useState(false)
    const [result, setResult] = React.useState(0)
    const [countAnswers, setcountAnswers] = React.useState(1)
    const [clickedQuestions, setClickedQuestions] = React.useState([]); 
    function restartGame() {
      setAllAnswers([]);
      setSelectedAnswerIndexes([]);
      setCorrectAnswers([]);
      setAllAnswersChecked(false);
      setendGame(true);
      setResult(0);
      setcountAnswers(0);
      setClickedQuestions([])
      props.Quizreset(true);
    }
    function shuffle(answer){
      let newAnswer = [...answer];
      for (let i = 0; i < newAnswer.length; i++){
        const randomIndex = Math.floor(Math.random() * newAnswer.length);
        let temp = newAnswer[i]
        newAnswer[i] = newAnswer[randomIndex]
        newAnswer[randomIndex] = temp
      }
      return newAnswer;
    }
    
    React.useEffect(() => {
      if (countAnswers != 0 && correctAnswers.length != 0 && countAnswers === (correctAnswers.length + 1)) {
        setAllAnswersChecked(true);
      }
    }, [countAnswers]);
    React.useEffect(() => {
        if (allData) {
            const ans = (
              allData.map((data) => [            
                data.correct_answer,            
                ...data.incorrect_answers          
            ])
            );
            setAllAnswers(ans.map(answers => shuffle(answers)));
        }
    }, [allData]);
    
    React.useEffect(() => {
        if (allData) {
            const corrans = (
              allData.map((data) => [           
                 data.correct_answer,            
                 ...data.incorrect_answers          
                ].indexOf(data.correct_answer))
            );
            setCorrectAnswers(corrans)
        }
    }, [allData])
    
    function answerbuttonChanges(answerIndex, questionIndex, answer) {
        const newSelectedAnswerIndexes = selectedAnswerIndexes.slice()

        if(clickedQuestions.indexOf(questionIndex) !== -1)
        {
          setcountAnswers(countAnswers);
        }
        else{
          setcountAnswers(countAnswers + 1 );
          setClickedQuestions([...clickedQuestions, questionIndex]);
        }
        newSelectedAnswerIndexes[questionIndex] = answerIndex
        setSelectedAnswerIndexes(newSelectedAnswerIndexes);
        if (answer === allData[questionIndex].correct_answer) {
          setResult(result + 1)
        } 
    }

    const answerAndQuestionsRender = allData && allData.map((data, questionIndex) => {
          return(
            <div className="questions-main" key={questionIndex}>
              <h3 className="question-question">{decode(data.question)}</h3>
              <div className="all-answers">
              {allAnswers[questionIndex] && allAnswers[questionIndex].map((answer, answerIndex) => (
                <button
                  disabled={endGame}
                  key={answerIndex}
                  className={selectedAnswerIndexes[questionIndex] === answerIndex ? "question-answer-clicked" : "question-answer"}
                  onClick={() => answerbuttonChanges(answerIndex, questionIndex, answer)}
                >
                  {decode(answer)}
                </button> 
              ))}
              </div>
            </div>
          )
    });
    return(
      <div className="quiz-main">
           <div className="blob-top"></div>
          {allData ? answerAndQuestionsRender : <Home />}
          {endGame ? (
          <div className="scoreAndButton">
          <div className="score">
            You scored {result} out of {correctAnswers.length} points.
          </div>
          <button className = "quiz-button-again" onClick = {restartGame}>
          Play Again
          </button>
        </div>
          ):(
            <button className={allAnswersChecked ? "quiz-button" : "quiz-button-low"} disabled={!allAnswersChecked} onClick={() => setendGame(true)}>
            Check Answers
            </button>
          )}
        <div className="blob-bottom"></div>
        <div className="author">Developed by DamyMeister</div>
        </div>
    )
}
