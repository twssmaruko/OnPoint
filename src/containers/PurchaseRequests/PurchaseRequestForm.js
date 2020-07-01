import React from 'react';
import {
  // Row,
  // Col,
  Form, Input,
  Select,
  Button,
  List,
} from 'antd';

const { Option } = Select;

const PurchaseRequestForm = () => {
  // const [orderData, setOrderData] = useState({

  // });
  // const layout = {
  //   labelCol: { span: 12 },
  //   wrapperCol: { span: 10 },
  // };

  const orderData = ['4 pounds of shovel for the price of 1000'];

  const handleChange = () => {

  };

  return (
    <div>
      <Form
          // {...layout}
        name="basic"
      >
        <div style={{ marginLeft: 20 }}>
          <h3>PR #</h3>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'row',
        }}
        >
          <Form.Item
            label="Product"
            rules={[{ required: true, message: 'Please input PR #!' }]}
          >
            <Select defaultValue="Select Description" style={{ width: 170 }} onChange={handleChange}>
              <Option value="Des1">Description 1</Option>
              <Option value="Des2">Description 2</Option>
              <Option value="Des3">Description 3</Option>
              <Option value="Des4">Description 4</Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginLeft: 20 }}
            label="Unit"
            rules={[{ required: true, message: 'Please input Unit!' }]}
          >
            <Input style={{ width: 50 }} />
          </Form.Item>
          <Form.Item
            style={{ marginLeft: 20 }}
            label="Quantity"
            rules={[{ required: true, message: 'Please input Quantity!' }]}
          >
            <Input style={{ width: 50 }} />
          </Form.Item>
          <Form.Item
            style={{ marginLeft: 20 }}
            label="Price"
            rules={[{ required: true, message: 'Please input Price!' }]}
          >
            <Input style={{ width: 100 }} />
          </Form.Item>
          <Form.Item style={{ marginLeft: 15 }}>
            <Button type="primary" htmlType="submit">
              Add Order
            </Button>
          </Form.Item>
        </div>
      </Form>
      <List
        size="small"
        header={<div>Orders</div>}
        bordered
        dataSource={orderData}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default PurchaseRequestForm;
