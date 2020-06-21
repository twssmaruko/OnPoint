import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Amplify from 'aws-amplify';
import App from './App';
import AWSexports from './aws-exports';

Amplify.configure(AWSexports);

const indexApp = (
  <HashRouter>
    <App />
  </HashRouter>
);

ReactDOM.render(
  indexApp,
  document.getElementById('root'),
);
