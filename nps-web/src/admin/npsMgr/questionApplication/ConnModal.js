import React, { Component } from 'react';
import { Modal, Form, Select, Button, Row, Col, Radio, Icon, Popconfirm } from 'antd';

import InitQuestionList from './InitQuestionList';

import './questionApplication.less';
import {message} from "antd/lib/index";

const [FormItem, Option, RadioGroup] = [Form.Item, Select.Option, Radio.Group];

let uuid = 1;
@Form.create()
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions ? props.questions : [{}],
            // key: [0],
        };
    }

    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return '';
            }
            console.log(values);
        });
        // this.props.onClose()
    };

    afterClose = () => {
        this.setState({
            questions: this.props.questions ? this.props.questions : [{}],
            // key: [0]
        });
        this.props.form.resetFields();
    };

    handleChange = (value, record) => {
        if(this.state.questions.filter(item => item.questionOrder === value).length === 0) {
            let question = this.props.connList.filter(item => item.questionOrder === value)[0];
            let _obj = JSON.stringify(this.state.questions);
            let arr = JSON.parse(_obj);
            arr.length = this.state.questions.length - 1;

            let questionArr = [
                ...arr,
                question,
            ];
            this.setState({
                questions: questionArr
            });
        } else {
            message.info('该题已设置关联逻辑，关联题目不可重复');
        }
    };

    // 新增关联题选框
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if(keys.length === this.props.connList.length) {
            message.info('已超过可关联的题目数量');
            return '';
        }
        const nextKeys = keys.concat(uuid);
        uuid++;
        this.setState({
            questions: [...this.state.questions, {}]
        });

        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    // 删除关联题选框
    remove = (k, index) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
        this.setState({
            questions: [...this.state.questions.filter((item, x) => x !== index)]
        });
    };

    render() {
        const { conn, index, record, connList, keyS = [0], form: { getFieldDecorator, getFieldValue } } = this.props;
        const { questions } = this.state;

        const optionList = connList.map((item) => {
            return  <Option key={item.questionOrder} value={item.questionOrder}>{item.questionName}</Option>
        });
        getFieldDecorator('keys', keyS !== null ? {initialValue: [...keyS]} : {initialValue: [0]});
        const keys = getFieldValue('keys');
        const formItems = keys.map((index, k) => {
            return (
                <div key={k}>
                    <FormItem
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label={`关联题目${k + 1}`}
                        required={false}
                    >
                        {getFieldDecorator(`question[${k}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            onChange: (value) => this.handleChange(value, `question[${k}]`),
                            initialValue: JSON.stringify(questions[k]) !== '{}' ? questions[k].questionOrder : undefined,
                        })(
                            <Select
                                style={{width: '90%', marginRight: 8}}
                                placeholder="请选择要关联题目"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {optionList}
                            </Select>
                        )}
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(index, k)}
                            />
                        ) : null}
                    </FormItem>
                    <div style={{ padding: '0 60px', marginBottom: '10px'}}>
                        { JSON.stringify(questions[k]) !== '{}' ?
                            <div>
                                当关联题目{ k + 1 } 选择下面的选项<br/>
                                <InitQuestionList questionType={questions[k].questionType} questionOrder={questions[k].questionOrder} key={questions[k].questionOrder} index={ k+1 } questionName={questions[k].questionName.split('、')[1]} optionList={questions[k].optionList}/>
                                中的任意一个时，"当前题目"才出现
                            </div>
                        : '' }
                    </div>
                </div>
            );
        });

        return(
            <Modal
                width={800}
                maskClosable={true}
                visible={conn}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
                footer={[
                    <Popconfirm key="delete"  title="你确定删除该题所有关联逻辑?" onConfirm={() => this.onSubmit()}><Button type="danger" icon="delete">删除关联逻辑</Button></Popconfirm>,
                    <Button key="submit" type="primary" icon="check-circle-o" onClick={this.onSubmit}>确定</Button>,
                ]}
            >
                <Row className="jumpModal">
                    <Col span={24} className="jumpHeader">
                        <h2>当前题目：{index}、{record.questionName}</h2>
                    </Col>
                    <Col span={24} className="jumpContent">
                        <Form className="connContent">
                            {formItems}
                            {keys.length > 1 ?
                                <FormItem
                                    labelCol={{span: 4}}
                                    wrapperCol={{span: 20}}
                                    label={'关联多题时'}
                                    required={false}
                                    key={index}
                                >
                                    {getFieldDecorator('andOr', {
                                        initialValue: '0',
                                    })(
                                        <RadioGroup>
                                            多题之间 <Radio value="0">为“且”的关系(必须满足所有关联条件)</Radio>
                                                    <Radio value="1">为“或”的关系(满足一个关联条件即可)</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                : ''
                            }
                            <FormItem style={{ textAlign: 'center' }}>
                                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                    <Icon type="plus" /> 添加更多关联题
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}
