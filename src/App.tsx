import React from 'react';
// Components
import QuestionCard from "./components/QuestionCard";

const App = () => {

  const startTravia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }
  
  return (
    <div className="App">
      <h1>Quiz application</h1>
      <button className="start" onClick={startTravia}>
        Start
      </button>
      <p className="score">Score: </p>
      <p>Loading Question ...</p>
      <QuestionCard />
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
