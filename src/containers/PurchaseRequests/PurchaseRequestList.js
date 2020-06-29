import React from 'react';
import {
  Row, Col, Form, Input,
  Select,
  //  Button,
} from 'antd';

const { Option } = Select;

const PurchaseRequestList = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const handleChange = () => {

  };

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Form
            {...layout}
            name="basic"
          >
            <Row>
              <Col span={6}>
                <Form.Item
                  label="PR #"
                  rules={[{ required: true, message: 'Please input PR #' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  label="Description"
                  rules={[{ required: true, message: 'Please input PR #' }]}
                >
                  <Select defaultValue="Select Description" style={{ width: 170 }} onChange={handleChange}>
                    <Option value="Des1">Description 1</Option>
                    <Option value="Des2">Description 2</Option>
                    <Option value="Des3">Description 3</Option>
                    <Option value="Des4">Description 4</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Unit"
                  rules={[{ required: true, message: 'Please input PR #' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Quantity"
                  rules={[{ required: true, message: 'Please input PR #' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Price"
                  rules={[{ required: true, message: 'Please input PR #' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>

      </Col>
    </Row>
  );
};

export default PurchaseRequestList;
