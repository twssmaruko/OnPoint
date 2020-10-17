import React from 'react';
import {
  Form, Input
} from 'antd';
import Logo from '../../components/logo/Logo';
import Budget from './Budget/Budget';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import * as actions from '../../store/projects/index';

const ProjectForm = (props) => {
  const {TextArea} = Input;
  const dispatcher = useDispatch();
  const {projectKey} = props

  const onBlurClient = (value) => {
    dispatcher(actions.updateClient(value))
  }
  const onBlurProjectName = (value) => {
    dispatcher(actions.updateProjectName(value));
  }

  const onBlurLocation = (value) => {
    dispatcher(actions.updateLocation(value));
  }
  return (
    <div>
      <div style={{textAlign: 'center',
        marginTop: 20,
        width: '100%'}}>
        <h3 style={{color: '#512E0E'}}><Logo /></h3>
      </div>
      <div style={{
        justifyContent: 'center',
        marginTop: 20,
        width: '100%'
      }}
      >
        <Form
          id={"newProject" + uuidv4}
          name="basic"
        >
          <Form.Item
            label="Client"
            name="clientName"
            rules={[
              {required: true,
                message: 'Please Input the Clients Name!'}
            ]}
            style={{marginBottom: '0px',
              justifyContent: 'flex-end'}}
          >
            <Input
              style={{width: '400px',
                marginLeft: '17.5px',
                fontWeight: 'bold'}}
              onBlur={e => onBlurClient(e.target.value)} />

          </Form.Item>
          <Form.Item
            label="Project"
            name="projectName"
            rules={[
              {required: true,
                message: 'Please Input the Project Name!'}
            ]}
            style={{marginBottom: '0px',
              justifyContent: 'flex-end'}}
            onBlur = {e => onBlurProjectName(e.target.value)}
          >
            <TextArea
              style={{width: '500px',
                marginLeft: '10px',
                fontWeight: 'bold'}}
              autoSize={{minRows: 2,
                maxRows: 2}}
            />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              {required: true,
                message: 'Please enter the project location!'}
            ]}
            style={{marginBottom: '0px'}}
            onBlur = {e => onBlurLocation(e.target.value)}
          >
            <Input style={{width: '300px',
              fontWeight: 'bold'}} />

          </Form.Item>
          <h3 style={{textAlign: 'center'}}><b>BUDGET PROPOSAL</b></h3>
        </Form>
        <Budget key={projectKey + "-budget-" + uuidv4} projectKey = {projectKey} />
      </div>
    </div>
  );
};

export default ProjectForm;
