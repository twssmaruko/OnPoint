import React, {
  useState,
  useEffect,
  lazy,
  useCallback,
  Suspense,
} from "react";
import { Transition } from "react-transition-group";
import "./PurchaseOrders.css";
import * as actions from '../../store/purchaseorders/actions/Actions';
import { useDispatch } from 'react-redux';

import PurchaseOrderTable from "./Components/PurchaseOrderTable";
// import moment from 'moment';
// import PurchaseOrderAddModal from './AddPurchaseOrderModal';

// import { SearchOutlined } from '@ant-design/icons';
// import * as actions from '../../store/purchaserequest/actions/Actions';
import Header from "./Components/PurchaseOrderHeader";

const PurchaseOrderAddModal = lazy(() =>
  import("./Components/AddPurchaseOrder")
);

const PurchaseOrders = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showAddGasForm, setShowAddGasForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const setShowPurchaseOrdersRender = useCallback(() => {
    setShowTable(false);
  }, []);

  const setAddPurchaseOrderRender = useCallback(() => {
    setShowAddForm(false);
  }, []);

  const setAddPurchaseOrderGasRender = useCallback(() => {
    setShowAddGasForm(false);
  })

  const setAddServiceOrderRender = useCallback(() => {
    setShowServiceForm(false);
  })

  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.fetchPurchaseOrders());
  }, [dispatcher]);

  const transitionStyles = {
    entering: {
      opacity: 1,
      transform: "translateX(0)",
      transition: "all 250ms ease-out",
    },
    entered: { opacity: 1 },
    exiting: {
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "all 250ms ease-out",
    },
    exited: {
      opacity: 0,
      transform: "translateX(-100%)",
    },
  };

  const addFormStyle = {
    entering: {
      opacity: 1,
      transform: "translateX(0)",
      transition: "all 250ms ease-out",
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "all 250ms ease-out",
    },
    exited: {
      opacity: 0,
      transform: "translateX(100%)",
    },
  };

  const onTableExit = useCallback(() => {
    setShowAddForm(true);
  }, []);

  const onAddExit = useCallback(() => {
    setShowTable(true);
  }, []);

  return (
    <div>
      <Header
        onClickShowPurchaseOrders={setShowPurchaseOrdersRender}
        onClickAddProp={setAddPurchaseOrderRender}
        onClickAddGasProp={setAddPurchaseOrderGasRender}
        onClickAddServiceProp={setAddServiceOrderRender}
      />
      <Transition
        in={showAddForm}
        timeout={{
          enter: 250,
          exit: 250,
        }}
        onExited={onAddExit}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div
            style={{
              ...addFormStyle[state],
            }}
          >
            <Suspense
              fallback={<div style={{ marginLeft: "20%" }}> Loading</div>}
            >
              <PurchaseOrderAddModal />
            </Suspense>
          </div>
        )}
      </Transition>
      <Transition
        in={showTable}
        // appear={true}
        timeout={{
          enter: 250,
          exit: 250,
        }}
        onExited={onTableExit}
        mountOnEnter
        unmountOnExit
        // classNames="addPurchaseorder"
      >
        {(state) => (
          <div
            style={{
              ...transitionStyles[state],
            }}
          >
            <PurchaseOrderTable />
          </div>
        )}
      </Transition>
      {/* {addModal} */}
    </div>
  );
};

export default PurchaseOrders;
