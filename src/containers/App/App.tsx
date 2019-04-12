import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import { AppState } from '../../store/Store';

import { CurrentUser } from '../../reducers/UserReducer';

import { ProtectedRoute, ProtectedRouteProps } from '../ProtectedRoute/ProtectedRoute';

import DashboardPage from '../DashboardPage/DashboardPage';
import DetailsPage from '../DetailsPage/DetailsPage';
import LoginPage from '../LoginPage/LoginPage';
import OnboardingPage from '../OnboardingPage/OnboardingPage';

interface AppProps {
  currentUser?: CurrentUser;
}

export const appRoutes = {
  LOGIN: {
    path: '/login',
    pathname: '/login',
    title: undefined,
  },
  ONBOARDING: {
    path: '/onboarding',
    pathname: '/onboarding',
    title: undefined,
  },
  DASHBOARD: {
    path: '/',
    pathname: '/',
    title: 'Dashboard',
  },
  DETAILS: {
    path: '/details',
    pathname: '/details/:id',
    title: 'Details',
  },
};

class App extends Component<AppProps> {
  render() {
    const { currentUser } = this.props;

    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: !!currentUser,
      authenticationPath: appRoutes.LOGIN.pathname,
    };

    return (
      <React.Fragment>
        <Router>
          <ProtectedRoute
            isAuthenticated={!currentUser}
            authenticationPath={appRoutes.DASHBOARD.pathname}
            component={LoginPage}
            path={appRoutes.LOGIN.pathname}
            exact
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={OnboardingPage}
            path={appRoutes.ONBOARDING.pathname}
            exact
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={DashboardPage}
            path={appRoutes.DASHBOARD.pathname}
            exact
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={DetailsPage}
            path={appRoutes.DETAILS.pathname}
            exact
          />
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: AppState) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps)(App);
