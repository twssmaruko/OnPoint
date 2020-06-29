import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Purchaserequest from '../../containers/purchaserequest/PurchaseRequest';
import Vendorlist from '../../containers/vendors/VendorList';
import Homepage from '../homepage/Homepage';
import Auth from '../../containers/auth/Auth';

const Routes = () => {
  const routes = (
    <Switch>
      <Route path="/purchaserequest" exact component={Purchaserequest} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/vendors" exact component={Vendorlist} />
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
