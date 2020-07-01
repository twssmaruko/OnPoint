import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PurchaseRequests from '../../containers/PurchaseRequests/PurchaseRequests';
import Vendors from '../../containers/Vendors/Vendors';
import Homepage from '../homepage/Homepage';
import Auth from '../../containers/auth/Auth';

const Routes = () => {
  const routes = (
    <Switch>
      <Route path="/purchaserequest" exact component={PurchaseRequests} />
      <Route path="/auth" exact component={Auth} />
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
