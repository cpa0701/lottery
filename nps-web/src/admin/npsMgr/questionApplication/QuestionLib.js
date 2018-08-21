/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Input, Pagination, Select, Spin} from "antd"
import QuestionLibMgrService from "../../../services/question/QuestionLibMgrService"
import InitQuestionList from './InitQuestionList'

const {Option} = Select;

class QuestionLib extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            questionName: '',
            questionType: undefined,
            questionBusiness: undefined,
            pageNum: 1,
            loading: false,
            isNps: undefined,
            isSatisfied: undefined
        }
    }

    componentWillMount() {
        this.refreshLib(1);
    }

    getInteger = (value) => {
        if (typeof(value) === 'number') {
            return value;
        }
        else if (typeof(value) === 'string') {
            return parseInt(value, 10);
        }
        else {
            return 0;
        }
    };
    //刷新题库
    refreshLib = (page) => {
        let params = {
            questionName: this.state.questionName,
            questionType: this.state.questionType,
            isNps:this.state.isNps,
            isSatisfied:this.state.isSatisfied,
            pageNum: page,
        };
        this.setState({
            loading: true
        }, () => {
            QuestionLibMgrService.getQuestionList(params).then(result => {
                if (result) {
                    this.setState({
                        questionList: result.list,
                        pageNum: this.getInteger(result.pageNum)
                    })
                }
                this.setState({
                    loading: false
                })
            });
        })
    };

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div className={'questionLib'}>
                    <div className={'questionLibTitle'}>
                        <h1>题库列表</h1>
                        <Row gutter={16}>
                            <Col span={24} style={{marginBottom: '10px'}}>
                                <Input placeholder="请输入题目"
                                       onKeyUp={(e) => {
                                           let value = e.target.value;
                                           this.setState({questionName: value}, () => this.refreshLib(1))
                                       }}/>
                            </Col>
                            <Col span={12}>
                                <Select placeholder={'请选择题型'}
                                        onChange={(e) => {
                                            this.setState({questionType: e}, () => this.refreshLib(1))
                                        }}>
                                    <Option value={0}>单选</Option>
                                    <Option value={1}>多选</Option>
                                    <Option value={2}>填空</Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Select placeholder={'请选择业务类型'}
                                        onChange={(e) => {
                                          this.setState({isNps:e?0:1,isSatisfied:e?1:0}, () => this.refreshLib(1))
                                        }}>
                                    <Option value={0}>nps</Option>
                                    <Option value={1}>满意度</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div className={'questionLibContent'}>
                        {this.state.questionList.map((question, i) => {
                            return <InitQuestionList getDom={this.props.getDom} questionType={question.questionType} key={question.questionId} questionId={question.questionId}
                                                     index={i} questionName={question.questionName} questionOrder={question.questionOrder} isLib={true} optionList={question.optionList}/>
                        })}
                    </div>
                    <Pagination current={this.state.pageNum} onChange={this.refreshLib} total={50}/>
                </div>
            </Spin>)
    }
}

export default QuestionLib;