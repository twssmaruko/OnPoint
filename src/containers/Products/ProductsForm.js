import React from 'react';
import {
  Row, Col, Form, Input,
} from 'antd';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/products/actions/Actions';

const Productsform = (props) => {
  const dispatcher = useDispatch();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { reference } = props;
  const onSubmit = (values) => {
    dispatcher(actions.addProducts(values));
  };

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Form
            ref={reference}
            {...layout}
            name="basic"
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
