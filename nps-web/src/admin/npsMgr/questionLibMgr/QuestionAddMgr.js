import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Icon, Menu, Button, Checkbox, Popconfirm, TreeSelect, message, Select,Tooltip } from "antd";

import { RadioModule, CheckboxModule, BlankModule } from '../questionModule/QuestionModules'
import OptionsAdd from './OptionsAdd';
import QuestionLibMgrService from "../../../services/question/QuestionLibMgrService";

import './questionLibMgr.less';

const [ FormItem, Option ] = [ Form.Item, Select.Option ];

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
    value: '业务',
    key: '0-1',
}];

@Form.create()
export default class QuestionAddMgr extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // questionList: [
            //     {
            //         // questionId: 1,
            //         questionName: '你今天吃饭了吗?',
            //         questionName2: '日常问候语', // 题目提示描述
            //         questionType: '01',
            //         questionCategory: '4G', // 题目分类
            //         status: 1, // 默认1
            //         optionList: [
            //             {
            //                 optionOrder: 1, // 选项序号
            //                 // optionId: 1,
            //                 optionName: '是',
            //                 isOther: 0  // 默认0
            //             },
            //             {
            //                 optionOrder: 2, // 选项序号
            //                 // optionId: 1,
            //                 optionName: '否',
            //                 isOther: 0  // 默认0
            //             }
            //         ],
            //         optionLayout: 0, // 默认0
            //         lenthCheck: 0, // 默认0
            //         isNps: 0, // 默认0 nps
            //         isSatisfied: 0, // 默认0 满意度
            //         contentCheck: 0 // 默认0 内容限制
            //     }
            // ],
            questionList: this.props.location.state ? [ this.props.location.state.record ] : [],
            treeData: [],
            index: undefined,
            isTextArea: false,
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
    //插入输入线
    insertText=()=>{
        let questionList=this.state.questionList;
        questionList[0].questionName=questionList[0].questionName+"_______";
        this.setState({questionList:[...questionList]});

    }
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
            case '01':
                this.setState({isTextArea: false});
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        {
                            ...this.state.questionList[0],
                            questionName: this.props.location.state ? this.props.location.state.record.questionName : '单选题标题',
                            questionName2: '', // 题目提示描述
                            questionType: '01',
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
                );
            case '02':
                this.setState({isTextArea: false});
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        {
                            ...this.state.questionList[0],
                            questionName: this.props.location.state ? this.props.location.state.record.questionName : '多选题标题',
                            questionName2: '多选题', // 题目提示描述
                            questionType: '02',
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
            case '03':
                this.setState({isTextArea: true});
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        {
                            ...this.state.questionList[0],
                            questionName: this.props.location.state ? this.props.location.state.record.questionName : '单行填空题',
                            questionName2: '', // 题目提示描述
                            questionType: '03',
                            questionCategory: '', // 题目分类
                            status: 1, // 默认1
                            optionList: [
                                {
                                    optionOrder: 1, // 选项序号
                                    // optionId: 1,
                                    optionName: '默认答案',
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
                        <BlankModule {...items}/>
                        <h3 className="span">注：字数控制在100字以内</h3>
                        <Tooltip title="填空符用连续6个下划线表示，填空长度跟下划线的个数相关。点击按钮可在光标处插入填空符。">
                            <Button className="blank-btn" type="primary" onClick={this.insertText}>插入填空符</Button>
                        </Tooltip>
                        { editHtml }
                    </div>
                );
            case '04':
                this.setState({isTextArea: true});
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        {
                            ...this.state.questionList[0],
                            questionName: this.props.location.state ? this.props.location.state.record.questionName : '多行填空题',
                            questionName2: '', // 题目提示描述
                            questionType: '04',
                            questionCategory: '', // 题目分类
                            status: 1, // 默认1
                            optionList: [
                                {
                                    optionOrder: 1, // 选项序号
                                    // optionId: 1,
                                    optionName: '默认答案',
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
                        <BlankModule {...items}/>
                        <h3 className="span">注：字数控制在200字以内</h3>
                        <Tooltip title="填空符用连续6个下划线表示，填空长度跟下划线的个数相关。点击按钮可在光标处插入填空符。">
                            <Button className="blank-btn" type="primary" onClick={this.insertText}>插入填空符</Button>
                        </Tooltip>
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
            if (value.questionId) {
                QuestionLibMgrService.editQuestion(value).then(data => {
                    message.success('编辑成功');
                });
            } else {
                QuestionLibMgrService.addQuestion(value).then(data => {
                    message.success('新增成功');
                });
            }
            this.setState({questionList: []});
            this.props.history.push('/npsMgr/questionLibMgr');

        });
    };
    // 取消保存
    cancelSave = () => {
        this.setState({questionList: []});
    };

    render() {
        const { questionList, addOption, index, isTextArea } = this.state;
        const { getFieldDecorator } = this.props.form;
        const options = [{name: '不限', value: 0},{name: '数字', value: 1},{name: '字符', value: 2},{name: '中文', value: 3},{name: 'EMAIL', value: 4},{name: '手机号码', value: 5}];
        const editHtml = <div>
                            <div className="divider"/>
                            <div className="editFunc">
                                <Form layout='inline' style={{ marginLeft: '20px'}}>
                                    <FormItem label="题目分类">
                                        {getFieldDecorator('questionCategory', {
                                            initialValue: this.props.location.state ? this.props.location.state.record.questionCategory : "",
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
                                            initialValue: !this.props.location.state ? false : this.props.location.state.record.isNps === 1,
                                        })(
                                            <Checkbox>NPS评分题</Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('isSatisfied', {
                                            valuePropName: 'checked',
                                            initialValue: !this.props.location.state ? false : this.props.location.state.record.isSatisfied === 1,
                                        })(
                                            <Checkbox>满意度评分题</Checkbox>
                                        )}
                                    </FormItem>
                                    {isTextArea ?
                                        <FormItem  className="selectOption" label="内容限制">
                                            {getFieldDecorator('contentCheck', {
                                                initialValue: this.props.location.state ? this.props.location.state.record.contentCheck : 0,
                                            })(
                                                <Select>
                                                    {options.map((item, k) => { return <Option key={k} value={item.value}>{item.name}</Option>;})}
                                                </Select>
                                            )}
                                        </FormItem>
                                        : <div/>}
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
                                <Menu.Item key="01"><Icon type='check-circle-o' /><span>单选题</span></Menu.Item>
                                <Menu.Item key="02"><Icon type='check-square-o' /><span>多选题</span></Menu.Item>
                                <Menu.Item key="03"><Icon type='wallet' /><span>单项填空</span></Menu.Item>
                                <Menu.Item key="04"><Icon type='profile' /><span>多项填空</span></Menu.Item>
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
                                        <Button type="danger" icon="delete" style={{ marginLeft: '16px'}}>取消</Button>
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
