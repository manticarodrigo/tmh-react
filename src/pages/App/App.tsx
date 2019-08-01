import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import useAppState from 'hooks/useAppState';
import { protectedApi } from 'store/reducers/AuthReducer';
import { logout } from 'store/actions/AuthActions';

import ProtectedRoute, { ProtectedRouteProps } from 'components/ProtectedRoute/ProtectedRoute';

import DashboardPage from 'pages/DashboardPage/DashboardPage';
import DesignPage from 'pages/DesignPage/DesignPage';
import DetailsPage from 'pages/DetailsPage/DetailsPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import OnboardingPage from 'pages/OnboardingPage/OnboardingPage';

export enum AppRoutes {
  LOGIN = '/login',
  ONBOARDING = '/onboarding',
  DASHBOARD = '/',
  DETAILS = '/details',
  DESIGN = '/design',
  FINAL_DELIVERY = '/final-delivery',
}

const App = () => {
  const [{ authState: { auth } }, dispatch] = useAppState();

  protectedApi.interceptors.response.use(undefined, ({ response }) => {
    // if response is unauthorized
    if (response.status === 403) {
      return dispatch(logout());
    }
  });

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!auth,
    authenticationPath: AppRoutes.LOGIN,
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default App;
