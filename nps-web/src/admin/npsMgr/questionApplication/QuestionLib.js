/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Input, Pagination, Select, Spin} from "antd"
import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
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
            loading: false
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
    }
    //刷新题库
    refreshLib = (page) => {
        let params = {
            questionName: this.state.questionName,
            questionType: this.state.questionType,
            questionBusiness: this.state.questionBusiness,
            pageNum: page,
        }
        this.setState({
            loading: true
        }, () => {
            QuestionApplicationService.getQuestionList(params).then(result => {
                if (result) {
                    this.setState({
                        questionList: result.result.list,
                        pageNum: this.getInteger(result.result.pageNum)
                    })
                }
                this.setState({
                    loading: false
                })
            });
        })
    }

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
                                            this.setState({questionBusiness: e}, () => this.refreshLib(1))
                                        }}>
                                    <Option value={0}>nps</Option>
                                    <Option value={1}>满意度</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div className={'questionLibContent'}>
                        {this.state.questionList.map((question, i) => {
                            return <InitQuestionList getDom={this.props.getDom} type={question.type} key={question.id}
                                                     index={i} title={question.title} isLib={true}/>
                        })}
                    </div>
                    <Pagination current={this.state.pageNum} onChange={this.refreshLib} total={50}/>
                </div>
            </Spin>)
    }
}

export default QuestionLib;