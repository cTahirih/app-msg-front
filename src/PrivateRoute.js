import React, {useState} from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      { ...rest }
      render = {props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to='/'/>
        )
      }
    />
  )
};

export default PrivateRoute;
