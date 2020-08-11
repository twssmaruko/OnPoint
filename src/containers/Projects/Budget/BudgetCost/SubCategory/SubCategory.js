import React, {useState} from 'react';
import {
  //  Row, Col,
  Form, Input, Button
} from 'antd';
import {connect} from 'react-redux';
import SubCategoryItem from './SubCategoryItem/SubCategoryItem';
import * as actions from '../../../../../store/projects/index';

const SubCategory = (props) => {
  const [subCategoryItemState, setSubCategoryItemState] = useState([]);
  const [subCategoryItemCounter, setSubCategoryItemCounter] = useState(1);
  const [stateFlag, setStateFlag] = useState([false]);
  const {budgetCostIndex, subCategoriesIndex} = props;
  const index = {
    budgetCostIndex: budgetCostIndex,
    subCategoriesIndex: subCategoriesIndex
  }

  const budgetCostCount = index.budgetCostIndex + 1;

  const subCategoryItemKey = "subCategoryItem" + budgetCostCount.toString()
  + props.bdgt[budgetCostIndex]
    .subCategories[index.subCategoriesIndex]
    .subCategoryItemCount.toString();


  const subCategoryTotalCost = parseFloat(props.bdgt[index.budgetCostIndex]
    .subCategories[index.subCategoriesIndex]
    .totalCost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  const addSubCategoryItemClicked = () => {
    const newSubCategoryItem = subCategoryItemState.concat(<SubCategoryItem
      itemCount={subCategoryItemCounter}
      subCategoriesIndex={index}
      key={subCategoryItemKey}
      stateFlag={stateFlag}
      changeState={setStateFlag}
    />);

    setSubCategoryItemState(newSubCategoryItem);
    const newCount = subCategoryItemCounter + 1;
    setSubCategoryItemCounter(newCount);
    props.onAddSubCategoryItem(index)

  };

  const onSubCategoryCodeHandler = (input) => {
    props.onUpdateSubCategoryCode(index, input);
  }

  const onSubCategoryNameHandler = (input) => {
    props.onUpdateSubCategoryName(index, input);
  }
  return (
    <>
      <Form name="basic" style={{marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '10px'}}>
        <Form.Item
          rules={{required: true,
            message: 'Please Input a Cost Name!'}}
          style={{marginBottom: '0px'}}
        >
          <Input style={{
            borderColor: 'black',
            backgroundColor: '#DCDCDC',
            width: '50px',
            height: '31.5px',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold'
          }}
          onBlur = {(e) => onSubCategoryCodeHandler(e.target.value)}
          />
          <Input style={{
            borderColor: 'black',
            backgroundColor: '#DCDCDC',
            width: '642px',
            height: '31.5px',
            textAlign: 'left',
            fontSize: 12,
            fontWeight: 'bold'
          }}
          onBlur = {(e) => onSubCategoryNameHandler(e.target.value)}
          />
          <Input
            disabled={true}
            style={{
              borderColor: 'black',
              backgroundColor: '#DCDCDC',
              width: '125px',
              fontSize: 12,
              height: '31.5px',
              textAlign: 'right',
              fontWeight: 'bold'
            }}
            value={subCategoryTotalCost}
          />
        </Form.Item>
        <Form.Item
          style={{marginTop: '0px',
            marginBottom: '0px'}}
          rules={{required: true,
            message: 'Please Input a Cost Name!'}}
        >
          <Input
            defaultValue="ITEM NO."
            disabled={true}
            style={{
              borderColor: 'black',
              width: '50px',
              textAlign: 'center',
              fontSize: '10px',
              color: '#5DADE2',
              height: '31.5px',
              fontWeight: 'bold'
            }}
          />
          <Input
            defaultValue="DESCRIPTION"
            disabled={true}
            style={{
              borderColor: 'black',
              width: '642px',
              textAlign: 'center',
              color: '#5DADE2',
              height: '31.5px',
              fontWeight: 'bold'
            }}
          />
          <Input
            defaultValue="AMOUNT"
            disabled={true}
            style={{
              borderColor: 'black',
              width: '125px',
              textAlign: 'center',
              color: '#5DADE2',
              height: '31.5px',
              fontWeight: 'bold'
            }}
          />
          <Button onClick={addSubCategoryItemClicked}
            shape="circle"
            style={{borderColor: 'black'}}>
            +
          </Button>
        </Form.Item>
      </Form>
      {subCategoryItemState}
    </>
  );
};

const mapStateToProps = (state) => ({
  bdgt: state.project.budget.budgetCost
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSubCategoryCode: (index, data) => dispatch(actions.updateSubCategoryCode(index, data)),
  onAddSubCategoryItem: (index) => dispatch(actions.addSubCategoryItem(index)),
  onUpdateSubCategoryName: (index, data) => dispatch(actions.updateSubCategoryName(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
