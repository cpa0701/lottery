/**
 * Create by chenpengan on 2018/8/15
 */
import React from 'react';
import {Row, Col, Spin, Button} from "antd"

import QuestionPreviewService from '../../../services/question/QuestionPreviewService'
import InitQuestionList from './InitQuestionList'

import './questionPreview.less'

class QuestionPreview extends React.PureComponent {
    constructor(props) {
        super(props);
        let id = props.match.params.id;
        console.log(id);
        this.state = {
            loading: false,
            currentPage: 1,
            pageCount: 1,
            pageList: [],
            questionList: [],
            isPaging: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading: true
        }, () => {
            QuestionPreviewService.getPreviewLIst().then(result => {
                let logicList = result.logic;
                this.state.logicList = result.logic;
                let questionList = result.question;
                let page = 1;//页码
                let pageCount = 2;//由于isPaging属性是放在每页最前的一个对象中，所以从2开始
                let pageList = [1];//页码list
                let isPaging = questionList.some(item => {
                    return item.isPaging === '1';
                });
                questionList.map(item => {
                    item.isShow = false;
                    item.optionList.length && item.optionList.map(k => {
                        k.logicList = [];
                    });
                    item.belongToPage = page;
                    if (item.isPaging === '1') {
                        page++;
                        pageList.push(pageCount++);
                    }
                    logicList.map(k => {
                        if (item.isPaging !== '1') {
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
                        }
                    })
                });
                isPaging && questionList.push({//如果有分页添加最后一页的对象
                    "contentCheck": "",
                    "belongToPage": page,
                    "createTime": "当前时间",
                    "createUid": 20,
                    "isBlank": 0,
                    "isCommon": "",
                    "isNps": "",
                    "isPaging": "1",//分页数据
                    "isSatisfied": "",
                    "lenthCheck": "",
                    "optionLayout": "",
                    "optionList": "",
                    "questionCategory": "",
                    "questionName": "",
                    "questionName2": "",
                    "questionOrder": questionList[questionList.length - 1].questionOrder,
                    "questionType": "00",
                    "status": ""
                })
                this.setState({
                    loading: false,
                    isPaging: isPaging,
                    pageCount: pageCount - 1,
                    pageList: [...pageList],
                    questionList: questionList,
                    qstnaireTitle: result.qstnaireTitle
                });
            })
        })
    }

    //单选框值改变
    onRadioChange = (e) => {
        this.over = false;//将跳转至结束变为false
        let questionList = this.state.questionList.filter(question => {//去除分页数据
            question.optionFilteredList = [];
            return question.isPaging === '0';
        });
        questionList[e.target.questionIndex - 1].optionList.forEach(item => {//将当前所选选项的题目的选项值全部变为false，仅对单选
            item.checked = false;
        });
        questionList[e.target.questionIndex - 1].value = e.target.value;//给questionList对应题目赋值所选值
        questionList[e.target.questionIndex - 1].showTip = false;//将未填写必填的提示去除
        questionList[e.target.questionIndex - 1].optionList[e.target.value - 1].checked = e.target.checked;//将当前选项的值改为选项值
        //将为true的选项放在最后执行逻辑判断，覆盖同题其他false选项的逻辑判断带来的显示隐藏影响
        let rightOption = {};
        questionList[e.target.questionIndex - 1].optionList = questionList[e.target.questionIndex - 1].optionList.filter(o => {
            if (o.checked)
                rightOption = o;
            return !o.checked
        })
        questionList[e.target.questionIndex - 1].optionList.push(rightOption);
        questionList[e.target.questionIndex - 1].optionList.map(item => {//遍历当前单选题所有选项的逻辑
            item.logicList.length && item.logicList.map(k => {//遍历此选项相关的所有逻辑然后找到所有相关逻辑的题目的选项然后依次判断
                let skiptoQuestionOrder = k.skiptoQuestionOrder;//找到当前逻辑被相关的题目序号
                let relatedLogicList = this.state.logicList.filter(logic => {
                    return logic.skiptoQuestionOrder === skiptoQuestionOrder//根据题目序号找到所有和此题目有关的所有逻辑
                });
                let relatedQuestionList = relatedLogicList.map(logic => {//遍历所有相关逻辑，与题目列表相匹配，过滤出所有相关题目及其相关选项
                    let optionArr = logic.optionOrder.split(',');
                    return questionList.filter(question => {
                        if (logic.setupQuestionOrder === question.questionOrder) {
                            question.optionFilteredList.push(question.optionList.filter(option => {
                                return optionArr.includes(option.optionOrder.toString())
                            }))
                        }
                        return logic.setupQuestionOrder === question.questionOrder
                    })
                })
                let arr000 = [], arr001 = [], arr010 = [], arr011 = [], arr01 = [];//定义关联且，关联或，跳转且，跳转或空数组用来存放满足条件的option
                relatedQuestionList.map(list => {//对相关题的相关选项根据关联和跳转，且和或进行分组
                    list.map(question => {
                        question.optionFilteredList.length && question.optionFilteredList.map(optionFiltered => {
                            optionFiltered.map(option => {
                                option.logicList.map(logic => {
                                    if (logic.logicType === '00' && logic.andOr === 0) {//关联的且逻辑
                                        arr000.push(option);
                                    } else if (logic.logicType === '00' && logic.andOr === 1) {//关联的或逻辑
                                        arr001.push(option)
                                        // } else if (logic.logicType === '01' && logic.andOr === 0) {//跳转的且逻辑
                                        //     arr010.push(option)
                                        // } else if (logic.logicType === '01' && logic.andOr === 1) {//跳转的或逻辑
                                        //     arr011.push(option)
                                    } else if (logic.logicType === '01') {//跳转的逻辑
                                        arr01.push(option)
                                    }
                                })
                            })
                        })
                    })
                });
                if (k.logicType === '00') {//关联逻辑判断
                    questionList[skiptoQuestionOrder - 1].isShow = [arr000, arr001].some((arr, i) => {//或的被关联题关联逻辑的结果
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
                } else {//跳转逻辑判断
                    // questionList[skiptoQuestionOrder - 1].isJump = [arr010, arr011].some((arr, i) => {//获得被跳转题跳转逻辑结果
                    //     if (arr.length) {
                    //         if (i === 0) {//跳转且逻辑
                    //             return arr.every(option => {
                    //                 return option.checked;
                    //             })
                    //         } else if (i === 1) {//跳转或逻辑
                    //             return arr.some(option => {
                    //                 return option.checked;
                    //             })
                    //         }
                    //     } else return false;
                    // })
                    if (skiptoQuestionOrder === -1 || skiptoQuestionOrder === -2) {//直接调至结尾
                        let isOver = arr01.some(option => {
                            return option.checked;
                        })
                        if (isOver) {
                            questionList.map((item, i) => {
                                if (i > (e.target.questionIndex - 1)) {
                                    item.jumped = true;
                                }
                            });
                            this.over = skiptoQuestionOrder;//将跳转至结束,-1为记录结果，-2为不记录结果
                        } else {
                            questionList.map((item, i) => {
                                if (i > (e.target.questionIndex - 1)) {
                                    item.jumped = false;
                                }
                            });
                            this.over = false;//将跳转至结束设为false
                        }
                    } else {
                        questionList[skiptoQuestionOrder - 1].isJump = [arr01].some((arr, i) => {//获得被跳转题跳转逻辑结果
                            if (arr.length) {
                                return arr.some(option => {
                                    return option.checked;
                                })
                            } else return false;
                        })
                        if (questionList[skiptoQuestionOrder - 1].isJump)//如果此题确实跳转则将选择题和被跳转题之间题全部隐藏
                            questionList.map((item, i) => {
                                if (i > (e.target.questionIndex - 1) && i < (skiptoQuestionOrder - 1)) {
                                    item.jumped = true;
                                }
                            })
                        else//如果此题不跳转则将选择题和被跳转题之间题隐藏属性去掉
                            questionList.map((item, i) => {
                                if (i > (e.target.questionIndex - 1) && i < (skiptoQuestionOrder - 1)) {
                                    item.jumped = false;
                                }
                            })
                    }
                }
            })
        });
        //将之前替换的位置换回来
        let length = questionList[e.target.questionIndex - 1].optionList.length;
        let lastOption = questionList[e.target.questionIndex - 1].optionList[length - 1];
        questionList[e.target.questionIndex - 1].optionList.splice(length - 1, 1);
        questionList[e.target.questionIndex - 1].optionList.splice(lastOption.optionOrder - 1, 0, lastOption);
        let questionResultList = this.state.questionList.map(question => {//将分页信息装回
            questionList.map(item => {
                if (question.questionOrder === item.questionOrder && question.isPaging !== '1') {
                    question = item
                }
            })
            return question;
        })
        this.setState({questionList: [...questionResultList]})
    }
    //复选框值改变
    onCheckBoxChange = (questionIndex, checkList) => {
        this.over = false;
        let questionList = this.state.questionList.filter(question => {//去除分页数据
            question.optionFilteredList = [];
            return question.isPaging === '0';
        });
        //将未填写必填的提示去除
        checkList.length ? questionList[questionIndex - 1].showTip = false : questionList[questionIndex - 1].showTip = true;//将未填写必填的提示加上

        questionList[questionIndex - 1].value = checkList.join(',');//给questionList对应题目赋值所选值

        questionList[questionIndex - 1].optionList.forEach(item => {//将当前所选选项的题目的选项值全部变为false，仅对单选
            item.checked = false;
        });
        checkList.map(optionIndex => {
            questionList[questionIndex - 1].optionList[optionIndex - 1].logicList.length && questionList[questionIndex - 1].optionList[optionIndex - 1].logicList.map(k => {//遍历此选项相关的所有逻辑然后找到所有相关逻辑的题目的选项然后依次判断
                if (k.optionOrder.includes(optionIndex)) {//如果该逻辑所关联的选项包含该选项，是则将此optionList的每个checked改为true,因为多选选项间是或的关系
                    k.optionOrder.split(',').map(i => {
                        questionList[questionIndex - 1].optionList[i - 1].checked = true;
                    })
                }
            })
        });
        questionList[questionIndex - 1].optionList.map(item => {//遍历当前题所有选项的逻辑
            item.logicList.length && item.logicList.map(k => {//遍历此选项相关的所有逻辑然后找到所有相关逻辑的题目的选项然后依次判断
                let skiptoQuestionOrder = k.skiptoQuestionOrder;//找到当前逻辑被相关的题目序号
                let relatedLogicList = this.state.logicList.filter(logic => {
                    return logic.skiptoQuestionOrder === skiptoQuestionOrder//根据题目序号找到所有和此题目有关的所有逻辑
                });
                let relatedQuestionList = relatedLogicList.map(logic => {//遍历所有相关逻辑，与题目列表相匹配，过滤出所有相关题目及其相关选项
                    return questionList.filter(question => {
                        if (logic.setupQuestionOrder === question.questionOrder) {
                            question.optionFilteredList.push(question.optionList.filter(option => {
                                let optionArr = logic.optionOrder.split(',');
                                return optionArr.includes(option.optionOrder.toString())
                            }))
                        }
                        return logic.setupQuestionOrder === question.questionOrder
                    })
                })
                let arr000 = [], arr001 = [], arr010 = [], arr011 = [], arr01 = [];//定义关联且，关联或，跳转且，跳转或空数组用来存放满足条件的option
                relatedQuestionList.map(list => {//对相关题的相关选项根据关联和跳转，且和或进行分组
                    list.map(question => {
                        question.optionFilteredList.length && question.optionFilteredList.map(optionFiltered => {
                            optionFiltered.map(option => {
                                option.logicList.map(logic => {
                                    if (logic.logicType === '00' && logic.andOr === 0) {//关联的且逻辑
                                        arr000.push(option);
                                    } else if (logic.logicType === '00' && logic.andOr === 1) {//关联的或逻辑
                                        arr001.push(option)
                                        // } else if (logic.logicType === '01' && logic.andOr === 0) {//跳转的且逻辑
                                        //     arr010.push(option)
                                        // } else if (logic.logicType === '01' && logic.andOr === 1) {//跳转的或逻辑
                                        //     arr011.push(option)
                                    } else if (logic.logicType === '01') {//跳转的逻辑
                                        arr01.push(option)
                                    }
                                })
                            })
                        })
                    })
                });
                if (k.logicType === '00') {//关联逻辑判断
                    questionList[skiptoQuestionOrder - 1].isShow = [arr000, arr001].some((arr, i) => {//或的被关联题关联逻辑的结果
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
                } else {//跳转逻辑判断
                    // questionList[skiptoQuestionOrder - 1].isJump = [arr010, arr011].some((arr, i) => {//获得被跳转题跳转逻辑结果
                    //     if (arr.length) {
                    //         if (i === 0) {//跳转且逻辑
                    //             return arr.every(option => {
                    //                 return option.checked;
                    //             })
                    //         } else if (i === 1) {//跳转或逻辑
                    //             return arr.some(option => {
                    //                 return option.checked;
                    //             })
                    //         }
                    //     } else return false;
                    // })
                    if (skiptoQuestionOrder === -1 || skiptoQuestionOrder === -2) {//直接调至结尾
                        let isOver = arr01.some(option => {
                            return option.checked;
                        })
                        if (isOver) {
                            questionList.map((item, i) => {
                                if (i > (questionIndex - 1)) {
                                    item.jumped = true;
                                }
                            });
                            this.over = skiptoQuestionOrder;//将跳转至结束,-1为记录结果，-2为不记录结果
                        } else {
                            questionList.map((item, i) => {
                                if (i > (questionIndex - 1)) {
                                    item.jumped = false;
                                }
                            });
                            this.over = false;//将跳转至结束设为false
                        }
                    } else {
                        questionList[skiptoQuestionOrder - 1].isJump = [arr01].some((arr, i) => {//获得被跳转题跳转逻辑结果
                            if (arr.length) {
                                return arr.some(option => {
                                    return option.checked;
                                })
                            } else return false;
                        })
                        if (questionList[skiptoQuestionOrder - 1].isJump)//如果此题确实跳转则将选择题和被跳转题之间题全部隐藏
                            questionList.map((item, i) => {
                                if (i > (questionIndex - 1) && i < (skiptoQuestionOrder - 1)) {
                                    item.jumped = true;
                                }
                            })
                        else//如果此题不跳转则将选择题和被跳转题之间题隐藏属性去掉
                            questionList.map((item, i) => {
                                if (i > (questionIndex - 1) && i < (skiptoQuestionOrder - 1)) {
                                    item.jumped = false;
                                }
                            })
                    }
                }
            })
        });
        let questionResultList = this.state.questionList.map(question => {//将分页信息装回
            questionList.map(item => {
                if (question.questionOrder === item.questionOrder && question.isPaging !== '1') {
                    question = item
                }
            })
            return question;
        })
        this.setState({questionList: [...questionResultList]})
    }
    // 填空题数据变化
    onBlankChange = (e) => {
        let questionResultList = this.state.questionList.map(question => {//将分页信息装回
            if (question.questionOrder === parseInt(e.target.attributes.questionIndex.value) && question.isPaging !== '1') {
                question.value = e.target.value
                if (question.value)//如果有值，则将未填写必填的提示去除
                    question.showTip = false;
                else
                    question.showTip = true;
            }
            return question;
        })
        this.setState({questionList: [...questionResultList]})
    }

    // 翻页
    changePage(type) {
        let page = this.state.currentPage;
        let pageCount = this.state.pageCount;
        if (type === 'pre') {
            page > 0 ? page-- : page = 1;
        } else {
            if (!this.validIsBlank()) {
                if (this.over) {//调至结尾
                    page = this.state.pageCount;
                } else {
                    page < pageCount ? page++ : page = pageCount;
                }
            }
        }
        this.setState({currentPage: page})
    }

    //提交
    handleSubmit = () => {
        if (!this.validIsBlank()) {
            if (this.over !== -2) {
                let result = this.state.questionList.filter(question => {//去除分页数据获取显示的题目的值
                    return question.isPaging === '0' && question.value && question.display;
                });
                console.log(result)
            } else {
                console.log('无结果')
            }
        }
    }
    //验证必填
    validIsBlank = () => {
        let blankList = this.state.questionList.filter(question => {//去除分页数据判断必填数据是否有值
            if (question.isPaging === '0' && !question.value && question.display && question.isBlank && question.belongToPage === this.state.currentPage) {
                question.showTip = true;
                return question;
            }
        });
        if (blankList.length) {
            this.setState({
                questionList: [...this.state.questionList]
            })
            return true;
        }
    }

    render() {
        let questionnaireBlock = this.state.pageList.map(page => {
            return <div key={page} style={{display: page === this.state.currentPage ? 'block' : 'none'}}>
                {
                    this.state.questionList.map((item, i) => {
                        // isSetup={item.isSetup}//是否是被关联题
                        // isShow={item.isShow}//是否显示被关联题
                        // jumped={item.jumped}//是否被跳过
                        // isJump={item.isJump}//是否跳转题，用于覆盖关联题的隐藏
                        item.display = item.jumped ? false : (item.isJump ? true : (item.isShow ? true : !item.isSetup))
                        if (item.belongToPage === page) {
                            return <InitQuestionList
                                style={{display: item.belongToPage === this.state.currentPage ? 'block' : 'none'}}
                                key={i}
                                questionType={item.questionType}//题目类型
                                index={item.questionOrder}//题目序号
                                isPaging={item.isPaging}//是否为分页
                                pageCount={this.state.pageCount}//总页数
                                questionName={item.questionName}//题目名称
                                optionList={item.optionList}//选项list
                                isBlank={item.isBlank}//是否必填
                                isShowTip={item.showTip}//是否必填
                                display={item.display}//是否显示
                                belongToPage={item.belongToPage}//当前题属于哪一页
                                onRadioChange={this.onRadioChange}
                                onCheckBoxChange={this.onCheckBoxChange}
                                onBlankChange={this.onBlankChange}
                            />
                        }
                    })
                }
            </div>;
        })
        return (
            <Spin spinning={this.state.loading}>
                <Row style={{overflow: 'auto'}} className={'question-preview'}>
                    <Col span={24} className={'surveyhead'}>
                        <h1>{this.state.qstnaireTitle}</h1>
                    </Col>
                    <Col span={12} offset={6}>
                        {questionnaireBlock}
                    </Col>
                    <Col span={12} offset={6} className={'paging'}
                         style={{display: this.state.isPaging ? 'block' : 'none', marginTop: '10px'}}>
                        <Button
                            style={{display: this.over ? 'none' : (this.state.currentPage === 1 ? 'none' : 'inline-block')}}
                            onClick={this.changePage.bind(this, 'pre')}>上一页</Button>
                        <Button
                            style={{display: this.state.currentPage === this.state.pageCount ? 'none' : 'inline-block'}}
                            onClick={this.changePage.bind(this, 'next')}>下一页</Button>
                        <Button
                            style={{display: this.state.currentPage === this.state.pageCount ? 'inline-block' : 'none'}}
                            type="primary" onClick={this.handleSubmit}>提交</Button>
                    </Col>
                </Row>
            </Spin>
        )
    }
}

export default QuestionPreview;
