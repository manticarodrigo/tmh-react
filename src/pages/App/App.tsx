import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppState } from '../../store/Store';

import { CurrentAuth } from '../../store/reducers/AuthReducer';

import {
  ProtectedRoute,
  ProtectedRouteProps,
} from '../../components/ProtectedRoute/ProtectedRoute';

import DashboardPage from '../DashboardPage/DashboardPage';
import DesignPage from '../DesignPage/DesignPage';
import DetailsPage from '../DetailsPage/DetailsPage';
import LoginPage from '../LoginPage/LoginPage';
import OnboardingPage from '../OnboardingPage/OnboardingPage';

import WebSocketService, { startConnection } from '../../store/sockets/WebSocket';

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

const App = (props: AppProps) => {
  const { auth } = props;
  const [socket, setSocket] = useState();
  
  useEffect(() => {
    console.log(auth);
    if (auth) {
      startConnection()
        .then((instance: WebSocketService) => {
            console.log('socket', instance);
            setSocket(instance);
            instance.initChatUser(auth.user.username);
            instance.addCallbacks(
              (messages) => {
                console.log('messages', messages);
              },
              (message) => {
                console.log(message);
              });
            instance.fetchMessages(auth.user.username);
          })
          .catch(error => {
            console.log(error);
        });
    }
  }, [auth]);

  useEffect(() => {
    if (socket && auth) {
      const messageObject = {
        from: auth.user.username,
        text: 'yo',
      };
      socket.newChatMessage(messageObject);
    }
  }, [socket]);

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
}

const mapStateToProps = (store: AppState) => ({
  auth: store.authState.auth,
});

export default connect(mapStateToProps)(App);
