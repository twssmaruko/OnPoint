import React, { useState } from 'react';
import {
  //  Row, Col,
  Form, Input, Button,
} from 'antd';
import SubCategoryItem from './SubCategoryItem/SubCategoryItem';

const SubCategory = () => {
  const [subCategoryItemState, setSubCategoryItemState] = useState([]);

  const addSubCategoryItemClicked = () => {
    const newSubCategoryItem = subCategoryItemState.concat(<SubCategoryItem />);
    setSubCategoryItemState(newSubCategoryItem);
  };

  return (
    <>
      <Form name="basic" style={{ marginBottom: '0px' }}>
        <Form.Item
          rules={{ required: true, message: 'Please Input a Cost Name!' }}
          style={{ marginBottom: '0px' }}
        >
          <Input style={{
            borderColor: 'black', backgroundColor: '#DCDCDC', width: '50px', textAlign: 'center',
          }}
          />
          <Input style={{
            borderColor: 'black', backgroundColor: '#DCDCDC', width: '470px', textAlign: 'center',
          }}
          />
          <Input
            disabled="true"
            style={{
              borderColor: 'black', backgroundColor: '#DCDCDC', width: '150px', textAlign: 'right',
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginTop: '0px' }}
          rules={{ required: true, message: 'Please Input a Cost Name!' }}
        >
          <Input
            defaultValue="ITEM NO."
            disabled="true"
            style={{
              borderColor: 'black', width: '50px', textAlign: 'center', fontSize: '10px', color: '#778899', height: '25px',
            }}
          />
          <Input
            defaultValue="DESCRIPTION"
            disabled="true"
            style={{
              borderColor: 'black', width: '470px', textAlign: 'center', color: '#778899', height: '25px',
            }}
          />
          <Input
            defaultValue="AMOUNT"
            disabled="true"
            style={{
              borderColor: 'black', width: '150px', textAlign: 'center', color: '#778899', height: '25px',
            }}
          />
          <Button onClick={addSubCategoryItemClicked}>Add Item</Button>
        </Form.Item>
        {subCategoryItemState}
      </Form>
    </>
  );
};

export default SubCategory;
