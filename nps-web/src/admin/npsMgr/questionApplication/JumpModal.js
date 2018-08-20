import React, { Component } from 'react';
import { Modal, Row, Col, Form, Radio, Select, Input } from 'antd';

import './questionApplication.less';

const [FormItem, RadioGroup, Option] = [Form.Item, Radio.Group, Select.Option];

@Form.create()
export default class extends Component {
    state = {
        value: 0,
    };

    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return '';
            }

        });
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    // 无条件跳转选择
    handleChange = (value) => {
       console.log(value);
    };

    afterClose = () => this.props.form.resetFields();

    render() {
        const { jump, data, form: { getFieldDecorator }, options = [] } = this.props;
        const { value } = this.state;
        const optionHtml = options.map((item, k) => { return <Option key={k} value={item.questionId}>{item.questionName}</Option>;});
        // const tableHtml = data.optionList.map((item, k) => {
        //     return <div>
        //                 <FormItem>
        //                     {getFieldDecorator('option', {
        //                         initialValue: '',
        //                         rules: [
        //                             {max: 255, message: '不能超过255个字符'},
        //                         ],
        //                     })(
        //                         <Input placeholder="请输入新增选项"rows={17}/>
        //                     )}
        //                 </FormItem>
        //                 <FormItem labelCol = {{span: 0}} wrapperCol = {{span: 10}}>
        //                     {getFieldDecorator('option', {
        //                         initialValue: '',
        //                         rules: [
        //                             {max: 255, message: '不能超过255个字符'},
        //                         ],
        //                     })(
        //                         <Select onChange={this.handleChange}>
        //                             {optionHtml}
        //                         </Select>
        //                     )}
        //                 </FormItem>
        //             </div>
        // });

        return(
            <Modal
                width={600}
                maskClosable={true}
                visible={jump}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
            >
                <Row className="jumpModal">
                    <Col span={24} className="jumpHeader">
                        <RadioGroup defaultValue={0} onChange={this.onChange} >
                            <Radio value={0}>按选项跳题</Radio>
                            <Radio value={1}>无条件跳题</Radio>
                        </RadioGroup>
                    </Col>
                    <Col span={24} className="jumpContent">
                        { value=== 0 ?
                            <div>
                                <Form>
                                    按选项跳题
                                </Form>
                            </div>
                        :
                            <div>
                                <Form>
                                    <FormItem label="填写此题后跳转到" labelCol = {{span: 7}} wrapperCol = {{span: 14}}>
                                        <Select
                                            onChange={this.handleChange}
                                        >
                                            {optionHtml}
                                        </Select>
                                    </FormItem>
                                </Form>
                            </div>}
                    </Col>
                </Row>
            </Modal>
        )
    }
}
