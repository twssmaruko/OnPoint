import React, {
  useEffect, useState
} from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Spin
} from 'antd';
import {useSelector, useDispatch} from 'react-redux';

import {EditTwoTone, DeleteFilled} from '@ant-design/icons';
import Productsform from './ProductsFormModal';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/products/actions/Actions';
import TableButton from '../../components/button/OnpointButton';

const Products = () => {
  const [operation, setOperation] = useState('add');
  const [editValues, setEditValues] = useState({});
  const dispatcher = useDispatch(); // hooks dispatcher for redux functions from actions
  // next line is hooks mapstatetoprops, dretso na variable, dli na ibutang sa props
  const {
    tableSpin,
    productsList
  } = useSelector(({ui, products}) => ({
    openModal: ui.openModal1,
    showSpin: ui.showSpin1,
    tableSpin: ui.showSpin2,
    productsList: products.products
  }));

  // next line is componentwillmount hooks version, where you get the products para ishow sa table
  useEffect(() => {
    dispatcher(actions.fetchProducts());
    //  dispatcher(actions.initSubscriptions());
    return () => {
      //   dispatcher(actions.unsubscribe());
    };
  }, [dispatcher]);

  const setEditModal = (item) => {
    setOperation('edit');
    setEditValues(item);
    dispatcher(uiActions.setOpenModal1(true));
  };

  const deleteItem = (item) => {
    // const {id} = item;
    dispatcher(actions.removeProduct(item));
  };

  const editButton = (item) =>
    <div>
      <TableButton value={item}
        type="primary"
        icon={<EditTwoTone />}
        onClick={setEditModal} />
    </div>;
  const deleteButton = (item) =>
    <div>
      <TableButton value={item} type="danger" icon={<DeleteFilled />} onClick={deleteItem} />
    </div>;
  const columns = [
    {
      title: 'Edit',
      key: 'edit',
      render: editButton,
      fixed: 'left',
      width: '1%'
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: 250
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250
    },
    {
      title: 'Delete',
      render: deleteButton,
      key: 'delete',
      width: '1%'
    }

  ];

  const setAddModal = () => {
    setEditValues({});
    setOperation('add');
    dispatcher(uiActions.setOpenModal1(true));
  };

  return (
    <>
      <Row>
        <Col offset={5} style={{marginTop: 20}}>
          <Row>
            <h1>Products</h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setAddModal}>
              New Products
            </Button>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col span={24}>
              <Spin spinning={tableSpin}>
                <Table
                  size="small"
                  columns={columns}
                  dataSource={productsList}
                  rowKey="name"
                  style={{
                    border: '1px solid black'
                  }}
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
      <Productsform operation={operation} editValues={editValues} />
    </>
  );
};

export default Products;
