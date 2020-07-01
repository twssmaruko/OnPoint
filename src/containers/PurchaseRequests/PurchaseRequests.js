import React from 'react';
import {
  Row, Col,
  Button,
  // List,
  Table,
  Input,
  Modal,
  Spin,
} from 'antd';

import { useSelector, useDispatch } from 'react-redux';

import { SearchOutlined } from '@ant-design/icons';
import PurchaseRequestForm from './PurchaseRequestForm';
import * as uiActions from '../../store/ui/actions/Actions';

const PurchaseRequests = () => {
  const dispatcher = useDispatch();
  const {
    openModal,
    showSpin,
  } = useSelector(({ ui }) => ({
    showSpin: ui.showSpin,
    openModal: ui.openModal,
  }));

  // const x = 0;

  const prList = [
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
  ];

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
      title: '',
      key: 'delete',
      width: 200,
      render: () => (<Button type="link">Delete</Button>),
    },
  ];

  const setModal = () => {
    dispatcher(uiActions.setOpenModal(true));
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal(false));
  };

  return (
    <>
      <Row>
        <Col offset={5} style={{ marginTop: 20 }}>
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
        title="Add a new purchase request"
        visible={openModal}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="ok"
        cancelText="Cancel"
        destroyOnClose
      >
        <Spin spinning={showSpin}>
          <PurchaseRequestForm />
        </Spin>
      </Modal>

    </>
  );
};

export default PurchaseRequests;
