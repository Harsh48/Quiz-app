import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Results from '../Results';
import { RootState } from '../../redux/store';
import 'jest-styled-components';

const mockStore = configureStore([]);

const initialState: RootState = {
  quiz: {
    questions: [],
    currentQuestionIndex: 0,
    score: 30,
    status: 'finished',
    answers: [
      { question: 'What is the capital of France?', answer: 'Paris', correct: true },
      { question: 'What is 2+2?', answer: '4', correct: true },
      { question: 'Is the sky blue?', answer: 'Yes', correct: false },
    ],
  },
};

describe('Results Component', () => {
  test('renders Results component correctly', () => {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Results onReset={jest.fn()} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('displays score and answers correctly', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Results onReset={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText('Your Score: 30')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France? - Your answer: Paris (Correct)')).toBeInTheDocument();
    expect(screen.getByText('What is 2+2? - Your answer: 4 (Correct)')).toBeInTheDocument();
    expect(screen.getByText('Is the sky blue? - Your answer: Yes (Incorrect)')).toBeInTheDocument();
  });

  test('calls onReset when reset button is clicked', () => {
    const store = mockStore(initialState);
    const onReset = jest.fn();

    render(
      <Provider store={store}>
        <Results onReset={onReset} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Start New Quiz'));
    expect(onReset).toHaveBeenCalled();
  });
});
