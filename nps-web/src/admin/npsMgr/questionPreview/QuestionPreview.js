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
            QuestionPreviewService.getPreviewLIst().then(result => {
                let logicList = result.logic;
                let questionList = result.question;
                questionList.map(item => {
                    item.isShow = false;
                    logicList.map(k => {
                        if (k.logicType === '00') {//关联逻辑，给关联被关联题添加逻辑
                            if (item.questionOrder === k.skiptoQuestionOrder) {
                                item.isSetup = true;//被关联题隐藏
                            }
                        }
                        if (item.questionOrder === k.setupQuestionOrder) {
                            let optionList = k.optionOrder.split(",");
                            optionList.map(option => {
                                let optionIndex = option - 1//有逻辑的选项索引
                                item.optionList[optionIndex].logic = k
                            })
                        }
                    })
                });
                this.setState({
                    loading: false,
                    questionList: questionList,
                    qstnaireTitle: result.qstnaireTitle
                });
            })
        })
    }

    //单选框值改变
    onRadioChange = (e) => {
        let logic = e.target.logic;
        if (logic) {
            let questionList = this.state.questionList;
            questionList[logic.setupQuestionOrder - 1].optionList[logic.optionOrder - 1].checked = e.target.checked;
            this.setState({questionList: [...questionList]}, () => {
                if (logic.logicType === '00') {
                    if (logic.andOr === 0) {
                        let skiptoQuestionOrder = logic.skiptoQuestionOrder;
                        let result = questionList.every(item => {
                            if (item.optionList.length)
                                return item.optionList.every(k => {
                                    if (k.logic && (k.logic.andOr === 0 && k.logic.skiptoQuestionOrder === skiptoQuestionOrder)) {
                                        return k.checked
                                    } else return true
                                })
                            else return true
                        });
                        if (result) {//且条件全满足则显示，否则隐藏
                            questionList[skiptoQuestionOrder - 1].isShow = true;
                        } else {
                            questionList[skiptoQuestionOrder - 1].isShow = false;
                        }
                        this.setState({questionList: [...questionList]},()=>{
                            console.log(this.state.questionList)
                        })
                    }
                } else if (logic.logicType === '01') {

                }
            })
        }
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
            return <InitQuestionList questionType={item.questionType} key={item.questionOrder}
                                     index={item.questionOrder}
                                     questionName={item.questionName}
                                     optionList={item.optionList}
                                     isSetup={item.isSetup}
                                     isShow={item.isShow}
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
