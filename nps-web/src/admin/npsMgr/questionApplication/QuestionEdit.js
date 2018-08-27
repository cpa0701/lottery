import React from 'react';
import { Row, Col, Button, Input, message, Popconfirm } from "antd"

import InitQuestionList from './InitQuestionList'
import QuestionLib from './QuestionLib'
import ConnModal from './ConnModal';
import JumpModal from './JumpModal';

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"

import './questionApplication.less'
const { TextArea } = Input;
let page = 1;

class QuestionEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionDisplayList: [],
            questionDisplayList1: [],
            logic: [], // 逻辑表
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
            record: {}, // 当前设置逻辑的题
            connList: [], // 可设置关联的题
            jumpList: [], // 可设置跳转的题
            questions: [], // 存已存在逻辑的题
            keyS: [], // 对应已存在逻辑的key
            andOr: 0,
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
        if(this.state.questionDisplayList.filter(item => item.questionOrder === data.questionOrder).length === 0) {
            let arr = JSON.stringify(this.state.questionDisplayList1);
            let newArr = JSON.parse(arr);
            if(newArr.length === 0) {
                this.state.questionDisplayList1.push({...data, number: null, isBlank: 0, isPaging: '0'});
                this.orderQuestion();
                this.setState({questionDisplayList: [...this.state.questionDisplayList1]})
            } else {
                if(newArr[newArr.length - 1].isPaging === '1') {
                    newArr[newArr.length - 1].questionOrder = data.questionOrder
                }
                this.setState({
                    questionDisplayList1: [...newArr]
                }, () => {
                    this.state.questionDisplayList1.push({...data, number: null, isBlank: 0, isPaging: '0'});
                    this.orderQuestion();
                    this.setState({questionDisplayList: [...this.state.questionDisplayList1]},() =>{
                        console.log('mmm',this.state.questionDisplayList)
                    })
                });
            }
        } else {
            message.info('该题已存在问卷中，且不可重复');
        }
    };

    // 对获取的题进行排序
    orderQuestion = () => {
        let newArr = this.state.questionDisplayList1.filter(item => item.isPaging === '0');
        newArr.map((item, k) => {
            this.state.questionDisplayList1.map(x => {
                if(item.questionOrder === x.questionOrder && x.isPaging === '0') {
                    x.number = k;
                }
                return '';
            });
            return '';
        })
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
            // 打开弹框前获取已存在的关联逻辑关系并存入questions
            let questions = [], arr = [], keyS = [], andOr = 0;

            let logicProp = this.state.logic.filter(item => item.skiptoQuestionOrder === props.questionOrder && item.logicType === '00');
            if(logicProp) {
                logicProp.map(item => {
                    andOr = item.andOr;
                    arr = this.state.questionDisplayList.filter(k => k.questionOrder === item.setupQuestionOrder);
                    if(arr) {
                        if(arr[0].questionType === '01') {
                            arr[0] = {
                                ...arr[0],
                                value: Number(item.optionOrder)
                            };

                            arr[0].optionList.map(x => {
                                if(x.optionOrder === Number(item.optionOrder)) {
                                    x.checked = true;
                                } else {
                                    x.checked = false;
                                }
                                return '';
                            })
                        } else if(arr[0].questionType === '02') {
                            let checkOption = item.optionOrder.split(',');
                            if(checkOption) {
                                checkOption.map(y => {
                                    arr[0].optionList.map(x => {
                                        if(x.optionOrder === Number(y)) {
                                            x.checked = true;
                                        }
                                        return '';
                                    });
                                    return '';
                                })
                            }
                        }
                    }
                    questions.push(...arr);
                    return '';
                });
            }
            questions = questions.map((item, k) => {
                item = {
                    ...item,
                    index: k,
                    isLib: true,
                    questionName: item.questionOrder + '、' + item.questionName
                };
                return item;
            });
            keyS = questions.map((item, k) => {
                return k;
            });

            let _obj = JSON.stringify(this.state.questionDisplayList);
            let connList = JSON.parse(_obj).splice(0, i).map((item, k) => {
                item.questionName = k + 1 + '、' + item.questionName;
                return item;
            });

            // 过滤出非填空题
            connList = connList.filter(item => item.questionType === '01' || item.questionType === '02');
            if(connList.length === 0) {
                message.info('没有满足可设置关联逻辑的题');
                return '';
            }

            this.setState({
                questions,
                keyS,
                conn: true,
                record: props,
                connList,
                andOr,
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
                jumpList,

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
    // 删除题目
    delQestion = (props) => {
        let newQuestionList = this.state.questionDisplayList.filter(item => item.questionOrder !== props.questionOrder);
        this.setState({
            questionDisplayList: [...newQuestionList],
            questionDisplayList1: [...newQuestionList]
        }, () => {
            this.delLogic(props.questionOrder, 1);
            message.info('删除成功')
        });

    };
    // 删除与题目有关的所有逻辑
    delLogic = (order, type) => {
        let newLogic = [];
        if(Number(type) === 0) { // 删除所有与该题有关的关联逻辑
            newLogic = this.state.logic.filter(item => item.logicType === '01' || (item.logicType === '00' && item.skiptoQuestionOrder !== order));
            this.setState({
                questions: [], // 存已存在逻辑的题
                keyS: [], // 对应已存在逻辑的key
                andOr: 0,
                logic: [...newLogic]
            });
        } else if (Number(type) === 1) { // 删除所有与该题有关的逻辑(关联、跳转)
            newLogic = this.state.logic.filter(item => item.setupQuestionOrder !== order && item.skiptoQuestionOrder !== order);
            this.setState({
                logic: [...newLogic]
            });
        }

    };

    // 添加分页
    addPagination = () => {
        let param = {
            "contentCheck": "",
            "createTime": "当前时间",
            "createUid": 20,
            "isBlank": 0,
            "isCommon": "",
            "isNps": "",
            "isPaging": "1",//分页数据
            "isSatisfied": "",
            "lenthCheck": "",
            "optionLayout": "",
            "optionList":"",
            "questionCategory": "",
            "questionName": "",
            "questionName2": "",
            "questionOrder": null,
            "questionType": "00",
            "status": ""
        };
        this.state.questionDisplayList1.push(param);
        this.setState({questionDisplayList: [...this.state.questionDisplayList1]})
    };

    render() {
        const { questionDisplayList, conn, jump, record, index, connList, jumpList, radioValue, logic, questions, keyS, andOr } = this.state;
        // 关联弹窗
        const connModalProps = {
            conn,
            andOr,
            index,
            keyS,
            questions,
            record,
            connList,
            delConnLogic: this.delLogic,
            onClose: () => {
                this.connModal(false);
                this.setState({
                    questions: [], // 存已存在逻辑的题
                    keyS: [], // 对应已存在逻辑的key
                    andOr: null
                });
            },
            onCreate: (value) => {
                let newLogic = this.state.logic.filter(item => item.logicType === '01' || (item.logicType === '00' && item.skiptoQuestionOrder !== record.questionOrder));
                let logic = [
                    ...newLogic,
                    ...value
                ];
                this.setState({
                    logic,
                    questions: [], // 存已存在逻辑的题
                    keyS: [], // 对应已存在逻辑的key
                    record: {}, // 当前设置逻辑的题
                    connList: [], // 可设置关联的题
                    andOr: null
                }, () => {
                    message.success('编辑成功');
                    this.connModal(false);
                });
            },
            changeQuestion: (arr) => {
                this.setState({
                    questions: [...arr]
                });
            }
        };
        // 跳转弹窗
        const jumpModalProps = {
            jump,
            record,
            jumpList,
            radioValue,
            logic,
            onClose: () => {
                this.jumpModal(false);
            },
            onCreate: (value) => {
                let logic = [
                    ...this.state.logic,
                    ...value
                ];
                this.setState({
                    logic,
                    record: {}, // 当前设置逻辑的题
                    jumpList: [], // 可设置跳转的题
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
                        <Button style={{float: 'right'}} onClick={() => this.addPagination()}>分页</Button>
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
                            {questionDisplayList.map((item, i) => {
                                return (
                                    item.isPaging === '0' ?
                                        <div key={i}>
                                            <InitQuestionList questionType={item.questionType} questionOrder={item.questionOrder}
                                                              index={item.number + 1} questionName={item.questionName} optionList={item.optionList}/>
                                            <div className="link-group">
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.connModal(true, item, i)}>关联逻辑</a>
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.jumpModal(true, item, i)}>跳转逻辑</a>
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.jumpUp(i, item)}>上移</a>
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.jumpDown(i, item)}>下移</a>
                                                <Popconfirm key="delete"  title="你确定删除该题及与该题有关的所有逻辑?" onConfirm={() => this.delQestion(item)}>
                                                    <a href="javascript:void(0);">删除</a>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                        :  <div key={i} className="questionStyle">
                                            <div className={"question"}>
                                                <div className={"div_preview"}>
                                                    <span className={"div_topic_page_question paging-bg"}>]<span>第1页</span>[</span>
                                                    <span className={"line_as_hr"}/>
                                                </div>
                                            </div>
                                            {i !== 0 ?
                                            <div className="link-group">
                                                <a href="javascript:void(0);" onClick={() => this.jumpUp(i, item)}>上移</a>
                                                <a href="javascript:void(0);" onClick={() => this.jumpDown(i, item)}>下移</a>
                                                <a href="javascript:void(0);" onClick={() => this.delQestion(item)}>删除</a>
                                            </div>
                                        : ''}
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
