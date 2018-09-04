import React from 'react';
import { Row, Col, Button, Input, message, Popconfirm, Checkbox, Form, TreeSelect, } from "antd";

import InitQuestionList from './InitQuestionList';
import QuestionLib from './QuestionLib';
import ConnModal from './ConnModal';
import JumpModal from './JumpModal';

import QuestionApplicationService from "../../../services/question/QuestionApplicationService";

import './questionApplication.less';

const { TextArea } = Input;
const [FormItem] = [Form.Item];

const treeData = [
    {
        title: '终端',
        value: '1',
        key: '0-0',
    }, {
        title: '套餐',
        value: '2',
        key: '0-1',
    },{
        title: '流量',
        value: '3',
        key: '0-3',
    }, {
        title: '账单',
        value: '4',
        key: '0-4',
    }, {
        title: '其它',
        value: '5',
        key: '0-5',
    }];
@Form.create()
class QuestionEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionDisplayList: [],
            questionDisplayList1: [],
            logic: [], // 逻辑表
            qstnaireTitle: '',
            qstnaireLeadin: '',
            belongTo: null,
            qstnaireId: null,
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
            keyS: [0], // 对应已存在逻辑的key
            catalogId: null,
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

    componentDidMount() {
        let id = this.props.match.params.id;
        if (id !== "666") {
            this.setState({
                loading: true
            }, () => QuestionApplicationService.getQstnaireById({qstnaireId: id}).then(result => {
                if(result) {
                    let question = result.question.map(item => {
                        let param = {...item};
                       if(item.isPaging === 1) {
                           param = {...item, pageNum: null};
                       }
                        if(item.isPaging === 0) {
                            param = {...item, jumpOrder: null};
                        }
                       return param;
                    });
                    this.setState({
                        questionDisplayList: question,
                        questionDisplayList1: question,
                        qstnaireTitle: result.qstnaireTitle,
                        qstnaireLeadin: result.qstnaireLeadin,
                        qstnaireId: result.qstnaireId,
                        catalogId: result.catalogId,
                        belongTo: result.belongTo,
                        logic: result.logic,
                        loading: false
                    }, () => {
                        this.orderPageNum();
                        this.questionLogicInfo();
                    });
                }
            }))
        }
    }

    // 获取题库具体题目
    getDom = (data) => {
        let questionData = data.question;
        let qstList = this.state.questionDisplayList1;
        let params = {
            ...questionData,
            questionOrder: 1,
            isBlank: 0,
            isPaging: 0,
            isCommon: 0,
            createUid: 200,
            createTime: '',
            jumpOrder: null
        };

        // if(qstList.filter(item => item.questionId === questionData.questionId).length === 0) {
            if(qstList.length === 0) {
                params = {...params};
            } else if(qstList.length === 1) {
                if(qstList[0].isPaging === 1) {
                    qstList[0].questionOrder = 1;
                    params = {...params};
                } else {
                    params = {...params, questionOrder: 2};
                }
            } else {
                if(qstList[qstList.length - 1].isPaging === 1) {
                    qstList[qstList.length - 1].questionOrder = qstList[qstList.length - 2].questionOrder + 1;
                    params = {
                        ...params,
                        questionOrder: qstList[qstList.length - 2].questionOrder + 1
                    };
                } else {
                    params = {
                        ...params,
                        questionOrder: qstList[qstList.length - 1].questionOrder + 1
                    };
                }
            }
            qstList.push(params);
            console.log(qstList);
            this.setState({
                questionDisplayList: [...qstList]
            })
        // } else {
        //     message.info('该题已存在问卷中，且不可重复');
        // }
    };

    // 对获取的题进行排序
    // orderQuestion = () => {
    //     let newArr = this.state.questionDisplayList1.filter(item => item.isPaging === 0);
    //     newArr.map((item, k) => {
    //         this.state.questionDisplayList1.map(x => {
    //             if(item.questionId === x.questionId && x.isPaging === 0) {
    //                 x.questionOrder = k + 1;
    //             }
    //             return '';
    //         });
    //         return '';
    //     });
    //     this.setState({questionDisplayList: [...this.state.questionDisplayList1]});
    // };

    orderQuestion = () => {
        let qstNewArr = this.state.questionDisplayList1.filter(item => item.isPaging === 0);
        let pageNewArr = this.state.questionDisplayList1.filter(item => item.isPaging === 1);
        let newArr = [];
        qstNewArr.map((item, k) => {
            item.questionOrder = k + 1;
            return '';
        });
        newArr.push(...qstNewArr);
        console.log('3',newArr)
        if(pageNewArr.length > 0) {
            pageNewArr.map(item => {
                qstNewArr.map((x, k) => {
                    if(item.questionOrder === x.questionOrder) {
                        newArr.splice(k - 1, 0, item);
                    }
                    return '';
                });
                if(item.questionOrder === null) newArr.push(item);
                return '';
            });
        }

        console.log('4',newArr)
        this.setState({
            questionDisplayList: [...newArr],
            questionDisplayList1: [...newArr]
        });

    };

    // 对分页栏进行排序
    orderPageNum = () => {
        let newArr = this.state.questionDisplayList1.filter(item => item.isPaging === 1);
        newArr.map((item, k) => {
            this.state.questionDisplayList1.map(x => {
                if(item.questionOrder === x.questionOrder && x.isPaging === 1) {
                    x.pageNum = k + 1;
                }
                return '';
            });
            return '';
        });
        this.setState({questionDisplayList: [...this.state.questionDisplayList1], belongTo: newArr.length});
    };
    // 勾选必填项
    onChangeCheckbox = (e, i) => {
        this.state.questionDisplayList1.map((item, k) => {
            if(Number(i) === k) {
                item.isBlank = e.target.checked ? 0 : 1;
            }
            return '';
        });
        this.setState({
            questionDisplayList: [...this.state.questionDisplayList1]
        })
    };

    // 问卷标题
    qstnaireTitle = (e) => {
        this.setState({
            qstnaireTitle: e.target.value
        });
    };
    // 问卷描述
    qstnaireDes = (e) => {
        this.setState({
            qstnaireLeadin: e.target.value
        });
    };

    // 进入预览
    preview = () => {
        if(this.state.questionDisplayList.length === 0 ||
            this.state.qstnaireTitle === '' ||
            this.state.qstnaireLeadin === ''
            // || this.state.catalogId === null
           ) {
            message.info("请优先完善问卷内容");
            return '';
        }
        let belongTo = this.state.belongTo;
        if (this.state.questionDisplayList[this.state.questionDisplayList.length - 1].isPaging === 0) {
            belongTo += 1
        }
        // let catalogId = Number(this.props.form.getFieldValue('catalogId'));
        let catalogId = 1;
        let params = {
            belongTo,
            catalogId,
            qstnaireTitle: this.state.qstnaireTitle,
            qstnaireLeadin: this.state.qstnaireLeadin,
            question: this.state.questionDisplayList,
            logic: this.state.logic
        };
        if (this.state.qstnaireId) {
            QuestionApplicationService.editQstnaire({...params, qstnaireId: this.state.qstnaireId}).then(data => {
                if(data.qstnaireId) {
                    let params = {id:data.qstnaireId,type:'preview'};
                    params = JSON.stringify(params);
                    this.props.history.push(`/npsMgr/questionMgr/questionPreview/${params}`);
                }
            });
        } else {
            QuestionApplicationService.addQstnaireBank(params).then(data => {
                if (data.qstnaireId) {
                    let params = {id:data.qstnaireId,type:'preview'};
                    params = JSON.stringify(params);
                    this.props.history.push(`/npsMgr/questionMgr/questionPreview/${params}`);
                }
            });
        }
    };

    // 题目逻辑提示
    questionLogicInfo = () => {
        let logic = this.state.logic, questions = this.state.questionDisplayList1, newArr = [];
        questions.map(item => {
            if(item.optionList) {
                let obj = item.optionList.map(k => {
                    return {...k, describe: null}
                });
                item.optionList = [...obj];
            }
            item.jumpDescribe = null;
            item.connDescribe = null;
            item.jumpOrder = null;
            return '';
        });

        newArr = questions.map(k => {
            let param = {...k};
            logic.map(item => {
                if (item.logicType === '01' && item.setupQuestionOrder === k.questionOrder) {
                    if (k.questionType === '01') {
                        let arr = item.optionOrder.split(',');
                        if (arr.length === k.optionList.length) {
                            param = {
                                ...k,
                                jumpDescribe: '此题设置了跳转逻辑(跳转到第' + item.skiptoQuestionOrder + '题)'
                            }
                        } else {
                            k.optionList.map(x => {
                               if(x.optionOrder === Number(item.optionOrder)) {
                                   x.describe =  '跳转到第' + item.skiptoQuestionOrder + '题';
                               }
                               return '';
                            });
                            param = {
                                ...k,
                                jumpDescribe: '此题设置了跳转逻辑'
                            }
                        }
                    } else {
                        param = {
                            ...k,
                            jumpDescribe: '此题设置了跳转逻辑(跳转到第' + item.skiptoQuestionOrder + '题)'
                        }
                    }
                } else if (item.logicType === '00' && item.skiptoQuestionOrder === k.questionOrder) {
                    param = {
                        ...k,
                        connDescribe: k.connDescribe ? k.connDescribe + '，第' + item.setupQuestionOrder + '题的第' + item.optionOrder + '个选项'
                            : '依赖于第' + item.setupQuestionOrder + '题的第' + item.optionOrder + '个选项'
                    };
                    k.connDescribe = k.connDescribe ? k.connDescribe + '，第' + item.setupQuestionOrder + '题的第' + item.optionOrder + '个选项'
                        : '依赖于第' + item.setupQuestionOrder + '题的第' + item.optionOrder + '个选项';
                }
                return '';
            });
            return param;
        });
        this.setState({
            questionDisplayList1: [...newArr],
            questionDisplayList: [...newArr]
        })
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
                item.questionName = item.questionOrder + '、' + item.questionName;
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
                keyS: keyS ? keyS : [0],
                conn: true,
                record: props,
                connList,
                andOr,
            });
        } else {
            this.setState({conn: false});
        }
    };

    // 跳转逻辑弹窗
    jumpModal = (show, props, i) => {
        if (show) {
            // 清空之前编辑的逻辑
            props.optionList.map(item => {
                item.questionOrder = null;
                return '';
            });

            // 打开弹框前获取已存在的跳转逻辑关系并存入optionList
            let logicProp = this.state.logic.filter(item => item.setupQuestionOrder === props.questionOrder && item.logicType === '01');
            if(logicProp) {
                logicProp.map(item => {
                    let optionOrderArr = item.optionOrder.split(',');
                    // 判断是否是无条件跳转
                    if(optionOrderArr.length === props.optionList.length) {
                        props.jumpOrder = item.skiptoQuestionOrder;
                        this.setState({radioValue: 1});
                    } else {
                        props.jumpOrder = null;
                    }
                    props.optionList.map(k => {
                        optionOrderArr.map(x => {
                            if (String(k.optionOrder) === x) {
                                k.questionOrder = item.skiptoQuestionOrder
                            }
                            return '';
                        });
                        return '';
                    });
                    return '';
                });
            } else {
                props.jumpOrder = null;
                if(props.optionList) {
                    props.optionList.map(item => {
                        item.questionOrder = null;
                        return '';
                    })
                }
            }

            // 获取本题后面所有的题目
            let _obj=JSON.stringify(this.state.questionDisplayList);
            let arr = JSON.parse(_obj).splice(i + 1).filter(item => item.isPaging !== 1);
            let jumpList = arr.map((item, k) => {
                item.questionName = item.questionOrder + '、' + item.questionName;
                return item;
            });
            jumpList = [
                ...this.state.otherQuestion,
                ...jumpList
            ];
            // 判断是否是无条件跳转 多选，单行，多行填空
            if (props.questionType === '02' || props.questionType === '03' || props.questionType === '04') {
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

    // 题目、页码上移动作
    jumpUp = (i, props, type) => {
        if (i === 0) {
            message.info("当前位置不可上移");
            return '';
        } else {
            let questionDisplayList2 = this.state.questionDisplayList1;
            if (type === 'pageNum') { // 上移分页
                if (i === 1) {
                    questionDisplayList2[i].questionOrder = questionDisplayList2[i - 1].questionOrder;
                } else {
                    if (questionDisplayList2[i - 2].isPaging === 1) {
                        message.info('当前页码位置不可继续上移');
                        return '';
                    }
                    questionDisplayList2[i].questionOrder = questionDisplayList2[i - 1].questionOrder;
                }
            } else if (type === 'question') { // 上移题目
                if (i > 0 && i < questionDisplayList2.length - 1 && questionDisplayList2[i - 1].isPaging === 1 && questionDisplayList2[i + 1].isPaging === 1) {
                    message.info('当前题目位置不可上移');
                    return '';
                } else if (i > 0 && i < questionDisplayList2.length - 1  && questionDisplayList2[i - 1].isPaging === 1) {
                    if (i === questionDisplayList2.length - 1) {
                        questionDisplayList2[i - 1].questionOrder = null;
                    }
                    questionDisplayList2[i - 1].questionOrder = questionDisplayList2[i + 1].questionOrder;
                } else if (i > 0  && questionDisplayList2[i - 1].isPaging === 0) { // 如果上一题是题目，将清除本题及上一题所有逻辑
                    this.delLogic(props.questionOrder, 1);
                    this.delLogic(questionDisplayList2[i - 1].questionOrder, 1);
                    this.questionLogicInfo();
                }
            }
            questionDisplayList2.splice(i - 1, 0, props);
            questionDisplayList2.splice(i + 1, 1);
            this.orderQuestion();
        }

    };
    // 题目、页码下移动作
    jumpDown = (i, props, type) => {
        let questionDisplayList2 = this.state.questionDisplayList1;
        if (i === questionDisplayList2.length - 1) {
            message.info("当前位置不可下移")
        } else {
            if (type === 'pageNum') { // 下移分页
                if (i < questionDisplayList2.length - 2) {
                    if(questionDisplayList2[i + 2].isPaging === 1) {
                        message.info('当前页码位置不可继续下移');
                        return '';
                    }
                    questionDisplayList2[i].questionOrder = questionDisplayList2[i + 2].questionOrder;
                } else {
                    questionDisplayList2[i].questionOrder = null;
                }
            } else if (type === 'question') { // 下移题目
                if (i > 0 && questionDisplayList2[i - 1].isPaging === 1 && questionDisplayList2[i + 1].isPaging === 1) {
                    message.info('当前题目位置不可下移');
                    return '';
                } else if (i > 0 && questionDisplayList2[i - 1].isPaging === 1) {
                    questionDisplayList2[i - 1].questionOrder = questionDisplayList2[i + 1].questionOrder;
                    this.delLogic(props.questionOrder, 1);
                    this.delLogic(questionDisplayList2[i + 1].questionOrder, 1);
                    this.questionLogicInfo();
                } else if (questionDisplayList2[i + 1].isPaging === 1) {
                    questionDisplayList2[i + 1].questionOrder = questionDisplayList2[i].questionOrder;
                }
            }
            questionDisplayList2.splice(i + 2, 0, props);
            questionDisplayList2.splice(i, 1);
            this.orderQuestion();
        }
    };

    // 删除题目
    delQestion = (props, i, type) => {
        if (type === 'question' && this.state.questionDisplayList1.length > 1) {
            if(i === this.state.questionDisplayList1.length - 1) {
                if(this.state.questionDisplayList1[i - 1].isPaging === 1) {
                    this.state.questionDisplayList1[i - 1].questionOrder = null;
                }
            } else {
                this.state.questionDisplayList1.map((item, k) => {
                    if(item.isPaging === 1 && k > i) {
                        item.questionOrder = item.questionOrder - 1;
                    }
                    return '';
                })
            }
            this.setState({questionDisplayList: [...this.state.questionDisplayList1]});
        }

        this.state.questionDisplayList1.splice(i, 1);
        if (type === 'pageNum') {
            this.orderPageNum()
        }
        this.orderQuestion();
        this.delLogic(props.questionOrder, 1);
        this.questionLogicInfo();
        message.info('删除成功')
    };
    // 删除与题目有关的所有逻辑
    delLogic = (order, type) => {
        let newLogic = [];
        if(Number(type) === 0) { // 删除所有与该题有关的关联逻辑
            newLogic = this.state.logic.filter(item => item.logicType === '01' || (item.logicType === '00' && item.skiptoQuestionOrder !== order));
            this.setState({
                questions: [], // 存已存在逻辑的题
                keyS: [0], // 对应已存在逻辑的key
                andOr: 0,
                logic: [...newLogic]
            }, () => {
                this.questionLogicInfo();
            });
        } else if (Number(type) === 1) { // 删除所有与该题有关的逻辑(关联、跳转)
            newLogic = this.state.logic.filter(item => item.setupQuestionOrder !== order && item.skiptoQuestionOrder !== order);
            this.setState({
                logic: [...newLogic]
            }, () => {
                this.questionLogicInfo();
            });
        }
    };

    // 添加分页
    addPagination = () => {
        if (this.state.questionDisplayList1.length > 0 && this.state.questionDisplayList1[this.state.questionDisplayList1.length - 1].isPaging === 1) {
            message.info('当前不可添加分页');
            return '';
        }
        let param = {
            "pageNum": null,
            "contentCheck": "",
            "createTime": "当前时间",
            "createUid": 20,
            "isBlank": 0,
            "isCommon": 0,
            "isNps": 0,
            "isPaging": 1,//分页数据
            "isSatisfied": 0,
            "lenthCheck": "",
            "optionLayout": "",
            "optionList":"",
            "questionCategory": "",
            "questionName": "",
            "questionName2": "",
            "questionId": "cf7a7a35dec14c4bab5fa6a9b8bf3009",
            "questionOrder": null,
            "questionType": "00",
            "status": ""
        };
        this.state.questionDisplayList1.push(param);
        this.orderPageNum()
    };

    // 完成编辑
    save =() => {
        if(this.state.questionDisplayList.length === 0 ||
            this.state.qstnaireTitle === '' ||
            this.state.qstnaireLeadin === ''
            // || this.state.catalogId === null
        ) {
                message.info("请优先完善问卷内容");
                return '';
        }
        let belongTo = this.state.belongTo;
        if (this.state.questionDisplayList[this.state.questionDisplayList.length - 1].isPaging === 0) {
            belongTo += 1
        }
        // let catalogId = Number(this.props.form.getFieldValue('catalogId'));
        let catalogId = 1;
        let params = {
                belongTo,
                catalogId,
                qstnaireTitle: this.state.qstnaireTitle,
                qstnaireLeadin: this.state.qstnaireLeadin,
                question: this.state.questionDisplayList,
                logic: this.state.logic
        };
        if (this.state.qstnaireId) {
            QuestionApplicationService.editQstnaire({...params, qstnaireId: this.state.qstnaireId}).then(data => {
                message.success('编辑成功');
            this.props.history.push({pathname:'/npsMgr/questionMgr/questionApplication', state: {isFresh:true}})
            });
        } else {
            QuestionApplicationService.addQstnaireBank(params).then(data => {
                message.success('保存成功');
                this.props.history.push({pathname:'/npsMgr/questionMgr/questionApplication', state: {isFresh:true}})
            });
        }
    };

    render() {
        const {
            qstnaireTitle,
            qstnaireLeadin,
            questionDisplayList,
            conn,
            jump,
            record,
            connList,
            jumpList,
            radioValue,
            logic,
            questions,
            keyS,
            andOr,
            catalogId
        } = this.state;
        const { getFieldDecorator } = this.props.form;

        // 关联弹窗
        const connModalProps = {
            conn,
            andOr,
            keyS,
            questions,
            record,
            connList,
            delConnLogic: this.delLogic,
            onClose: () => {
                this.connModal(false);
                this.setState({
                    questions: [], // 存已存在逻辑的题
                    keyS: [0], // 对应已存在逻辑的key
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
                    keyS: [0], // 对应已存在逻辑的key
                    record: {}, // 当前设置逻辑的题
                    connList: [], // 可设置关联的题
                    andOr: null
                }, () => {
                    message.success('编辑成功');
                    this.questionLogicInfo();
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
            logic,
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
                this.setState({
                    logic,
                    record: {}, // 当前设置逻辑的题
                    jumpList: [], // 可设置跳转的题
                }, () => {
                    message.success('编辑成功');
                    this.questionLogicInfo();
                    this.jumpModal(false);
                });
            },
            onChange: (e) => {
                this.setState({radioValue: e.target.value});
            }
        };

        return (
            <div className={'questionApplication'}>
                {/*<Row className={'questionAppHead'}>*/}
                    {/*<Col span={12} offset={8}>*/}
                        {/*<Button type="primary" onClick={this.save}>完成编辑</Button>*/}
                        {/*<Button type="primary" icon="eye-o" onClick={this.preview} style={{marginLeft: '16px'}}>预览</Button>*/}
                        {/*<Button style={{float: 'right'}} onClick={() => this.addPagination()}>分页</Button>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                <Row className={'height'}>
                    <Col style={{height: "100%", minHeight: "480px"}} span={8}>
                        <QuestionLib getDom={this.getDom}/>
                    </Col>
                    <Col span={15} offset={1} style={{ height: '100%' }}>
                        <Row className={'questionAppHead'}>
                            <Col span={22} offset={1}>
                                <Form layout='inline' style={{textAlign: 'left', display: 'inline'}}>
                                    <FormItem label="问卷分类">
                                        {getFieldDecorator('catalogId', {
                                            initialValue: catalogId,
                                            rules: [{
                                                required: true,
                                                message: '请选择问卷分类',
                                            }],
                                        })(
                                            <TreeSelect
                                                style={{width: 150}}
                                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                                treeData={treeData}
                                                treeDefaultExpandAll
                                            />
                                        )}
                                    </FormItem>
                                </Form>
                                <Button type="primary" onClick={this.save}>完成编辑</Button>
                                <Popconfirm title="预览前将保存对当前问卷的所有操作，确定预览该问卷?" onConfirm={this.preview}>
                                    <Button type="primary">预览</Button>
                                </Popconfirm>
                                <Button style={{marginRight: '100px', marginLeft: '0'}} onClick={() => this.addPagination()}>分页</Button>
                            </Col>
                        </Row>
                        <div className={'questionAppContent'}>
                            <div className={'questionAppContentTitle'}>
                                <Input className={'questionInput'} defaultValue={qstnaireTitle} onBlur={(e) => this.qstnaireTitle(e)} placeholder="标题"/>
                                <Input className={"surveyDescription"} defaultValue={qstnaireLeadin} placeholder="添加问卷说明" onBlur={(e) => this.qstnaireDes(e)} />
                            </div>
                            { questionDisplayList.map((item, i) => {
                                return (
                                    item.isPaging === 0 ?
                                        <div key={i}>
                                            <InitQuestionList question={item} index={item.questionOrder} infoView={true}/>
                                            <div className="link-group">
                                                <Checkbox defaultChecked={item.isBlank === 0} onChange={(e) => this.onChangeCheckbox(e, i)}>必填</Checkbox>
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.connModal(true, item, i)}>关联逻辑</a>
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.jumpModal(true, item, i)}>跳转逻辑</a>
                                                <Popconfirm key="jumpUp"  title="若该题存在关联、跳转逻辑，上移将清除与该题及上一题有关的所有逻辑(忽略分页)。确定上移?" onConfirm={() => this.jumpUp(i, item, 'question')}>
                                                    <a href="javascript:void(0);">上移</a>
                                                </Popconfirm>
                                                <Popconfirm key="jumpDown"  title="若该题存在关联、跳转逻辑，下移将清除与该题及下一题有关所有的逻辑(忽略分页)。确定下移?" onConfirm={() => this.jumpDown(i, item, 'question')}>
                                                    <a href="javascript:void(0);" >下移</a>
                                                </Popconfirm>
                                                <Popconfirm key="delete"  title="你确定删除该题及与该题有关的所有逻辑?" onConfirm={() => this.delQestion(item, i, 'question')}>
                                                    <a href="javascript:void(0);">删除</a>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                        :  <div key={i} className="questionStyle">
                                            <div className={"question"}>
                                                <div className={"div_preview"}>
                                                    <span className={"div_topic_page_question paging-bg"}>]<span>第{item.pageNum}页</span>[</span>
                                                    <span className={"line_as_hr"}/>
                                                </div>
                                            </div>
                                            <div className="link-group">
                                                <a href="javascript:void(0);" onClick={() => this.jumpUp(i, item, 'pageNum')}>上移</a>
                                                <a href="javascript:void(0);" onClick={() => this.jumpDown(i, item, 'pageNum')}>下移</a>
                                                <Popconfirm key="delete"  title="你确定删除该分页栏?" onConfirm={() => this.delQestion(item, i, 'pageNum')}>
                                                    <a href="javascript:void(0);">删除</a>
                                                </Popconfirm>
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
