import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = RouteProps & {
  isAuthenticated: boolean;
  authenticationPath: string;
};

const ProtectedRoute = ({ isAuthenticated, authenticationPath, ...props }: ProtectedRouteProps) => {
  const renderRedirect = () => <Redirect to={{ pathname: authenticationPath }}/>;

  return !isAuthenticated
    ? <Route {...props} component={renderRedirect} render={undefined}/>
    : <Route {...props}/>;
};

export default ProtectedRoute;
