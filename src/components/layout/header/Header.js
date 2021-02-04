import React from 'react';
import {
  Row,
  Col,
  Menu,
  Button
} from 'antd';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/auth/actions/Actions';
import Logo from '../../logo/Logo';

const Header = () => {
  const dispatcher = useDispatch();
  const {user} = useSelector(({auth}) => ({
    user: auth.user
  }));

  const titleStyle = {
    color: 'white',
    marginTop: '22px',
    fontSize: '25px'
  };

  const menuStyle = {
    backgroundColor: '#white',
    color: 'white',
    marginTop: 50
  };

  const signOut = () => {
    dispatcher(actions.signOut());
  };

  const authenticate =
    <Link exact="true" to="auth">
      <Button type="link" style={{color: 'black'}}>
        Authenticate
      </Button>
    </Link>;
  const signOutButton =
    <Button type="link" style={{color: 'black'}} onClick={signOut}>
      Sign Out
    </Button>;
  return (
    <Row style={{backgroundColor: '#white'}}>
      <Col span={4} style={titleStyle}>
        <div>
          <Logo style={{height: 76, width: 254}}/>
        </div>
      </Col>
      <Col span={14} style={{backgroundColor: '#white'}}>
        <Menu style={menuStyle} mode="horizontal">
          <Menu.Item>
            <Link style={{color: 'black'}} exact="true" to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="projects"
            >
              Projects
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="purchaserequest"
            >
              Purchase Requests
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="purchaseorders"
            >
              Purchase Orders
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="materialsreceiving"
            >
              Materials Receiving
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="vendors"
            >
              Vendors
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="products"
            >
              Products
            </Link>
          </Menu.Item>
          {/* <Menu.Item>
            <Link
              style={{color: 'black'}}
              exact="true"
              to="purchaseordertest"
            >
              Purchase Order Test
            </Link>
          </Menu.Item> */}
        </Menu>
      </Col>
      <Col
        offset={2}
        span={4}
        style={{
          marginTop: 60,
          fontSize: '15px'
        }}
      >
        {user ? signOutButton : authenticate}
      </Col>
    </Row>
  );
};

export default Header;
