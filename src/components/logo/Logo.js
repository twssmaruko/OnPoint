import React from 'react';

import onpointLogo from '../../assets/images/Logo.jpg';
import classes from './Logo.css';

const Logo = (props) => {
  const {height, width} = props;
  return (
    <div className={classes.Logo} style={{height, width}}>
      <img src={onpointLogo} alt="OnPoint" />
    </div>
  );
};

export default Logo;
