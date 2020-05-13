import React from 'react';
import { Switch } from 'react-router-dom';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Persons from '~/pages/Persons';
import CreatePerson from '~/pages/Persons/Create';

import Route from './Route';

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} isPrivate />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/persons/create" component={CreatePerson} isPrivate />
      <Route path="/persons" component={Persons} isPrivate />
    </Switch>
  );
}

export default Router;
