import React from 'react';
import { Row, Col, Menu } from 'antd';

const Header = (props) => {
  const handleClick = () => {

  };

  // color #343A40

  const titleStyle = {
    color: 'white',
    marginTop: '22px',
    fontSize: '25px',
  };

  const menuStyle = {
    backgroundColor: '#343A40',
    color: 'white',
    marginTop: '20px',
  };

  return (
    <Row style={{ backgroundColor: '#343A40' }}>
      <Col span={4} style={titleStyle}>
        On Point Construction
      </Col>
      <Col span={14} style={{ backgroundColor: '#343A40' }}>
        <Menu style={menuStyle} mode="horizontal">
          <Menu.Item>
            Home
          </Menu.Item>
          <Menu.Item>
            Projects
          </Menu.Item>
          <Menu.Item>
            Purchase Orders
          </Menu.Item>
          <Menu.Item>
            Purchase Requests
          </Menu.Item>
          <Menu.Item>
            Vendors
          </Menu.Item>
        </Menu>
      </Col>
      <Col offset={2} span={4} style={{ marginTop: '30px', fontSize: '15px' }}>
        <a style={{ color: 'white' }}> Authenticate </a>
      </Col>
    </Row>
  );
};


export default Header;
