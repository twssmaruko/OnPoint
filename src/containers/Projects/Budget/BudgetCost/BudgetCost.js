import React, {useState} from 'react';
import {
//  Row, Col,
  Form, Input, Button
} from 'antd';
import SubCategory from './SubCategory/SubCategory';
import {connect} from 'react-redux';
import * as actions from '../../../../store/projects/index';

const BudgetCost = (props) => {
  const [subCategoryState, setSubCategoryState] = useState([]);
  const {budgetCostIndex, projectKey} = props;
  const [subCategoriesCounter, setSubCategoriesCounter] = useState(1);
  const [subCategoryStateItem, setSubCategoryStateItem] = useState(
    {
      subCategories: {
        itemCode: '',
        name: '',
        totalCost: 0,
        subCategoryCount: 0,
        subCategory: [],
        index: props.bdgt.budgetCostCount -1
      }
    });
  const subCategoryKey = "subCategory" + props.bdgt.budgetCostCount.toString()
  + props.bdgt.budgetCost[budgetCostIndex].subCategoriesCount.toString();

  const addSubCategoryClicked = () => {
    const newSubCategory = subCategoryState.concat(<SubCategory
      budgetCostIndex = {budgetCostIndex}
      subCategoriesIndex = {subCategoriesCounter - 1}
      key={projectKey + subCategoryKey}
      projectKey = {projectKey}/>);

    setSubCategoryState(newSubCategory);
    const newCount = subCategoriesCounter + 1;
    setSubCategoriesCounter(newCount);
    props.onSubCategoryAdded(subCategoryStateItem.subCategories.index);
  };

  const onItemCodeHandler = (input) => {
    const newSubCategoryItem = {
      ...subCategoryStateItem,
      subCategories: {
        ...subCategoryStateItem.subCategories,
        itemCode: input

      }
    }
    props.onUpdateBudgetCostCode(subCategoryStateItem.subCategories.index, input)
    setSubCategoryStateItem(newSubCategoryItem);
  }

  const onItemNameHandler = (input) => {
    const newSubCategoryName = {
      ...subCategoryStateItem,
      subCategories: {
        ...subCategoryStateItem.subCategories,
        name: input
      }
    }
    props.onUpdateBudgetCostName(subCategoryStateItem.subCategories.index, input);
    setSubCategoryStateItem(newSubCategoryName);
  }

  const budgetCostTotalCost = parseFloat(props.bdgt.budgetCost[budgetCostIndex]
    .totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return (
    <>
      <Form
        name="basic"
        style={{marginTop: '10px',
          marginLeft: '10px'}}
      >
        <Form.Item
          rules={{required: true,
            message: 'Please Input a Cost Name!'}}
        >
          <Input style={{
            borderColor: 'black',
            backgroundColor: 'yellow',
            width: '50px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#5DADE2'
          }}
          onBlur={(e) => onItemCodeHandler(e.target.value)}
          />
          <Input style={{
            borderColor: 'black',
            backgroundColor: 'yellow',
            width: '642px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#5DADE2'
          }}
          onBlur={(e) => onItemNameHandler(e.target.value)}
          />
          <Input
            disabled={true}
            style={{
              borderColor: 'black',
              backgroundColor: 'yellow',
              width: '125px',
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: 12,
              height: '32px',
              color: '#5DADE2'
            }}
            value={budgetCostTotalCost}
          />
          <Button onClick={addSubCategoryClicked} shape="circle">+</Button>

        </Form.Item>
      </Form>
      {subCategoryState}
    </>
  );
};

const mapStateToProps = (state) => ({
  bdgt: state.project.project.budget
});

const mapDispatchToProps = (dispatch) => ({
  onSubCategoryAdded: (index) => dispatch(actions.addSubCategory(index)),
  onUpdateBudgetCostCode: (index, data) => dispatch(actions.updateBudgetCostCode(index, data)),
  onUpdateBudgetCostName: (index, data) => dispatch(actions.updateBudgetCostName(index, data))
});


export default connect(mapStateToProps, mapDispatchToProps)(BudgetCost);
