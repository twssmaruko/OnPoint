import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/vendors/actions/actions';
import {
    // Row, Col,
    Form, Input, Modal,
    // Select,
} from 'antd';
// import { API, graphqlOperation } from 'aws-amplify';
// import { createVendor } from '../../graphql/mutations';

// const { Option } = Select;

const EditVendor = (props) => {
    // const onFinish = (values) => {
    //   // eslint-disable-next-line no-console
    //   console.log('Success:', values);
    //   // API.graphql(graphqlOperation(createVendor, { input: { ...values } }));
    // };
    const dispatcher = useDispatch();
    const onFinishFailure = () => {
        // eslint-disable-next-line no-console
        console.log('Hi');
    };
    const [form] = Form.useForm();

    const {
        openModal,
        showSpin

    } = useSelector(({ ui }) => ({
        openModal: ui.openModal1,
        showSpin: ui.showSpin1

    }));

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        dispatcher(uiActions.setOpenModal1(false));
    };

    const { reference, editValues } = props;

    const onSubmit =(data) => {
        console.log(data);
        dispatcher(actions.editVendor(data, editValues.vendor_id));
        dispatcher(uiActions.setOpenModal1(false));
    }

    useEffect(() => {
        form.resetFields();
      }, [form,openModal]);

    return (
        <Modal
            maskClosable={false}
            title={'Edit Vendor'}
            visible={openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            okText={'Ok'}
            cancelText="Cancel"
            getContainer={false}
        >
            <div>
                <div style={{
                    textAlign: 'center',
                    marginTop: 20,
                    width: '100%'
                }}>
                    <h3 style={{ color: '#512E0E' }}>Vendors</h3>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20,
                    width: '100%'
                }}
                >
                    <Form
                        // layout="vertical"
                        form={form}
                        name="basic"
                        initialValues={editValues}
                        onFinish={onSubmit}
                    // labelAlign="left"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input vendor name!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input vendor address!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Telephone Number"
                            name="tel_no"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input vendor number!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Terms"
                            name="terms"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input vendor terms!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default EditVendor;
