import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Input, Select } from 'antd';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiActions from "../../../store/ui/actions/Actions";
import * as poActions from '../../../store/purchaseorders/actions/Actions';
import Logo from '../../../components/logo/Logo';
import './PurchaseOrder.css'
import moment from "moment";

const PurchaseOrderGas = (props) => {

    const { modalVisible } = props

    const { Option } = Select;

    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(poActions.getPurchaseRequests());
        dispatcher(poActions.fetchProjectForPurchaseOrder());
    }, [dispatcher])

    const { openModal, purchaseRequests, projects } = useSelector(({ ui, purchaseOrder }) => ({
        openModal: ui.openModal3,
        purchaseRequests: purchaseOrder.purchaseRequests,
        projects: purchaseOrder.projects
    }), shallowEqual)

    const onCancelClicked = () => {
        dispatcher(uiActions.setOpenModal3(false));
    }

    const onOk = () => {
        dispatcher(uiActions.setOpenModal3(false));
        console.log('projects: ', projects);
    }

    const prList = purchaseRequests.map((purchaseRequest) => (

        <Option key={purchaseRequest.id} value={purchaseRequest.id}>{purchaseRequest.purchaseRequestNo}</Option>

    ))


    return (
        <Modal
            className='black-text'
            title="Gas Purchase Order"
            visible={openModal}
            onOk={onOk}
            width={700}
            onCancel={onCancelClicked}
            maskClosable={false}
            okText="Proceed"
            cancelText="Cancel"
            destroyOnClose
        >
            <Row>
                <Col span={11}>
                    <Logo />
                </Col>
                <Col span={2} />
                <Col span={11}>
                    <Row className='purchase-order-text'>
                        <Col span={24} className='white-text'>
                            PURCHASE ORDER
                        </Col>
                    </Row>
                    <Row className='input-text-align'>
                        <Col span={24} className='input-text-align'>
                            <Row className='item-box'>
                                <Col span={4} />
                                <Col span={5}>
                                    OPCDC-
                                </Col>
                                <Col span={4}>
                                    <Input />
                                </Col>
                                <Col span={2}>
                                    -G
                                </Col>
                                <Col span={5}>
                                    <Input />
                                </Col>
                                <Col span={4} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={9}>
                    <Row className='bold-text'>
                        <Col className='input-text-align' span={24}>
                            ON POINT CONSTRUCTION
                        </Col>
                    </Row>
                    <Row>
                        <Col className='input-text-align' span={24}>
                            28A Sanson Road, Lahug
                        </Col>
                    </Row>
                    <Row>
                        <Col className='input-text-align' span={24}>
                            Cebu City, Philippines
                        </Col>
                    </Row>
                </Col>
                <Col span={5} />
                <Col span={10}>
                    <Row>
                        <Col span={8}>
                            PR / DOC NO:
                        </Col>
                        <Col span={16}>
                            <Select style={{ width: 100, height: 12 }}>
                                {prList}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ color: 'white' }}>_</Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            ORDER DATE:
                        </Col>
                        <Col span={14}>
                            {`${moment(new Date()).format("MMMM D, Y")}`}
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={11} className="vj-box">
                    <Row className="vj-header">
                        <Col span={24}>
                            VENDOR
                        </Col>
                    </Row>
                    <Row className="vj-text">
                        <Col span={5}>
                            Name:
                        </Col>
                        <Col span={18}>
                            First Auto LPG Gas Holdings Corp.
                        </Col>
                    </Row>
                    <Row className="vj-text">
                        <Col span={5}>
                            Address:
                        </Col>
                        <Col span={18}>
                            Lahug, Cebu City
                        </Col>
                    </Row>
                    <Row className="vj-text">
                        <Col span={5}>
                            Tel:
                        </Col>
                        <Col span={18}>
                            4161980
                        </Col>
                    </Row>
                </Col>
                <Col span={2} />
                <Col span={11} className="vj-box">
                    <Row className="vj-header">
                        <Col span={24}>
                            JOB ADDRESS
                        </Col>
                    </Row>
                    <Row className="vj-text">
                        <Col span={4}>
                            Req By:
                        </Col>
                        <Col span={18}>
                            Engr. Jojo Salamanes
                        </Col>
                    </Row>
                    <Row className="vj-text">
                        <Col span={4}>
                            Project:
                        </Col>
                        <Col span={18}>
                            <Select style={{ width: 100, height: 14 }}>

                            </Select>
                        </Col>
                    </Row>
                    <Row className="vj-text">
                        <Col span={4}>
                            Tel:
                        </Col>
                        <Col span={18}>
                            4161980
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className='mid-text'>
                <Col className='bold-text' span={24}>
                    PLEASE SUPPLY THE FOLLOWING:
                </Col>
            </Row>

            <Row className='item-box'>
                <Col span={24}>
                    <Row className='border-bottom'>
                        <Col span={1} className='border-right'>
                            IT
                        </Col>
                        <Col span={10} className='border-right'>
                            PRODUCT DESCRIPTION
                        </Col>
                        <Col span={5} className='border-right'>
                            Liter(s)
                         </Col>
                        <Col span={4} className='border-right'>
                            UNIT PRICE
                        </Col>
                        <Col span={4} className='input-text-align'>
                            TOTAL
                        </Col>
                    </Row>

                    <Row className='border-bottom'>
                        <Col span={1} className='border-right'>
                            1
                        </Col>
                        <Col span={10} className='border-right'>
                            Diesel
                        </Col>
                        <Col span={5} className='border-right'>
                            <Input bordered={false} className='input-text-align' />
                        </Col>
                        <Col span={4} className='border-right'>

                        </Col>
                        <Col span={4}>

                        </Col>
                    </Row>

                    <Row className='border-bottom'>
                        <Col span={1} className='border-right'>
                            2
                        </Col>
                        <Col span={10} className='border-right'>
                            Premium
                        </Col>
                        <Col span={5} className='border-right'>
                            <Input bordered={false} className='input-text-align' />
                        </Col>
                        <Col span={4} className='border-right'>

                        </Col>
                        <Col span={4}>

                        </Col>
                    </Row>

                    <Row className='border-bottom'>
                        <Col span={1} className='border-right'>
                            3
                        </Col>
                        <Col span={10} className='border-right'>
                            Unleaded
                        </Col>
                        <Col span={5} className='border-right'>
                            <Input bordered={false} className='input-text-align' />
                        </Col>
                        <Col span={4} className='border-right'>

                        </Col>
                        <Col span={4}>

                        </Col>
                    </Row>

                    <Row className='border-bottom'>
                        <Col span={1} className='border-right'>
                            4
                        </Col>
                        <Col span={10} className='border-right'>
                            DIESEL Engine OIL
                        </Col>
                        <Col span={5} className='border-right'>
                            <Input bordered={false} className='input-text-align' />
                        </Col>
                        <Col span={4} className='border-right'>

                        </Col>
                        <Col span={4}>

                        </Col>
                    </Row>

                    <Row>
                        <Col span={1} className='border-right'>

                        </Col>
                        <Col span={10} className='border-right'>
                            Total
                        </Col>
                        <Col span={5} className='border-right'>

                        </Col>
                        <Col span={4} className='border-right'>

                        </Col>
                        <Col span={4}>

                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={11}>
                </Col>
                <Col span={2}>
                </Col>
                <Col span={11}>
                </Col>
            </Row>

            <Row>
                <Col span={11}>
                    Name:
                </Col>
                <Col span={2}>
                </Col>
                <Col span={11}>
                    Authorized by:
                </Col>
            </Row>




        </Modal>
    )
}

export default PurchaseOrderGas;