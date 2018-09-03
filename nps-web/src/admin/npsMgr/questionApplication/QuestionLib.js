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
            questionType: '',
            questionBusiness: undefined,
            pageNum: 1,
            pageSize: 10,
            loading: false,
            isNps: '',
            isSatisfied: ''
        }
    }

    componentWillMount() {
        this.refreshLib();
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
    refreshLib = () => {
        let params = {
            questionName: this.state.questionName,
            questionType: this.state.questionType,
            questionCategory: '',
            isNps: this.state.isNps,
            isSatisfied: this.state.isSatisfied,
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
        };
        this.setState({
            loading: true
        }, () => {
            QuestionLibMgrService.getQuestionList(params).then(result => {
                if (result) {
                    this.setState({
                        questionList: result.rows,
                        total: result.totalCount
                    })
                }
                this.setState({
                    loading: false
                })
            });
        })
    };

    onPageChange = (page) => {
        this.setState({
            pageNum: page,
        });
        this.refreshLib();
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
                                           this.setState({questionName: value}, () => this.refreshLib())
                                       }}/>
                            </Col>
                            <Col span={12}>
                                <Select placeholder={'请选择题型'}
                                        onChange={(e) => {
                                            this.setState({questionType: e}, () => this.refreshLib())
                                        }}>
                                    <Option value={'01'}>单选</Option>
                                    <Option value={'02'}>多选</Option>
                                    <Option value={'03'}>填空</Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Select placeholder={'请选择业务类型'}
                                        onChange={(e) => {
                                          this.setState({isNps: e ? 0 : 1, isSatisfied:e ? 1 : 0}, () => this.refreshLib())
                                        }}>
                                    <Option value={0}>nps</Option>
                                    <Option value={1}>满意度</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div className={'questionLibContent'}>
                        {this.state.questionList.map((question, i) => {
                            return <InitQuestionList key={i} getDom={this.props.getDom} question={question} index={i} isLib={true}/>
                        })}
                    </div>
                    {this.state.questionList.length === 0 ? '' :
                        <Pagination current={this.state.pageNum} onChange={this.onPageChange} total={this.state.total} pageSize={this.state.pageSize} showQuickJumper/>
                    }
                </div>
            </Spin>)
    }
}

export default QuestionLib;