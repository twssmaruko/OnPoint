import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Row, Col,
  Button,
  // List,
  Table, Input, Modal,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-unresolved
import VendorList from './VendorList';
import * as actions from '../../store/vendors/index';

const Vendors = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderInput = () => (
    <div>
      <Input> Search </Input>
    </div>
  );

  // const vendorList = [{
  //   vendorName: 'I forgot their name',
  //   telNo: '8205245',
  //   location: 'Mandaue City',
  //   Terms: 'COD',
  // },
  // {
  //   vendorName: 'I forgot their name',
  //   telNo: '8205245',
  //   location: 'Mandaue City',
  //   Terms: 'Cheque or something',
  // },
  // {
  //   vendorName: 'I forgot alsoo',
  //   telNo: '2381311',
  //   location: 'Mandaue City',
  //   Terms: 'COD',
  // },
  // {
  //   vendorName: 'This is a test',
  //   telNo: '3444512',
  //   location: 'Cebu City',
  //   Terms: 'COD',
  // }];
  const dispatcher = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    dispatcher(actions.fetchVendors());
  }, [dispatcher]);

  const columns = [
    {
      title: () => (
        <div style={{ marginTop: 15 }}>
          <p style={{ display: 'inline-block' }}> Vendor</p>
          <Button
            size="small"
            style={{ width: 20, marginLeft: 30, display: 'inline-block' }}
            icon={<SearchOutlined />}
            onClick={renderInput}
          />
        </div>
      ),
      dataIndex: 'vendorName',
      key: 'vendorName',
      width: 250,
    },
    {
      title: 'Tel-No',
      dataIndex: 'telNo',
      key: 'telNo',
      width: 250,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 250,
    },
    {
      title: 'Terms',
      dataIndex: 'terms',
      key: 'terms',
      width: 250,
    },
  ];

  // const vendorSample = {
  //   vendorName: 'CementLand',
  //   telNo: '2542422',
  //   location: 'Cebu City',
  //   terms: 'COD',
  // };
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

    props.onVendorAdded(values);
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
        <Col offset={5} style={{ marginTop: '40px' }}>
          <Row>
            <h1>Vendors</h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setModal}>NEW</Button>
          </Row>
          <Row style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Table
                columns={columns}
                // eslint-disable-next-line react/destructuring-assignment
                dataSource={props.vndr}
                size="large"
                rowkey="vendorName"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Add Vendor"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Add"
        cancelText="Cancel"
      >
        <VendorList reference={formRef} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  vndr: state.vendor.vendors,
});

const mapDispatchToProps = (dispatch) => ({
  onVendorAdded: (vendor) => dispatch(actions.newVendor(vendor)),
  onVendorsFetched: () => dispatch(actions.fetchVendors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
