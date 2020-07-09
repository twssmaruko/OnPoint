import React, { useState } from 'react';
import {
//  Row, Col,
  Form, Input, Button,
} from 'antd';
import SubCategory from './SubCategory/SubCategory';

const BudgetCost = () => {
  const [subCategoryState, setSubCategoryState] = useState([]);
  const addSubCategoryClicked = () => {
    const newSubCategory = subCategoryState.concat(<SubCategory />);
    setSubCategoryState(newSubCategory);
  };
  return (
    <>
      <Form
        name="basic"
        style={{ marginTop: '10px' }}
      >
        <Form.Item
          rules={{ required: true, message: 'Please Input a Cost Name!' }}
        >
          <Input style={{
            borderColor: 'black', backgroundColor: 'yellow', width: '50px', textAlign: 'center',
          }}
          />
          <Input style={{
            borderColor: 'black', backgroundColor: 'yellow', width: '470px', textAlign: 'center',
          }}
          />
          <Input
            disabled="true"
            style={{
              borderColor: 'black', backgroundColor: 'yellow', width: '150px', textAlign: 'right',
            }}
          />
          <Button onClick={addSubCategoryClicked}>Add Sub-Category</Button>

        </Form.Item>
        {subCategoryState}
      </Form>
    </>
  );
};

export default BudgetCost;
