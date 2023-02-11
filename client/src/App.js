
import './App.css';
import { useState, useEffect, useRef } from 'react';

const App = () => {

  const [data, setData] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const dataRetrieved = useRef(false);

  useEffect(() => {
    // ensures we retrieve characters only once on startup
    if (dataRetrieved.current) return;
    dataRetrieved.current = true;
    retrieveCharacters();
  });

  /* fetches 4 random disney characters for the round */
  const retrieveCharacters = async () => {
    try {
      const res = await fetch('api');
      const data = await res.json();
      setData(data.disneyChars);
    } catch (error) {
      console.log(error);
    }
  }

  /* submits the user's answer and increments score if correct */
  const submitAnswer = async (chosen) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chosen)
    };
    // post req user's submission that returns boolean stating if answer is correct
    try {
      const res = await fetch('submit', requestOptions);
      const data = await res.json();
      if (data.correctAns) setScore(x => x + 1);
    } catch (error) {
      console.log(error);
    }
  }

  /* when user chooses an answer...
    - it is sent to backend and they gain a point if picked correct
    - 4 new characters are chosen for the next round
    - moves onto next round
  */
  const checkAnswer = (chosen) => {
    submitAnswer(chosen);
    retrieveCharacters();
    setRound(x => x + 1);
  }

  /* game starts over if user picks the option */
  const restartGame = () => {
    setRound(1);
    setScore(0);
  }

  /* displays the 4 disney characters alongside the question and the image every round */
  const displayRound = () => {
    return (
      <div className='App'>
        <div id='round'> <h2> Round {round} </h2> </div>
        <img className='image' alt='disney character' src={data.find(el => el.imageUrl !== undefined).imageUrl} />
        <div id='question'> Which film is this disney character from? </div>
        <div className="options-container">
          <div id='box1' className='box' onClick={() => checkAnswer(data[0])}> {data[0].film} </div>
          <div id='box2' className='box' onClick={() => checkAnswer(data[1])}> {data[1].film} </div>
          <div id='box3' className='box' onClick={() => checkAnswer(data[2])}> {data[2].film} </div>
          <div id='box4' className='box' onClick={() => checkAnswer(data[3])}> {data[3].film} </div>
        </div>
      </div>
    );
  }

  /* displays game over screen with the total score and an option to play again */
  const displayGameOver = () => {
    return (
      <div className='App'>
        <div className='game-over-screen'>
          <div> <h1> Score: {score} </h1> </div>
          <div id='play-again' onClick={() => restartGame()}> <h2> Play again? </h2> </div>
        </div>
      </div>
    );
  }

  /* game is played for up to 10 rounds until the end credits are displayed */
  if (data) {
    return round <= 10 ? displayRound() : displayGameOver();
  }
}

export default App;
