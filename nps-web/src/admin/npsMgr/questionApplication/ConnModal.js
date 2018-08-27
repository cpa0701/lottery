import React, { Component } from 'react';
import { Modal, Form, Select, Button, Row, Col, Radio, Icon, Popconfirm,message } from 'antd';

import InitQuestionList from './InitQuestionList';

import './questionApplication.less';

const [FormItem, Option, RadioGroup] = [Form.Item, Select.Option, Radio.Group];

let uuid = 1;
@Form.create()
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [{}],
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.questions.length !== 0 && nextProps.questions) {
            this.setState({
                questions: [...nextProps.questions]
            });
        }
    }

    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return '';
            }
            let record = this.props.record, logicArr = [], _Obj = {};
            this.state.questions.map(item => {
                if(item.questionType === '01') { // 单选处理
                    _Obj = {
                        "actType": 0,
                        "andOr": values.andOr ? Number(values.andOr) : 0,
                        "isMain": 0,
                        "logicType": "00",
                        "optionOrder": String(item.value),
                        "setupQuestionOrder": item.questionOrder,
                        "skiptoQuestionOrder": record.questionOrder
                    };
                    logicArr.push(_Obj);
                } else if (item.questionType === '02') { // 多选处理
                    let optionChecked = item.optionList.filter(item => item.checked === true);
                    let optionOrder = optionChecked.map(item => {
                        return item.optionOrder;
                    }).join(',');
                    _Obj = {
                        "actType": 0,
                        "andOr": values.andOr ? Number(values.andOr) : 0,
                        "isMain": 0,
                        "logicType": "00",
                        "optionOrder": optionOrder,
                        "setupQuestionOrder": item.questionOrder,
                        "skiptoQuestionOrder": record.questionOrder
                    };
                    logicArr.push(_Obj);
                }
                return '';
            });
            this.props.onCreate(logicArr)
        });
    };

    afterClose = () => {
        this.setState({
            questions: [{}],
        });
        this.props.form.resetFields();
    };

    handleChange = (value, record) => {
        if(this.state.questions.filter(item => item.questionOrder === value).length === 0) {
            let question = this.props.connList.filter(item => item.questionOrder === value)[0];
            if (question.optionList) {
                question.optionList.map(k => {
                    k.checked = false;
                    return '';
                });
            }

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
        let arr = JSON.stringify(this.state.questions);
        let newQuestions = JSON.parse(arr).splice(index, 1);
        this.props.changeQuestion(newQuestions);
    };

    // 删除关联逻辑
    delConnLogic = (order, type) => {
        this.props.delConnLogic(order, type);
        this.setState({
            questions: [{}]
        }, () => {
            message.info('删除成功');
        });
    };

    // 单选框值改变
    onRadioChange = (e) => {
        this.state.questions.map(item => {
            if(item.questionOrder === e.target.questionIndex) {
                item.optionList.map(k => {
                    if (k.optionOrder === e.target.value) {
                        k.checked = e.target.checked;
                        item.value = k.optionOrder;
                    } else {
                        k.checked = false;
                    }
                    return '';
                })
            }
            return '';
        });
        this.setState({
            questions: [...this.state.questions]
        },() => {
            console.log('a',this.state.questions)
        });
    };
    // 复选框值改变
    onCheckBoxChange = (e) => {
        this.state.questions.map(item => {
            if(item.questionOrder === e.target.questionIndex) {
                item.optionList.map(k => {
                    if(k.optionOrder === e.target.value) {
                        k.checked = e.target.checked;
                    }
                    return '';
                })
            }
            return '';
        });
        this.setState({
            questions: [...this.state.questions]
        },() => {
            console.log('b',this.state.questions)
        });
    };

    render() {
        const { conn, index, record, connList, keyS, andOr, form: { getFieldDecorator, getFieldValue } } = this.props;
        const { questions } = this.state;

        const optionList = connList.map((item) => {
            return  <Option key={item.questionOrder} value={item.questionOrder}>{item.questionName}</Option>
        });
        getFieldDecorator('keys', keyS.length !== 0 ? {initialValue: [...keyS]} : {initialValue: [0]});
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
                                    <InitQuestionList
                                        index={ questions[k].questionOrder }
                                        key={questions[k].questionOrder}
                                        value={questions[k].value ? questions[k].value : undefined}
                                        questionType={questions[k].questionType}
                                        questionOrder={questions[k].questionOrder}
                                        questionName={questions[k].questionName.split('、')[1]}
                                        optionList={questions[k].optionList}
                                        onRadioChange={this.onRadioChange}
                                        onCheckBoxChange={this.onCheckBoxChange}
                                    />
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
                maskClosable={false}
                visible={conn}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
                footer={[
                    <Popconfirm key="delete"  title="你确定删除该题所有关联逻辑?" onConfirm={() => this.delConnLogic(record.questionOrder, 0)}><Button type="danger" icon="delete">删除关联逻辑</Button></Popconfirm>,
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
                                        initialValue: andOr ? String(andOr) : '0',
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
