import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../store/materialsreceiving/actions/Actions';
import {
  Row,
  Col,
  Select,
  Spin,
  Form,
  InputNumber
} from 'antd';

const MaterialsReceivingOrder = (props) => {

  const [totalPriceState, setTotalPriceState] = useState(0);
  const { order, index, inputState, materialsReceivingState, purchaseOrderOrder } = props
  const dispatcher = useDispatch();
  const { Option } = Select;
  const { materialsReceiving, loading, categories } = useSelector(({ materialsReceiving }) => ({
    materialsReceiving: materialsReceiving.materialsReceiving,
    loading: materialsReceiving.loading,
    categories: materialsReceiving.categories
  }), shallowEqual)

  useEffect(() => {
    console.log('materialsReceiving123: ', materialsReceiving.orders[index].receivedSoFar);
  }, [dispatcher, materialsReceivingState, order, index, inputState])

  const categoriesShown = categories.map((category, index) =>
    <Option key={index} value={category}>{category}</Option>
  )

  const onQuantityChanged = (data) => {
    const newTotalPriceState = data * order.unitPrice;
    const oldOrders = materialsReceiving.orders;
    const newQuantityReceived = data;
    const newOrders = [];
    for (const key in oldOrders) {
      if (parseFloat(key) === index) {
        console.log('success');
        const newOrder = {
          ...oldOrders[key],
          quantityReceived: newQuantityReceived,
          receivedSoFar: newQuantityReceived,
          totalAmount: newTotalPriceState,
          id: key

        }
        newOrders.push(newOrder);
      } else {
        console.log('fail');
        newOrders.push({
          ...oldOrders[key],
          id: key
        })
      }
    }
    const newMaterialsReceiving = {
      ...materialsReceivingState,
      orders: newOrders
    }
    console.log('Materials Receiving: ', newMaterialsReceiving)
    dispatcher(actions.setMRR(newMaterialsReceiving));
    setTotalPriceState(newTotalPriceState);

  }
  return (
    <Spin spinning={loading}>
      <div key={index} style={{ marginTop: 0 }}>
        <Row style={{ marginTop: 0 }} key={'order' + index}>
          <Col span={7}>
            {order.product}
          </Col>
          <Col span={5} style={{ textAlign: 'center' }}>
            <InputNumber max={purchaseOrderOrder.quantity - purchaseOrderOrder.quantity_received} bordered={inputState} style={{
              textAlign: 'center',
              marginLeft: 0
            }} onChange={(e) => onQuantityChanged(e)} />
          </Col>
          <Col span={3} style={{ textAlign: 'left' }}>
            {order.unit}
          </Col>
          <Col span={3} style={{ textAlign: 'left' }}>
            {parseFloat(order.unit_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            {parseFloat(totalPriceState).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Select style={{ width: 75 }} defaultValue={materialsReceivingState.orders[index].category}>
              {categoriesShown}
            </Select>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default MaterialsReceivingOrder;