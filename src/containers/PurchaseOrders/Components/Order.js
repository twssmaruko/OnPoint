import React, { useEffect, useState } from 'react'
import { Row, Col, Input, InputNumber, Form, message, Select } from 'antd'
import * as actions from '../../../store/purchaseorders/actions/Actions';
import { useDispatch, useSelector } from 'react-redux';

const Order = (props) => {

  const { order, index, categories } = props
  const borderStyle = 'none'
  
  const { totalPrice } = useSelector(({ purchaseOrder }) => ({
    totalPrice: purchaseOrder.totalPrice,
  }))

  const [orderState, setOrderState] = useState({
    product: order.product,
    quantity: order.quantity_left,
    unit: order.unit,
    quantityReceived: 0,
    unitPrice: 0,
    totalPrice: order.total_price,
    category: ''
  });

  const { Option } = Select;
  const dispatcher = useDispatch();

  useEffect(() => {
  }, [order, orderState, totalPrice, setOrderState])

  const categoriesToDisplay = () => {
    if (categories !== 0) {
      const categoriesDisplay = categories.map((category, index) =>
        <Option key={'category' + index} value={category} style={{ fontSize: 12 }}>{category}</Option>
      ).concat(<Option key={'notspecified' + index} value="not specified" style={{ fontSize: 12 }}>Not Specified</Option>)
      return categoriesDisplay;
    }
  }

  const onQuantityBlur = (data) => {
    const oldTotalPriceState = orderState;
    if (data > order.quantity_left) {
      message.error(`${'cannot exceed quantity requested for ' + order.product}`)
    }
    if (oldTotalPriceState.quantity === undefined) {
      setOrderState({
        ...oldTotalPriceState,
        quantity: order.quantity_left
      })
    }
    const newTotalPrice = data * oldTotalPriceState.unit_price
    const newOrderState = {
      ...oldTotalPriceState,
      product: order.product,
      unit: order.unit,
      quantity: data,
      totalPrice: newTotalPrice
    }
    console.log('newOrderState: ', newOrderState);
    console.log('index: ', index);
    setOrderState(newOrderState)
    dispatcher(actions.setOrder(newOrderState, index))
  }

  const onUnitPriceBlur = (data) => {
    const newData = parseFloat(data.split(',').join(''));
    const oldTotalPriceState = orderState;
    if (oldTotalPriceState.quantity === undefined) {
      setOrderState({
        ...oldTotalPriceState,
        quantity: order.quantity_left
      })
    }
    const newTotalPrice = parseFloat(newData * parseFloat(oldTotalPriceState.quantity));
    const newOrderState = {
      ...oldTotalPriceState,
      product: order.product,
      unit: order.unit,
      unitPrice: parseFloat(newData),
      totalPrice: newTotalPrice
    }
    setOrderState(newOrderState)
    dispatcher(actions.setOrder(newOrderState, index));
  }

  const validateQuantity = (data) => {
    if (parseFloat(data) <= order.quantity_left) {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'You are exceeding the quantity requested'
    };
  }
  const onCategorySelected = (data) => {
    const oldOrderState = orderState
    const newOrderState = {
      ...oldOrderState,
      category: data
    }
    setOrderState(newOrderState)
    dispatcher(actions.setOrder(newOrderState, index));
  }
  return (
    <div>
      <Form style={{ marginBottom: 0 }}>
        <Row key={'order' + order.id} style={{
          fontFamily: 'Arial',
          fontSize: 12,
          color: 'black'
        }}>
          <Col span={3} style={{ borderStyle: borderStyle }}>{index + 1}</Col>
          <Col span={6} style={{
            textAlign: 'left',
            borderStyle: borderStyle
          }}>{order.product}</Col>
          <Col span={2} style={{ borderStyle: borderStyle }}>
            <Form.Item style={{ marginBottom: 0 }}
              id={index + 'quantity'}
              name="quantity"
              initialValue={order.quantity_left.toFixed(2)}
              validateStatus={(e) => validateQuantity(e.target.value)}
              rules={[
                {
                  required: true,
                  message: 'Please Input Quantity'
                }
              ]}>
              <Input id={index + 'quantity'} max={order.quantity_left} onChange={(e) => onQuantityBlur(e)} style={{
                width: 60,
                fontSize: 12
              }} />
            </Form.Item>
          </Col>
          <Col span={2} style={{ borderStyle: borderStyle }}>{order.unit}</Col>
          <Col span={3} style={{ borderStyle: borderStyle }}>
            <Form.Item style={{ marginBottom: 0 }}
              id={index + 'unitPrice'}
              name="unitPrice"
              initialValue={order.unit_price}
              rules={[
                {
                  required: true,
                  message: 'Please Input Unit Price'
                }

              ]}>
              <Input id={index + 'unitPrice'} style={{
                width: 65,
                fontSize: 12
              }} onChange={(e) => onUnitPriceBlur(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={4} style={{
            borderStyle: borderStyle,
            textAlign: 'center'
          }}>{parseFloat(orderState.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Col>
          <Col>
            <Select style={{
              width: 80,
              fontSize: 12
            }} onSelect={(e) => onCategorySelected(e)}>
              {categoriesToDisplay()}
            </Select>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Order;