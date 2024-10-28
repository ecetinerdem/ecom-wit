// src/components/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.client.user);
  const isAuthenticated = Object.keys(user).length > 0;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }} />
        )
      }
    />
  );
};

export default PrivateRoute;