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
                this.state.logicList = result.logic;
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
        let questionList = this.state.questionList;
        this.state.logicList.map(item => {
            if (item.logicType === '00' && item.setupQuestionOrder === e.target.questionIndex) {
                questionList[item.skiptoQuestionOrder - 1].isShow = false;
            }
        })
        this.setState({questionList: [...questionList]}, () => {
            let logic = e.target.logic;
            questionList[e.target.questionIndex - 1].optionList.forEach(item => {//将当前所选选项的题目的选项值全部变为false
                item.checked = false;
            })
            if (logic && logic.logicType === '00') {
                questionList[logic.setupQuestionOrder - 1].optionList[logic.optionOrder - 1].checked = e.target.checked;
                this.setState({questionList: [...questionList]}, () => {
                    if (logic.logicType === '00') {//关联的情况
                        let skiptoQuestionOrder = logic.skiptoQuestionOrder;
                        if (logic.andOr === 0) {//关联的且的选项
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
                        }
                        else {//关联的或的选项
                            let result = questionList.some(item => {
                                if (item.optionList.length)
                                    return item.optionList.some(k => {
                                        if (k.logic && (k.logic.andOr === 1 && k.logic.skiptoQuestionOrder === skiptoQuestionOrder)) {
                                            return k.checked
                                        } else return false
                                    })
                                else return false
                            });
                            if (result) {//且条件全满足则显示，否则隐藏
                                questionList[skiptoQuestionOrder - 1].isShow = true;
                            } else {
                                questionList[skiptoQuestionOrder - 1].isShow = false;
                            }
                        }
                        this.setState({questionList: [...questionList]})
                    } else if (logic.logicType === '01') {//跳转的情况

                    }
                })
            }
            else {//没逻辑选项判断或关联
                let skiptoQuestionOrder = '';
                let orList = this.state.logicList.filter(item => {//过滤出被此选项所关联的或关系的题目的所有关联逻辑
                    if (item.logicType === '00' && item.andOr === 1 && item.setupQuestionOrder === e.target.questionIndex) {
                        skiptoQuestionOrder = item.skiptoQuestionOrder;
                    }
                    return item.skiptoQuestionOrder === skiptoQuestionOrder;
                });
                let result = orList.some(item => {
                    return questionList[item.setupQuestionOrder - 1].optionList[item.optionOrder - 1].checked
                });
                if (orList.length) {
                    if (result) {//或条件全满足则显示，否则隐藏
                        questionList[skiptoQuestionOrder - 1].isShow = true;
                    } else {
                        questionList[skiptoQuestionOrder - 1].isShow = false;
                    }
                    this.setState({questionList: [...questionList]})
                }
            }
        })
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
