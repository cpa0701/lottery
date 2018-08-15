import React, { PureComponent } from 'react';
import { Row, Col, Card, Icon, Menu } from "antd";

import RadioModule from '../questionModule/RadioModule';
import './questionLibMgr.less';



export default class QuestionLibMgr extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [
                {
                    id: '1',
                    title: '你今天吃饭了吗?',
                    type: 'radio',
                    option: ['是', '否']
                },
                {
                    id: '2',
                    title: '你的兴趣、爱好是?',
                    type: 'checkbox',
                    option: ['篮球', '足球', '排球', '游泳']
                }
            ],
            // questionDisplayList: [],
            // questionDisplayList1: [],
            // value: ''
        }
    }

    componentDidMount() {

    };

    // 点击左边新增题目
    selectQuestionType = (e) => {
        let param = {
            id: String(this.state.questionList.length + 1),
            type: e.key
        };
        this.QuestionType(param, 1);
    };
    QuestionType = (item, type) => {
        switch (item.type) {
            case 'radio':
            {
                if(type === 1) {
                    this.addQuestion('radio', item.id);
                }
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                    </div>
                )}
            case 'checkbox':
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                    </div>
                );
            case 'input':
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                    </div>
                );
            case 'textArea':
                return (
                    <div className="list">
                        <RadioModule {...item}/>
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };

    addQuestion = (type, id) => {
        let questionList = [];
        if(type === 'radio') {
            questionList = [
                ...this.state.questionList,
                {
                    id,
                    type: 'radio',
                    title: '单选题标题',
                    option: ['选项1', '选项2']
                }
            ];
        } else if (type === 'checkbox') {
            questionList = [
                ...this.state.questionList,
                {
                    id,
                    type: 'checkbox',
                    title: '多选题标题',
                    option: ['选项1', '选项2', '选项3', '选项4']
                }
            ];
        } else if (type === 'input') {
            questionList = [
                ...this.state.questionList,
                {
                    id,
                    type: 'input',
                    title: '单行填空题',
                    option: ['选项1', '选项2']
                }
            ];
        } else if (type === 'textArea') {
            questionList = [
                ...this.state.questionList,
                {
                    id,
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

        const QuestionType = ({type, index, data}) => {
            return this.QuestionType(type, data)
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
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
