import React, { useState, memo, useEffect } from "react";
import { Table, Row, Col } from "antd";
import {
  useSelector,
  shallowEqual,
  useDispatch,
  // useDispatch
} from "react-redux";
import * as actions from "../../store/purchaseorders/actions/Actions";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

const Homepage = () => {
  
  const dispatcher = useDispatch();

  const newWorksheet = useSelector(purchaseOrder => purchaseOrder.worksheet);
  useEffect(() => {
    dispatcher(actions.fetchWorksheet());
  }, [dispatcher]);

  const { worksheet } = useSelector(
    ({ purchaseOrder }) => ({
      worksheet: purchaseOrder.worksheet,
    }),
    shallowEqual
  );



  const columns = [
    {
      title: "YEAR",
      key: "details",
    },
    {
      title: "MO",
      sorter: (a, b) => b.purchaseOrderId - a.purchaseOrderId,
    },
    {
      title: "DAY",
      key: "project",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Requested On",
    },
    {
      title: "CODE",
    },
    {
      title: "PR NUMBER",
    },
    {
      title: "PO NUMBER",
    },
    {
      title: "ITEM",
    },
    {
      title: "ITEM DESCRIPTION",
    },
    {
      title: "QTY",
    },
    {
      title: "UNIT",
    },
    {
      title: "UNIT PRICE",
    },
    {
      title: "TOTAL AMOUNT",
    },
    {
      title: "VENDOR",
    },
    {
      title: "REMARKS",
    },
    {
      title: "REMARKS 2",
    },
  ];

  const [gridState, setGridState] = useState(() => {
    const worksheetData = newWorksheet;
    const newGrid = [[
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
    ]];

    console.log('worksheetData: ', worksheet);
    console.log('new Worksheet: ', newWorksheet);
    for(const key in worksheet) {

    newGrid.push([
      { readOnly: true, value: '', width: 50, fontWeight: 'bold' },
      { value: worksheet[key].year, },
      { value: worksheet[key].month, },
      { value: worksheet[key].day, },
      { value: worksheet[key].project, },
      { value: worksheet[key].category, },
      { value: worksheet[key].purchaseRequestNo, },
      { value: worksheet[key].purchaseOrderNo.slice(4), },
      { value: worksheet[key].itemType, },
      { value: worksheet[key].product, },
      { value: worksheet[key].quantity, },
      { value: worksheet[key].unit, },
      { value: worksheet[key].unitPrice, },
      { value: worksheet[key].totalPrice,  },
      { value: worksheet[key].vendor, },
      { value: "", },
      { value: "", }
    ])
  }
    return newGrid;
  });

  const onCellsChanged = (changes) => {
    let newGrid = gridState;
    changes.forEach(({ cell, row, col, value }) => {
      newGrid[row][col] = { ...newGrid[row][col], value };
    });
    setGridState(newGrid);
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h1>On Point Construction</h1>
      <h3>v0.3.5</h3>
      <h3 style={{ marginTop: 50 }}>PURCHASING WORKSHEET</h3>

      <Row style={{ marginBottom: 25, height: 250 }}>
        <Col span={24}>
          <Row>
            <Col span={1} />
            <Col span={22} style={{ marginRight: 20 }}>
              <ReactDataSheet
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
  );
};
export default Homepage;
