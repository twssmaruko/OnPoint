/* eslint-disable no-restricted-syntax */
import React, {useState, useEffect} from 'react';
import {
  Row, Col,
  Form, Input, Button
} from 'antd';
import {connect} from 'react-redux';
import BudgetCost from './BudgetCost/BudgetCost';
import * as actions from '../../../store/projects/index';

const Budget = (props) => {
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
  const budgetCostIndex = props.bdgt.budgetCostCount;
  const {projectKey} = props;
  const addCostClicked = () => {
    props.onBudgetCostAdded();
    const newBudgetCostState =
    budgetCostState.concat(<BudgetCost
      budgetCostIndex={budgetCostIndex}
      key={projectKey + "-budgetCost-" + props.bdgt.budgetCostCount}
      projectKey = {projectKey}
    />);
    setBudgetCostState(newBudgetCostState);
  };

  const onChangeHandler = (input) => {
    const inputValues = parseFloat(input.split(',').join(''));
    // setBudgetComponentState(inputValues);
    props.onContractPriceUpdated(inputValues);

  };
  const budgetPrice = parseFloat(props.bdgt.budgetPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const profit = parseFloat(props.bdgt.profit).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const profitMargin = parseFloat(props.bdgt.profitMargin).toFixed(2).toString() + '%';

  useEffect(() => console.log("BUDGET: "));
  useEffect(() => console.log(props.bdgt));

  return (
    <>
      <Form
        name="basic"
        style={{marginRight: '0px',
          marginLeft: '10px'}}
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
              <Input disabled={true} style={{fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'right'}}
              value={budgetPrice} />
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
              <Input disabled={true} style={{fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'right'}}
              value={profit} />
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
          value={profitMargin}
        >
          <Row style={{width: '850px'}}>
            <Col flex="auto" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <b>PROFIT MARGIN</b>
            </Col>
            <Col flex="125px" style={{borderWidth: 'thin',
              borderStyle: 'solid'}}>
              <Input disabled={true} style={{fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center'}}
              value={profitMargin} />
            </Col>
            <Col flex="25px">
              <Button onClick={addCostClicked} shape="circle" type="primary">+</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      {budgetCostState}
    </>
  );
};

const mapStateToProps = (state) => ({
  bdgt: state.project.project.budget
});

const mapDispatchToProps = (dispatch) => ({
  onContractPriceUpdated: (contractPrice) => dispatch(actions.updateContractPrice(contractPrice)),
  onBudgetCostAdded: () => dispatch(actions.addBudgetCost())
});


export default connect(mapStateToProps, mapDispatchToProps)(Budget);
