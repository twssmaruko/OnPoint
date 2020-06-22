import React from 'react';

import onpointLogo from '../../assets/Images/logo.png';
import classes from './Logo.css';

const logo =(props) => (
    <div className ={classes.Logo} style = {{height: props.height}}>
        <img src={onpointLogo} alt="OnPoint"/>
    </div>
);

export default logo;