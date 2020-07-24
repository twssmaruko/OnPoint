import React, {useState} from 'react';
import {
//  Row, Col,
  Form, Input, Button
} from 'antd';
import SubCategory from './SubCategory/SubCategory';

const BudgetCost = (props) => {
  const [subCategoryState, setSubCategoryState] = useState([]);
  const addSubCategoryClicked = () => {
    const newSubCategory = subCategoryState.concat(<SubCategory />);
    setSubCategoryState(newSubCategory);
  };
  const {reference} = props;
  return (
    <>
      <Form
        name="basic"
        style={{marginTop: '10px'}}
        ref= {reference}
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
          />
          <Input style={{
            borderColor: 'black',
            backgroundColor: 'yellow',
            width: '642px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#5DADE2'
          }}
          />
          <Input
            disabled="true"
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
          />
          <Button onClick={addSubCategoryClicked} shape="circle">+</Button>

        </Form.Item>
        {subCategoryState}
      </Form>
    </>
  );
};

export default BudgetCost;
