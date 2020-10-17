import React, {memo} from 'react';
import {Modal, Row} from 'antd';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as uiActions from '../../../store/ui/actions/Actions';
import _ from 'lodash'

const PurchaseRequestModal = () => {

  const {openModal} = useSelector(({ui}) => ({
    openModal: ui.openModal1
  }), shallowEqual);
  const dispatcher = useDispatch();

  const setPurchaseRequest = () => {
    dispatcher(uiActions.setOpenModal1(false))
  }

  //const {purchaseRequest} = props

  //   const newOrders = purchaseRequest.orders.map((order) => `${order.quantity} ${order.unit} of ${order.product} `);

  return (
    <Modal
      title="Set Purchase Request"
      visible={openModal}
      onOk={setPurchaseRequest}
      //   onCancel={handleCancel}
      width={900}
      // height={1000}
      okText="Add Purchase Order"
      cancelText="Cancel"
      //   destroyOnClose
      maskClosable={false}
    >
      <Row style={{
        color: 'black',
        marginLeft: 10,
        marginTop: -10
      }}
      >

      </Row>
    </Modal>
  )
}

export default memo(PurchaseRequestModal, (prevProps, nextProps) =>
  _.isEqual(prevProps, nextProps));