import React, { useState } from 'react';
import {
  Row, Col,
  Button,
  Table, Input, Modal,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProjectForm from './ProjectForm';

const Projects = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const renderInput = () => (
    <div>
      <Input> Search </Input>
    </div>
  );

  const projectList = [{
    projectName: 'something',
    projectCode: 'GB003',
  }, {
    projectName: 'something else',
    projectCode: 'lol',
  }];

  const columns = [{
    title: () => (
      <div style={{ marginTop: 15 }}>
        <p style={{ display: 'inline-block' }}>Project</p>
        <Button
          size="small"
          style={{ width: 20, marginLeft: 30, display: 'inline-block' }}
          icon={<SearchOutlined />}
          onClick={renderInput}
        />
      </div>
    ),
    dataIndex: 'projectName',
    key: 'projectName',
    width: 250,
  },
  {
    title: 'projectCode',
    dataIndex: 'projectCode',
    key: 'projectCode',
    width: 250,
  }];

  const setModal = () => {
    setModalVisible(true);
  };
  const handleOk = () => {
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Row>
        <Col offset={5} style={{ marginTop: '40px' }}>
          <Row>
            <h1>
              Projects
            </h1>
          </Row>
          <Row>
            <Button type="primary" onClick={setModal}>NEW PROJECT</Button>
          </Row>
          <Row style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={projectList}
                size="large"
                rowkey="projectName"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="New Project"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Save"
        cancelText="Cancel"
      >
        <ProjectForm />
      </Modal>
    </>
  );
};

export default Projects;
