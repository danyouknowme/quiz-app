import React from 'react'
// Types
import { AnswerObject } from "../App";
// Styles
import styled from "styled-components";

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNumber: number,
    totalQuestions: number
}

const Container = styled.div`
    width: 40vw;
    height: 60vh;
    background-color: #4257b2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 20px;
    color: #fff;
`;

const Wrapper = styled.div`
    width: 100%;
`;

const TitleText = styled.p`
    font-size: 40px;
    font-weight: 700;
`;

const QuestionText = styled.p`
    text-align: center;
    font-size: 30px;
    width: 80%;
    margin: 40px 0;
    color: #cedaf3;
`;

const AnswerContainer = styled.div``;

type ButtonAnswerProps = {
    correct: boolean,
    userClicked: boolean,
}

const ButtonAnswer = styled.button<ButtonAnswerProps>`
    width: 40%;
    margin: 5px 0;
    background-color: #ffdc62;
    color: #4257b2;
    border: none;
    height: 50px;
    border-radius: 0.25rem;
    cursor: pointer;
    border: ${({ correct, userClicked }) =>
        correct
            ? '3px solid green'
            : !correct && userClicked
            ? '3px solid red'
            : 'none'
    };

    &:hover {
        background-color: #fdc80a;
    }
`;

const TextAnswer = styled.span`
    font-size: 18px;
    font-weight: 600;
`;

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => {
    return (
        <Container>
            <TitleText>Question: { questionNumber } / { totalQuestions}</TitleText>
            <QuestionText dangerouslySetInnerHTML={{ __html: question }} />
            <Wrapper>
                {answers.map((answer) => (
                    <AnswerContainer key={answer}>
                        <ButtonAnswer 
                            correct={userAnswer?.correctAnswer === answer}
                            userClicked={userAnswer?.answer === answer}
                            disabled={userAnswer ? true : false} 
                            value={answer} 
                            onClick={callback}
                        >
                            <TextAnswer dangerouslySetInnerHTML={{ __html: answer }} />
                        </ButtonAnswer>
                    </AnswerContainer>    
                ))}
            </Wrapper>
        </Container>
    )
}

export default QuestionCard;
