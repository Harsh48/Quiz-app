import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Quiz />
    </Provider>
  );
};

export default App;
