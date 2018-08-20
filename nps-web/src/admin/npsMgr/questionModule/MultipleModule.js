import {PureComponent} from "react";
import React from 'react';
import { Form, Input, Row, Col,} from 'antd';
const FormItem = Form.Item;

//多项填空
export default class MultipleModule extends PureComponent {
    render() {
        const { label, value } = this.props;
        const items1 = label.map((item, key) =>
        {
            return  <FormItem key={key} label={item} />

        })
        const items2 = value.map((item, key) =>
        {
            return <Input key={key} value={item}/>

        })
        return (
            <div>
                <Form horizontal className="ant-advanced-search-form">
                    <Row gutter={12}>
                        <Col sm={6}>
                            <FormItem  label={items1} labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                                <Input  size="default" value={items2} />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}