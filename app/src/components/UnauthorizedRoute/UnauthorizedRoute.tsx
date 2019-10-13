import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UnauthorizedRouteContainerProps } from './UnauthorizedRoute.container';

interface UnauthorizedRouteProps
  extends UnauthorizedRouteContainerProps,
    RouteProps {}

const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/teams', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default UnauthorizedRoute;
