import React from 'react';
import './Question.css'

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
    <div>
      <h2>{question.question}</h2>
      {question.type === 'multiple' ? (
        question.incorrect_answers.concat(question.correct_answer).map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))
      ) : (
        <>
          <button onClick={() => handleAnswer('True')}>True</button>
          <button onClick={() => handleAnswer('False')}>False</button>
        </>
      )}
    </div>
  );
};

export default Question;
