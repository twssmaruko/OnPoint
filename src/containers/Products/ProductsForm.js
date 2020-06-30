import React from 'react';
import {
  Row, Col, Form, Input,
} from 'antd';

const Productsform = (props) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { reference, onSubmit, editValues } = props;

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Form
            ref={reference}
            {...layout}
            name="basic"
            initialValues={editValues}
            onFinish={onSubmit}
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input Product Name' }]}
                >
                  <Input style={{ width: 200 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input Description' }]}
                >
                  <Input style={{ width: 300 }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default Productsform;
