import React from "react";
import Home from "./Home";
import checkToken from "./authentication/checkToken";
import jwt_decode from "jwt-decode";
import "./styles/quiz.css";
import axios from "axios";
import { decode } from "html-entities";
const { format } = require("date-fns");
export default function Quiz(props) {
  const allData = props.allData;
  const [allAnswers, setAllAnswers] = React.useState([]);
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [allAnswersChecked, setAllAnswersChecked] = React.useState(false);
  const [endGame, setendGame] = React.useState(false);
  const [result, setResult] = React.useState(0);
  const [countAnswers, setcountAnswers] = React.useState(1);
  const [clickedQuestions, setClickedQuestions] = React.useState([]);
  const [clickedCorrectAnswers, setclickedCorrectAnswers] = React.useState([]);
  const [isPreviousQuestionSet, setisPreviousQuestionSet] = React.useState([]);
  const [error, setError] = React.useState("");
  const [resMsg, setresMsg] = React.useState("");
  const [outcome, setOutcome] = React.useState("");
  const [isoutcomeSet, setisoutcomeSet] = React.useState(false)
  const restartGame = () => {
    setAllAnswers([]);
    setSelectedAnswerIndexes([]);
    setCorrectAnswers([]);
    setAllAnswersChecked(false);
    setendGame(true);
    setResult(0);
    setcountAnswers(0);
    setClickedQuestions([]);
    setclickedCorrectAnswers([]);
    setisPreviousQuestionSet([]);
    setisoutcomeSet(false);
    props.Quizreset(true);
  };
  
  React.useEffect(() => {
    setisoutcomeSet(true);
    calculateOutcome()
  }, [endGame]);

  async function calculateOutcome() {
    var outcome = (result / correctAnswers.length).toFixed(2);
    const token = checkToken();
    const decodedToken = jwt_decode(token);
    const userId = decodedToken._id;
    setOutcome(outcome);
    const date = new Date();
    const formattedDate = format(date, "dd-MM-yyyy HH:mm:ss");
    try {
      if(isoutcomeSet){
        const results = { userId, outcome: parseFloat(outcome), CurrentDate: formattedDate};
      const url = "http://localhost:5000/results";
      const { data: res } = await axios.post(url, results);
      setresMsg(res.message);
      setTimeout(() => {
        window.location = "/";
      }, 3000);
    }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  }

  function getClassName(selectedAnswerIndexes, questionIndex, answerIndex, endGame, answer) {
    if (endGame) {
      if (selectedAnswerIndexes[questionIndex] === answerIndex && answer === allData[questionIndex].correct_answer)
        return "question-answer correct ";
      else if (selectedAnswerIndexes[questionIndex] === answerIndex) return "question-answer incorrect";
      else return "question-answer";
    } else {
      return selectedAnswerIndexes[questionIndex] === answerIndex ? "question-answer clicked" : "question-answer";
    }
  }

  function shuffle(answer) {
    let newAnswer = [...answer];
    for (let i = 0; i < newAnswer.length; i++) {
      const randomIndex = Math.floor(Math.random() * newAnswer.length);
      let temp = newAnswer[i];
      newAnswer[i] = newAnswer[randomIndex];
      newAnswer[randomIndex] = temp;
    }
    return newAnswer;
  }

  React.useEffect(() => {
    if (countAnswers != 0 && correctAnswers.length != 0 && countAnswers === correctAnswers.length + 1) {
      setAllAnswersChecked(true);
    }
  }, [countAnswers]);

  React.useEffect(() => {
    if (allData) {
      const ans = allData.map((data) => [data.correct_answer, ...data.incorrect_answers]);
      setAllAnswers(ans.map((answers) => shuffle(answers)));
    }
  }, [allData]);

  React.useEffect(() => {
    if (allData) {
      const corrans = allData.map((data) => [data.correct_answer, ...data.incorrect_answers].indexOf(data.correct_answer));
      setCorrectAnswers(corrans);
    }
  }, [allData]);

  function answerbuttonChanges(answerIndex, questionIndex, answer) {
    const newSelectedAnswerIndexes = selectedAnswerIndexes.slice();
    const newisPreviousQuestionSet = isPreviousQuestionSet.slice();
    if (clickedQuestions.indexOf(questionIndex) !== -1) {
      setcountAnswers(countAnswers);
    } else {
      setcountAnswers(countAnswers + 1);
      setClickedQuestions([...clickedQuestions, questionIndex]);
    }
    newSelectedAnswerIndexes[questionIndex] = answerIndex;
    setSelectedAnswerIndexes(newSelectedAnswerIndexes);

    if (isPreviousQuestionSet[questionIndex] === undefined) {
      if (answer === allData[questionIndex].correct_answer) {
        setResult(result + 1);
        newisPreviousQuestionSet[questionIndex] = true;
        setisPreviousQuestionSet(newisPreviousQuestionSet);
      } else {
        setResult(result);
      }
    } else {
      if (isPreviousQuestionSet[questionIndex] === true) {
        // If previous answer was true
        if (answer !== allData[questionIndex].correct_answer) {
          setResult(result - 1);
          newisPreviousQuestionSet[questionIndex] = false;
          setisPreviousQuestionSet(newisPreviousQuestionSet);
        }
      } else {
        // If previous answer was false
        if (answer === allData[questionIndex].correct_answer) {
          setResult(result + 1);
          newisPreviousQuestionSet[questionIndex] = true;
          setisPreviousQuestionSet(newisPreviousQuestionSet);
        }
      }
    }
  }

  const answerAndQuestionsRender = allData && allData.map((data, questionIndex) => {
    return (
      <div className="questions-main " key={questionIndex}>
        <div className="question-icon">
          <h3 className="question-question ">{decode(data.question)}</h3>
          <div className={endGame ? (isPreviousQuestionSet[questionIndex] ? "correct-icon" : "incorrect-icon") : "correct-icon nonvisible"}></div>
        </div>
        <div className="all-answers">
          {allAnswers[questionIndex] &&
            allAnswers[questionIndex].map((answer, answerIndex) => (
              <button
                disabled={endGame}
                key={answerIndex}
                className={getClassName(selectedAnswerIndexes, questionIndex, answerIndex, endGame, answer)}
                onClick={() => answerbuttonChanges(answerIndex, questionIndex, answer)}
              >
                {decode(answer)}
              </button>
            ))}
        </div>
      </div>
    );
  });

  return (
    <div className="quiz-main">
      <div className="blob-top"></div>
      {allData ? answerAndQuestionsRender : <Home />}
      {endGame ? (
        <div className="scoreAndButton">
          <div className="score">
            You scored {result} out of {correctAnswers.length} points, and it is {outcome}% of correct answers.
          </div>
          <button className="quiz-button restartGame" onClick={restartGame}>
            Play Again
          </button>
        </div>
      ) : (
        <button className={allAnswersChecked ? "quiz-button" : "quiz-button disabled"} disabled={!allAnswersChecked} onClick={() => {
          setendGame(true);
        }
        }>
          Check Answers
        </button>
      )}
      <div className="blob-bottom"></div>
      <div className="author">
        Developed by <a href="https://www.linkedin.com/in/mateusz-adamczyk-062936209/" target="_blank">DamyMeister</a>
      </div>
    </div>
  );
}
