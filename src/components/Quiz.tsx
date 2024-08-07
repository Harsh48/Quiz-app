import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { nextQuestion, addScore, finishQuiz, setQuestions, resetQuiz, addAnswer } from '../redux/slices/quizSlice';
import { fetchQuizQuestions } from '../services/quizService';
import Question from './Question';
import Results from './Results';
import CategorySelection from './CategorySelection';
import DifficultySelection from './DifficultySelection';
import GlobalStyles from '../styles/GlobalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
`;

const Timer = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const StartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

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
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    console.log('Questions in State:', questions);
  }, [questions]);

  const startQuiz = async () => {
    try {
      const fetchedQuestions = await fetchQuizQuestions(category, difficulty);
      console.log('Fetched Questions:', fetchedQuestions);
      dispatch(setQuestions(fetchedQuestions));
    } catch (error) {
      toast.error('Error fetching questions. Please try again.');
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    const question = questions[currentQuestionIndex];
    if(question){
    dispatch(addAnswer({
      question: question?.question,
      answer: isCorrect ? question.correct_answer : question.incorrect_answers[0], // Simplification for demo purposes
      correct: isCorrect,
    }));
   }
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
      <QuizContainer>
        <GlobalStyles />
        <CategorySelection setCategory={setCategory} />
        <DifficultySelection setDifficulty={setDifficulty} />
        <StartButton onClick={startQuiz}>Start Quiz</StartButton>
        <ToastContainer />
      </QuizContainer>
    );
  }

  if (status === 'finished') {
    return <Results onReset={handleReset} />;
  }

  return (
    <QuizContainer>
      <GlobalStyles />
      <Timer>Time left: {timeLeft} seconds</Timer>
      {questions.length > 0 && (
        <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
      )}
      <ToastContainer />
    </QuizContainer>
  );
};

export default Quiz;
