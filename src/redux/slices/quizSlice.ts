import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Answer {
  question: string;
  answer: string;
  correct: boolean;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  status: 'idle' | 'loading' | 'active' | 'finished';
  answers: Answer[];
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  status: 'idle',
  answers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.status = 'active';
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    addScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    addAnswer(state, action: PayloadAction<Answer>) {
      state.answers.push(action.payload);
    },
    resetQuiz(state) {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.status = 'idle';
      state.answers = [];
    },
    finishQuiz(state) {
      state.status = 'finished';
    },
  },
});

export const { setQuestions, nextQuestion, addScore, addAnswer, resetQuiz, finishQuiz } = quizSlice.actions;

export default quizSlice.reducer;
