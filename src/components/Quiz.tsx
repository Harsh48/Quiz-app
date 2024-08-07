import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { nextQuestion, addScore, finishQuiz, setQuestions, resetQuiz } from '../redux/slices/quizSlice';
import { fetchQuizQuestions } from '../services/quizService';
import Question from './Question';
import Results from './Results';
import CategorySelection from './CategorySelection';
import DifficultySelection from './DifficultySelection';
import './Quiz.css'

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, status } = useSelector((state: RootState) => state.quiz);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(false);
    }
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
     console.log(questions)
     console.log(status)
  }, [questions]);


  const startQuiz = async () => {
    const questions = await fetchQuizQuestions(category, difficulty);
    console.log(questions)
    dispatch(setQuestions(questions));
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      dispatch(addScore(questions[currentQuestionIndex].type === 'multiple' ? 10 : 5));
    }
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setTimeLeft(30);
    } else {
      dispatch(finishQuiz());
    }
  };

  const handleReset = () => {
    dispatch(resetQuiz());
    setTimeLeft(30);
  };

  if (status === 'idle') {
    return (
      <div>
        <CategorySelection setCategory={setCategory} />
        <DifficultySelection setDifficulty={setDifficulty} />
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (status === 'finished') {
    return <Results onReset={handleReset} />;
  }

  return (
    <div>
      <div>Time left: {timeLeft} seconds</div>
      {questions.length > 0 && (
        <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default Quiz;
