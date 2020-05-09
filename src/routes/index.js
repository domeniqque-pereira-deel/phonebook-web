import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import Home from '~/pages/Home';

import Route from './Route';

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} isPrivate />
      <Route path="/signin" component={SignIn} />
    </Switch>
  );
}

export default Router;
