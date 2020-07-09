import React from 'react';
import {
  //  Row, Col,
  Form, Input,
} from 'antd';

const SubCategoryItem = () => (

  <>
    <Form name="basic" style={{ marginBottom: '0px' }}>
      <Form.Item
        rules={{ required: true, message: 'Please Input a Cost Name!' }}
        style={{ marginBottom: '0px' }}
      >
        <Input style={{
          borderColor: 'black', width: '50px', textAlign: 'center',
        }}
        />
        <Input style={{
          borderColor: 'black', width: '470px', textAlign: 'center',
        }}
        />
        <Input
          style={{
            borderColor: 'black', width: '150px', textAlign: 'right',
          }}
        />
      </Form.Item>
    </Form>
  </>

);

export default SubCategoryItem;
