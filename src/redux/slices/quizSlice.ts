import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  status: 'idle' | 'loading' | 'finished';
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  status: 'idle',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.status = 'loading';
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    addScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    resetQuiz(state) {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.status = 'idle';
    },
    finishQuiz(state) {
      state.status = 'finished';
    },
  },
});

export const { setQuestions, nextQuestion, addScore, resetQuiz, finishQuiz } = quizSlice.actions;

export default quizSlice.reducer;
