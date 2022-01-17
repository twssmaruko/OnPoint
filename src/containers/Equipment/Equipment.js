import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Modal } from "antd";
import * as uiActions from '../../store/ui/actions/Actions';
import { SearchOutlined, DeleteFilled, EditTwoTone } from "@ant-design/icons";
import TableButton from "../../components/button/OnpointButton";
import EquipmentModal from './EquipmentModal';

const Equipment = () => {

  const dispatcher = useDispatch();
  const setEditModal = (data) => { };

  const deleteItem = (data) => { };

  const { openModal } = useSelector(({ ui }) => ({
    openModal: ui.openModal1
  }))

  const editButton = (item) => (
    <div>
      <TableButton
        value={item}
        type="primary"
        icon={<EditTwoTone key={"edit-" + item} />}
        onClick={(e) => setEditModal(e)}
      />
    </div>
  );
  const deleteButton = (item) => (
    <div>
      <TableButton
        value={item}
        type="primary"
        icon={<DeleteFilled />}
        onClick={deleteItem}
      />
    </div>
  );

  const columns = [
    {
      title: "Details",
      key: "details",
      render: editButton,
      fixed: "left",
      width: "1%",
    },
    {
      title: "Code",
      key: "code",
    },
    {
      title: "Category",
      key: "category",
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Delete",
      key: "delete",
      render: deleteButton,
      width: "1%",
    },
  ];
  console.log("test");

  const onNewClick = () => {
    dispatcher(uiActions.setOpenModal1(true));
  }
  const onEquipmentOk = () => {
    dispatcher(uiActions.setOpenModal1(false));
  }

  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "20%",
          marginTop: 20,
        }}
      >
        <Row>
          <h1 style={{ fontWeight: "bold", color: "#FF111B" }}>
            EQUIPMENT
          </h1>
        </Row>
        <Row>
          <Button type="primary" onClick={onNewClick}>New</Button>
        </Row>
        <Row
          style={{
            marginTop: 3,
            marginLeft: "20%",
            marginRight: "20%",
          }}>
          <Col>
            <Table columns={columns} />
          </Col>
        </Row>
      </Row>
      <Modal visible={openModal} onCancel={() => {
        dispatcher(uiActions.setOpenModal1(false));
      }}
        onOk={onEquipmentOk}
        footer={[
          <Button key="cancel" type="reset" onClick={() => {
            dispatcher(uiActions.setOpenModal1(false))
          }}>
            Cancel
          </Button>,
          <Button form="equipmentForm" key="submit" htmlType="submit" type="primary">
            Proceed
          </Button>
          
        ]}>
        <EquipmentModal />
      </Modal>
    </>
  );
};

export default Equipment;
