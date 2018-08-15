import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Icon, Menu, Button, Checkbox, Popconfirm, TreeSelect } from "antd";

import { RadioModule, CheckboxModule } from '../questionModule/QuestionModules'
import './questionLibMgr.less';
import OptionsAdd from './OptionsAdd';

const [ FormItem ] = [ Form.Item ];

const treeData = [{
    title: '网络',
    value: '0-0',
    key: '0-0',
    children: [{
        title: '4G',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        title: '5G',
        value: '0-0-2',
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
                    title: '你今天吃饭了吗?',
                    type: 'radio',
                    value: 0,
                    option: ['是', '否']
                },
                {
                    title: '你的兴趣、爱好是?',
                    type: 'checkbox',
                    value: [0, 1],
                    option: ['篮球', '足球', '排球', '游泳']
                }
            ],
            value: undefined,
            index: undefined,
            addOption: false
        }
    }

    componentDidMount() {

    };

    // 点击左边新增题目
    selectQuestionType = (e) => {
        let param = {
            type: e.key
        };
        this.QuestionType(param, String(this.state.questionList.length + 1), 1);
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
                item.option = [
                    ...item.option,
                    '请输入选项'
                ];
            }
            return item;
        });
        this.setState({questionList});
    };
    // 单选、复选批量新增选项
    addOptions = (index) => {

    };
    // 根据题目类型生成对应的DOM
    QuestionType = (item, index, type, editHtml) => {
        let items = {
            ...item,
            index
        };
        switch (items.type) {
            case 'radio':
            {
                if(type === 1) {
                    let questionList = [];
                    questionList = [
                        ...this.state.questionList,
                        {
                            type: 'radio',
                            title: '单选题标题',
                            option: ['选项1', '选项2']
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
                        ...this.state.questionList,
                        {
                            type: 'checkbox',
                            title: '多选题标题',
                            option: ['选项1', '选项2', '选项3', '选项4']
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
                        ...this.state.questionList,
                        {
                            type: 'input',
                            title: '单行填空题',
                            option: ['选项1', '选项2']
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
                        ...this.state.questionList,
                        {
                            type: 'textArea',
                            title: '多行填空题',
                            option: ['选项1', '选项2']
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

    render() {
        const { questionList, addOption, index } = this.state;
        const { getFieldDecorator } = this.props.form;

        const editHtml = <div>
                            <div className="editFunc">
                                <Form layout='inline' style={{ textAlign: 'right'}}>
                                    <FormItem label="题目分类">
                                        <TreeSelect
                                            style={{ width: 150 }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={treeData}
                                            treeDefaultExpandAll
                                            onChange={this.onChange}
                                        />
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('npScore', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>NPS评分题</Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('SatScore', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>满意度评分题</Checkbox>
                                        )}
                                    </FormItem>
                                </Form>
                            </div>
                            <div className="divider"/>
                            <div className="editDelBtn">
                                <Button type="primary" icon="plus-circle-o" >确定</Button>
                                <Button type="danger" icon="delete">删除</Button>
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
                        item.option = [
                            ...item.option,
                            ...value
                        ];
                    }
                    return item;
                });
                this.setState({questionList});
            },
        };

        return (
            <div className="questionLibMgr">
                <Row>
                    <Col span={5}>
                        <Card title="添加新题" className="leftSelectType">
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
                            {questionList.length ? <div className="addBtn">
                                <Button type="primary" icon="plus-circle-o" >保存</Button>
                                <Popconfirm title="你确定清除所有新建题目？">
                                    <Button type="danger" icon="delete">取消</Button>
                                </Popconfirm>,
                            </div>
                                :
                            <div className="emptyContent">暂未新增题目</div>}
                        </div>
                    </Col>
                </Row>
                <OptionsAdd {...addModalProps}/>
            </div>
        )
    }
}
