import React from 'react';
import {
  // Row, Col,
  Form, Input
  // Select,
} from 'antd';
// import { API, graphqlOperation } from 'aws-amplify';
// import { createVendor } from '../../graphql/mutations';

// const { Option } = Select;

const VendorList = (props) => {
  // const onFinish = (values) => {
  //   // eslint-disable-next-line no-console
  //   console.log('Success:', values);
  //   // API.graphql(graphqlOperation(createVendor, { input: { ...values } }));
  // };
  const onFinishFailure = () => {
    // eslint-disable-next-line no-console
    console.log('Hi');
  };
  const {reference, onSubmit} = props;

  return (
    <div>
      <div style={{textAlign: 'center',
        marginTop: 20,
        width: '100%'}}>
        <h3 style={{color: '#512E0E'}}>Vendors</h3>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%'
      }}
      >
        <Form
          // layout="vertical"
          name="basic"
          initialValues={{remember: true}}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailure}
          ref={reference}
          // labelAlign="left"
        >
          <Form.Item
            label="Name"
            name="vendorName"
            rules={[
              {required: true,
                message: 'Please input vendor name!'}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              {required: true,
                message: 'Please input vendor address!'}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telephone Number"
            name="telNo"
            rules={[
              {required: true,
                message: 'Please input vendor number!'}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Terms"
            name="terms"
            rules={[
              {required: true,
                message: 'Please input vendor terms!'}
            ]}
          >
            {/* <Select>
              <Option value="Term 1">Term 1</Option>
              <Option value="Term 2">Term 2</Option>
              <Option value="Term 3">Term 3</Option>
            </Select> */}
            <Input />

          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VendorList;
