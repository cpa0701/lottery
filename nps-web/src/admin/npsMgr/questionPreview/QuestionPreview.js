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
                    item.optionList.length && item.optionList.map(k => {
                        k.logicList = [];
                    })
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
                                item.optionList[optionIndex].logicList.push(k);
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
        let questionList = this.state.questionList.filter(question => {//去除分页数据
            return question.isPaging === '0';
        });
        this.state.logicList.map(item => {//将此题所关联的题先隐藏
            if (item.logicType === '00' && item.setupQuestionOrder === e.target.questionIndex) {
                questionList[item.skiptoQuestionOrder - 1].isShow = false;
            }
        })
        questionList[e.target.questionIndex - 1].optionList.forEach(item => {//将当前所选选项的题目的选项值全部变为false，仅对单选
            item.checked = false;
        });
        questionList[e.target.questionIndex - 1].optionList[e.target.value - 1].checked = e.target.checked;//将当前选项的值改为true
        questionList[e.target.questionIndex - 1].optionList.map(item => {//遍历当前单选题所有选项的逻辑
            item.logicList.length && item.logicList.map(k => {//遍历此选项相关的所有逻辑然后找到所有相关逻辑的题目的选项然后依次判断
                let skiptoQuestionOrder = k.skiptoQuestionOrder;//找到当前逻辑被关联的题目序号
                let relatedLogicList = this.state.logicList.filter(logic => {
                    return logic.skiptoQuestionOrder === skiptoQuestionOrder//根据题目序号找到所有和此题目有关的所有逻辑
                });
                let relatedQuestionList = relatedLogicList.map(logic => {//遍历所有相关逻辑，与题目列表相匹配，过滤出所有相关题目及其相关选项
                    return questionList.filter(question => {
                        if (logic.setupQuestionOrder === question.questionOrder) {
                            question.optionFilteredList = question.optionList.filter(option => {
                                let optionArr = logic.optionOrder.split(',');
                                return optionArr.includes(option.optionOrder.toString())
                            })
                        }
                        return logic.setupQuestionOrder === question.questionOrder
                    })
                })
                let arr000 = [], arr001 = [];//定义关联且，关联或空数组用来存放满足条件的option
                relatedQuestionList.map(list => {//对相关题的相关选项根据关联和跳转，且和或进行分组
                    list.map(question => {
                        question.optionFilteredList.map(option => {
                            option.logicList.map(logic => {
                                if (logic.logicType === '00' && logic.andOr === 0) {//关联的且逻辑
                                    arr000.push(option);
                                } else if (logic.logicType === '00' && logic.andOr === 1) {//关联的或逻辑
                                    arr001.push(option)
                                }
                            })
                        })
                    })
                });
                questionList[skiptoQuestionOrder - 1].isShow = [arr000, arr001].some((arr, i) => {//关联逻辑中有一个满足即可显示
                    if (arr.length) {
                        if (i === 0) {//关联且逻辑
                            return arr.every(option => {
                                return option.checked;
                            })
                        } else if (i === 1) {//关联或逻辑
                            return arr.some(option => {
                                return option.checked;
                            })
                        }
                    } else return false;
                })
                let questionResultList = this.state.questionList.map(question => {//将分页信息装回
                    questionList.map(item => {
                        if (question.questionOrder === item.questionOrder && question.isPaging !== '1') {
                            question = item
                        }
                    })
                    return question;
                })
                this.setState({questionList: [...questionResultList]})
            })
        });
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
            return <InitQuestionList questionType={item.questionType} key={i}
                                     index={item.questionOrder}
                                     isPaging={item.isPaging}
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
