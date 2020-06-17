import React from 'react';
import './App.css';
import Header from './Components/Layout/Header/Header';
import Purchaserequestlist from './Components/Purchaserequest/Purchaserequestlist';

const App = (props) => (
  <div className="App">
    <Header />
    <Purchaserequestlist />
  </div>
);

export default App;
