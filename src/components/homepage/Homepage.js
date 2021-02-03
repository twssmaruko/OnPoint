import React, { useState, memo, useEffect } from 'react';
import { Table, Row, Col } from 'antd';
import {
  useSelector, shallowEqual, useDispatch
  // useDispatch
} from 'react-redux';
import * as actions from '../../store/purchaseorders/actions/Actions';

const Homepage = () => {

  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.fetchWorksheet());
  }, [dispatcher])

  const columns = [
    {
      title: 'YEAR',
      key: 'details',
    },
    {
      title: 'MO',
      sorter: (a, b) => b.purchaseOrderId - a.purchaseOrderId,
    },
    {
      title: 'DAY',
      key: 'project',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Requested On',
    },
    {
      title: 'CODE'
    },
    {
      title: 'PR NUMBER'
    },
    {
      title: 'PO NUMBER'
    },
    {
      title: 'ITEM'
    },
    {
      title: 'ITEM DESCRIPTION'
    },
    {
      title: 'QTY'
    },
    {
      title: 'UNIT'
    },
    {
      title: 'UNIT PRICE'
    },
    {
      title: 'TOTAL AMOUNT'
    },
    {
      title: 'VENDOR'
    },
    {
      title: 'REMARKS'
    },
    {
      title: 'REMARKS 2'
    },

  ];


  return (
    <div style={{ marginTop: 50 }}>
      <h1>
        On Point Construction
    </h1>
      <h3>
        v0.3.5
    </h3>
      <h3 style={{ marginTop: 50 }}>
        PURCHASING WORKSHEET
    </h3>
      <Row>
        <Col span={3}></Col>
        <Col span={17}>
          <Table columns={columns} style={{fontSize: '6'}}/>
        </Col>
        <Col span={3}></Col>
      </Row>

    </div>
  )
}
export default Homepage;
