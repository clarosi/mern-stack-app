import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import Home from '../Home';
import Signin from '../Signin';
import Signup from '../Signup';
import About from '../About';
import NotFound from '../404';
import { checkAuth } from '../../store/actions';
import ProtectedRoute from '../../hoc/ProtectedRoute';
import {
  HOME_LINK,
  SIGNIN_LINK,
  SIGNUP_LINK,
  ABOUT_LINK
} from '../../shared/strings';

const Main = props => {
  const { checkAuth } = props;

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Switch>
      <ProtectedRoute exact path={HOME_LINK} component={Home} />
      <ProtectedRoute path={ABOUT_LINK} component={About} />
      <Route path={SIGNIN_LINK} component={Signin} />
      <Route path={SIGNUP_LINK} component={Signup} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default connect(
  null,
  { checkAuth }
)(Main);
