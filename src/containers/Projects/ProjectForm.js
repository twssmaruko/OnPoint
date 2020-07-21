import React from 'react';
import {
    Form, Input
} from 'antd';
import Logo from '../../components/logo/Logo';
import Budget from './Budget/Budget';

const ProjectForm = () => {
    const {TextArea} = Input;

    return (
        <div>
            <div style={{textAlign: 'center',
                marginTop: 20,
                width: '100%'}}>
                <h3 style={{color: '#512E0E'}}><Logo /></h3>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
                width: '100%'
            }}
            >
                <Form
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
                        <Input style={{width: '400px',
                            marginLeft: '17.5px',
                            fontWeight: 'bold'}} />

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
                    >
                        <Input style={{width: '300px',
                            fontWeight: 'bold'}} />

                    </Form.Item>
                    <h3 style={{textAlign: 'center'}}><b>BUDGET PROPOSAL</b></h3>
                    <Form.Item>
                        <Budget />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProjectForm;
