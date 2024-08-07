import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styled from 'styled-components';

interface AnswerItemProps {
  correct: boolean;
}

const ResultsContainer = styled.div`
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
`;

const ResultsTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const ResetButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 15px 32px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #da190b;
  }
`;

const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AnswerItem = styled.li<AnswerItemProps>`
  margin-bottom: 10px;
  color: ${(props) => (props.correct ? 'green' : 'red')};
`;

interface ResultsProps {
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ onReset }) => {
  const score = useSelector((state: RootState) => state.quiz.score);
  const answers = useSelector((state: RootState) => state.quiz.answers);

  return (
    <ResultsContainer>
      <ResultsTitle>Your Score: {score}</ResultsTitle>
      <AnswerList>
        {answers.map((answer, index) => (
          <AnswerItem key={index} correct={answer.correct}>
            {answer.question} - Your answer: {answer.answer} ({answer.correct ? 'Correct' : 'Incorrect'})
          </AnswerItem>
        ))}
      </AnswerList>
      <ResetButton onClick={onReset}>Start New Quiz</ResetButton>
    </ResultsContainer>
  );
};

export default Results;
