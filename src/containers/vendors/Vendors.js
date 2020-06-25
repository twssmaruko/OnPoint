import React from 'react';
import {
  // Row, Col,
  Form, Input,
  Select,
} from 'antd';
// import { API, graphqlOperation } from 'aws-amplify';
// import { createVendor } from '../../graphql/mutations';

const { Option } = Select;

const Vendors = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    // API.graphql(graphqlOperation(createVendor, { input: { ...values } }));
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: 20, width: '100%' }}>
        <h3 style={{ color: '#512E0E' }}>Vendors</h3>
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input vendor name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input vendor address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: 'Please input vendor address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Terms"
            name="terms"
            rules={[{ required: true, message: 'Please input vendor address!' }]}
          >
            <Select>
              <Option value="term1">Term1</Option>
              <Option value="term2">Term2</Option>
              <Option value="term3">Term3</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Vendors;
