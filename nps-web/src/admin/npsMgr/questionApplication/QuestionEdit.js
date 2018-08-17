import React from 'react';
import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {Row, Col, Button, Input, Modal} from "antd"

import InitQuestionList from './InitQuestionList'
import QuestionLib from './QuestionLib'
import './questionApplication.less'
import ConnModal from './ConnModal';
import JumpModal from './JumpModal';
const { TextArea } = Input;

class QuestionEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionDisplayList: [],
            questionDisplayList1: [],
            value: '',
            conn: false,
            jump: false,
            record: [],
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
    connModal = (show, props) => {
        if (show) {
            this.setState({
                conn: true,
                record: props
            });
        }
        else {
            this.setState({conn: false});
        }
    };
    jumpModal = (show, props) => {
        if (show) {
            this.setState({
                jump: true,
                record: props
            });
        }
        else {
            this.setState({jump: false});
        }
    };

    render() {
        //关联弹窗
        const connModalProps = {
            conn: this.state.conn,
            data: this.state.record,
            onClose: () => {
                this.connModal(false);
            },
        };
        //跳转弹窗
        const jumpModalProps = {
            jump: this.state.jump,
            data: this.state.record,
            onClose: () => {
                this.jumpModal(false);
            },
        };
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
                                <Input className={'questionInput'} placeholder="标题"/>
                                <TextArea className={"surveyDescription"} placeholder="添加问卷说明" autosize={{ minRows: 1}}/>
                            </div>
                            <div className={"question"}>
                                <div className={"div_preview"}>
                                    <span className={"div_topic_page_question paging-bg"}>]<span>第1页/共2页</span>[</span>
                                    <span className={"line_as_hr"}/>
                                </div>
                            </div>
                            <ConnModal {...connModalProps}/>
                            <JumpModal {...jumpModalProps}/>
                            {this.state.questionDisplayList.map((item, i) => {
                                console.log(item)
                                return (
                                    <div key={i}>
                                        <InitQuestionList type={item.type} key={item.id}
                                                          index={i} questionName={item.questionName}/>
                                        <div className="link-group">
                                            <a href="javascript:void(0);"
                                               onClick={() => this.connModal(true, item)}>关联逻辑</a>
                                            <a href="javascript:void(0);"
                                               onClick={() => this.jumpModal(true, item)}>跳转逻辑</a>
                                            <a href="javascript:void(0);">上移</a>
                                            <a href="javascript:void(0);">下移</a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default QuestionEdit;
