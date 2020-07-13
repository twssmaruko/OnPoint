import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Select, Switch, Modal, message, Spin,
} from 'antd';
import { AlertTwoTone } from '@ant-design/icons';
// import _ from 'lodash';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/purchaserequest/actions/Actions';

const Updatemodal = () => {
  const dispatcher = useDispatch();
  const { Option } = Select;
  const {
    purchaseRequestData,
    openAnotherModal,
    showSpin,
  } = useSelector(({ ui, purchaseRequests }) => ({
    showSpin: ui.showSpin1,
    purchaseRequestData: purchaseRequests.purchaseRequestData,
    openAnotherModal: ui.openModal2,
  }));

  const [updateParams, setUpdateParams] = useState({ });

  const { orders } = purchaseRequestData;

  const ordersItems = orders ? orders.items.map((item) => (<div key={item.id}>{`${item.quantity} ${item.unit} of ${item.product.name}  for ${item.price} Php` }</div>)) : null;

  const setStatus = (value) => {
    setUpdateParams({ ...updateParams, status: value });
  };

  const setApproved = (value) => {
    setUpdateParams({ ...updateParams, isApproved: value ? 'APPROVED' : 'NOTAPPROVED' });
  };

  const afterModalClose = () => {
    setUpdateParams({});
  };

  const invokeUpdate = () => {
    const newData = { ...purchaseRequestData, ...updateParams };
    delete newData.orders;
    delete newData.updatedAt;
    dispatcher(actions.invokeUpdatePurchaseRequest(newData));
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <AlertTwoTone />,
      content: 'Update confirmation.',
      onOk: invokeUpdate,
      okText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  const handleUpdateOk = () => {
    const params = Object.keys(updateParams);
    const checkParams = params.map((param) => updateParams[param] === purchaseRequestData[param]);

    if (checkParams.includes(false)) {
      confirm();
      return;
    }
    message.info('No changes applied.');
    dispatcher(uiActions.setOpenModal2(false));
  };

  const handleUpdateCancel = () => {
    dispatcher(uiActions.setOpenModal2(false));
  };

  return (
    <div>

      <Modal
        title="Purchase Request Detatils"
        visible={openAnotherModal}
        width={500}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        okText="Update Purchase Request"
        destroyOnClose
        afterClose={afterModalClose}
      >
        <Spin spinning={showSpin}>
          <div>
            <h2>
              {`PR ${purchaseRequestData.monthYear}-${purchaseRequestData.count}`}
            </h2>
          </div>
          <div>
            <h3>Orders:</h3>
            <h4>
              {ordersItems}
            </h4>
          </div>
          <div>
            <h3>
              Total Price: &nbsp;
              {`${purchaseRequestData.totalPrice} Php`}
            </h3>
          </div>
          <>
            <Row style={{ marginTop: 20 }}>
              <h3>Status:</h3>
              <Select
                defaultValue={purchaseRequestData.status}
                style={{ marginLeft: 10, width: 170 }}
                onChange={setStatus}
              >
                <Option value="ORDERED">ORDERED</Option>
                <Option value="PENDING">PENDING</Option>
                <Option value="RECEIVED">RECEIVED</Option>
              </Select>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <h3>Approval:</h3>
              <Switch style={{ marginLeft: 10 }} onChange={setApproved} defaultChecked={purchaseRequestData.isApproved === 'APPROVED'} />
            </Row>
          </>
        </Spin>
      </Modal>

    </div>
  );
};

export default Updatemodal;
