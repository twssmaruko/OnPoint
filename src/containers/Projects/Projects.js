import React, {useState, useEffect} from 'react';
import {
  Row, Col,
  Button,
  Table,
  // Input,
  Modal
} from 'antd';
import {SearchOutlined, EditTwoTone} from '@ant-design/icons';
import ProjectForm from './ProjectForm';
import ProjectCode from './ProjectCode';
import {v4 as uuidv4} from 'uuid';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import TableButton from '../../components/button/OnpointButton';
import * as actions from '../../store/projects/index';

const Projects = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  // const renderInput = () =>
  //     <div>
  //         <Input> Search </Input>
  //     </div>;
  const history = useHistory();
  uuidv4();
  const dispatcher = useDispatch();
  const {prjct} = useSelector(({project}) => ({
    prjct: project
  }))
  useEffect(() => {
    dispatcher(actions.fetchProjects());
  }, [dispatcher]);
  // useEffect(console.log(props.bdgt));

  const onDetailsClick = (e) => {
    dispatcher(actions.fetchSelectedProject(e))
    history.push('/project');
  }
  const editButton = (item) =>
    <div>
      <TableButton
        value={item}
        type="primary"
        icon={<EditTwoTone />}
        onClick={(e) => {
          onDetailsClick(e.id)
        }
        } />
    </div>;
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
      title: 'Details',
      key: 'details',
      width: 100,
      render: editButton
    },
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
    dispatcher(actions.createProject(prjct.project));
    setSecondModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
    setSecondModalVisible(false);
  };

  const projectForm = <Modal
    maskClosable = {false}
    key= {"projectForm" + uuidv4}
    title="New Project"
    visible={secondModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    width={1000}
    okText="Save"
    cancelText="Cancel"
  >
    <ProjectForm key= {"project-" + uuidv4}/>
  </Modal>;

  const projectModalProceed = () => {
    setModalVisible(false);
    setSecondModalVisible(true);
  }
  const projectCodeModal = <Modal
    maskClosable = {false}
    key={"projectCodeModal-" + uuidv4}
    title="Project Code"
    visible={modalVisible}
    onOk={projectModalProceed}
    onCancel={handleCancel}
    width={250}
    okText="Proceed"
    cancelText="Cancel">
    <ProjectCode key={"projectCode-" + uuidv4} projectKey = {"projectKey-" + uuidv4} />
  </Modal>




  return (
    <>
      <Row key={uuidv4} >
        <Col offset={5} style={{marginTop: '40px'}}>
          <Row>
            <h1>
              Projects
            </h1>
          </Row>
          <Row>
            <Button
              key={uuidv4}
              type="primary" onClick={setModal}>NEW PROJECT</Button>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={prjct.projects}
                size="large"
                rowKey="id"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {projectCodeModal}
      {projectForm}
    </>
  );
};

export default Projects;
