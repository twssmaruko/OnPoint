import React,
{useEffect}
  from 'react';
import {
  Row, Col, Form, Input, Modal, Spin
} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/products/actions/Actions';

const Productsform = (props) => {
  const dispatcher = useDispatch();
  const [form] = Form.useForm();

  const {
    openModal,
    showSpin

  } = useSelector(({ui}) => ({
    openModal: ui.openModal1,
    showSpin: ui.showSpin1

  }));

  useEffect(() => {
    form.resetFields();
  }, [form,openModal]);

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
  };
  const {operation, editValues} = props;

  const onSubmit = (values) => {
    if (operation === 'add') {
      dispatcher(actions.addProduct(values));
      return;
    }
    const toSubmitValues = {...editValues,
      ...values};
    dispatcher(actions.editProduct(toSubmitValues));
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    dispatcher(uiActions.setOpenModal1(false));
  };

  // const afterCloseModal = () => {
  //   form.resetFields();
  // };

  return (
    <Row>
      <Modal
        maskClosable={false}
        title={operation === 'add' ? 'Add a product' : 'Edit a product'}
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText={operation === 'add' ? 'Add' : 'Edit'}
        cancelText="Cancel"
        getContainer={false}
        // destroyOnClose
        // afterClose={afterCloseModal}
      >
        <Spin spinning={showSpin}>

          <Col span={24}>
            <Row>
              <Form
                form={form}
                {...layout}
                name="basic"
                initialValues={editValues}
                onFinish={onSubmit}
              >
                <Row>
                  <Col span={10}>
                    <Form.Item
                      label="Product Name"
                      name="name"
                      rules={[
                        {required: true,
                          message: 'Please input Product Name'}
                      ]}
                    >
                      <Input style={{width: 200}} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Type"
                      name="type"
                      rules={[
                        {required: true,
                          message: 'Please input Product Type'}
                      ]}
                    >
                      <Input style={{width: 100}} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {required: true,
                          message: 'Please input Description'}
                      ]}
                    >
                      <Input style={{width: 300}} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Col>
        </Spin>
      </Modal>
    </Row>
  );
};

export default Productsform;
