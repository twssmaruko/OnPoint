import React from 'react';
import {useDispatch} from 'react-redux';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/equipment/actions/Actions';
import { Input, Row, Col, Form, message } from 'antd';
import "./Equipment.css"

const EquipmentModal = () => {

    const dispatcher = useDispatch();
    const [form] = Form.useForm();

    const onFormFinish = (data) => {
        message.success('Equipment Added!');
        dispatcher(actions.createEquipment(data));
        form.resetFields();
        dispatcher(uiActions.setOpenModal1(false));
    }
    const onFormFailed = (error) => {
        console.log('Failed: ', error);
    }
    return (
        <>
            <Form
            onFinish={onFormFinish}
            onFinishFailed={onFormFailed}
            id="equipmentForm"
            >
                <Form.Item
                className="margin-top"
                label="Equipment Name"
                name="equipment_name"
                rules={[{
                    required: true,
                    message: 'Please input an Equipment Name!'
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                label="Equipment Category"
                name="equipment_category"
                rules={[{
                    required: true,
                    message: 'Please input an Equipment Category!'
                }]}>
                    <Input />
                </Form.Item>
            </Form>
        </>
    )
}

export default EquipmentModal;