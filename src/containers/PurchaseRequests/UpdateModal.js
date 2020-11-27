import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Row, Switch, Modal, message, Col, Input
  // Spin,
} from 'antd';
import {AlertTwoTone} from '@ant-design/icons';
// import _ from 'lodash';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/purchaserequest/actions/Actions';

const Updatemodal = (props) => {
  const dispatcher = useDispatch();
  //const {Option} = Select;
  const {purchaseRequestData} = props;
  const {
    // purchaseRequestData,
    openAnotherModal
    // showSpin,
  } = useSelector(({ui}) => ({
    // showSpin: ui.showSpin1,
    // purchaseRequestData: purchaseRequests.purchaseRequestData,
    openAnotherModal: ui.openModal2
  }));

  useEffect(() => {
    // console.log('purchaseRequestData: ', purchaseRequestData);
  }, [purchaseRequestData])

  const [borderVisible, setBorderVisible] = useState(false);
  const [updateParams, setUpdateParams] = useState({ });

  const {orders} = purchaseRequestData;

  const onMouseOver = () => {
    setBorderVisible(true);
  }

  const onMouseLeaver = () => {
    setBorderVisible(false);
  }

  const ordersItems = orders.map((item) =>
    <Row key={item.product}>
      <Col span={11}>
        <Input.TextArea
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseLeaver}
          bordered= {borderVisible}
          autoSize={{minRows: 1,
            maxRows: 6}}
          defaultValue={item.product}/>
      </Col>
      <Col style={{color: 'white'}}>
      _</Col>
      <Col span={5}>
        {item.quantity - item.quantityLeft} / {item.quantity}
      </Col>
      <Col span={3}>
        {item.unit}
      </Col>
      <Col span={4}>
      Ordered
      </Col>
    </Row>);

  // const setStatus = (value) => {
  //   setUpdateParams({...updateParams,
  //     status: value});
  // };

  const setApproved = (value) => {
    setUpdateParams({...updateParams,
      isApproved: value ? 'APPROVED' : 'NOTAPPROVED'});
  };

  const afterModalClose = () => {
    setUpdateParams({});
  };

  const invokeUpdate = () => {
    const newData = {...purchaseRequestData,
      ...updateParams};
      //console.log(newData);
    //delete newData.orders;
    //delete newData.updatedAt;
    dispatcher(actions.editPurchaseRequest(newData));
    dispatcher(uiActions.setOpenModal2(false));
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <AlertTwoTone />,
      content: 'Update confirmation.',
      onOk: invokeUpdate,
      okText: 'Confirm',
      cancelText: 'Cancel'
    });
  };

  const handleUpdateOk = () => {
    const params = Object.keys(updateParams);
    const checkParams = params.map((param) =>
      updateParams[param] === purchaseRequestData[param]);

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
        maskClosable={false}
        title={`PR ${purchaseRequestData.purchaseRequestNo}`}
        visible={openAnotherModal}
        width={500}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        okText="Update Purchase Request"
        destroyOnClose
        afterClose={afterModalClose}
      >
        {/* <Spin spinning={showSpin}> */}
        {/* <div style={{ marginTop: -20 }}>
            <h2>
              {`PR ${purchaseRequestData.purchaseRequestNo}`}
            </h2>
          </div> */}
        <div style={{marginTop: -20}}>
          <h3>Orders:</h3>
          <div>
            <div style={{margin: '2%',
              color: 'black'}}>
              {ordersItems}
            </div>
          </div>
        </div>
        {/* <div style={{marginTop: 20}}>
                    <h3>
                    Total Price: &nbsp;
                        {`${purchaseRequestData.totalPrice} Php`}
                    </h3>
                </div> */}
        <>
          <Row style={{marginTop: 20}}>
            <h3>Status:  {purchaseRequestData.status}</h3>
          </Row>
          <Row style={{marginTop: 10}}>
            <h3>Approval:</h3>
            <Switch style={{marginLeft: 10}}
              onChange={setApproved}
              defaultChecked={purchaseRequestData.isApproved === 'APPROVED'} />
          </Row>
        </>
        {/* </Spin> */}
      </Modal>

    </div>
  );
};

export default Updatemodal;
