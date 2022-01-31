import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Form, Row, Col, Input, message } from 'antd';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/equipment/actions/Actions';
import "./Equipment.css";

const EquipmentDetail = (props) => {

    const dispatcher = useDispatch();

    const { chosenEquipment } = props;
    const onFormFinish = (data) => {
        const newDetails = {
            ...data,
            equipment_id: chosenEquipment.equipment_id
        }
        dispatcher(actions.editEquipment(newDetails));
        dispatcher(uiActions.setOpenModal2(false));
    }
    const onFormFailed = (error) => {
        console.log('Failed: ', error);
    }

    return (
        <>
            <Form
            id="formDetail"
            onFinish={onFormFinish}
            onFinishFailed={onFormFailed}>
                <Form.Item
                className="margin-top"
                label="Equipment Name"
                name="equipment_name"
                rules={[{
                    required: true,
                    message: 'Please input an Equipment Name!'
                }]}
                initialValue={chosenEquipment.equipment_name}>
                    <Input />
                </Form.Item>
                <Form.Item
                label="Equipment Category"
                name="equipment_category"
                rules={[{
                    required: true,
                    message: 'Please input an Equipment Category!'
                }]}
                initialValue={chosenEquipment.equipment_category}>
                    <Input />
                </Form.Item>
            </Form>
        </>
    )
}

export default EquipmentDetail;