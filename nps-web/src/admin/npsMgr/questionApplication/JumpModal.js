import React, { Component } from 'react';
import { Modal, Row, Col, Form, Radio, Select, Input } from 'antd';

import './questionApplication.less';

const [FormItem, RadioGroup, Option] = [Form.Item, Radio.Group, Select.Option];

@Form.create()
export default class extends Component {
    state = {
        value: undefined
    };

    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return '';
            }
            let record = this.props.record, logicArr = [], _Obj = {}, arr = [];

            if (values.radio === 1) {
                if(record.optionList) {
                    arr = record.optionList.map((item, k) => {
                        return item.optionOrder;
                    });
                }
                _Obj = {
                    "actType": 0,
                    "andOr": 0,
                    "isMain": 0,
                    "logicType": "01",
                    "optionOrder": arr.join(','),
                    "setupQuestionOrder":  record.questionOrder,
                    "skiptoQuestionOrder": Number(values.unconditional)
                };
                logicArr.push(_Obj);
            } else {
                let valueArr = Object.values(values).splice(1);
                if(valueArr) {
                    for(let i = 0; i < valueArr.length - 1; i += 2){
                        _Obj = {
                            "actType": 0,
                            "andOr": 0,
                            "isMain": 0,
                            "logicType": "01",
                            "optionOrder": String(valueArr[i]),
                            "setupQuestionOrder":  record.questionOrder,
                            "skiptoQuestionOrder": Number(valueArr[i + 1])
                        };
                        logicArr.push(_Obj);
                    }
                }
            }
            this.props.onCreate(logicArr);
        });
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.props.onChange(e);
    };

    // 无条件跳转选择
    handleChange = (value) => {
       console.log(value);
    };

    componentWillUnmount () {
        //重写组件的setState方法，直接返回空
        this.setState = (state, callback) => {
            return '';
        };
    }

    afterClose = () => this.props.form.resetFields();

    render() {
        const { jump, jumpList = [], radioValue = 0, record = {}, form: { getFieldDecorator } } = this.props;

        const optionHtml = jumpList.map((item, k) => { return <Option key={k} value={item.questionOrder}>{item.questionName}</Option>;});
        const tableHtml = record.optionList ? record.optionList.map((item, k) => {
            return <Row key={k}>
                        <Col span={11} className="optionShow">
                            <FormItem>
                                {getFieldDecorator(`option${item.optionOrder}`, {
                                    initialValue: item.optionOrder,
                                    rules: [
                                        {required: true},
                                    ],
                                })(
                                    <Select onChange={this.handleChange}>
                                        <Option key={k} value={item.optionOrder}>{item.optionName}</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={11} offset={2}>
                            <FormItem labelCol = {{span: 0}} wrapperCol = {{span: 10}}>
                                {getFieldDecorator(`question${item.optionOrder}`, {
                                    initialValue: item.questionOrder ? item.questionOrder : '0',
                                    rules: [
                                        {required: false},
                                    ],
                                })(
                                    <Select>
                                        {optionHtml}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
        }) : '';

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
                        <Form>
                            {getFieldDecorator('radio', {
                                initialValue: radioValue,
                                rules: [
                                    {required: false},
                                ],
                            })(
                                record.questionType === '01' || record.questionType === '02' ?
                                    <RadioGroup onChange={this.props.onChange}>
                                        <Radio value={0}>按选项跳题</Radio>
                                        <Radio value={1}>无条件跳题</Radio>
                                    </RadioGroup>
                                    :
                                    <RadioGroup>
                                        <Radio value={1}>无条件跳题</Radio>
                                    </RadioGroup>

                            )}
                        </Form>
                    </Col>
                    <Col span={24} className="jumpContent">
                        <h3>1、{record.questionName}</h3>
                        { radioValue === 0 ?
                            <div style={{textAlign: 'center'}}>
                                <Row>
                                    <Col span={11}>题目选项</Col>
                                    <Col span={11} offset={2}>跳转到</Col>
                                </Row>
                                <Form>
                                    {tableHtml}
                                </Form>
                            </div>
                        :
                            <div>
                                <Form>
                                    <FormItem label="填写此题后跳转到" labelCol = {{span: 7}} wrapperCol = {{span: 14}}>
                                        {getFieldDecorator('unconditional', {
                                            initialValue: '0',
                                            rules: [
                                                {required: false},
                                            ],
                                        })(
                                            <Select>
                                                {optionHtml}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Form>
                            </div>}
                    </Col>
                </Row>
            </Modal>
        )
    }
}
