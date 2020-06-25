import React from 'react';

import onpointLogo from '../../assets/images/Logo.png';
import classes from './Logo.css';

const logo = (props) => {
  console.log('x');
  const { height } = props;
  return (
  // you can use const {height} = props ->> \
  // this is recommended because there will be a time nga daghan na kaau ang props
  // then style={{height}}

    <div className={classes.Logo} style={{ height }}>
      <img src={onpointLogo} alt="OnPoint" />
    </div>
  );
};

export default logo;
