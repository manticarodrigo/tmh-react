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

export const appRoutes = {
  LOGIN: {
    path: '/login',
    title: undefined,
  },
  DASHBOARD: {
    path: '/',
    title: 'Dashboard',
  },
  ONBOARDING: {
    path: '/onboarding',
    title: undefined,
  },
};

class App extends Component<AppProps> {
  render() {
    const { currentUser } = this.props;

    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: !!currentUser,
      authenticationPath: appRoutes.LOGIN.path,
    };

    return (
      <div className="app">
        <Router>
          {currentUser && (<HeaderComponent currentUser={currentUser} />)}
          <ProtectedRoute
              isAuthenticated={!currentUser}
              authenticationPath={appRoutes.DASHBOARD.path}
              component={LoginPage}
              exact
              path={appRoutes.LOGIN.path}
          />
          <ProtectedRoute
              {...defaultProtectedRouteProps}
              component={DashboardPage}
              exact
              path={appRoutes.DASHBOARD.path}
          />
          <ProtectedRoute
              {...defaultProtectedRouteProps}
              component={OnboardingPage}
              exact
              path={appRoutes.ONBOARDING.path}
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
