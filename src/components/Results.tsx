import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './Results.css'
interface ResultsProps {
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ onReset }) => {
  const score = useSelector((state: RootState) => state.quiz.score);

  return (
    <div>
      <h2>Your Score: {score}</h2>
      <button onClick={onReset}>Start New Quiz</button>
    </div>
  );
};

export default Results;
