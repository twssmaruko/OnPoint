import React, {lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Auth from '../../containers/Auth/Auth';
// import PurchaseRequests from '../../containers/PurchaseRequests/PurchaseRequests';
// import Vendors from '../../containers/Vendors/Vendors';
// import Products from '../../containers/Products/Products';
// import Projects from '../../containers/Projects/Projects';
// import PurchaseOrders from '../../containers/PurchaseOrders/PurchaseOrders';

const Vendors = lazy(() => import('../../containers/Vendors/Vendors'));
const Products = lazy(() => import('../../containers/Products/Products'));
const PurchaseRequests = lazy(() =>
  import('../../containers/PurchaseRequests/PurchaseRequests'));
const PurchaseOrders = lazy(() =>
  import('../../containers/PurchaseOrders/PurchaseOrders'));
const Projects = lazy(() => import('../../containers/Projects/Projects'))

// const Checkout = React.lazy(() => {
//     return import('./containers/Checkout/Checkout');
//   });

const Routes = () => {
  const routes =
    <Switch>
      <Route path="/purchaseorders" exact render={(props) => <PurchaseOrders key="purchaseOrdersKey" {...props}/>} />
      <Route path="/purchaserequest" exact render={(props) => <PurchaseRequests key="purchaseRequestsKey" {...props}/>} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/vendors" exact render={(props) => <Vendors {...props}/>} />
      <Route path="/projects" exact render={(props) => <Projects key="projectKey" {...props}/>}/>
      <Route path="/" exact component={Homepage} />
      <Route path="/products" exact render={(props) => <Products key="productsKey" {...props}/>} />
      <Redirect to="/" />
    </Switch>;
  return (
    <Suspense fallback={<div>loading....</div>}>
      {routes}
    </Suspense>
  );
};

export default Routes;
