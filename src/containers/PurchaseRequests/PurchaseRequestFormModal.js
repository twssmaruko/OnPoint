import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  List,
  Spin,
} from 'antd';
import _ from 'lodash';

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/purchaserequest/actions/Actions';
import * as uiActions from '../../store/ui/actions/Actions';
import OnPointButton from '../../components/button/OnpointButton';

const { Option } = Select;

const PurchaseRequestForm = () => {
  const [form] = Form.useForm();
  const [ordersList, setOrdersList] = useState([]);
  const [listItems, setListItems] = useState([]);
  const dispatcher = useDispatch();
  const {
    productsList, showSpin, openModal, modalSpin,
  } = useSelector(({ ui, products }) => ({
    modalSpin: ui.showSpin2,
    openModal: ui.openModal1,
    showSpin: ui.showSpin1,
    productsList: products.products,
  }));

  const fetchProduct = (value) => {
    dispatcher(actions.getProducts(value));
  };

  const addPurchaseRequest = () => {
    const dateNow = new Date();
    const prData = {
      status: 'PENDING',
      purchaseRequestNo: 1,
      isApproved: 'NOTAPPROVED',
      monthYear: moment(dateNow).format('MM-YYYY'),
      dayMonthYear: moment(dateNow).format('DD-MM-YYYY'),
      orders: ordersList,
    };
    dispatcher(actions.addPurchaseRequest(prData));
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
    setListItems(newList.map((data) => (<h3>{`${data.quantity} ${data.unit} of ${data.product.name}  for ${data.price} Php`}</h3>)));
    setOrdersList(newList);
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onDeleteItem = (index) => {
    const newOrdersList = ordersList;
    newOrdersList.splice(index, 1);
    setListItems(newOrdersList.map((data) => (<h3>{`${data.quantity} ${data.unit} of ${data.product.name}  for ${data.price} Php`}</h3>)));
    setOrdersList(newOrdersList);
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal1(false));
  };

  return (
    <Modal
      title="Add a new purchase request"
      visible={openModal}
      onOk={addPurchaseRequest}
      onCancel={handleCancel}
      width={900}
      okText="Add Purchase Request"
      cancelText="Cancel"
      destroyOnClose
    >
      <Spin spinning={modalSpin}>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Form
            {...layout}
            form={form}

            name="basic"
            onFinish={onSubmit}
          >
            <Form.Item
              label="Product"
              name="product"
              rules={[{ required: true, message: 'Please input PR #!' }]}
            >
              <Select
                showSearch
                allowClear
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
              label="Unit"
              rules={[{ required: true, message: 'Please input Unit!' }]}
            >
              <Input style={{ width: 170 }} />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: 'Please input Quantity!' }]}
            >
              <Input style={{ width: 170 }} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please input Price!' }]}
            >
              <Input style={{ width: 170 }} />
            </Form.Item>
            <Form.Item style={{ marginLeft: 80 }}>
              <Button type="primary" htmlType="submit">
                Add Order
              </Button>
            </Form.Item>
          </Form>
          <div style={{ width: '70%', marginLeft: 40 }}>
            <List
              pagination={ordersList.length > 3 ? {
                pageSize: 3,
                position: 'bottom',
              } : false}
              size="small"
              header={<div>Orders</div>}
              bordered
              dataSource={listItems}
              style={{
                color: 'black',
              }}
              renderItem={(item, index) => (
                <List.Item actions={[<OnPointButton
                  onClick={onDeleteItem}
                  value={index}
                  type="link"
                  name="Delete"
                  style={{ color: 'red' }}
                />]}
                >
                  {item}
                </List.Item>
              )}
            />
          </div>

        </div>
      </Spin>
    </Modal>
  );
};

export default PurchaseRequestForm;
