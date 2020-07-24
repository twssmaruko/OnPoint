import React, {
  useState,
  // useEffect,
  lazy,
  useCallback,
  Suspense
} from 'react';
import {
  Row
  // Select,
} from 'antd';
// import {CSSTransitionGroup} from 'react-transition-group';



import {
  useDispatch
} from 'react-redux';
import PurchaseOrderTable from './Components/PurchaseOrderTable'
// import moment from 'moment';
// import PurchaseOrderAddModal from './AddPurchaseOrderModal';

// import { SearchOutlined } from '@ant-design/icons';
import * as uiActions from '../../store/ui/actions/Actions';
// import * as actions from '../../store/purchaserequest/actions/Actions';
import Header from './Components/PurchaseOrderHeader';


const PurchaseOrderAddModal = lazy(() => import('./Components/AddPurchaseOrder'));



const PurchaseOrders = () => {
  // const childRef = useRef();
  const dispatcher = useDispatch();
  const [addModal, setAddModal] = useState(false);

  // const {
  //   // purchaseRequestsList,
  //   tableSpin
  // } = useSelector(({ui, purchaseRequests}) => ({
  //   openAnotherModal: ui.openModal2,
  //   purchaseRequestsList: purchaseRequests.purchaseRequests,
  //   tableSpin: ui.showSpin3
  // }));

  // useEffect(() => {
  //   // dispatcher(actions.getMonthlyPurchaseRequests());
  //   // dispatcher(actions.initSubscriptions());
  //   // return () => {
  //   //   dispatcher(actions.unsubscribe());
  //   // };
  // }, []);



  const setModal = useCallback(() => {
    // if (addModal === null) {
    // }
    dispatcher(uiActions.setOpenModal2(true));
    setAddModal(true)
    // dispatcher(uiActions.setOpenModal1(true));
  }, [dispatcher]);



  return (
    <div>
      <Header onClickProp={setModal}/>
      <Row>
        <Suspense fallback={<div style={{marginLeft: '20%'}}> Loading</div>}>
          {addModal? <PurchaseOrderAddModal/> : null}
        </Suspense>
      </Row>
      {addModal ? null : <PurchaseOrderTable />
      }
      {/* {addModal} */}
    </div>
  );
};

export default PurchaseOrders;
