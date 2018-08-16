/**
 * Create by chenpengan on 2018/8/15
 */
import React from 'react';
import {Row, Col, Spin} from "antd"

import QuestionPreviewService from '../../../services/question/QuestionPreviewService'
import InitQuestionList from './InitQuestionList'

import './questionPreview.less'

class QuestionPreview extends React.PureComponent {
    constructor(props) {
        super(props);
        // let id = props.location.query.id;
        // console.log(id);
        this.state = {
            loading: false,
            questionList: []
        }
    }

    componentWillMount() {
        this.setState({
            loading: true
        }, () => {
            QuestionPreviewService.getQuestionList().then(result => {
                // let logicList = result.logic;
                // let questionLIst = result.question;
                // questionLIst.map(item => {
                //     return logicList.map(k => {
                //         if(k.logicType==='00'){
                //             if (item.questionOrder === k.skiptoQuestionOrder) {
                //                 return item.isSetup = true;
                //             }
                //         }
                //     })
                // })
                this.setState({
                    loading: false,
                    questionList: result.list,
                    qstnaireTitle: result.qstnaireTitle
                });
                console.log(result)
            })
        })
    }

    //单选框值改变
    onRadioChange = (e) => {
        debugger;
    }
    //复选框值改变
    onCheckBoxChange = (e) => {
        debugger;
    }
    //填空题改变
    onBlankChange = (e) => {
        debugger;
    }

    render() {
        const questionnaire = this.state.questionList.map((item, i) => {
            return <InitQuestionList type={item.type} key={item.id} index={i}
                                     questionName={item.questionName}
                                     optionList={item.optionList} isSetup={item.isSetup}
                                     onRadioChange={this.onRadioChange}
                                     onCheckBoxChange={this.onCheckBoxChange}
                                     onBlankChange={this.onBlankChange}
                                     questionNameBlur={this.questionNameBlur}
                                     optionNameBlur={this.optionNameBlur}/>
        })
        return (
            <Spin spinning={this.state.loading}>
                <Row style={{overflow: 'auto'}} className={'question-preview'}>
                    <Col span={24} className={'surveyhead'}>
                        <h1>{this.state.qstnaireTitle}</h1>
                    </Col>
                    <Col span={12} offset={6}>
                        {questionnaire}
                    </Col>
                </Row>
            </Spin>
        )
    }
}

export default QuestionPreview;
