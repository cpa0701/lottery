import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Icon, Menu, Button, Checkbox, Popconfirm, TreeSelect, message } from "antd";

import { RadioModule, CheckboxModule } from '../questionModule/QuestionModules'
import OptionsAdd from './OptionsAdd';
import QuestionLibMgrService from "../../../services/question/QuestionLibMgrService";

import './questionLibMgr.less';

const [ FormItem ] = [ Form.Item ];

const treeData = [{
    title: '网络',
    value: '网络',
    key: '0-0',
    children: [{
        title: '4G',
        value: '4G',
        key: '0-0-1',
    }, {
        title: '5G',
        value: '5G',
        key: '0-0-2',
    }],
}, {
    title: '业务',
    value: '0-1',
    key: '0-1',
}];

@Form.create()
export default class QuestionLibMgr extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [
                {
                    // questionId: 1,
                    questionName: '你今天吃饭了吗?',
                    questionName2: '日常问候语', // 题目提示描述
                    questionType: 'radio',
                    questionCategory: '4G', // 题目分类
                    status: 1, // 默认1
                    optionList: [
                        {
                            optionOrder: 1, // 选项序号
                            // optionId: 1,
                            optionName: '是',
                            isOther: 0  // 默认0
                        },
                        {
                            optionOrder: 2, // 选项序号
                            // optionId: 1,
                            optionName: '否',
                            isOther: 0  // 默认0
                        }
                    ],
                    optionLayout: 0, // 默认0
                    lenthCheck: 0, // 默认0
                    isNps: 0, // 默认0 nps
                    isSatisfied: 0, // 默认0 满意度
                    contentCheck: 0 // 默认0 内容限制
                }
            ],
            treeData: [],
            index: undefined,
            addOption: false
        }
    }

    componentDidMount() {
        // 获取题目分类树数据
        // QuestionLibMgrService.getQuestionCategory().then(data => {
        //     if(data) {
        //         this.setState({treeData: data})
        //     }
        // });
    };

    // 点击左边新增题目
    selectQuestionType = (e) => {
        let param = {
            questionType: e.key
        };
        this.props.form.resetFields();
        this.QuestionType(param, 1, 1);
    };

    // 单选、复选批量新增选项弹框
    addOptionsModal = (show, index) => {
        if (show) {
            this.setState({addOption: true, index});
        } else {
            this.setState({addOption: false});
        }
    };
    // 单选、复选新增选项
    addOption = (index) => {
        let questionList = this.state.questionList.map((item, key) => {
            if(key === Number(index) - 1) {
                item.optionList = [
                    ...item.optionList,
                    {
                        optionOrder: item.optionList.length + 1, // 选项序号
                        optionName: '请输入选项',
                        isOther: 0  // 默认0
                    },
                ];
            }
            return item;
        });
        this.setState({questionList});
    };

    // 根据题目类型生成对应的DOM
    QuestionType = (item, index, type, editHtml) => {
        let items = {
            ...item,
            index,
            questionNameBlur: (e, index) => { // 标题输入框值失去焦点时变化
                let questionObj = {
                    ...this.state.questionList[0],
                    questionName: e.target.value
                };
                this.setState({questionList: [questionObj]})
            },
            optionNameBlur: (e, num) => { // 选项输入框值失去焦点时变化
                let option = this.state.questionList[0].optionList;
                option.map(item => {
                    if (item.optionOrder === num) {
                        item.optionName = e.target.value;
                    }
                    return '';
                });
                let questionObj = {
                    ...this.state.questionList[0],
                    optionList: option
                };
                this.setState({questionList: [questionObj]})
            },
            optionDelete: (value) => {
                let option = this.state.questionList[0].optionList.filter(item => item.optionOrder !== value);
                let questionObj = {
                    ...this.state.questionList[0],
                    optionList: option
                };
                this.setState({questionList: [questionObj]})
            }
        };
        switch (items.questionType) {
            case 'radio':
            {
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        // ...this.state.questionList,
                        {
                            questionName: '单选题标题',
                            questionName2: '', // 题目提示描述
                            questionType: 'radio',
                            questionCategory: '', // 题目分类
                            status: 1, // 默认1
                            optionList: [
                                {
                                    optionOrder: 1, // 选项序号
                                    optionName: '选项1',
                                    isOther: 0  // 默认0
                                },
                                {
                                    optionOrder: 2, // 选项序号
                                    optionName: '选项1',
                                    isOther: 0  // 默认0
                                },
                            ],
                            optionLayout: 0, // 默认0
                            lenthCheck: 0, // 默认0
                            isNps: 0, // 默认0 nps
                            isSatisfied: 0, // 默认0 满意度
                            contentCheck: 0 // 默认0 内容限制
                        }

                    ];
                    this.setState({questionList});
                }
                return (
                    <div className="list">
                        <RadioModule {...items}/>
                        <div className="addOption">
                            <Icon type="plus-circle-o" title="添加选项" onClick={() => this.addOption(index)}/>
                            <Icon type="copy" title="批量添加" onClick={() => this.addOptionsModal(true, index)}/>
                        </div>
                        { editHtml }
                    </div>
                )}
            case 'checkbox':
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        // ...this.state.questionList,
                        {
                            questionName: '多选题标题',
                            questionName2: '多选题', // 题目提示描述
                            questionType: 'checkbox',
                            questionCategory: '', // 题目分类
                            status: 1, // 默认1
                            optionList: [
                                {
                                    optionOrder: 1, // 选项序号
                                    optionName: '选项1',
                                    isOther: 0  // 默认0
                                },
                                {
                                    optionOrder: 2, // 选项序号
                                    optionName: '选项2',
                                    isOther: 0  // 默认0
                                },
                                {
                                    optionOrder: 3, // 选项序号
                                    optionName: '选项3',
                                    isOther: 0  // 默认0
                                },
                                {
                                    optionOrder: 4, // 选项序号
                                    optionName: '选项4',
                                    isOther: 0  // 默认0
                                }
                            ],
                            optionLayout: 0, // 默认0
                            lenthCheck: 0, // 默认0
                            isNps: 0, // 默认0 nps
                            isSatisfied: 0, // 默认0 满意度
                            contentCheck: 0 // 默认0 内容限制
                        }
                    ];
                    this.setState({questionList});
                }
                return (
                    <div className="list">
                        <CheckboxModule {...items}/>
                        <div className="addOption">
                            <Icon type="plus-circle-o" title="添加选项" onClick={() => this.addOption(index)}/>
                            <Icon type="copy" title="批量添加" onClick={() => this.addOptionsModal(true, index)}/>
                        </div>
                        { editHtml }
                    </div>
                );
            case 'input':
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        // ...this.state.questionList,
                        // {
                        //     type: 'input',
                        //     title: '单行填空题',
                        //     option: ['选项1', '选项2']
                        // },
                        {
                            questionName: '单行填空题',
                            questionName2: '', // 题目提示描述
                            questionType: 'input',
                            questionCategory: '', // 题目分类
                            status: 1, // 默认1
                            optionList: [],
                            optionLayout: 0, // 默认0
                            lenthCheck: 0, // 默认0
                            isNps: 0, // 默认0 nps
                            isSatisfied: 0, // 默认0 满意度
                            contentCheck: 0 // 默认0 内容限制
                        }
                    ];
                    this.setState({questionList});
                }
                return (
                    <div className="list">
                        <RadioModule {...items}/>
                        { editHtml }
                    </div>
                );
            case 'textArea':
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        // ...this.state.questionList,
                        // {
                        //     type: 'textArea',
                        //     title: '多行填空题',
                        //     option: ['选项1', '选项2']
                        // },
                        {
                            questionName: '多行填空题',
                            questionName2: '', // 题目提示描述
                            questionType: 'textArea',
                            questionCategory: '', // 题目分类
                            status: 1, // 默认1
                            optionList: [],
                            optionLayout: 0, // 默认0
                            lenthCheck: 0, // 默认0
                            isNps: 0, // 默认0 nps
                            isSatisfied: 0, // 默认0 满意度
                            contentCheck: 0 // 默认0 内容限制
                        }
                    ];
                    this.setState({questionList});
                }
                return (
                    <div className="list">
                        <RadioModule {...items}/>
                        { editHtml }
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };

    // 保存新增题目
    saveQuestion = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            if (values.isNps) {
                values.isNps = 1;
            } else {
                values.isNps = 0;
            }
            if (values.isSatisfied) {
                values.isSatisfied = 1;
            } else {
                values.isSatisfied = 0;
            }
            let value = {
                ...this.state.questionList[0],
                ...values
            };
            console.log(value);
            // QuestionLibMgrService.addQuestion(value).then(data => {
            //     if(data) {
            //         message.success('新增成功');
            //         this.setState({questionList: []})
            //     }
            // });
        });
    };
    // 取消保存
    cancelSave = () => {
        this.setState({questionList: []});
    };

    render() {
        const { questionList, addOption, index } = this.state;
        const { getFieldDecorator } = this.props.form;

        const editHtml = <div>
                            <div className="divider"/>
                            <div className="editFunc">
                                <Form layout='inline' style={{ marginLeft: '20px'}}>
                                    <FormItem label="题目分类">
                                        {getFieldDecorator('questionCategory', {
                                            initialValue: '',
                                        })(
                                            <TreeSelect
                                                style={{ width: 150 }}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={treeData}
                                                treeDefaultExpandAll
                                                onChange={this.onChange}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('isNps', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox>NPS评分题</Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('isSatisfied', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox>满意度评分题</Checkbox>
                                        )}
                                    </FormItem>
                                </Form>
                            </div>
                        </div>;

        const QuestionType = ({type, index, data}) => {
            return this.QuestionType(type, String(index + 1), data, editHtml)
        };
        const questionListDom = questionList.map((item, k) => {
            return <QuestionType type={item} key={k} index={k} data='0' html={editHtml}/>;
        });

        // 单选、复选新增选项弹框
        const addModalProps = {
            add: addOption,
            onClose: () => {
                this.addOptionsModal(false, undefined);
            },
            onCreate: (value) => {
                this.setState({addOption: false});
                let questionList = this.state.questionList.map((item, key) => {
                    if(key === Number(index) - 1) {
                        let optionArr = value.map((x, k) => {
                            return {
                                optionOrder: item.optionList.length + k + 1, // 选项序号
                                optionName: x,
                                isOther: 0  // 默认0
                            };
                        });
                        item.optionList = [
                            ...item.optionList,
                            ...optionArr
                        ];
                    }
                    return item;
                });
                this.setState({questionList});
            }
        };

        return (
            <div className="questionLibMgr">
                <Row>
                    <Col span={5}>
                        <Card title="新增题目" className="leftSelectType">
                            <Menu onClick={this.selectQuestionType} mode="vertical">
                                <Menu.Item key="radio"><Icon type='check-circle-o' /><span>单选题</span></Menu.Item>
                                <Menu.Item key="checkbox"><Icon type='check-square-o' /><span>多选题</span></Menu.Item>
                                <Menu.Item key="input"><Icon type='wallet' /><span>单项填空</span></Menu.Item>
                                <Menu.Item key="textArea"><Icon type='profile' /><span>多项填空</span></Menu.Item>
                            </Menu>
                        </Card>
                    </Col>
                    <Col span={19}>
                        <div className="questionContent">
                            {questionListDom}
                            {questionList.length ?
                                <div className="addBtn">
                                    <Button type="primary" icon="plus-circle-o" onClick={() => this.saveQuestion()}>保存</Button>
                                    <Popconfirm title="你确定清除新建题目？"  onConfirm={() => this.cancelSave()}>
                                        <Button type="danger" icon="delete">取消</Button>
                                    </Popconfirm>,
                                </div>
                                :
                                <div className="emptyContent">请在左侧选择需要添加的题型</div>}
                        </div>
                    </Col>
                </Row>
                <OptionsAdd {...addModalProps}/>
            </div>
        )
    }
}
