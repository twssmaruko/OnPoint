import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  // Select,
  Button,
  Row,
  Col,
  List,
  Spin,
  InputNumber,
  AutoComplete
  //message
} from 'antd';
// import _ from 'lodash';

import moment from 'moment';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/purchaserequest/actions/Actions';
import * as uiActions from '../../store/ui/actions/Actions';
import OnPointButton from '../../components/button/OnpointButton';
//import PurchaseRequests from './PurchaseRequests';

//const {Option} = Select;

const PurchaseRequestForm = () => {
  const [form] = Form.useForm();
  const [ordersList, setOrdersList] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [requestedBy, setRequestedBy] = useState('Engr. Jojo Salamanes');
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.getProducts());
  }, [dispatcher]);
  const {
    productsList, openModal, modalSpin
  } = useSelector(({ ui, products, purchaseRequests }) => ({
    modalSpin: ui.showSpin2,
    openModal: ui.openModal1,
    prNo: purchaseRequests.purchaseRequestCount,
    // showSpin: ui.showSpin1,
    productsList: products.products
  }), shallowEqual);

  // const fetchProduct = () => {
  //   dispatcher(actions.getProducts());
  // };

  const addPurchaseRequest = () => {

    if (modalSpin) {
      return;
    }
    const dateNow = new Date();
    // const totalPrice = ordersList.reduce((accumulator,
    //     current) => accumulator + current.price * current.quantity, 0);
    const prData = {
      status: 'PENDING',
      isApproved: 'APPROVED',
      year: dateNow.getFullYear(),
      //dayMonthYear: moment(dateNow).format('DD-MM-YYYY'),
      dayMonthYear: moment(dateNow, "DD-MM-YYYY"),
      // totalPrice,
      orders: ordersList,
      requestedBy: requestedBy
    };

    dispatcher(actions.addPurchaseRequest(prData));
  };
  // const debounceFetchProduct = _.debounce(fetchProduct, 1000);
  // const searchOptionList = () => productsList.map((product) =>
  //   <Option key={product.id}>
  //     {product.name}
  //   </Option>
  // );

  const options = [];

  productsList.map((product) => {
    const newProduct = String(product.name)
    options.push({
      value: newProduct
    })
  })

  const onSubmit = (value) => {
    let count = orderId;
    const order = [
      {
        ...value,
        product: value.product,
        quantityLeft: value.quantity,
        id: count
      }
    ];
    count += 1;
    setOrderId(count);

    const newList = order.concat(ordersList);
    setListItems(newList.map((data) =>
      <h3 key={data.id}>
        {`${data.quantity} ${data.unit} of ${data.product} `}
      </h3>));
    setOrdersList(newList);
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const onDeleteItem = (index) => {
    const newOrdersList = ordersList;
    newOrdersList.splice(index, 1);
    setListItems(newOrdersList.map((data) =>
      <h3 key={data.id}>
        {`${data.quantity} ${data.unit} of ${data.product} `}
      </h3>));
    setOrdersList(newOrdersList);
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal1(false))
  }

  const afterModalClose = () => {
    if (ordersList.length) {
      setOrdersList([]);
      setListItems([]);
    }
  }

  // const checkProduct = (value) => {
  //   const found = ordersList.find((data) => data.product === value.label)
  //   if (found) {
  //     message.error(`Cannot have repeating products! ${value.label}`)
  //     form.resetFields();
  //   }
  // }

  const onRequestedByChange = (value) => {
    setRequestedBy(value);
  }


  return (
    <Modal
      title="Add a new purchase request"
      visible={openModal}
      onOk={addPurchaseRequest}
      onCancel={handleCancel}
      maskClosable={false}
      width={1200}
      okText="Add Purchase Request"
      cancelText="Cancel"
      destroyOnClose
      afterClose={afterModalClose}
    >
      <Spin spinning={modalSpin}>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
          <Row>
            <Col>
              <Form
                {...layout}
                form={form}

                name="basic"
                onFinish={onSubmit}
              >
                <Form.Item
                  style={{ width: 250 }}
                  label="Item Type"
                  name="itemType"
                  rules={[
                    {
                      required: true,
                      message: 'Please input item type'
                    }
                  ]}>
                  <Input style={{ width: 170 }} />
                </Form.Item>
                <Form.Item
                  label="Product"
                  name="product"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a product'
                    }
                  ]}
                >
                  {/* <Select
                showSearch
                allowClear
                labelInValue
                placeholder="Select products"
                notFoundContent={<Spin spinning={showSpin} />}
                filterOption={false}
                // onSearch={fetchProduct}
                style={{width: 170}}
                onSelect={checkProduct}
              >
                {searchOptionList()}
              </Select> */}
                  <AutoComplete
                    showSearch
                    allowClear
                    style={{
                      width: 170
                    }}
                    options={options}
                    placeholder="Product"
                    filterOption={(inputValue, option) =>
                      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="unit"
                  label="Unit"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Unit!'
                    },
                    {
                      type: 'string',
                      message: 'Should be in letters/words!'
                    }
                  ]}
                >
                  <Input style={{ width: 170 }} />
                </Form.Item>
                <Form.Item
                name="unitPrice"
                label="Unit Price"
                initialValue={0}
                rules={[
                  {required: true,
                  message: 'Please Input Unit Price'},
                  {
                    type: 'number',
                    message: 'Please input a number'
                  }
                ]}>
                  <InputNumber style={{width: 170}} />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Quantity!'
                    },
                    {
                      type: 'number',
                      message: 'Should be a number!'
                    }
                  ]}
                >
                  <InputNumber style={{ width: 170 }} />
                </Form.Item>
                {/* <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: 'Please input Price!'}, {type: 'number',
                  message: 'Should be a number!'}
              ]}
            >
              <InputNumber style={{width: 170}} />
            </Form.Item> */}

                <Form.Item style={{ marginLeft: 80 }}>
                  <Button type="primary" htmlType="submit">
                    Add Order
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form style={{marginLeft: 10}}>
                <Form.Item
                  style={{ width: 300 }}
                  name="requestedBy"
                  label="Requested By: "
                  initialValue="Engr. Jojo Salamanes"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Requested By'
                    }
                  ]}>
                  <Input onChange={(e) => onRequestedByChange(e.target.value)} style={{ width: 170 }} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <div style={{
            width: '70%',
            marginLeft: 40
          }}>
            <List
              pagination={ordersList.length > 3 ? {
                pageSize: 5,
                position: 'bottom'
              } : false}
              size="small"
              header={<div>Orders</div>}
              bordered
              dataSource={listItems}
              style={{
                width: 500,
                color: 'black'
              }}
              renderItem={(item, index) =>
                <List.Item actions={[
                  <OnPointButton
                    key={item.id}
                    onClick={onDeleteItem}
                    value={index}
                    type="link"
                    name="Delete"
                    style={{ color: 'red' }}
                  />
                ]}
                >
                  {item}
                </List.Item>
              }
            />
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default PurchaseRequestForm;


