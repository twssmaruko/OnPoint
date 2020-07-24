/* eslint-disable no-restricted-syntax */
import React, {useState, useEffect, useRef} from 'react';
import {
  Row, Col,
  Form, Input, Button
} from 'antd';
import {connect} from 'react-redux';
import BudgetCost from './BudgetCost/BudgetCost';
import * as actions from '../../../store/projects/index';

const Budget = (props) => {

  const formRef = useRef(null);
  const [budgetCostState, setBudgetCostState] = useState([]);
  // const [budgetComponentState, setBudgetComponentState] = useState({
  //   budget: {
  //     contractPrice: 0,
  //     budgetPrice: 0,
  //     profit: 0,
  //     profitMargin: '0%',
  //     budgetCost: []
  //   }
  // });


  const addCostClicked = () => {
    const newBudgetCostState = budgetCostState.concat(<BudgetCost reference={formRef}/>);
    setBudgetCostState(newBudgetCostState);
  };

  const onChangeHandler = (e) => {
    const inputValues = parseFloat(e).toFixed(2);
    // setBudgetComponentState(inputValues);
    props.onContractPriceUpdated(inputValues);

  };

  const testDataHandler = () => {
    budgetCostState.forEach()
  }

  useEffect(() => console.log(props.bdgt));

  return (
    <>
      <Form
        name="basic"
        style={{marginRight: '0px'}}
      >
        <Form.Item
          name="contractPrice"
          rules={[
            {required: true,
              message: 'Please input the Contract Price!'}
          ]}
          style={{marginBottom: '0px'}}
        >
          <Row style={{width: '850px'}}>
            <Col flex="auto" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <b>CONTRACT PRICE</b>
            </Col>
            <Col flex="125px" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <Input
                style={{fontWeight: 'bold',
                  fontSize: 12,
                  textAlign: 'right'}}
                onBlur={(e) => onChangeHandler(e.target.value)}
              />
            </Col>
            <Col flex="32.5px" />
          </Row>

        </Form.Item>
        <Form.Item
          name="budgetPrice"
          rules={[
            {required: true,
              message: 'Please input the Contract Price!'}
          ]}
          style={{marginBottom: '0px'}}
        >
          <Row style={{width: '850px'}}>
            <Col flex="auto" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <b>BUDGET</b>
            </Col>
            <Col flex="125px" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <Input disabled="true" style={{fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'right'}} />
            </Col>
            <Col flex="32.5px" />
          </Row>

        </Form.Item>
        <Form.Item
          name="profit"
          rules={[
            {required: true,
              message: 'Please input the Contract Price!'}
          ]}
          style={{marginBottom: '0px'}}
        >
          <Row style={{width: '850px'}}>
            <Col flex="auto" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <b>PROFIT</b>
            </Col>
            <Col flex="125px" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <Input disabled="true" style={{fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'right'}} />
            </Col>
            <Col flex="32.5px" />
          </Row>

        </Form.Item>
        <Form.Item
          name="profitMargin"
          rules={[
            {required: true,
              message: 'Please input the Contract Price!'}
          ]}
          style={{marginBottom: '20px',
            marginRight: '0px'}}
        >
          <Row style={{width: '850px'}}>
            <Col flex="auto" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <b>PROFIT MARGIN</b>
            </Col>
            <Col flex="125px" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <Input disabled="true" style={{fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center'}} />
            </Col>
            <Col flex="25px">
              <Button onClick={addCostClicked} shape="circle" type="primary">+</Button>
            </Col>
          </Row>
          {budgetCostState}
        </Form.Item>
        <Button onClick={testDataHandler}>Test</Button>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  bdgt: state.project.budget
});

const mapDispatchToProps = (dispatch) => ({
  onContractPriceUpdated: (contractPrice) => dispatch(actions.updateContractPrice(contractPrice))
});


export default connect(mapStateToProps, mapDispatchToProps)(Budget);
