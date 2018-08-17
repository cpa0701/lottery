import React from 'react';
import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {Row, Col, Button} from "antd"

import InitQuestionList from './InitQuestionList'
import QuestionLib from './QuestionLib'
import './questionApplication.less'


class QuestionEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionDisplayList: [],
            questionDisplayList1: [],
            value: ''
        }
        this.getDom = this.getDom.bind(this);
        this.preview = this.preview.bind(this);
    }

    //获取题库具体题目
    getDom = (data) => {
        this.state.questionDisplayList1.push(data);
        this.setState({questionDisplayList: [...this.state.questionDisplayList1]})
    }
    // 进入预览
    preview = () => {
        let id = Math.floor(Math.random() * 100);
        let path = {
            pathname: '/npsMgr/questionMgr/QuestionPreview',
            query: {id: id},
        }
        this.props.history.push('/npsMgr/questionMgr/QuestionPreview');
    }

    render() {
        return (
            <div className={'questionApplication'}>
                <Row className={'questionAppHead'}>
                    <Col span={12} offset={8}>
                        <Button type="primary">完成编辑</Button>
                        <Button ghost icon="eye-o" onClick={this.preview}>预览</Button>
                        <Button style={{float: 'right'}}>分页</Button>
                    </Col>
                </Row>
                <Row className={'height'}>
                    <Col style={{height: "100%", overflow: "auto"}} span={8}>
                        <QuestionLib getDom={this.getDom}/>
                    </Col>
                    <Col span={15} offset={1} style={{height: '100%'}}>
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
                            {this.state.questionDisplayList.map((item, i) => {
                                return <InitQuestionList type={item.type} key={i} index={i} title={item.title}/>
                            })}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default QuestionEdit;
