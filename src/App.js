import React from 'react';
import './App.css';
// import { withAuthenticator } from 'aws-amplify-react';
import {
  withRouter,
} from 'react-router-dom';
import Routes from './components/routes/Routes';
import Header from './components/layout/header/Header';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default withRouter(App);
