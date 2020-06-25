import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
  createStore, applyMiddleware, compose,
  // combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import authReducer from './store/auth/reducer/Reducer';

// import Amplify from 'aws-amplify';
// import AWSexports from './aws-exports';
// Amplify.configure(AWSexports);

const composeEnhancers = compose;

const store = createStore(authReducer, composeEnhancers(
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
