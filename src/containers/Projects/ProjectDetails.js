import React, {useState, useEffect, useRef} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
//import * as actions from '../../store/projects/index';
import Logo from '../../components/logo/Logo';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {
  Form,
  Row,
  Col,
  Button
} from 'antd';
const ProjectDetails = () => {

  const {
    selectedProject
  } = useSelector(({project}) => ({
    selectedProject: project.selectedProject
  }), shallowEqual);
  const history = useHistory();
  // const dispatcher = useDispatch();
  // // useEffect(() => {
  // //   dispatcher(uiActions.setShowSpin2(true));
  // //   dispatcher(actions.fetchSelectedProject());
  // //   dispatcher(uiActions.setShowSpin2(false));
  // // }, [dispatcher]);
  const [projectState, setProjectState] = useState([]);
  const newContractPrice = parseFloat(selectedProject.budget.contractPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const newBudgetPrice = parseFloat(selectedProject.budget.budgetPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const newProfit = parseFloat(selectedProject.budget.profit).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const newProfitMargin = parseFloat(selectedProject.budget.profitMargin).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const colSpans = [2,16,3,3];
  useEffect(() => {
    if (selectedProject.projectName === '') {
      history.push('/projects');
    }
  })
  const btnRef = useRef();
  const budgetParameters = {
    contractPrice: newContractPrice,
    budgetPrice: newBudgetPrice,
    profit: newProfit,
    profitMargin: newProfitMargin
  }

  const setProject = () => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    let thisState = projectState;
    for (const budgetCostKey in selectedProject.budget.budgetCost) {
      const newState = thisState.concat(
        <Form key = {budgetCostKey} style={{
          marginLeft: '100px',
          marginRight: '100px'
        }}>
          <Form.Item
            style={{
              marginTop: '5px',
              marginBottom: '0px'
            }}>
            <Row>
              <Col  span={colSpans[0]}
                style={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: 'black',
                  backgroundColor: 'yellow',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#5DADE2'
                }}
              >
                {selectedProject.budget.budgetCost[budgetCostKey].itemCode}
              </Col>
              <Col span ={colSpans[1]}
                style={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: 'black',
                  backgroundColor: 'yellow',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#5DADE2'
                }}>
                {selectedProject.budget.budgetCost[budgetCostKey].name}
              </Col>
              <Col span={colSpans[2]}
                style={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: 'black',
                  backgroundColor: 'yellow',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: 12,
                  height: '32px',
                  color: '#5DADE2'
                }}>
                {parseFloat(selectedProject.budget.budgetCost[budgetCostKey].totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </Col>
              <Col span={colSpans[3]}
                style={{
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: 'black',
                  backgroundColor: 'yellow',
                  borderLeftStyle: 'none',
                  fontSize: 12,
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: '#5DADE2'
                }}>
                {parseFloat(selectedProject.budget.budgetCost[budgetCostKey].amountSpent).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )
      thisState = newState;
      for (const subCategoryKey in selectedProject.budget.budgetCost[budgetCostKey].subCategories) {
        const {subCategories} = selectedProject.budget.budgetCost[budgetCostKey];
        const newState = thisState.concat(
          <Form key = {budgetCostKey + subCategoryKey} style={{
            marginLeft: '100px',
            marginRight: '100px',
            marginTop: '0px'}}>
            <Form.Item style={{marginBottom: '0px',
              marginTop: '10px'}}>
              <Row>
                <Col span={colSpans[0]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    backgroundColor: '#DCDCDC',
                    height: '31.5px',
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}>
                  {subCategories[subCategoryKey].itemCode}
                </Col>
                <Col span={colSpans[1]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    backgroundColor: '#DCDCDC',
                    height: '31.5px',
                    textAlign: 'left',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}>
                  {subCategories[subCategoryKey].name}
                </Col>
                <Col span={colSpans[2]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    backgroundColor: '#DCDCDC',
                    fontSize: 12,
                    height: '31.5px',
                    textAlign: 'right',
                    fontWeight: 'bold'
                  }}>
                  {parseFloat(subCategories[subCategoryKey].totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </Col>
                <Col span={colSpans[3]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    backgroundColor: '#DCDCDC',
                    fontSize: 12,
                    height: '31.5px',
                    textAlign: 'right',
                    fontWeight: 'bold'
                  }}>
                  {parseFloat(subCategories[subCategoryKey].amountSpent).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={{marginBottom: '0px',
              marginTop: '0px'}}>
              <Row>
                <Col span={colSpans[0]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    textAlign: 'center',
                    fontSize: '10px',
                    color: '#5DADE2',
                    height: '31.5px',
                    fontWeight: 'bold'
                  }}>
                  ITEM NO.
                </Col>
                <Col span={colSpans[1]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    fontSize: '10px',
                    textAlign: 'center',
                    color: '#5DADE2',
                    height: '31.5px',
                    fontWeight: 'bold'
                  }}>
                DESCRIPTION
                </Col>
                <Col span={colSpans[2]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    fontSize: '10px',
                    textAlign: 'center',
                    color: '#5DADE2',
                    height: '31.5px',
                    fontWeight: 'bold'
                  }}>
                AMOUNT
                </Col>
                <Col span={colSpans[3]}
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 'thin',
                    borderColor: 'black',
                    fontSize: '10px',
                    textAlign: 'center',
                    color: '#5DADE2',
                    height: '31.5px',
                    fontWeight: 'bold'
                  }}>
                AMOUNT SPENT
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )
        thisState = newState;
        const {subCategoryItem} = selectedProject.budget
          .budgetCost[budgetCostKey]
          .subCategories[subCategoryKey];

        for (const subCategoryItemKey in selectedProject.budget.budgetCost[budgetCostKey]
          .subCategories[subCategoryKey].subCategoryItem) {
          const newState = thisState.concat(
            <Form key = {budgetCostKey + subCategoryKey + subCategoryItemKey}
              style={{
                marginLeft: '100px',
                marginRight: '100px',
                marginTop: '0px'
              }}>
              <Form.Item style={{
                marginTop: '0px',
                marginBottom: '0px'
              }}>
                <Row>
                  <Col span={colSpans[0]}
                    style={{
                      borderStyle: 'solid',
                      borderWidth: 'thin',
                      borderColor: 'black',
                      textAlign: 'center',
                      fontSize: 12,
                      height: '31.5px'
                    }}>
                    {subCategoryItem[subCategoryItemKey].itemCode}
                  </Col>
                  <Col span={colSpans[1]}
                    style={{
                      borderStyle: 'solid',
                      borderWidth: 'thin',
                      borderColor: 'black',
                      textAlign: 'left',
                      fontSize: 12,
                      height: '31.5px'
                    }}>
                    {subCategoryItem[subCategoryItemKey].name}
                  </Col>
                  <Col  span={colSpans[2]}
                    style={{
                      borderStyle: 'solid',
                      borderWidth: 'thin',
                      borderColor: 'black',
                      textAlign: 'right',
                      fontSize: 12,
                      height: '31.5px'
                    }}>
                    {parseFloat(subCategoryItem[subCategoryItemKey].cost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </Col>
                  <Col  span={colSpans[3]}
                    style={{
                      borderStyle: 'solid',
                      borderWidth: 'thin',
                      borderColor: 'black',
                      textAlign: 'right',
                      fontSize: 12,
                      height: '31.5px'
                    }}>
                    {parseFloat(subCategoryItem[subCategoryItemKey].amountSpent).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          )
          thisState = newState;
        }
      }
    }
    setProjectState(thisState);
  }


  return (
    <>
      <div style={{textAlign: 'center',
        marginTop: 20,
        width: '100%'}}>
        <h3 style={{color: '#512E0E'}}><Logo /></h3>
      </div>
      <div style={{
        marginTop: 20,
        width: '65%',
        alignContent: 'center'
      }}
      >
        <Form
          id={"project" + uuidv4}
          name="basic"
          style={{marginLeft: '100px',
            marginRight: '100px'}}
        >
          <Form.Item>
            <Button ref={btnRef} onClick={setProject}>
              Load
            </Button>
          </Form.Item>
          <Form.Item
            label="Client"
            name="clientName"
            style={{marginBottom: '5px',
              justifyContent: 'flex'}}
          >
            <div style ={{fontWeight: 'bold',
              textAlign: 'left'}}>
              {selectedProject.clientName}
            </div>
          </Form.Item>
          <Form.Item
            label="Project"
            name="projectName"
            style={{marginBottom: '5px',
              justifyContent: 'flex'}}
            //onBlur = {e => onBlurProjectName(e.target.value)}
          >
            <div style ={{fontWeight: 'bold',
              textAlign: 'left'}}>
              {selectedProject.projectName}
            </div>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            style={{marginBottom: '10px'
            }}
            // onBlur = {e => onBlurLocation(e.target.value)}
          >
            <div style ={{fontWeight: 'bold',
              textAlign: 'left'}}>
              {selectedProject.location}
            </div>

          </Form.Item>
        </Form>
        <h3 style={{textAlign: 'center'}}><b>BUDGET PROPOSAL</b></h3>
        <Form
          id={"budget" + uuidv4}
          name="basic"
          style={{marginLeft: '100px',
            marginRight: '100px'}}
        >
          <Form.Item
            name="contractPrice"
            style={{marginBottom: '0px'}}
          >
            <Row style={{
              height: '27px',
              marginBottom: '0px'}}>
              <Col span={colSpans[0] + colSpans[1]} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                textAlign: 'left'}}>
                <b>CONTRACT PRICE</b>
              </Col>
              <Col span={colSpans[2]} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'right'}}>
                {budgetParameters.contractPrice}
              </Col>
              <Col flex="32.5px" />
            </Row>
          </Form.Item>
          <Form.Item
            style ={{marginBottom: '0px',
              marginTop: '0px'}}>
            <Row style = {{
              height: '27px',
              marginBottom: '0px',
              marginTop: '0px'}}>
              <Col span ={colSpans[0] + colSpans[1]} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                textAlign: 'left'}}>
                <b>BUDGET</b>
              </Col>
              <Col span={colSpans[2]} style = {{borderWidth: 'thin',
                borderStyle: 'solid',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'right'}}>
                {budgetParameters.budgetPrice}
              </Col>
              <Col flex="32.5px" />
            </Row>
          </Form.Item>
          <Form.Item
            style={{marginBottom: '0px',
              marginTop: '0px'}}>
            <Row style={{
              marginBottom: '0px',
              marginTop: '0px',
              height: '27px'}}>
              <Col span={colSpans[0] + colSpans[1]} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                textAlign: 'left'}}>
                <b>PROFIT</b>
              </Col>
              <Col span={colSpans[2]} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'right'}}>
                {budgetParameters.profit}
              </Col>
              <Col flex="32.5px" />
            </Row>
          </Form.Item>
          <Form.Item
            name="profitMargin"
            style={{marginBottom: '5px',
              marginRight: '0px'}}
          >
            <Row style={{
              height: '27px'}}>
              <Col span={18} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                textAlign: 'left'}}>
                <b>PROFIT MARGIN</b>
              </Col>
              <Col span={colSpans[2]} style={{borderWidth: 'thin',
                borderStyle: 'solid',
                fontSize: 12,
                fontWeight: 'bold'}}>
                {budgetParameters.profitMargin}%
              </Col>
              <Col span={colSpans[3]}>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        {projectState}
      </div>
    </>
  )
}

export default ProjectDetails;