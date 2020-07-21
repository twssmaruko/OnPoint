/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  Form, Input, Button,
} from 'antd';
import BudgetCost from './BudgetCost/BudgetCost';

const Budget = () => {
  const [budgetCostState, setBudgetCostState] = useState([]);
  const [budgetComponentState, setBudgetComponentState] = useState({
    budget: {
      contractPrice: 0,
    },
  });
  const initBlurHandler = (e) => {
    const inputValues = parseFloat(e).toFixed(2);
    // setBudgetComponentState(inputValues);
    setBudgetComponentState({
      ...budgetComponentState,
      budget: {
        ...budgetComponentState.budget,
        contractPrice: inputValues,
      },
    });
  };

  const [initInputState] = useState([<Input
    style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'right' }}
    onBlur={(e) => initBlurHandler(e.target.value)}
  />]);

  const [inputState] = useState(initInputState);

  const addCostClicked = () => {
    const newBudgetCostState = budgetCostState.concat(<BudgetCost />);
    setBudgetCostState(newBudgetCostState);
  };

  useEffect(() => console.log(budgetComponentState.budget.contractPrice));

  return (
    <>
      <Form
        name="basic"
        style={{ marginRight: '0px' }}
      >
        <Form.Item
          name="contractPrice"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '0px' }}
        >
          <Row style={{ width: '850px' }}>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>CONTRACT PRICE</b>
            </Col>
            <Col flex="125px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              {inputState}
            </Col>
            <Col flex="32.5px" />
          </Row>

        </Form.Item>
        <Form.Item
          name="budgetPrice"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '0px' }}
        >
          <Row style={{ width: '850px' }}>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>BUDGET</b>
            </Col>
            <Col flex="125px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input disabled="true" style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'right' }} />
            </Col>
            <Col flex="32.5px" />
          </Row>

        </Form.Item>
        <Form.Item
          name="profit"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '0px' }}
        >
          <Row style={{ width: '850px' }}>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>PROFIT</b>
            </Col>
            <Col flex="125px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input disabled="true" style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'right' }} />
            </Col>
            <Col flex="32.5px" />
          </Row>

        </Form.Item>
        <Form.Item
          name="profitMargin"
          rules={[{ required: true, message: 'Please input the Contract Price!' }]}
          style={{ marginBottom: '20px', marginRight: '0px' }}
        >
          <Row style={{ width: '850px' }}>
            <Col flex="auto" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <b>PROFIT MARGIN</b>
            </Col>
            <Col flex="125px" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
              <Input disabled="true" style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }} />
            </Col>
            <Col flex="25px">
              <Button onClick={addCostClicked} shape="circle" type="primary">+</Button>
            </Col>
          </Row>
          {budgetCostState}
        </Form.Item>
      </Form>
    </>
  );
};

export default Budget;
