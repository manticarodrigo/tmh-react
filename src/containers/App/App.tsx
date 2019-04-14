import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import { AppState } from '../../store/Store';

import { CurrentAuth } from '../../reducers/UserReducer';

import {
  ProtectedRoute,
  ProtectedRouteProps,
} from '../../components/ProtectedRoute/ProtectedRoute';

import DashboardPage from '../DashboardPage/DashboardPage';
import DesignPage from '../DesignPage/DesignPage';
import DetailsPage from '../DetailsPage/DetailsPage';
import LoginPage from '../LoginPage/LoginPage';
import OnboardingPage from '../OnboardingPage/OnboardingPage';

interface AppProps {
  auth?: CurrentAuth;
}

export enum AppRoutes {
  LOGIN = '/login',
  ONBOARDING = '/onboarding',
  DASHBOARD = '/',
  DETAILS = '/details',
  DESIGN = '/design',
  FINAL_DELIVERY = '/final-delivery',
}

class App extends Component<AppProps> {
  render() {
    const { auth } = this.props;

    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: !!auth,
      authenticationPath: AppRoutes.LOGIN,
    };

    return (
      <React.Fragment>
        <Router>
          <ProtectedRoute
            isAuthenticated={!auth}
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
            path={`${AppRoutes.DETAILS}/:view?/:projectId?`}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            component={DesignPage}
            path={`${AppRoutes.DESIGN}/:view?/:projectId?`}
          />
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: AppState) => ({
  auth: store.userState.auth,
});

export default connect(mapStateToProps)(App);
