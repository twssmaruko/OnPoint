import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PurchaseRequestList from '../../containers/purchaserequest/PurchaseRequestList';
import Vendors from '../../containers/vendors/Vendors';
import Homepage from '../homepage/Homepage';
import Auth from '../../containers/auth/Auth';

const Routes = () => {
  const routes = (
    <Switch>
      <Route path="/purchaserequest" exact component={PurchaseRequestList} />
      <Route path="/vendors" exact component={Vendors} />
      <Route path="/auth" exact component={Auth} />
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
