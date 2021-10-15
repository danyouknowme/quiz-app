import React, { useState } from 'react';
import { fetchQuizQuestions, Difficulty } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

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

      {/* <QuestionCard 
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
