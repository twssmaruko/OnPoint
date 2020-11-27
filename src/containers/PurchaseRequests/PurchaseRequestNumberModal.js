import React from 'react'
import {
  Form, Input
} from 'antd';
import {v4 as uuidv4} from 'uuid';
import {useDispatch} from 'react-redux';
import * as actions from './../../store/purchaserequest/actions/Actions';

const PurchaseRequesNumberModal = () => {

  const dispatcher = useDispatch();

  const onPurchaseRequestNumberChanged = (data) => {
    // console.log('purchaseRequestNumber: ', data);
    const newPurchaseRequestNumber = data;
    dispatcher(actions.updatePurchaseRequestNumber(newPurchaseRequestNumber));
  }
  return (
    <div>
      <div style={{textAlign: 'center',
        marginTop: 20,
        width: '100%'}}>
      </div>
      <div style={{
        justifyContent: 'center',
        marginTop: 20,
        width: '100%'
      }}
      >
        <Form
          id = {"pr# - " + uuidv4}
          name = "basic">
          <Form.Item
            label ="Purchase Request Number: "
            name ="purchaseRequestNumber"
            rules={[
              {required: true,
                message: 'Please Input the Purchase Request Number!'}
            ]}
            style={{marginBottom: '0px',
              justifyContent: 'flex-end'}}>
            <Input
              onBlur = {(e => onPurchaseRequestNumberChanged(e.target.value))}/>
          </Form.Item>
        </Form>
      </div>
    </div>
  )

}

export default PurchaseRequesNumberModal;