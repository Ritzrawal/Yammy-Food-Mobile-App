

import React from 'react'
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router,Route } from 'react-router-dom'

import AppRoute from './app/AppRoute'

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Route path="/" component={AppRoute} />
      </Router>
    </Provider>
  )
}

export default App

