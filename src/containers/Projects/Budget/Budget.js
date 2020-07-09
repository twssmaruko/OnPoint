/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import {
  Row, Col,
  Form, Input, Button,
} from 'antd';
import BudgetCost from './BudgetCost/BudgetCost';

const Budget = () => {
  const [budgetCostState, setBudgetCostState] = useState([]);
  const addCostClicked = () => {
    const newBudgetCostState = budgetCostState.concat(<BudgetCost />);
    setBudgetCostState(newBudgetCostState);
  };

  return (
    <>
      <Form
        name="basic"
      >
        <Form.Item
          name="contractPrice"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '0px' }}
        >
          <Row>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>CONTRACT PRICE</b>
            </Col>
            <Col flex="150px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input />
            </Col>
          </Row>

        </Form.Item>
        <Form.Item
          name="budgetPrice"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '0px' }}
        >
          <Row>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>BUDGET</b>
            </Col>
            <Col flex="150px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input disabled="true" />
            </Col>
          </Row>

        </Form.Item>
        <Form.Item
          name="profit"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '0px' }}
        >
          <Row>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>PROFIT</b>
            </Col>
            <Col flex="150px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input disabled="true" />
            </Col>
          </Row>

        </Form.Item>
        <Form.Item
          name="profitMargin"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '20px' }}
        >
          <Row>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>PROFIT MARGIN</b>
            </Col>
            <Col flex="150px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input disabled="true" />
            </Col>
            <Col>
              <Button onClick={addCostClicked}>Add Cost</Button>
            </Col>
          </Row>
          {budgetCostState}
        </Form.Item>
      </Form>
    </>
  );
};

export default Budget;
