import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
  render() {
      const { isAuthenticated, authenticationPath } = this.props;
      const redirectPath: string = !isAuthenticated ? authenticationPath : '';

      if (redirectPath) {
          const render = () => (<Redirect to={{ pathname: redirectPath }}/>);
          return <Route {...this.props} component={render} render={undefined}/>;
      }

      return <Route {...this.props}/>;
  }
}
