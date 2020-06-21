import React from 'react';
import './App.css';
// import { withAuthenticator } from 'aws-amplify-react';
import {
  withRouter,
} from 'react-router-dom';
import Routes from './Components/Routes/Routes';
import Header from './Components/Layout/Header/Header';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default withRouter(App);
