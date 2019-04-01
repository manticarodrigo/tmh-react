import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import { User } from '../reducers/UserReducer';
import { AppState } from '../store/Store';

import { ProtectedRoute, ProtectedRouteProps } from '../containers/ProtectedRoute/ProtectedRoute';

import DashboardPage from '../containers/DashboardPage/DashboardPage';
import LoginPage from '../containers/LoginPage/LoginPage';

interface AppProps {
  currentUser?: User;
}

class App extends Component<AppProps> {
  render() {
    const { currentUser } = this.props;

    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: !!currentUser,
      authenticationPath: '/login',
    };

    return (
      <div className="app">
        <Router>
          <ProtectedRoute
              isAuthenticated={!currentUser}
              authenticationPath={'/'}
              component={LoginPage}
              exact={true}
              path="/login"
          />
          <ProtectedRoute
              {...defaultProtectedRouteProps}
              component={DashboardPage}
              exact={true}
              path="/"
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (store: AppState) => ({
  currentUser: store.authState.currentUser,
});

export default connect(mapStateToProps)(App);
