import React from 'react';
import { Button } from 'antd';

const OnpointButton = (props) => {
  const {
    value, onClick, name, type, icon,
  } = props;

  const buttonClicked = () => {
    onClick(value);
  };

  return (
    <Button size="small" type={type} icon={icon} onClick={buttonClicked}>
      {name}
    </Button>
  );
};

export default OnpointButton;
