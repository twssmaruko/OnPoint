import React from 'react';

import onpointLogo from '../../assets/images/Logo.png';
import classes from './Logo.css';

const logo = (props) => {
  const { height } = props;
  return (
    <div className={classes.Logo} style={{ height }}>
      <img src={onpointLogo} alt="OnPoint" />
    </div>
  );
};

export default logo;
