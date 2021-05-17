import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  Row, Col,
  Button,
  // List,
  Table,
  // Input,
  Modal
} from 'antd';
import {SearchOutlined, DeleteFilled, EditTwoTone} from '@ant-design/icons';
import VendorList from './VendorList';
import * as actions from '../../store/vendors/index';
import TableButton from "../../components/button/OnpointButton";
import EditVendor from './EditVendor';
import * as uiActions from '../../store/ui/actions/Actions';

const Vendors = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [viewDeleteModal, setViewDeleteModal] = useState(false);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [actionCommand, setActionCommand] = useState('add');
  const [editValues, setEditValues] = useState('');
  const dispatcher = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    dispatcher(actions.fetchVendors());
  }, [dispatcher, editValues]);

  const {vndr} = useSelector(({vendor}) => ({
    vndr: vendor.vendors
  }), shallowEqual);

  const deleteItem = (data) => {
    setDeleteId(data.vendor_id);
    setViewDeleteModal(true);
  };

  const onDeleteConfirmed = () => {
    dispatcher(actions.deleteVendor(deleteId));
    setViewDeleteModal(false);
  }

  const onEditConfirmed = () => {
    dispatcher(uiActions.setOpenModal1)
    setActionCommand('edit');
    setViewEditModal(false);
  }

  const deleteModal = <Modal visible={viewDeleteModal}
  onCancel={() => {
    setViewDeleteModal(false)
  }}
  onOk={(e) => onDeleteConfirmed(e)}> 
  Are you sure you want to delete this Vendor?
  </Modal>;

  const editModal = <Modal visible ={viewEditModal}
  onCancel={() => {
    setViewEditModal(false)
  }}
  onOk={onEditConfirmed}>
    <EditVendor editValues = {editValues}/>
  </Modal>

  const deleteButton = (item) => (
    <div>
      <TableButton
        value={item}
        type="danger"
        icon={<DeleteFilled />}
        onClick={deleteItem}
      />
    </div>
  );

  const editButton = (item) => (
  <div>
    <TableButton value = {item}
    type="primary"
    icon={<EditTwoTone key={"edit-" + item}/>}
    onClick ={(e) => setEditModal(e)}/>
  </div>
  );

  const setEditModal = (item) => {
    setEditValues(item);
    dispatcher(uiActions.setOpenModal1(true));
    setViewEditModal(true);
  }

  const title =
    <div style={{marginTop: 15}}>
      <p style={{display: 'inline-block'}}> Vendor</p>
      <Button
        size="small"
        style={{
          width: 20,
          marginLeft: 30,
          display: 'inline-block'
        }}
        icon={<SearchOutlined />}
        // onClick={renderInput}
      />
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
      title,
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: {
        compare: (a,b) => a.name.localeCompare(b.name)
      },
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Tel-No',
      dataIndex: 'tel_no',
      key: 'telNo',
      width: 250
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 250
    },
    {
      title: 'Terms',
      dataIndex: 'terms',
      key: 'terms',
      width: 250
    },
    {
      title: "Delete",
      render: deleteButton,
      key: "delete",
      width: "1%",
    },
  ];

  const setModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    // eslint-disable-next-line no-console
    formRef.current.submit();
  };

  const onSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log('Success', values);

    dispatcher(actions.newVendor(values));
    setModalVisible(false);
  };

  // eslint-disable-next-line react/destructuring-assignment

  const handleCancel = () => {
    // eslint-disable-next-line no-console
    setModalVisible(false);
  };

  return (
    <>
      <Row>
        <Col offset={5} style={{marginTop: '40px'}}>
          <Row>
            <h1>Vendors</h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setModal}>NEW</Button>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={vndr}
                size="large"
                rowKey="vendor_id"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Add Vendor"
        maskClosable = {false}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Add"
        cancelText="Cancel"
      >
        <VendorList reference={formRef} onSubmit={onSubmit} />
      </Modal>
      {deleteModal}
      <EditVendor editValues={editValues} />
    </>
  );
};

export default Vendors;
