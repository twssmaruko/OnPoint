import React, {memo, useState} from 'react'
import {Row, Button} from 'antd'
import './PurchaseOrder.css'
// import {useDispatch} from 'react-redux';


const Header = (props) => {

  //   const dispatcher = useDispatch();
  // const [disabledAdd, setDisabledAdd] = useState(true)
  // const [disabledTable, setDisabledTable] = useState(false)
  const [disableButton, setDisableButtons] = useState({
    disableAdd: true,
    disableTable: false
  })

  //console.log("wew")

  const {onClickShowPurchaseOrders, onClickAddProp} = props;

  const runAddPurchaseOrder = () => {
    onClickAddProp();
    // setDisabledTable(false);
    // setDisabledAdd(true);
    setDisableButtons({
      ...disableButton,
      disableAdd: true,
      disableTable: false
    })

    // setDisabled(true)
  }

  const runShowPurchaseORder = () => {
    onClickShowPurchaseOrders();
    setDisableButtons({
      ...disableButton,
      disableAdd: false,
      disableTable: true
    })
    // setDisabledAdd(false);
    // setDisabledTable(true);

    // setDisabled(true)
  }

  return (
    <Row style={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20%',
      marginRight: '25%',
      marginTop: 20
    }}
    >
      <Row>
        <h1 style={{color: ' #FF111B',
          fontWeight: 'bold'}}>PURCHASE ORDERS</h1>
      </Row>
      <div style={{borderTop: '1px solid black'}} />
      <Row style={{marginLeft: -15}}>
        <div className="ant-btn-div">
          <Button
            className="ant-btn-menu"
            type="link"
            style={{fontWeight: 'bold',
              fontSize: 26}}
            onClick={runAddPurchaseOrder}
            disabled={disableButton.disableAdd}>
                Show Purchase Orders
          </Button>
        </div>
        <div className="ant-btn-div">
          <Button style={{marginLeft: 1,
            fontWeight: 'bold',
            fontSize: 26}}
          className="ant-btn-menu"
          type="link" onClick={runShowPurchaseORder}
          disabled={disableButton.disableTable}>
                Add Purchase Order
          </Button>
        </div>
      </Row>
    </Row>

  )
}

export default memo(Header, (prevProp, nextProp) => prevProp === nextProp);