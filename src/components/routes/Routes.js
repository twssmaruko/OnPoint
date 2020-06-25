import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
<<<<<<< HEAD:src/components/routes/Routes.js
import Purchaserequestlist from '../purchaserequest/Purchaserequestlist';
import Vendors from '../vendors/Vendors';
import Homepage from '../homepage/Homepage';
=======
import PurchaseRequestList from '../../containers/PurchaseRequest/PurchaseRequestList';
import Vendors from '../../containers/Vendors/Vendors';
import Homepage from '../Homepage/Homepage';
>>>>>>> 8f0c5f3199d651bf7cb65ff862eb3767a0ba2eb7:src/Components/Routes/Routes.js

const Routes = () => {
  const routes = (
    <Switch>
      <Route path="/purchaserequest" exact component={PurchaseRequestList} />
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
