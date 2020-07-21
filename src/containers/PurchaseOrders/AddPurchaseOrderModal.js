import React, {useState} from 'react';
import {
    Modal,
    Row,
    Form,
    Select,
    Spin,
    Input
    // Col,
//    Card,
// Input,
} from 'antd';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import * as uiActions from '../../store/ui/actions/Actions';
import * as actions from '../../store/purchaseorders/actions/Actions';
import PurchaseOrderModal from './PurchaseOrderModal';
// import Logo from '../../assets/images/Logo.png';

const AddPurchaseOrderModal = () => {
    const dispatcher = useDispatch();
    const [form] = Form.useForm();
    const {Option} = Select;
    const [purchaseRequestSelected, setPurchaseRequestSelected] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState({});
    // const [vendorValue, setVendorValue] = useState();
    const [purchaseOrderData, setPurchaseOrderData] = useState({
        requestedBy: '',
        project: '',
        category: '',
        vendorData: {},
        addNotes: '',
        purchaseRequestData: {orders: {items: []}}
    });

    const {
        openModal,
        showSpin,
        showSpin2,
        purchaseRequestList,
        purchaseRequestData,
        vendorsList
    } = useSelector(({ui, purchaseOrder}) => ({
        openModal: ui.openModal2,
        showSpin: ui.showSpin1,
        showSpin2: ui.showSpin2,
        purchaseRequestList: purchaseOrder.purchaseRequests,
        purchaseRequestData: purchaseOrder.purchaseRequest,
        vendorsList: purchaseOrder.vendors
    }));

    const searchPurchaseRequestList = () => purchaseRequestList.map((purchaseRequest) =>
        <Option key={purchaseRequest.id} value={purchaseRequest.id}>
            {purchaseRequest.purchaseRequestNo}
        </Option>
    );

    const searchVendorsList = () => vendorsList.map((vendor) =>
        <Option key={vendor.id} value={vendor.id}>
            {vendor.vendorName}
        </Option>
    );

    const invokeSubmit = () => {
        form.submit();
    };

    const addPurchaseOrder = (formValues) => {
        const {
            requestedBy, project,
            category, addNotes
        } = formValues;
        setPurchaseOrderData({
            ...purchaseOrderData,
            requestedBy,
            project,
            category,
            purchaseRequestData,
            addNotes,
            vendorData: selectedVendor
        });

        dispatcher(uiActions.setOpenModal1(true));
    };

    const handleCancel = () => {
        dispatcher(uiActions.setOpenModal2(false));
    };

    const fetchPurchaseRequest = (value) => {
        dispatcher(actions.getPurchaseRequests(value));
    };

    const fetchVendor = (value) => {
        dispatcher(actions.getVendors(value));
    };

    const purchaseRequestRender = _.isEmpty(purchaseRequestData) ?
        <div>
            <h3 style={{color: 'red'}}>
        Purchase Request Selected Is Not Approved Yet
            </h3>
        </div>
        :
        <>
            <Row style={{
                color: 'black',
                marginLeft: 10,
                marginTop: -10
            }}
            >
                <div>
                    {`PR #: ${purchaseRequestData.purchaseRequestNo}`}
                </div>
                <div style={{marginLeft: 20}}>
                    {`Status: ${purchaseRequestData.status}`}
                </div>
                <div style={{marginLeft: 20}}>
                    {`Total Price : ${purchaseRequestData.totalPrice}`}
                </div>
            </Row>
            <Row style={{color: 'black',
                marginLeft: 10,
                marginTop: 10}}>
                <div>
          Orders:
                </div>
                <div style={{
                    marginLeft: 20
                    // border: '1px solid black',
                }}
                >
                    <div>
                        {purchaseRequestData.orders.items.map((order) =>
                            <div key={order.product.id}>
                                {`-- ${order.quantity} ${order.unit} of 
                                ${order.product.name}  for ${order.price} Php` }
                            </div>
                        )}
                    </div>
                </div>
            </Row>
        </>;
    const vendorRender =
    <>
        <div style={{
            color: 'black',
            marginLeft: 10,
            marginTop: -10
        }}
        >
            <Row>
                <div>
                    {`Name: ${selectedVendor.vendorName}`}
                </div>
                <div style={{marginLeft: 15}}>
                    {`Contact # : ${selectedVendor.telNo}`}
                </div>
            </Row>
            <Row style={{overflowWrap: 'break-word'}}>
                {`Address: ${selectedVendor.location}`}
            </Row>
        </div>
    </>;
    const setPurchaseRequest = async (selectedPurchaseRequest) => {
        if (!selectedPurchaseRequest) {
            setPurchaseRequestSelected(false);
            return;
        }

        const itemSelected = purchaseRequestList.find(
            (data) => data.id === selectedPurchaseRequest.value
        );

        if (itemSelected.isApproved === 'APPROVED') {
            await dispatcher(actions.getPurchestRequestData(itemSelected.id));
            setPurchaseRequestSelected(true);
            return;
        }
        setPurchaseRequestSelected(true);
        dispatcher(actions.setPurchaseRequest({}));
    };

    const setVendor = (selectedVendorItem) => {
        if (!selectedVendorItem) {
            setSelectedVendor({});
            return;
        }

        const itemSelected = vendorsList.find((data) => data.id === selectedVendorItem.value);

        // const index = selectedVendorItem.value;
        setSelectedVendor(itemSelected);
    };

    const resetFields = () => {
    // setProject(null);
        form.resetFields();
        setPurchaseRequestSelected(false);
        setSelectedVendor({});
        dispatcher(actions.setPurchaseRequest({}));
    };

    const debounceFetchPurchaseRequest = _.debounce(fetchPurchaseRequest, 1000);
    const debounceFetchVendor = _.debounce(fetchVendor, 1000);

    return (
        <>
            <Modal
                title="Add a Purchase Order"
                visible={openModal}
                onOk={invokeSubmit}
                onCancel={handleCancel}
                width={600}
                okText="View PDF Format"
                cancelText="Cancel"
                maskClosable={false}
                afterClose={resetFields}
                destroyOnClose
            >
                <Form
                    // {...layout}
                    form={form}
                    style={{marginTop: -10}}
                    name="basic"
                    onFinish={addPurchaseOrder}
                >
                    <div style={{border: '1px solid black'}}>
                        <div style={{margin: 10}}>
                            <Form.Item
                                label="Purchase Request"
                                name="purchaseRequest"
                                rules={[
                                    {required: true,
                                        message: 'Please input PR #!'}
                                ]}
                            >
                                <Select
                                    key="puchaseRequest"
                                    showSearch
                                    allowClear
                                    labelInValue
                                    placeholder="Search PR #"
                                    notFoundContent={<Spin spinning={showSpin} />}
                                    filterOption={false}
                                    onSearch={debounceFetchPurchaseRequest}
                                    style={{
                                        width: 170,
                                        border: '1px solid black'
                                    }}
                                    onChange={setPurchaseRequest}
                                >
                                    {searchPurchaseRequestList()}
                                </Select>
                            </Form.Item>
                            {purchaseRequestSelected ? purchaseRequestRender : null}
                        </div>
                    </div>
                    <div style={{marginTop: 10,
                        border: '1px solid black'}}>
                        <div style={{margin: 10}}>
                            <Form.Item
                                label="Vendor"
                                name="vendor"
                                rules={[
                                    {required: true,
                                        message: 'Please Input Vendor'}
                                ]}
                            >
                                <Select
                                    key="vendors"
                                    showSearch
                                    allowClear
                                    labelInValue
                                    // value={vendorValue}
                                    placeholder="Search Vendor Name"
                                    notFoundContent={<Spin spinning={showSpin2} />}
                                    filterOption={false}
                                    onSearch={debounceFetchVendor}
                                    style={{width: 170,
                                        border: '1px solid black'}}
                                    onChange={setVendor}
                                >
                                    {searchVendorsList()}
                                </Select>
                            </Form.Item>
                            {_.isEmpty(selectedVendor) ? null : vendorRender}
                        </div>
                    </div>
                    <div style={{marginTop: 10,
                        border: '1px solid black'}}>
                        <div style={{margin: 10}}>
                            <Form.Item
                                label="Project"
                                name="project"
                                rules={[
                                    {required: true,
                                        message: 'Please Input Project'}
                                ]}
                            >
                                <Input placeholder="Enter Project" style={{width: 170,
                                    border: '1px solid black'}} allowClear />
                            </Form.Item>
                            <Form.Item
                                label="Requested By"
                                name="requestedBy"
                                rules={[
                                    {required: true,
                                        message: 'Please Input Requested By'}
                                ]}
                            >
                                <Input placeholder="Enter Requester" style={{width: 170,
                                    border: '1px solid black'}} allowClear />
                            </Form.Item>
                            <Form.Item
                                label="Category"
                                name="category"
                                style={{marginLeft: 10}}
                            >
                                <Input placeholder="Enter Category" style={{width: 170,
                                    border: '1px solid black'}} allowClear />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{marginTop: 10,
                        border: '1px solid black'}}>
                        <div style={{margin: 10}}>
                            <Form.Item
                                label="Additional Notes"
                                name="addNotes"
                                style={{marginLeft: 10}}

                            >
                                <div style={{border: '1px solid black'}}>
                                    <Input.TextArea
                                        rows={2}
                                        placeholder="Enter Additional Notes"
                                        allowClear />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
            <PurchaseOrderModal data={purchaseOrderData} />
        </>
    );
};

export default AddPurchaseOrderModal;
