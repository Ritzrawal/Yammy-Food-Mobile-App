import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import getToken from './helpers/getToken';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppRoute from './app/AppRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={AppRoute} />
      </Router>
    </Provider>
  );
};

export default App;

//          'http://localhost:8000/create-payment-intent',
