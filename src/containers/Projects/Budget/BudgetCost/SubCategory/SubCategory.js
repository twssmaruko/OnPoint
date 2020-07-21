import React, {useState} from 'react';
import {
    //  Row, Col,
    Form, Input, Button
} from 'antd';
import SubCategoryItem from './SubCategoryItem/SubCategoryItem';

const SubCategory = () => {
    const [subCategoryItemState, setSubCategoryItemState] = useState([]);
    const [countState, setCountState] = useState(1);
    const addSubCategoryItemClicked = () => {
        const newSubCategoryItem = subCategoryItemState.concat(<SubCategoryItem itemCount={countState} />);
        setSubCategoryItemState(newSubCategoryItem);
        const count = countState + 1;
        setCountState(count);
        console.log(countState);
    };

    return (
        <>
            <Form name="basic" style={{marginBottom: '0px',
                marginTop: '0px'}}>
                <Form.Item
                    rules={{required: true,
                        message: 'Please Input a Cost Name!'}}
                    style={{marginBottom: '0px'}}
                >
                    <Input style={{
                        borderColor: 'black',
                        backgroundColor: '#DCDCDC',
                        width: '50px',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                    />
                    <Input style={{
                        borderColor: 'black',
                        backgroundColor: '#DCDCDC',
                        width: '642px',
                        textAlign: 'left',
                        fontWeight: 'bold'
                    }}
                    />
                    <Input
                        disabled="true"
                        style={{
                            borderColor: 'black',
                            backgroundColor: '#DCDCDC',
                            width: '125px',
                            textAlign: 'right',
                            fontWeight: 'bold'
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{marginTop: '0px',
                        marginBottom: '0px'}}
                    rules={{required: true,
                        message: 'Please Input a Cost Name!'}}
                >
                    <Input
                        defaultValue="ITEM NO."
                        disabled="true"
                        style={{
                            borderColor: 'black',
                            width: '50px',
                            textAlign: 'center',
                            fontSize: '10px',
                            color: '#5DADE2',
                            height: '25px',
                            fontWeight: 'bold'
                        }}
                    />
                    <Input
                        defaultValue="DESCRIPTION"
                        disabled="true"
                        style={{
                            borderColor: 'black',
                            width: '642px',
                            textAlign: 'center',
                            color: '#5DADE2',
                            height: '25px',
                            fontWeight: 'bold'
                        }}
                    />
                    <Input
                        defaultValue="AMOUNT"
                        disabled="true"
                        style={{
                            borderColor: 'black',
                            width: '125px',
                            textAlign: 'center',
                            color: '#5DADE2',
                            height: '25px',
                            fontWeight: 'bold'
                        }}
                    />
                    <Button onClick={addSubCategoryItemClicked} shape="circle" style={{borderColor: 'black'}}>+</Button>
                </Form.Item>
                {subCategoryItemState}
            </Form>
        </>
    );
};

export default SubCategory;
