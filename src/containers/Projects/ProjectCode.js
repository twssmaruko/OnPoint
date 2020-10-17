import React from 'react'
import {
  Form, Input
} from 'antd';
import {v4 as uuidv4} from 'uuid';
import {connect} from 'react-redux';
import * as actions from '../../store/projects/index';

const ProjectCode = (props) => {
  const onProjectCodeChanged = (data) => {
    const newProjectCode = data;
    props.onProjectCodeUpdate(newProjectCode);
  }
  return (
    <div>
      <div style={{textAlign: 'center',
        marginTop: 20,
        width: '100%'}}>
      </div>
      <div style={{
        justifyContent: 'center',
        marginTop: 20,
        width: '100%'
      }}
      >
        <Form
          id = {"prjctCd - " + uuidv4}
          name = "basic">
          <Form.Item
            label ="Project Code: "
            name ="projectCode"
            rules={[
              {required: true,
                message: 'Please Input the Project Code!'}
            ]}
            style={{marginBottom: '0px',
              justifyContent: 'flex-end'}}>
            <Input
              onBlur = {(e => onProjectCodeChanged(e.target.value))}/>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  prjct: state.project.project
})

const mapDispatchToProps = (dispatch) => ({
  onProjectCodeUpdate: (projectCode) => dispatch(actions.updateProjectCode(projectCode))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCode);