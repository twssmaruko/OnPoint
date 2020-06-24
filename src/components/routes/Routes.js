import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Purchaserequestlist from '../purchaserequest/Purchaserequestlist';
import Vendors from '../vendors/Vendors';
import Homepage from '../homepage/Homepage';

const Routes = () => {
  const routes = (
    <Switch>
      <Route path="/purchaserequest" exact component={Purchaserequestlist} />
      <Route path="/vendors" exact component={Vendors} />
      <Route path="/" exact component={Homepage} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <>
      {routes}
    </>
  );
};

export default Routes;
