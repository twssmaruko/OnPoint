import React, {
  useRef, useEffect, useState,
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

import { EditTwoTone, DeleteFilled } from '@ant-design/icons';
import Productsform from './ProductsForm';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/products/actions/Actions';
import TableButton from '../../components/button/OnpointButton';

const Products = () => {
  const [operation, setOperation] = useState('add');
  const [editValues, setEditValues] = useState({});
  const dispatcher = useDispatch(); // hooks dispatcher for redux functions from actions
  const formRef = useRef(null);
  // next line is hooks mapstatetoprops, dretso na variable, dli na ibutang sa props
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
  // next line is componentwillmount hooks version, where you get the products para ishow sa table
  useEffect(() => {
    dispatcher(actions.getProducts());
  }, [dispatcher]);

  const setEditModal = (item) => {
    setOperation('edit');
    setEditValues(item);
    dispatcher(uiActions.setOpenModal(true));
  };

  const deleteItem = (item) => {
    const { id } = item;
    dispatcher(actions.removeProduct(id));
  };

  const editButton = (item) => (
    <div>
      <TableButton value={item} type="primary" icon={<EditTwoTone />} onClick={setEditModal} />
    </div>
  );

  const deleteButton = (item) => (
    <div>
      <TableButton value={item} type="danger" icon={<DeleteFilled />} onClick={deleteItem} />
    </div>
  );

  const columns = [
    {
      title: 'Edit',
      key: 'edit',
      render: editButton,
      fixed: 'left',
      width: '1%',
    },
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
    {
      title: 'Delete',
      render: deleteButton,
      key: 'delete',
      width: '1%',
    },

  ];

  const onSubmit = (values) => {
    if (operation === 'add') {
      dispatcher(actions.addProduct(values));
    } else if (operation === 'edit') {
      const toSubmitValues = { ...editValues, ...values };
      dispatcher(actions.editProduct(toSubmitValues));
    }
  };

  const setAddModal = () => {
    setEditValues({});
    setOperation('add');
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
        <Col offset={5} style={{ marginTop: 20 }}>
          <Row>
            <h1>Products</h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setAddModal}>
              New
            </Button>
          </Row>
          <Row style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Spin spinning={tableSpin}>
                <Table
                  size="small"
                  columns={columns}
                  dataSource={productsList}
                  rowKey="name"
                  style={{
                    border: '1px solid black',
                  }}
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title={operation === 'add' ? 'Add a product' : 'Edit a product'}
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText={operation === 'add' ? 'Add' : 'Edit'}
        cancelText="Cancel"
        destroyOnClose
      >
        <Spin spinning={showSpin}>
          <Productsform reference={formRef} onSubmit={onSubmit} editValues={editValues} />
        </Spin>
      </Modal>
    </>
  );
};

export default Products;
