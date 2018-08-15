import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Icon, Menu, Button, Checkbox } from "antd";

import RadioModule from '../questionModule/Radiomodule';
import CheckboxModule from '../questionModule/Checkboxmodule';
import './questionLibMgr.less';

const [ FormItem ] = [ Form.Item ];

const editHtml = <div>
                    <div className="editFunc">
                        <Form layout='inline'>
                            <FormItem>

                            </FormItem>
                            <FormItem>
                                <Checkbox
                                    value="1"
                                    onChange={this.handleChange}
                                >
                                    NPS评分题
                                </Checkbox>
                            </FormItem>
                            <FormItem>
                                <Checkbox
                                    value="1"
                                    onChange={this.handleChange}
                                >
                                    满意度评分题
                                </Checkbox>
                            </FormItem>
                        </Form>
                    </div>
                    <div className="divider"/>
                    <div className="editDelBtn">
                        <Button type="primary" icon="plus-circle-o" >确定</Button>
                        <Button type="danger" icon="delete">删除</Button>
                    </div>
                </div>;

@Form.create()
export default class QuestionLibMgr extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [
                {
                    title: '你今天吃饭了吗?',
                    type: 'radio',
                    option: ['是', '否']
                },
                {
                    title: '你的兴趣、爱好是?',
                    type: 'checkbox',
                    option: ['篮球', '足球', '排球', '游泳']
                }
            ]
        }
    }

    componentDidMount() {

    };

    // 点击左边新增题目
    selectQuestionType = (e) => {
        let param = {
            index: String(this.state.questionList.length + 1),
            type: e.key
        };
        this.QuestionType(param, 1);
    };
    QuestionType = (item, key, type) => {
        switch (item.type) {
            case 'radio':
            {
                if(type === 1) {
                    this.addQuestion('radio');
                }
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                        <div className="addOption">
                            <Icon type="plus-circle-o" title="添加选项"/>
                            <Icon type="copy" title="批量添加"/>
                        </div>
                        { editHtml }
                    </div>
                )}
            case 'checkbox':
                return (
                    <div className="list">
                        <CheckboxModule {...item}/>
                        { editHtml }
                    </div>
                );
            case 'input':
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                        { editHtml }
                    </div>
                );
            case 'textArea':
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                        { editHtml }
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };

    addQuestion = (type) => {
        let questionList = [];
        if(type === 'radio') {
            questionList = [
                ...this.state.questionList,
                {
                    type: 'radio',
                    title: '单选题标题',
                    option: ['选项1', '选项2']
                }
            ];
        } else if (type === 'checkbox') {
            questionList = [
                ...this.state.questionList,
                {
                    type: 'checkbox',
                    title: '多选题标题',
                    option: ['选项1', '选项2', '选项3', '选项4']
                }
            ];
        } else if (type === 'input') {
            questionList = [
                ...this.state.questionList,
                {
                    type: 'input',
                    title: '单行填空题',
                    option: ['选项1', '选项2']
                }
            ];
        } else if (type === 'textArea') {
            questionList = [
                ...this.state.questionList,
                {
                    type: 'textArea',
                    title: '多行填空题',
                    option: ['选项1', '选项2']
                }
            ];
        }
        this.setState({questionList});
    };

    render() {
        const { questionList } = this.state;
        const { getFieldDecorator } = this.props.form;

        const QuestionType = ({type, key, data}) => {
            return this.QuestionType(type, String(key + 1), data)
        };
        const questionListDom = questionList.map((item, k) => {
            return <QuestionType type={item} key={k} data='0'/>;
        });

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
                                <Button type="danger" icon="delete">取消</Button>
                            </div>
                                :
                            <div className="emptyContent">暂未新增题目</div>}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
