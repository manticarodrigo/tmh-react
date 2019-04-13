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

export enum AppRoutes {
  LOGIN = '/login',
  ONBOARDING = '/onboarding',
  DASHBOARD = '/',
  DETAILS = '/details',
}

class App extends Component<AppProps> {
  render() {
    const { currentUser } = this.props;

    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: !!currentUser,
      authenticationPath: AppRoutes.LOGIN,
    };

    return (
      <React.Fragment>
        <Router>
          <ProtectedRoute
            isAuthenticated={!currentUser}
            authenticationPath={AppRoutes.DASHBOARD}
            component={LoginPage}
            path={AppRoutes.LOGIN}
            exact
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={OnboardingPage}
            path={AppRoutes.ONBOARDING}
            exact
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={DashboardPage}
            path={AppRoutes.DASHBOARD}
            exact
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={DetailsPage}
            path={`${AppRoutes.DETAILS}/:projectId?`}
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
