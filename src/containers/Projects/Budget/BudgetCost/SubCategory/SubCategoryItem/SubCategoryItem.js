import React from 'react';
import {
    //  Row, Col,
    Form, Input
} from 'antd';

const SubCategoryItem = (props) => {
    const {itemCount} = props;
    return (
        <>
            <Form name="basic" style={{marginBottom: '0px'}}>
                <Form.Item
                    rules={{required: true,
                        message: 'Please Input a Cost Name!'}}
                    style={{marginBottom: '0px'}}
                >
                    <Input
                        style={{
                            borderColor: 'black',
                            width: '50px',
                            textAlign: 'center'
                        }}
                        value={itemCount}
                    />
                    <Input style={{
                        borderColor: 'black',
                        width: '642px',
                        textAlign: 'left'
                    }}
                    />
                    <Input
                        style={{
                            borderColor: 'black',
                            width: '125px',
                            textAlign: 'right'
                        }}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default SubCategoryItem;
