import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Quiz from './components/Quiz';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Quiz />
    </Provider>
  );
};

export default App;
