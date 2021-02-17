import React, { useState, memo, useEffect } from 'react';
import { Table, Row, Col } from 'antd';
import {
  useSelector, shallowEqual, useDispatch
  // useDispatch
} from 'react-redux';
import * as actions from '../../store/purchaseorders/actions/Actions';
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

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

  const [gridState, setGridState] = useState([
    [
      { readOnly: true, value: "", width: 50 },
      { value: "YEAR", readOnly: true, width: 50 },
      { value: "MO", readOnly: true, width: 50 },
      { value: "DAY", readOnly: true, width: 50 },
      { value: "PROJECT / JO NO.", readOnly: true, width: 300 },
      { value: "CODE", readOnly: true, width: 100 },
      { value: "PR NUMBER", readOnly: true, width: 100 },
      { value: "PO NUMBER", readOnly: true, width: 100 },
      { value: "ITEM", readOnly: true, width: 100 },
      { value: "ITEM DESCRIPTION", readOnly: true, width: 300 },
      { value: "QTY", readOnly: true, width: 100 },
      { value: "UNIT", readOnly: true, width: 100 },
      { value: "UNIT PRICE", readOnly: true, width: 100 },
      { value: "TOTAL AMOUNT", readOnly: true, width: 100 },
      { value: "VENDOR", readOnly: true, width: 100 },
      { value: "REMARKS", readOnly: true, width: 100 },
      { value: "REMARKS 2", readOnly: true, width: 100 },

    ],
    [
      { readOnly: true, value: 1 },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],

  ]);

  const onCellsChanged = (changes) => {
    let newGrid = gridState;
    changes.forEach(({ cell, row, col, value }) => {
      newGrid[row][col] = { ...newGrid[row][col], value }
    })
    setGridState(newGrid);
  }


  return (
    <div style={{ marginTop: 50}}>
      <h1>
        On Point Construction
    </h1>
      <h3>
        v0.3.5
    </h3>
      <h3 style={{ marginTop: 50 }}>
        PURCHASING WORKSHEET
    </h3>
      
          <Row style={{ marginBottom: 25, height: 250}}>
            <Col span={24}>
              <Row>
                <Col span={1} />
                <Col span={22} style={{ marginRight: 20 }}><ReactDataSheet
                  data={gridState}
                  valueRenderer={(cell) => cell.value}
                  onCellsChanged={(changes) => onCellsChanged(changes)}
                />
                </Col>
                <Col span={1} />
              </Row>
            </Col>
          </Row>
    </div>
  )
}
export default Homepage;
