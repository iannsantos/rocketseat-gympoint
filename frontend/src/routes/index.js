import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Home from '~/pages/Home';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Registrations from '~/pages/Registrations';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/home" component={Home} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
