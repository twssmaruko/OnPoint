import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PurchaseRequests from '../../containers/PurchaseRequests/PurchaseRequests';
import Vendors from '../../containers/vendors/Vendors';
import Homepage from '../homepage/Homepage';
// eslint-disable-next-line import/no-unresolved
import Auth from '../../containers/Auth/Auth';
import Products from '../../containers/Products/Products';

const Routes = () => {
  const routes = (
    <Switch>
      <Route path="/purchaserequest" exact component={PurchaseRequests} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/vendors" exact component={Vendors} />
      <Route path="/" exact component={Homepage} />
      <Route path="/products" exact component={Products} />
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
