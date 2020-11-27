import React, {useEffect, useState} from 'react'
import {Row, Col, Input, InputNumber, Form, message, Select} from 'antd'

const Order = (props) => {

  const {order, index} = props
  const borderStyle = 'none'
  const [totalPriceState, setTotalPriceState] = useState({
    quantity: order.quantityLeft,
    unitPrice: 0,
    totalPrice: 0
  });

  useEffect(() => {
    console.log('orders: ', order);
    console.log('index: ', index);
  })



  const onQuantityBlur = (data) => {
    console.log(data)
    const oldTotalPriceState = totalPriceState;
    if (data > order.quantityLeft) {
      message.error(`${'cannot exceed quantity requested for ' + order.product}`)
    }
    if (oldTotalPriceState.quantity === undefined) {
      setTotalPriceState({
        ...oldTotalPriceState,
        quantity: order.quantityLeft
      })
    }
    setTotalPriceState({
      ...oldTotalPriceState,
      quantity: data,
      totalPrice: data * oldTotalPriceState.unitPrice
    })
  }

  const onUnitPriceBlur = (data) => {
    const oldTotalPriceState = totalPriceState;
    if (oldTotalPriceState.quantity === undefined) {
      setTotalPriceState({
        ...oldTotalPriceState,
        quantity: order.quantityLeft
      })
    }
    const newTotalPrice = parseFloat(data *parseFloat(oldTotalPriceState.quantity));
    setTotalPriceState({
      ...oldTotalPriceState,
      unitPrice: parseFloat(data),
      totalPrice: newTotalPrice
    })
  }

  const validateQuantity = (data) => {
    if (parseFloat(data) <= order.quantityLeft) {
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
  return (
    <div>
      <Form style={{marginBottom: 0}}>
        <Row key={'order' + order.id} style={{
          fontFamily: 'Arial',
          fontSize: 12,
          color: 'black'
        }}>
          <Col span={4} style={{borderStyle: borderStyle}}>{index + 1}</Col>
          <Col span={6} style={{
            textAlign: 'left',
            borderStyle: borderStyle
          }}>{order.product}</Col>
          <Col span={2} style={{borderStyle: borderStyle}}>
            <Form.Item style={{marginBottom: 0}}
              id={index + 'quantity'}
              name="quantity"
              initialValue = {totalPriceState.quantity}
              validateStatus={(e) => validateQuantity(e.target.value)}
              rules={[
                {required: true,
                  message: 'Please Input Quantity'}
              ]}>
              <InputNumber id={index + 'quantity'} max={order.quantityLeft} onChange = {(e) => onQuantityBlur(e)} style={{width: 60,
                fontSize: 12}}/>
            </Form.Item>
          </Col>
          <Col span={2} style={{borderStyle: borderStyle}}>{order.unit}</Col>
          <Col span={3} style={{borderStyle: borderStyle}}>
            <Form.Item style={{marginBottom: 0}}
              id={index + 'unitPrice'}
              rules={[
                {required: true,
                  message: 'Please Input Unit Price'},
                {type: 'number',
                  message: 'Please enter a number'}

              ]}>
              <Input id={index + 'unitPrice'} style={{width: 65}} onChange = {(e) => onUnitPriceBlur(e.target.value)}/>
            </Form.Item>
          </Col>
          <Col span={4} style={{borderStyle: borderStyle,
            textAlign: 'center'}}>{parseFloat(totalPriceState.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Col>
          <Col>
            <Select>

            </Select>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Order;