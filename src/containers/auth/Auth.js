import React from 'react';
import {
  // Row, Col,
  Form, Input,
  // Select,
  Button,
} from 'antd';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/auth/actions/Action';
// import { API, graphqlOperation } from 'aws-amplify';
// import { createVendor } from '../../graphql/mutations';
// const { Option } = Select;

const Auth = () => {
  const dispatcher = useDispatch();

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatcher(actions.signIn(values));
    // API.graphql(graphqlOperation(createVendor, { input: { ...values } }));
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: 20, width: '100%' }}>
        <h3 style={{ color: '#512E0E' }}>Log In</h3>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
      }}
      >
        <Form
          // layout="vertical"
          name="basic"
          initialValues={{ remember: true, terms: 'term1' }}
          onFinish={onFinish}
          // labelAlign="left"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input vendor name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input vendor address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Auth;
