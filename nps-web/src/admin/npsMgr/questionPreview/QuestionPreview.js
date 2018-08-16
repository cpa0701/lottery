/**
 * Create by chenpengan on 2018/8/15
 */
import React from 'react';
import {Row, Col, Spin} from "antd"

import QuestionPreviewService from '../../../services/question/QuestionPreviewService'
import InitQuestionList from '../questionModule/InitQuestionList'

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
                this.setState({
                    loading: false,
                    questionList: result.list,
                    qstnaireTitle: result.qstnaireTitle
                });
                console.log(result)
            })
        })
    }

    onRadioChange = (e) => {
        debugger;
    }
    questionNameBlur = (e) => {
        debugger;
    }
    optionNameBlur = (e) => {
        debugger;
    }

    render() {
        const questionnaire = this.state.questionList.map((item, i) => {
            return <InitQuestionList type={item.questionType} key={item.questionId} index={i}
                                     questionName={item.questionName}
                                     optionList={item.optionList} isSetup={item.isSetup}
                                     onRadioChange={this.onRadioChange}
                                     questionNameBlur={this.questionNameBlur} optionNameBlur={this.optionNameBlur}/>
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
