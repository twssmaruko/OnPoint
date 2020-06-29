import React, {
  useRef, useEffect,
} from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Modal,
  Spin,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import Productsform from './ProductsForm';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/products/actions/Actions';

const Products = () => {
  const dispatcher = useDispatch(); // hooks dispatcher for functions
  const formRef = useRef(null);
  // next line is hooks mapstatetoprops, dretso na variable, dli na props
  const {
    openModal,
    showSpin,
    tableSpin,
    productsList,
  } = useSelector(({ ui, products }) => ({
    openModal: ui.openModal,
    showSpin: ui.showSpin,
    tableSpin: ui.tableSpin,
    productsList: products.products,
  }));

  useEffect(() => {
    dispatcher(actions.getProducts());
  }, [dispatcher]);

  // const prList = [
  //   {
  //     name: 'Product-1',
  //     description: 'description for product 1.',
  //   },
  //   {
  //     name: 'Product-2',
  //     description: 'description for product 2.',
  //   },
  //   {
  //     name: 'Product-3',
  //     description: 'description for product 3.',
  //   },
  // ];

  console.log(productsList);

  const columns = [
    {
      title: 'Products',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
  ];

  const setModal = () => {
    dispatcher(uiActions.setOpenModal(true));
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal(false));
  };

  return (
    <>
      <Row>
        <Col offset={5} style={{ marginTop: '40px' }}>
          <Row>
            <h1>Products</h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setModal}>
              New
            </Button>
          </Row>
          <Row style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Spin spinning={tableSpin}>
                <Table
                  columns={columns}
                  dataSource={productsList}
                  size="large"
                  rowKey="name"
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Add a product"
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Save"
        cancelText="Cancel"
        destroyOnClose
      >
        <Spin spinning={showSpin}>

          <Productsform reference={formRef} />
        </Spin>
      </Modal>
    </>
  );
};

export default Products;
