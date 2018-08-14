import React from 'react';
import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {Radio, Checkbox, Row, Col, Input, Button} from "antd"

import './questionApplication.less'

const RadioGroup = Radio.Group;


class QuestionApplication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            questionDisplayList: [],
            questionDisplayList1: [],
            value: ''
        }
    }

    componentWillMount() {
        QuestionApplicationService.getQuestionList().then(result => {
            if (result) {
                const QuestionType = ({type, index}) => {
                    return this.QuestionType(type, index)
                }
                const questionList = result.result.map((question, i) => {
                    return <QuestionType type={question.type} index={i} key={question.id}/>
                })
                this.setState({
                    questionList: questionList
                })
            }
        });
    }

    QuestionType = (type, index) => {
        let dom = '';
        switch (type) {
            case 'radio':
                dom = <RadioGroup>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </RadioGroup>;
                break;
            case 'checkbox':
                dom = <Checkbox.Group
                    style={{width: '100%'}}>
                    <Row>
                        <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                        <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                        <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                        <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                        <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                    </Row>
                </Checkbox.Group>
                break;
            case 'blank':
                dom = <Input placeholder="Basic usage"/>
                break;
        }
        return (<div onClick={this.getDom.bind(this, type)} className={'questionList'}>
            <span>{index + 1}</span>
            <div>
                {dom}
            </div>
        </div>);
    }

    getDom = (type) => {
        this.state.questionDisplayList1.push(type);
        this.setState({questionDisplayList: [...this.state.questionDisplayList1]})
    }

    render() {
        const QuestionType = ({type, index}) => {
            return this.QuestionType(type, index)
        }
        const questionDisplayList = this.state.questionDisplayList1.map((item, i) => {
            return <QuestionType type={item} key={i} index={i}/>
        });
        return (
            <div className={'questionApplication'}>
                <Row className={'questionAppHead'}>
                    <Col span={12} offset={8}>
                        <Button type="primary">完成编辑</Button>
                        <Button ghost icon="eye-o">预览</Button>
                        <Button style={{float: 'right'}}>分页</Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={{height: "500px", overflow: "auto"}} span={6}>{this.state.questionList}</Col>
                    <Col span={16} offset={1}>
                        <div className={'questionAppContent'}>
                            <div className={'questionAppContentTitle'}>
                                <h1>标题</h1>
                                <div className={"surveyDescription"}>添加问卷说明</div>
                            </div>
                            <div className={"question"}>
                                <div className={"div_preview"}>
                                    <span className={"div_topic_page_question paging-bg"}>]<span>第1页/共2页</span>[</span>
                                    <span className={"line_as_hr"}/>
                                </div>
                            </div>
                            {questionDisplayList}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default QuestionApplication;
