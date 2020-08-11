import React, {useState, useEffect} from 'react';
import {
  Row, Col,
  Button,
  Table,
  // Input,
  Modal
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import ProjectForm from './ProjectForm';
import {connect, useDispatch} from 'react-redux';
import * as actions from '../../store/projects/index';

const Projects = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const renderInput = () =>
  //     <div>
  //         <Input> Search </Input>
  //     </div>;

  // const dispatcher = useDispatch();

  // useEffect(() => {
  //   dispatcher(actions.fetchProjects());
  // }, [dispatcher]);

  // useEffect(console.log(props.bdgt));


  const projectList = [
    {
      key: 'projectKey',
      projectName: 'something',
      projectCode: 'GB003'
    }, {
      key: 'anotherOne',
      projectName: 'something else',
      projectCode: 'lol'
    }
  ];

  const title =
    <div style={{marginTop: 15}}>
      <p style={{display: 'inline-block'}}>Project</p>
      <Button
        key="buttonKey1"
        size="small"
        style={{width: 20,
          marginLeft: 30,
          display: 'inline-block'}}
        icon={<SearchOutlined />}
        // onClick={renderInput}
      />
    </div>;
  const columns = [
    {
      title,
      dataIndex: 'projectName',
      key: 'projectName',
      width: 250
    },
    {
      title: 'Project Code',
      dataIndex: 'projectCode',
      key: 'projectCode',
      width: 250
    }
  ];

  const setModal = () => {
    setModalVisible(true);
  };
  const handleOk = () => {
    props.onProjectCreated(props.bdgt)
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Row key="rowKey" >
        <Col offset={5} style={{marginTop: '40px'}}>
          <Row>
            <h1>
              Projects
            </h1>
          </Row>
          <Row>
            <Button
              key="buttonKey2"
              type="primary" onClick={setModal}>NEW PROJECT</Button>
          </Row>
          <Row style={{marginTop: '30px'}}>
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
        key="projectModal"
        title="New Project"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Save"
        cancelText="Cancel"
      >
        <ProjectForm key="projectKey"/>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  bdgt: state.project.budget
})

const mapDispatchToProps = (dispatch) => ({
  onProjectsFetched: () => dispatch(actions.fetchProjects()),
  onProjectCreated: (projectData) => dispatch(actions.createProject(projectData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
