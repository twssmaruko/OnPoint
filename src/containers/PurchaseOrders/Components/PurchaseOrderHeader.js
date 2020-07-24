import React, {memo, useState} from 'react'
import {Row, Button} from 'antd'

// import {useDispatch} from 'react-redux';


const Header = (props) => {

  //   const dispatcher = useDispatch();
  const [disabled, setDisabled] = useState(false)
  console.log("wew")

  const {onClickProp} = props;

  const runProp = () => {
    onClickProp();
    setDisabled(true)
  }

  return (
    <Row style={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20%',
      marginTop: 20
    }}
    >
      <Row>
        <h1>Purchase Orders</h1>
      </Row>
      <Row>
        <Button type="primary" onClick={runProp} disabled={disabled}>
                New Purchase Orders
        </Button>
      </Row>
    </Row>

  )
}

export default memo(Header,  (prevProps, nextProps) => nextProps.count === prevProps.count);