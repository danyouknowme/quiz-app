import React, { useState } from 'react';
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
import styled from "styled-components";

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string,
}

const TOTAL_QUESTIONS = 10;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
`;

const TitleText = styled.h1`
  font-size: 56px;
  font-weight: 700;
  margin: 30px 0;
  color: #4257b2;
`;

const StartButton = styled.button`
  width: 150px;
  height: 70px;
  background-color: #ffdc62;
  color: #4257b2;
  border-radius: 0.25rem;
  border: none;
  font-size: 30px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #ffd12c;
    font-size: 32px;
  }
`;

const ScoreText = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  color: rgba(66, 87, 178, 0.9);
`;

const LoadingText = styled.p`
  font-size: 24px;
  color: rgba(66, 87, 178, 0.9);
`;

const NextButton = styled.button`
  margin-top: 30px;
  width: 240px;
  height: 60px;
  background-color: #7dd;
  color: #4257b2;
  border-radius: 0.25rem;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    font-size: 25px;
  }
`;

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const startTravia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Get user answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <Container className="App" style={{textAlign: 'center'}}>
      <TitleText>Quiz application</TitleText>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <StartButton onClick={startTravia}>Start</StartButton>
      ) : null }
      {!gameOver ? <ScoreText>Score: {score}</ScoreText> : null}
      {loading && <LoadingText>Loading Question ...</LoadingText>}
      {!loading && !gameOver && (
        <QuestionCard 
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />
      )}
      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <NextButton onClick={nextQuestion}>Next Question</NextButton>
      ) : null }
    </Container>
  );
}

export default App;
