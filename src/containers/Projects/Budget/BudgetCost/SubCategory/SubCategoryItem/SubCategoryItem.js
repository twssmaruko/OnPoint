import React, {useState} from 'react';
import {
  //  Row, Col,
  Form, Input
} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../../../../store/projects/index';

const SubCategoryItem = (props) => {
  const {itemCount, subCategoriesIndex, changeState, stateFlag} = props;
  const index = {
    budgetCostIndex: subCategoriesIndex.budgetCostIndex,
    subCategoriesIndex: subCategoriesIndex.subCategoriesIndex,
    subCategoryItemIndex: itemCount - 1,
    subCategoryItemNo: itemCount
  }

  const [refreshFlag, setRefreshFlag] = useState(stateFlag);

  const onBlurHandler = (input) => {
    props.onUpdateSubCategoryItemName(index, input);
  }

  const onAmountChangedHandler = (input) => {
    const inputValues = parseFloat(input.split(',').join(''));
    const refreshStateFlag = !refreshFlag;
    for (let i = 0; i <= 10; i= i + 1) {
      props.onUpdateSubCategoryItemCost(index, inputValues);
    }
    changeState(refreshStateFlag);
    setRefreshFlag(refreshStateFlag);
  }
  return (
    <>
      <Form name="basic" style={{marginBottom: '0px',
        marginLeft: '10px'}}>
        <Form.Item
          rules={{required: true,
            message: 'Please Input a Cost Name!'}}
          style={{marginBottom: '0px'}}
        >
          <Input
            disabled={true}
            style={{
              borderColor: 'black',
              width: '50px',
              textAlign: 'center',
              fontSize: 12,
              height: '31.5px'
            }}
            value={itemCount}
          />
          <Input style={{
            borderColor: 'black',
            width: '642px',
            textAlign: 'left',
            fontSize: 12,
            height: '31.5px'
          }}
          onBlur= {(e) => onBlurHandler(e.target.value)}
          />
          <Input
            style={{
              borderColor: 'black',
              width: '125px',
              textAlign: 'right',
              fontSize: 12,
              height: '31.5px'
            }}
            onBlur = {(e) => onAmountChangedHandler(e.target.value)}
          />
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  bdgt: state.project.project.budget.budgetCost
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSubCategoryItemName: (index, data) =>
    dispatch(actions.updateSubCategoryItemName(index, data)),
  onUpdateSubCategoryItemCost: (index, data) =>
    dispatch(actions.updateSubCategoryItemCost(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryItem);
