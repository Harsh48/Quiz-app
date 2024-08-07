import React from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in;
`;

const QuestionText = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AnswerButton = styled.button`
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005f73;
  }
`;

interface QuestionProps {
  question: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const handleAnswer = (answer: string) => {
    onAnswer(answer === question.correct_answer);
  };

  return (
    <QuestionContainer>
      <QuestionText>{question.question}</QuestionText>
      <Answers>
        {question.type === 'multiple' ? (
          question.incorrect_answers.concat(question.correct_answer).map((answer, index) => (
            <AnswerButton key={index} onClick={() => handleAnswer(answer)}>
              {answer}
            </AnswerButton>
          ))
        ) : (
          <>
            <AnswerButton onClick={() => handleAnswer('True')}>True</AnswerButton>
            <AnswerButton onClick={() => handleAnswer('False')}>False</AnswerButton>
          </>
        )}
      </Answers>
    </QuestionContainer>
  );
};

export default Question;
