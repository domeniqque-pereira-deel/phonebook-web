import React from 'react';
import { Switch } from 'react-router-dom';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Persons from '~/pages/Person';
import CreatePerson from '~/pages/Person/Create';
import ShowPerson from '~/pages/Person/Show';

import Route from './Route';

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} isPrivate />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/person/create" component={CreatePerson} isPrivate />
      <Route path="/person/:id" component={ShowPerson} isPrivate />
      <Route path="/person" component={Persons} isPrivate />
    </Switch>
  );
}

export default Router;
