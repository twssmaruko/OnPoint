import React from 'react';
import { Row, Col, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../logo/Logo';

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
    backgroundColor: '#white',
    color: 'white',
    marginTop: '20px',
  };

  return (
    <Row style={{ backgroundColor: '#white' }}>
      <Col span={4} style={titleStyle}>
        <div>
          <Logo />
        </div>
      </Col>
      <Col span={14} style={{ backgroundColor: '#white' }}>
        <Menu style={menuStyle} mode="horizontal">
          <Menu.Item>
            <Link style={{ color: 'black' }} exact="true" to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ color: 'black' }} exact="true" to="projects">
              Projects
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ color: 'black' }} exact="true" to="purchaseorders">
              Purchase Orders
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ color: 'black' }} exact="true" to="purchaserequest">
              Purchase Requests
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ color: 'black' }} exact="true" to="vendors">
              Vendors
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col offset={2} span={4} style={{ marginTop: '30px', fontSize: '15px' }}>
        <h4 style={{ color: 'black' }}> Authenticate </h4>
      </Col>
    </Row>
  );
};

export default Header;
