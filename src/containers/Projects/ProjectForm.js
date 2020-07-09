import React from 'react';
import {
//  Row, Col,
  Form, Input,
} from 'antd';
import Logo from '../../components/logo/Logo';
import Budget from './Budget/Budget';

const ProjectForm = () => (
  <div>
    <div style={{ textAlign: 'center', marginTop: 20, width: '100%' }}>
      <h3 style={{ color: '#512E0E' }}><Logo /></h3>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
      width: '100%',
    }}
    >
      <Form
        name="basic"
      >
        <Form.Item
          label="Client"
          name="clientName"
          rules={[{ required: true, message: 'Please Input the Clients Name!' }]}
        >
          <Input style={{ width: '400px' }} />

        </Form.Item>
        <Form.Item
          label="Project"
          name="projectName"
          rules={[{ required: true, message: 'Please Input the Project Name!' }]}
        >
          <Input style={{ width: '600px' }} />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please enter the project location!' }]}
        >
          <Input style={{ width: '200px' }} />

        </Form.Item>
        <h3 style={{ textAlign: 'center' }}><b>BUDGET PROPOSAL</b></h3>
        <Form.Item>
          <Budget />
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default ProjectForm;
