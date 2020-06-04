import React from 'react';
import { Switch, Redirect, Route as BaseRoute } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Persons from '~/pages/Person';
import CreatePerson from '~/pages/Person/Create';
import EditPerson from '~/pages/Person/Edit';
import ShowPerson from '~/pages/Person/Show';
import Phones from '~/pages/Phones';
import CreatePhones from '~/pages/Phones/Create';

import Route from './Route';

function Router() {
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/persons/edit/:id" component={EditPerson} isPrivate />
      <Route path="/persons/create" component={CreatePerson} isPrivate />
      <Route path="/persons/:id" component={ShowPerson} isPrivate />
      <Route path="/persons" component={Persons} isPrivate />
      <Route path="/phones/create" component={CreatePhones} isPrivate />
      <Route path="/phones" component={Phones} isPrivate />
      <BaseRoute path="*">
        <Redirect to="phones" />
      </BaseRoute>
    </Switch>
  );
}

export default Router;
