import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Quiz from '../Quiz';
import { RootState } from '../../redux/store';
import 'jest-styled-components';
import { fetchQuizQuestions } from '../../services/quizService';

jest.mock('../../services/quizService');

const mockStore = configureStore([]);
const mockedFetchQuizQuestions = fetchQuizQuestions as jest.MockedFunction<typeof fetchQuizQuestions>;

const initialState: RootState = {
  quiz: {
    questions: [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['London', 'Berlin', 'Madrid'],
      },
    ],
    currentQuestionIndex: 0,
    score: 0,
    status: 'idle',
    answers: [],
  },
};

test('renders Quiz component correctly', () => {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <Quiz />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('starts quiz on button click', async () => {
  const store = mockStore(initialState);
  mockedFetchQuizQuestions.mockResolvedValueOnce(initialState.quiz.questions);

  render(
    <Provider store={store}>
      <Quiz />
    </Provider>
  );

  fireEvent.click(screen.getByText('Start Quiz'));

  await waitFor(() => {
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'quiz/setQuestions', payload: initialState.quiz.questions });
  });
});

test('displays question and handles answer selection', () => {
  const stateWithActiveQuiz: RootState = {
    ...initialState,
    quiz: { ...initialState.quiz, status: 'active' }
  };

  const store = mockStore(stateWithActiveQuiz);
  render(
    <Provider store={store}>
      <Quiz />
    </Provider>
  );

  expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Paris'));
  const actions = store.getActions();
  expect(actions).toContainEqual({ type: 'quiz/addScore', payload: 10 });
  expect(actions).toContainEqual({
    type: 'quiz/addAnswer',
    payload: { question: 'What is the capital of France?', answer: 'Paris', correct: true },
  });
});
