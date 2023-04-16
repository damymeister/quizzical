import React from "react"
import App from "../App";
export default function Home(props) {
	const [clickButtonavilable, setclickButtonavilable] = React.useState(false)

    const [gameOptions, setGameOptions] = React.useState(
		{
			category: 9,
			amount: 5,
			type: "multiple"
		}
	);

	const [allQuestionsandAnswers, setallQuestionsandAnswers] = React.useState([])


  const urlChange = event => {
    const {name, value} = event.target
    setGameOptions(prevGameoptions =>{
        return {
            ...prevGameoptions,
            [name]: value
        }

    })
  }

  React.useEffect(() => {
	if (gameOptions.category !== "" && gameOptions.amount !== 0 && gameOptions.type !== "") {
		setclickButtonavilable(true)
	  const url =
		"https://opentdb.com/api.php?amount=" + gameOptions.amount + "&category=" + gameOptions.category +"&type=" + gameOptions.type;
	  fetch(url)
		.then((res) => res.json())
		.then((data) => setallQuestionsandAnswers(data.results))
		.catch((error) => console.log(error));
	}
  }, [gameOptions]);

  function changeView() {
    props.viewChange(allQuestionsandAnswers)
  }
console.log(allQuestionsandAnswers)
    return(

  <div className="home-main">
    <div className="blob-top"></div>
    <div className="home-centered">
    <div className="home-title">Quizzical</div>
    <div className="home-desc">Answer the questions and test your knowledge!</div>
    <div className="grid-select">
    <div className="choose">Category:</div>
    <select
									name="category"
									id="category"
									className="custom-select"
									value={gameOptions.category}
									onChange={urlChange}
								>
									<option value="9">General Knowledge</option>
									<option value="10">Entertainment: Books</option>
									<option value="11">Entertainment: Film</option>
									<option value="12">Entertainment: Music</option>
									<option value="13">Entertainment: Musicals &amp; Theatres</option>
									<option value="14">Entertainment: Television</option>
									<option value="15">Entertainment: Video Games</option>
									<option value="16">Entertainment: Board Games</option>
									<option value="17">Science &amp; Nature</option>
									<option value="18">Science: Computers</option>
									<option value="19">Science: Mathematics</option>
									<option value="20">Mythology</option>
									<option value="21">Sports</option>
									<option value="22">Geography</option>
									<option value="23">History</option>
									<option value="24">Politics</option>
									<option value="25">Art</option>
									<option value="26">Celebrities</option>
									<option value="27">Animals</option>
									<option value="28">Vehicles</option>
									<option value="29">Entertainment: Comics</option>
									<option value="30">Science: Gadgets</option>
									<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
									<option value="32">Entertainment: Cartoon &amp; Animations</option>
								</select>
    </div>
    <div className="grid-select">
    <div className="choose">Number of Questions:</div>
    <select
									name="amount"
									id="amount"
									className="custom-select"
									value={gameOptions.amount}
									onChange={urlChange}
								>
									<option value="5">5</option>
									<option value="10">10</option>
								</select>
    </div>
    <div className="grid-select">
    <div className="choose">Type:</div>
    <select
									name="type"
									id="type"
									className="custom-select"
									value={gameOptions.type}
									onChange={urlChange}
								>
									<option value="multiple">Multiple Choice</option>
									<option value="boolean">True or False</option>
								</select>
    </div>
    <button className="home-button" disabled={!clickButtonavilable} onClick={changeView}>Start Quiz</button>
    </div>
    <div className="blob-bottom"></div>
  </div>

    )
}