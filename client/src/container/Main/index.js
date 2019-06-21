import React from 'react';
import { Switch, Route } from 'react-router';

import Home from '../Home';
import About from '../About';
import NotFound from '../404';
import { HOME_LINK, ABOUT_LINK } from '../../shared/strings';

const Main = () => (
  <Switch>
    <Route exact path={HOME_LINK} component={Home} />
    <Route path={ABOUT_LINK} component={About} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
