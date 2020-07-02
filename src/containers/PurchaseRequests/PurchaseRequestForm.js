import React, { useState } from 'react';
import {
  // Row,
  // Col,
  Form, Input,
  Select,
  Button,
  List,
  Spin,
} from 'antd';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/purchaserequest/actions/Actions';

const { Option } = Select;

const PurchaseRequestForm = () => {
  const [ordersList, setOrdersList] = useState([]);
  const dispatcher = useDispatch();
  const { productsList, showSpin } = useSelector(({ ui, products }) => ({
    showSpin: ui.showSpin,
    productsList: products.products,
  }));
  // const [orderData, setOrderData] = useState({

  const listOrderItems = ordersList.map((data) => `${data.quantity} ${data.unit} of ${data.product.name} for ${data.price}`);

  const fetchProduct = (value) => {
    dispatcher(actions.getProducts(value));
  };

  const debounceFetchProduct = _.debounce(fetchProduct, 1000);

  const searchOptionList = () => productsList.map((product) => (
    <Option key={product.id}>
      {product.name}
    </Option>
  ));

  const onSubmit = (value) => {
    const order = [{
      ...value,
      product: {
        name: value.product.label,
        id: value.product.key,
      },
    }];
    const newList = order.concat(ordersList);
    console.log(newList);
    setOrdersList(newList);
  };

  return (
    <div>
      <Form
          // {...layout}
        name="basic"
        onFinish={onSubmit}
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
            name="product"
            rules={[{ required: true, message: 'Please input PR #!' }]}
          >
            <Select
              showSearch
              labelInValue
              placeholder="Select products"
              notFoundContent={<Spin spinning={showSpin} />}
              filterOption={false}
              onSearch={debounceFetchProduct}
              style={{ width: 170 }}
            >
              {searchOptionList()}
            </Select>
          </Form.Item>
          <Form.Item
            name="unit"
            style={{ marginLeft: 20 }}
            label="Unit"
            rules={[{ required: true, message: 'Please input Unit!' }]}
          >
            <Input style={{ width: 100 }} />
          </Form.Item>
          <Form.Item
            name="quantity"
            style={{ marginLeft: 20 }}
            label="Quantity"
            rules={[{ required: true, message: 'Please input Quantity!' }]}
          >
            <Input style={{ width: 50 }} />
          </Form.Item>
          <Form.Item
            name="price"
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
        dataSource={listOrderItems}
        style={{ color: 'black', height: '20' }}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default PurchaseRequestForm;
