import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import { AppState } from '../../store/Store';

import { CurrentUser } from '../../reducers/UserReducer';

import { ProtectedRoute, ProtectedRouteProps } from '../ProtectedRoute/ProtectedRoute';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

import DashboardPage from '../DashboardPage/DashboardPage';
import LoginPage from '../LoginPage/LoginPage';
import OnboardingPage from '../OnboardingPage/OnboardingPage';

interface AppProps {
  currentUser?: CurrentUser;
}

export const AppRoutes = {
  LOGIN: '/login',
  DASHBOARD: '/',
  ONBOARDING: '/onboarding',
};

class App extends Component<AppProps> {
  render() {
    const { currentUser } = this.props;

    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: !!currentUser,
      authenticationPath: AppRoutes.LOGIN,
    };

    return (
      <div className="app">
        <Router>
          {currentUser && (<HeaderComponent currentUser={currentUser} />)}
          <ProtectedRoute
              isAuthenticated={!currentUser}
              authenticationPath={AppRoutes.DASHBOARD}
              component={LoginPage}
              exact
              path={AppRoutes.LOGIN}
          />
          <ProtectedRoute
              {...defaultProtectedRouteProps}
              component={DashboardPage}
              exact
              path={AppRoutes.DASHBOARD}
          />
          <ProtectedRoute
              {...defaultProtectedRouteProps}
              component={OnboardingPage}
              exact
              path={AppRoutes.ONBOARDING}
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
