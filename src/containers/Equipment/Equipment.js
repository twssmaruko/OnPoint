import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Modal } from "antd";
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/equipment/actions/Actions';
import { SearchOutlined, DeleteFilled, EditTwoTone } from "@ant-design/icons";
import TableButton from "../../components/button/OnpointButton";
import EquipmentModal from './EquipmentModal';
import EquipmentDetail from './EquipmentDetail';
import "./Equipment.css";

const Equipment = () => {

  const dispatcher = useDispatch();
  const [chosenEquipment, setChosenEquipment] = useState('');
  const [deleteID, setDeleteID] = useState('');


  const setEditModal = (selectedEquipment) => { 
    setChosenEquipment(selectedEquipment);
    dispatcher(uiActions.setOpenModal2(true));
  };

  const deleteItem = (data) => { 
    console.log(data.equipment_id);
    dispatcher(uiActions.setOpenModal3(true));
    setDeleteID(data.equipment_id);
  };

  useEffect(() => {
    dispatcher(actions.fetchEquipment());
  },[dispatcher])

  const modalFooter1 = [
    <Button className="equipment-modal" key="cancel" type="reset" onClick={() => {
      dispatcher(uiActions.setOpenModal1(false))
    }}>
      Cancel
    </Button>,
    <Button form="equipmentForm" key="submit" htmlType="submit" type="primary">
      Proceed
    </Button>
    
  ];

  const modalFooter2 = [
    <Button className="equipment-modal" key="cancel" type="reset" onClick={() => {
      dispatcher(uiActions.setOpenModal2(false))
    }}>
      Cancel
    </Button>,
    <Button form="formDetail" key="submit" htmlType="submit" type="primary">
      Proceed
    </Button>
    
  ];

  const { openModal1, openModal2, openModal3, equipment } = useSelector(({ ui, equipment }) => ({
    openModal1: ui.openModal1,
    openModal2: ui.openModal2,
    openModal3: ui.openModal3,
    equipment: equipment.equipment
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
        type="danger"
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
      title: "Category",
      dataIndex: "equipment_category",
      key: "equipment_category",
      sorter: (a, b) => a.equipment_category.localeCompare(b.equipment_category),
      defaultSortOrder: 'ascend'
    },
    {
      title: "Name",
      dataIndex: "equipment_name",
      key: "equipment_name",
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
  const onEquipmentDelete = () => {
    dispatcher(actions.deleteEquipment(deleteID));
    dispatcher(uiActions.setOpenModal3(false));
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
            <Table columns={columns}
            dataSource={equipment} 
            rowKey="equipment_id"/>
          </Col>
        </Row>
      </Row>
      <Modal visible={openModal1} onCancel={() => {
        dispatcher(uiActions.setOpenModal1(false));
      }}
        onOk={onEquipmentOk}
        footer={modalFooter1}>
        <EquipmentModal className="margin-top"/>
      </Modal>
      <Modal visible={openModal2} onCancel={() => {
        dispatcher(uiActions.setOpenModal2(false))
      }}
      footer={modalFooter2}>
        <EquipmentDetail chosenEquipment = {chosenEquipment}/>
      </Modal>
      <Modal visible={openModal3}
      onOk = {onEquipmentDelete}
      onCancel={() => {
        dispatcher(uiActions.setOpenModal3(false))
      }}>
        Are you sure you want to delete this equipment?
      </Modal>
    </>
  );
};

export default Equipment;
