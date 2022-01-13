import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Radio, Input, Space } from 'antd';
import * as actions from '../../../store/purchaseorders/actions/Actions';


const PurchaseOrderGasOrder = (props) => {

const {orders} = props;
const [sampleGas, setSampleGas] = useState(1);
const dispatcher = useDispatch();

const ordersDisplay = orders.map((order) => (
    <Radio value={order.purchase_request_order_id}>{order.product + " " + order.item_type + " " + order.quantity_left + "L"}</Radio>
));

const onChange = (data) => {
    const foundOrder = orders.find((order) => order.purchase_request_order_id === data.target.value);
    console.log('foundOrder: ', foundOrder);
    dispatcher(actions.setGasOrder(foundOrder));
    setSampleGas(data.target.value)
}
    return (
        <div>
            <Radio.Group onChange = {onChange} value={sampleGas}>
                <Space direction="vertical">
                    {ordersDisplay}
                </Space>
            </Radio.Group>
        </div>
    )
}

export default PurchaseOrderGasOrder;