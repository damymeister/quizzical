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

    function restartGame() {
      setAllAnswers([]);
      setSelectedAnswerIndexes([]);
      setCorrectAnswers([]);
      setAllAnswersChecked(false);
      setendGame(true);
      props.Quizreset(true);
    }

    React.useEffect(() => {
        if (allData) {
            const ans = (
              allData.map((data) => [            
                data.correct_answer,            
                ...data.incorrect_answers          
            ])
            );
            setAllAnswers(ans);
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
        newSelectedAnswerIndexes[questionIndex] = answerIndex
        setSelectedAnswerIndexes(newSelectedAnswerIndexes);
        console.log(correctAnswers)
        if (answerIndex === correctAnswers[questionIndex]) {
          console.log("Poprawna odpowiedź!")
        } else {
          console.log("Niepoprawna odpowiedź!")
        }
    }

    const answerAndQuestionsRender = allData && allData.map((data, questionIndex) => {
          return(
            <div className="questions-main" key={questionIndex}>
              <h3 className="question-question">{decode(data.question)}</h3>
              <div className="all-answers">
              {allAnswers[questionIndex] && allAnswers[questionIndex].map((answer, answerIndex) => (
                <button
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
  /* DO ZROBIENIA JESZCZE TERAZ 1. ZEBY PO ZAZNACZENIU 5 ODPOWIEDZI PRZYCISK ROBIL SIE ENABLED. A POTEM ZEBY WYSWIETLAL WYNIKI. */
    return(
      <div className="quiz-main">
           <div className="blob-top"></div>
          {allData ? answerAndQuestionsRender : <Home />}
          {endGame ? (
          <button className = "quiz-button" onClick = {restartGame}>
          Play Again
        </button>
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
