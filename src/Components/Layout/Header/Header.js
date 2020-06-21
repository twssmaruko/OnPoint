import React from 'react';
import { Row, Col, Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  // const handleClick = () => {

  // };

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
            <Link style={{ color: 'white' }} exact="true" to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            Projects
          </Menu.Item>
          <Menu.Item>
            Purchase Orders
          </Menu.Item>
          <Menu.Item>
            <Link style={{ color: 'white' }} exact="true" to="purchaserequest">
              Purchase Requests
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ color: 'white' }} exact="true" to="vendors">
              Vendors
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col offset={2} span={4} style={{ marginTop: '30px', fontSize: '15px' }}>
        <h4 style={{ color: 'white' }}> Authenticate </h4>
      </Col>
    </Row>
  );
};

export default Header;
