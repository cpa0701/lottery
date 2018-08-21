import React from 'react';
import { Row, Col, Button, Input, message } from "antd"

import InitQuestionList from './InitQuestionList'
import QuestionLib from './QuestionLib'
import ConnModal from './ConnModal';
import JumpModal from './JumpModal';

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"

import './questionApplication.less'


const { TextArea } = Input;

class QuestionEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionDisplayList: [],
            questionDisplayList1: [],
            logic: [
                {
                    "actType": 0,
                    "andOr": 0,
                    "isMain": 0,
                    "logicType": "01",
                    "optionOrder": "2",
                    "setupQuestionOrder": 2,
                    "skiptoQuestionOrder": 4
                },
                {
                    "actType": 0,
                    "andOr": 0,
                    "isMain": 0,
                    "logicType": "01",
                    "optionOrder": "3",
                    "setupQuestionOrder": 2,
                    "skiptoQuestionOrder": 6
                },
                {
                    "actType": 0,
                    "andOr": 0,
                    "isMain": 1,
                    "logicType": "00",
                    "optionOrder": "1,2",
                    "setupQuestionOrder": 2,
                    "skiptoQuestionOrder": 5
                },
            ],
            otherQuestion: [
                {
                    questionOrder: '0',
                    questionName: "不跳转，按顺序填写下一题",
                },
                {
                    questionOrder: '-1',
                    questionName: "跳到问卷末尾结束作答",
                },
                {
                    questionOrder: '-2',
                    questionName: "直接提交为无效答卷",
                },
            ],
            record: {},
            connList: [],
            jumpList: [],
            index: undefined,
            value: '',
            radioValue: 0,
            conn: false,
            jump: false
        };
        this.getDom = this.getDom.bind(this);
        this.preview = this.preview.bind(this);
    }

    // 获取题库具体题目
    getDom = (data) => {
        this.state.questionDisplayList1.push(data);
        this.setState({questionDisplayList: [...this.state.questionDisplayList1]})
    };

    // 进入预览
    preview = () => {
        let id = Math.floor(Math.random() * 100);
        let path = {
            pathname: '/npsMgr/questionMgr/questionPreview',
            query: {id: id},
        };
        this.props.history.push('/npsMgr/questionMgr/questionPreview');
    };

    // 关联逻辑弹窗
    connModal = (show, props, i) => {
        if(i === 0) {
            message.info('第一题不能关联逻辑');
            return '';
        }
        if (show) {
            let _obj=JSON.stringify(this.state.questionDisplayList);
            let connList = JSON.parse(_obj);
            connList.length = i;
            // 过滤出非填空题
            connList = connList.filter(item => item.questionType === '01' || item.questionType === '02');
            if(connList.length === 0) {
                message.info('没有满足可设置关联逻辑的题');
                return '';
            }

            this.setState({
                conn: true,
                record: props,
                connList,
                index: i + 1
            });
        } else {
            this.setState({conn: false});
        }
    };

    // 跳转逻辑弹窗
    jumpModal = (show, props, i) => {
        if (show) {
            // 打开弹框前获取已存在的跳转逻辑关系并存入optionList
            let logicProp = this.state.logic.filter(item => item.setupQuestionOrder === props.questionOrder && item.logicType === '01');
            if(logicProp) {
                logicProp.map(item => {
                    let optionOrderArr = item.optionOrder.split(',');
                    props.optionList.map(k => {
                        optionOrderArr.map(x => {
                            if (String(k.optionOrder) === x) {
                                k.questionOrder = item.skiptoQuestionOrder
                            }
                            return '';
                        });
                        return '';
                    });
                    // 判断是否是无条件跳转
                    if(optionOrderArr.length === props.optionList.length) {
                        this.setState({radioValue: 1});
                    }
                    return '';
                });
            }

            // 获取本题后面所有的题目
            let _obj=JSON.stringify(this.state.questionDisplayList);
            let jumpList = JSON.parse(_obj).splice(i + 1).map((item, k) => {
                item.questionName = i + k + 2 + '、' + item.questionName;
                return item;
            });
            jumpList = [
                ...this.state.otherQuestion,
                ...jumpList
            ];
            // 判断是否是无条件跳转 单行，多行填空
            if (props.questionType === '03' || props.questionType === '04') {
                this.setState({radioValue: 1});
            }

            this.setState({
                jump: true,
                record: props,
                jumpList
            });
        } else {
            this.setState({ jump: false, radioValue: 0 });
        }
    };

    // 题目上移动作
    jumpUp = (i, props) => {
        if (i === 0) {
            message.info("当前位置不可上移");
            return '';
        } else {
            let questionDisplayList2 = this.state.questionDisplayList;
            questionDisplayList2.splice(i - 1, 0, props);
            questionDisplayList2.splice(i + 1, 1);
            this.setState({
                questionDisplayList: [...questionDisplayList2]
            })
        }

    };
    // 题目下移动作
    jumpDown = (i, props) => {
        let questionDisplayList2 = this.state.questionDisplayList;
        if (i === questionDisplayList2.length - 1) {
            message.info("当前位置不可下移")
        } else {
            questionDisplayList2.splice(i + 2, 0, props);
            questionDisplayList2.splice(i, 1);
            this.setState({
                questionDisplayList: [...questionDisplayList2]
            })
        }
    };

    render() {
        const { questionDisplayList, conn, jump, record, index, connList, jumpList, radioValue } = this.state;

        // 关联弹窗
        const connModalProps = {
            conn,
            index,
            record,
            connList,
            onClose: () => {
                this.connModal(false);
            },
        };
        // 跳转弹窗
        const jumpModalProps = {
            jump,
            record,
            jumpList,
            radioValue,
            onClose: () => {
                this.jumpModal(false);
            },
            onCreate: (value) => {
                let logic = [
                    ...this.state.logic,
                    ...value
                ];
                console.log('qqq', logic);
                this.setState({
                    logic
                }, () => {
                    message.success('编辑成功');
                    this.jumpModal(false);
                });
            },
            onChange: (e) => {
                this.setState({radioValue: e.target.value});
            }
        };

        return (
            <div className={'questionApplication'}>
                <Row className={'questionAppHead'}>
                    <Col span={12} offset={8}>
                        <Button type="primary">完成编辑</Button>
                        <Button type="primary" icon="eye-o" onClick={this.preview} style={{marginLeft: '16px'}}>预览</Button>
                        <Button style={{float: 'right'}}>分页</Button>
                    </Col>
                </Row>
                <Row className={'height'}>
                    <Col style={{height: "100%", overflow: "auto"}} span={8}>
                        <QuestionLib getDom={this.getDom}/>
                    </Col>
                    <Col span={15} offset={1} style={{ height: '100%' }}>
                        <div className={'questionAppContent'}>
                            <div className={'questionAppContentTitle'}>
                                <Input className={'questionInput'} placeholder="标题"/>
                                <TextArea className={"surveyDescription"} placeholder="添加问卷说明" autosize={{ minRows: 1}}/>
                            </div>
                            <div className={"question"}>
                                <div className={"div_preview"}>
                                    <span className={"div_topic_page_question paging-bg"}>]<span>第1页/共2页</span>[</span>
                                    <span className={"line_as_hr"}/>
                                </div>
                            </div>
                            {questionDisplayList.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <InitQuestionList questionType={item.questionType} questionOrder={item.questionOrder}
                                                          index={i + 1} questionName={item.questionName} optionList={item.optionList}/>
                                        <div className="link-group">
                                            <a href="javascript:void(0);"
                                               onClick={() => this.connModal(true, item, i)}>关联逻辑</a>
                                            <a href="javascript:void(0);"
                                               onClick={() => this.jumpModal(true, item, i)}>跳转逻辑</a>
                                            <a href="javascript:void(0);"
                                               onClick={() => this.jumpUp(i, item)}>上移</a>
                                            <a href="javascript:void(0);"
                                               onClick={() => this.jumpDown(i, item)}>下移</a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </Col>
                </Row>
                <ConnModal {...connModalProps}/>
                <JumpModal {...jumpModalProps}/>
            </div>
        )
    }
}

export default QuestionEdit;
