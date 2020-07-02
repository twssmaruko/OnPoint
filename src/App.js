import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Routes from './components/routes/Routes';
import Header from './components/layout/header/Header';
import * as actions from './store/auth/actions/Actions';

const App = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(actions.checkAuth());
  }, [dispatcher]);

  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
};

export default withRouter(App);
