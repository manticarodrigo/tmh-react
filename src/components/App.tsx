import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import LoginPage from './LoginPage/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Route exact path="/" component={LoginPage} />
        </Router>
      </div>
    );
  }
}

export default App;
