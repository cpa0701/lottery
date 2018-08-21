import React, { Component } from 'react';
import { Modal, Form, Select, Button, Row, Col, Radio, Icon, Popconfirm } from 'antd';

import InitQuestionList from './InitQuestionList';

import './questionApplication.less';

const [FormItem, Option, RadioGroup] = [Form.Item, Select.Option, Radio.Group];

let uuid = 0;
@Form.create()
export default class extends Component {
    state = {
        value:0,
        question:[],
    };

    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }

        });
        this.props.onClose()
    };

    afterClose = () => this.props.form.resetFields();

    handleChange=(value)=>{
        let question = this.props.connList.filter(item => item.questionId === value);
        this.setState({
            value: 1,
            question,
        });
    };

    // 新增关联题选框
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    // 删除关联题选框
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    render() {
        const { conn, index, record, connList, form: { getFieldDecorator, getFieldValue } } = this.props;

        const optionList = connList.map((item) => {
            return  <Option key={item.questionId} value={item.questionId}>{item.questionName}</Option>
        });

        getFieldDecorator('keys', { initialValue: [1] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <div>
                    <FormItem
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        label={`关联题目${index + 1}`}
                        required={false}
                        key={index}
                    >
                        {getFieldDecorator(`question[${k}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            onChange: this.handleChange
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
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </FormItem>
                    <div style={{ padding: '0 60px', marginBottom: '10px'}}>{(this.state.value===1) ?
                        <div>
                            当关联题目{ index + 1 } 选择下面的选项<br/>
                            {this.state.question.map((item, i) => {
                                return(
                                    <InitQuestionList questionType={item.questionType} questionId={item.questionId} key={item.questionId} index={i+1} questionName={item.questionName} optionList={item.optionList}/>
                                )})}
                            中的任意一个时，"当前题目"才出现
                        </div> : ''}
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
                    <Popconfirm title="你确定删除该题所有关联逻辑?" onConfirm=""><Button key="cancel" type="danger" icon="delete">删除关联逻辑</Button></Popconfirm>,
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
                            {this.state.value ?
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
