import React from "react"
import Navbar from "./Navbar"
import checkToken from "./authentication/checkToken";
import "./styles/home.css"
import { useSelector } from 'react-redux';
export default function Home(props) {
	const [clickButtonavilable, setclickButtonavilable] = React.useState(false)
	const [isHovered, setIsHovered] = React.useState(false);
    const [gameOptions, setGameOptions] = React.useState(
		{
			category: 9,
			amount: 5,
			type: "multiple"
		}
	);

	const [allQuestionsandAnswers, setallQuestionsandAnswers] = React.useState([])

	const handleMouseEnter = () => {
		setIsHovered(true);
	  };
	
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
	const fetchData = async () => {
	  if (gameOptions.category !== "" && gameOptions.amount !== 0 && gameOptions.type !== "" && checkToken()) {
		const url =
		  "https://opentdb.com/api.php?amount=" + gameOptions.amount + "&category=" + gameOptions.category + "&type=" + gameOptions.type;
		try {
		  const response = await fetch(url);
		  const data = await response.json();
		  if (data.results && data.results.length > 0) {
			setclickButtonavilable(true);
			setallQuestionsandAnswers(data.results);
		  } else {
			setallQuestionsandAnswers([]);
		  }
		} catch (error) {
		  console.log(error);
		}
	  } else {
		setallQuestionsandAnswers([]);
		setclickButtonavilable(false);
	  }
	};
  
	fetchData();
  }, [gameOptions]);
  

  function changeView() {
	if(allQuestionsandAnswers.length){
	 props.viewChange(allQuestionsandAnswers)
	 props.ifTrueFalse(gameOptions.type)
	}
  }
  const themeMode = useSelector(state => state.mode);
    return(

<div className={`home-main ${themeMode}`}>
	  <Navbar/>
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
	<div onMouseEnter={handleMouseEnter}>
    <button className={clickButtonavilable ? "home-button": "home-button disabled"} disabled={!clickButtonavilable} onClick={changeView}>Start Quiz</button>
	</div>
	{isHovered && !checkToken ? <span className="log-in-span">You need to log in</span> : ""}
    </div>
  </div>
    )
}