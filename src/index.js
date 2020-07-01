import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
  createStore, applyMiddleware, compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
// import Amplify from 'aws-amplify';
import App from './App';
import authReducer from './store/auth/reducer/Reducer';
import vendorReducer from './store/vendors/reducer';
import productsReducer from './store/products/reducer/Reducer';
import uiReducer from './store/ui/reducer/Reducer';

// import AWSexports from './aws-exports';

// Amplify.configure(AWSexports);

const composeEnhancers = compose;

const rootReducer = combineReducers({
  auth: authReducer,
  vendor: vendorReducer,
  products: productsReducer,
  ui: uiReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
));

const indexApp = (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>

);

ReactDOM.render(
  indexApp,
  document.getElementById('root'),
);
