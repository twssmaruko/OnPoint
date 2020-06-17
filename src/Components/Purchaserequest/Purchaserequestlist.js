import React, { useState } from 'react';
import {
  Row, Col, Button, List, Table, Input, Modal,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import Purchaserequest from './Purchaserequest';


const Purchaselist = () => {
  const x = 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [prList, setprList] = useState([
    {
      prnumber: 'PR-1',
      description: 'Description for PR-1',
      unit: 'Unit 1',
      quantity: 1,
      price: 1000,
    },
    {
      prnumber: 'PR-2',
      description: 'Description for PR-2',
      unit: 'Unit 2',
      quantity: 2,
      price: 2000,
    },
    {
      prnumber: 'PR-3',
      description: 'Description for PR-3',
      unit: 'Unit 3',
      quantity: 3,
      price: 3000,
    },
  ]);


  const renderInput = () => (
    <div>
      <Input> Search </Input>
    </div>
  );


  const columns = [
    {
      title: () => (
        <div style={{ marginTop: 15 }}>
          <p style={{ display: 'inline-block' }}> PR number</p>
          <Button
            size="small"
            style={{ width: 20, marginLeft: 30, display: 'inline-block' }}
            icon={<SearchOutlined />}
            onClick={renderInput}
          />
        </div>
      ),
      dataIndex: 'prnumber',
      key: 'prnumber',
      width: 250,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,

    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      width: 250,

    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 250,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,

    },
    {
      title: '',
      key: 'delete',
      width: 200,
      render: () => (<a>Delete</a>),
    },
  ];

  const setModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };


  return (
    <>
      <Row>
        <Col offset={5} style={{ marginTop: '40px' }}>
          <Row>
            <h1>Purchase Request</h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setModal}>
              New
            </Button>
          </Row>
          <Row style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={prList}
                size="large"
                rowKey="prnumber"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Add Purchase Request"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        width={1000}
        okText="Save"
        cancelText="Cancel"
      >
        <Purchaserequest />
      </Modal>
    </>
  );
};

export default Purchaselist;
