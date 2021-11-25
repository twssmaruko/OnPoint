import  React, {useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Table } from "antd";
import {SearchOutlined, DeleteFilled, EditTwoTone} from '@ant-design/icons';
import TableButton from "../../components/button/OnpointButton";

const Equipment = () => {

    const setEditModal = (data) => {

    }

    const deleteItem = (data) => {

    }

    const editButton = (item) => (
        <div>
          <TableButton value = {item}
          type="primary"
          icon={<EditTwoTone key={"edit-" + item}/>}
          onClick ={(e) => setEditModal(e)}/>
        </div>
        );
    const deleteButton = (item) => (
        <div>
            <TableButton value = {item}
            type="primary"
            icon={<DeleteFilled />}
            onClick={deleteItem} />
        </div>
    )

    const columns = [{
        title: 'Edit',
        key: 'edit',
        render: editButton,
        fixed: 'left',
        width: '1%'

    }, {
        title: 'Code',
        key: 'code',

    }, {
        title: 'Category',
        key: 'category'
    }, {
        title: 'Name',
        key: 'name'
    }, {
        title: 'Delete',
        key: 'delete',
        render: deleteButton,
        width: '1%'
    }];
    console.log('test');

    return(
      <>
      <Row>
        <Col>
          <Table columns={columns} />
        </Col>
      </Row>
      </>
    )

};

export default Equipment;
