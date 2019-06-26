import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { SIGNIN_LINK } from '../../shared/strings';

const ProtectedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: SIGNIN_LINK, state: { from: props.location } }}
        />
      )
    }
  />
);

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(ProtectedRoute);
