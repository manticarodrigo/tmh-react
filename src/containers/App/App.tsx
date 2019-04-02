import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import { AppState } from '../../store/Store';

import { CurrentUser } from '../../reducers/UserReducer';

import { ProtectedRoute, ProtectedRouteProps } from '../ProtectedRoute/ProtectedRoute';

import DashboardPage from '../DashboardPage/DashboardPage';
import LoginPage from '../LoginPage/LoginPage';
import OnboardingPage from '../OnboardingPage/OnboardingPage';


interface AppProps {
  currentUser?: CurrentUser;
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
          <ProtectedRoute
              {...defaultProtectedRouteProps}
              component={OnboardingPage}
              exact={true}
              path="/onboarding"
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (store: AppState) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps)(App);
