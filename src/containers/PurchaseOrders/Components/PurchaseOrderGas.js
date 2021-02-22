import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Input, Select } from 'antd';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiActions from "../../../store/ui/actions/Actions";
import * as poActions from '../../../store/purchaseorders/actions/Actions';
import Logo from '../../../components/logo/Logo';
import moment from "moment";

const PurchaseOrderGas = (props) => {

    const { modalVisible } = props

    const { Option } = Select;

    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(poActions.getPurchaseRequests());
    }, [dispatcher])

    const { openModal, purchaseRequests } = useSelector(({ ui, purchaseOrder }) => ({
        openModal: ui.openModal1,
        purchaseRequests: purchaseOrder.purchaseRequests
    }), shallowEqual)

    const onCancelClicked = () => {
        dispatcher(uiActions.setOpenModal1(false));
    }

    const onOk = () => {
        dispatcher(uiActions.setOpenModal1(false));
    }

    const prList = purchaseRequests.map((purchaseRequest) => (

        <Option key={purchaseRequest.id} value={purchaseRequest.id}>{purchaseRequest.purchaseRequestNo}</Option>

    ))


    return (
        <Modal
            title="Add a new purchase request"
            visible={openModal}
            onOk={onOk}
            width={800}
            onCancel={onCancelClicked}
            maskClosable={false}
            okText="Add Purchase Order"
            cancelText="Cancel"
            destroyOnClose
        >
            <Row>
                <Col span={12}>
                    <Logo />
                </Col>
                <Col span={12}>
                    <Row>
                        <Col>
                            PURCHASE ORDER
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            OPCDC-
                        </Col>
                        <Col span={5}>
                            <Input />
                        </Col>
                        <Col span={2}>
                            -G-
                        </Col>
                        <Col span={6}>
                            <Input />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Row>
                        <Col>
                            ON POINT CONSTRUCTION
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            28A Sanson Road, Lahug
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Cebu City, Philippines
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={8}>
                            PR / DOC NO:
                        </Col>
                        <Col span={16}>
                            <Select style={{ width: 100 }}>
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
                <Col span={11}>
                    <Row>
                        <Col>
                            VENDOR
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            Name:
                        </Col>
                        <Col span={18}>
                            First Auto LPG Gas Holdings Corp.
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            Address:
                        </Col>
                        <Col span={18}>
                            Lahug, Cebu City
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            Tel:
                        </Col>
                        <Col span={18}>
                            4161980
                        </Col>
                    </Row>
                </Col>
                <Col span={1} />
                <Col span={11}>
                    <Row>
                        <Col>
                            JOB ADDRESS
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            Req By:
                        </Col>
                        <Col span={18}>
                            Engr. Jojo Salamanes
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            Project:
                        </Col>
                        <Col span={18}>
                            <Select style={{ width: 100, height: 14 }}>

                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            Tel:
                        </Col>
                        <Col span={18}>
                            4161980
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col>
                    PLEASE SUPPLY THE FOLLOWING:
                </Col>
            </Row>

            <Row>
                <Col span={1}>
                    IT
                </Col>
                <Col span={10}>
                    PRODUCT DESCRIPTION
                </Col>
                <Col span={5}>
                    Liter(s)
                </Col>
                <Col span={4}>
                    UNIT PRICE
                </Col>
                <Col span={4}>
                    TOTAL
                </Col>
            </Row>

            <Row>
                <Col span={1}>
                    1
                </Col>
                <Col span={10}>
                    Diesel
                </Col>
                <Col span={5}>
                    <Input bordered={false}/>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
            </Row>

            <Row>
                <Col span={1}>
                    2
                </Col>
                <Col span={10}>
                    Premium
                </Col>
                <Col span={5}>
                    <Input bordered={false}/>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
            </Row>

            <Row>
                <Col span={1}>
                    3
                </Col>
                <Col span={10}>
                    Unleaded
                </Col>
                <Col span={5}>
                    <Input bordered={false}/>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
            </Row>

            <Row>
                <Col span={1}>
                    4
                </Col>
                <Col span={10}>
                    DIESEL Engine OIL
                </Col>
                <Col span={5}>
                    <Input bordered={false}/>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
            </Row>

            <Row>
                <Col span={1}>
                    
                </Col>
                <Col span={10}>
                    Total
                </Col>
                <Col span={5}>
                    <Input bordered={false}/>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

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