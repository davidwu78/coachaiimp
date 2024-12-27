import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './Router';
import rootReducer from './Redux/reducers';
import ThemeProvider from './Themes/ThemeProvider';

const store = configureStore({
  reducer: rootReducer
});

const App = () => (
  <div className="App">
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  </div>
);

export default App;
