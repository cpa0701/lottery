import React from 'react';
import {Row, Col, Tabs, Button, Input, Icon, Pagination, Spin, message, Popconfirm} from "antd"

import QuestionLibMgrService from "../../../services/question/QuestionLibMgrService";
import QuestionShow from './QuestionShow';
import '../questionApplication/questionApplication.less';
import './questionLibMgr.less';

const Search = Input.Search;
const TabPane = Tabs.TabPane;

class QuestionLibMgr extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            questionList: [],
            record: {},
            show: false,
            pageNum: 1,
            total: 0,
            pageSize: 10,
        };
        this.createQuestion = this.createQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.refreshLib = this.refreshLib.bind(this);
    }

    componentWillMount() {
        this.refreshLib();
    }

    // 获取题目列表
    getQuestionList = (params) => {
        this.setState({
            loading: true
        }, () => QuestionLibMgrService.getQuestionList(params).then(result => {
            if (result) {
                this.setState({
                    questionList: result.rows,
                    total: result.totalCount,
                    loading: false
                })
            }
        }))
    };
    // 创建题目
    createQuestion = () => {
        this.props.history.push('/npsMgr/questionAddMgr/666');
    };

    // 查看题目
    showQuestion = (show, record) => {
        if (show) {
            this.setState({show: true, record});
        } else {
            this.setState({show: false});
        }
    };
    // 编辑题目
    editQuestion = (record) => {
        this.props.history.push({pathname: '/npsMgr/questionAddMgr/' + record.questionId})
    };
    // 删除题目
    delQuestion = (id) => {
        this.setState({
            loading: true
        }, () => QuestionLibMgrService.delQuestion({questionId: id}).then(result => {

            message.success('删除成功');
            this.setState({loading: false});
            this.refreshLib();
        }))
    };
    //刷新题库
    refreshLib = () => {
        let obj = {
            pageNum: this.state.pageNum,
            questionCategory: '',
            questionName: '',
            pageSize: this.state.pageSize,
            isNps: '',
            questionType: '',
            isSatisfied: ''
        };
        this.getQuestionList(obj)
    };
    onPageChange = (page) => {
        this.setState({
            pageNum: page,
        }, () => this.refreshLib());
    };

    render() {
        const {questionList, total, pageNum, show, record, pageSize} = this.state;

        let tabTitle = "全部题目( 共" + total + "条 )";
        const showQuestionProps = {
            show,
            questionList: [record],
            onClose: () => {
                this.showQuestion(false);
            }
        };
        const questionLIst = <div className="listStyle">
            <Spin spinning={this.state.loading}>
                {questionList.length ? questionList.map((item, k) => {
                    return (<div key={item.questionId} className={'sub-li'}>
                            <Row type="flex" justify="space-between" className='titleStyle'>
                                <Col span={18} className={'subject-name'}>{item.questionName}</Col>
                                <Col span={6} style={{textAlign: 'right', paddingRight: '40px'}}>
                                    <Button type="primary" onClick={() => this.showQuestion(true, item)}
                                            icon="eye-o">查看</Button>
                                    <Button type="primary" onClick={() => this.editQuestion(item)}
                                            icon="edit">编辑</Button>
                                    <Popconfirm title="你确定删除该题目?" onConfirm={() => this.delQuestion(item.questionId)}>
                                        <Button type="danger" icon="delete">删除</Button>
                                    </Popconfirm>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={3}><Icon type="info-circle-o" style={{marginRight: '5px'}}/>
                                    题型：{item.questionType === '01' ? '单选题' :
                                            item.questionType === '02' ? '多选题' :
                                                item.questionType === '03' ? '单项填空' :
                                                    item.questionType === '04' ? '多项填空' : '其他类型'}
                                </Col>
                                <Col span={3}><Icon type="appstore-o" style={{marginRight: '5px'}}/>
                                    分类：{item.questionCategory === 1 ? '终端' :
                                            item.questionCategory === 2 ? '套餐' :
                                                item.questionCategory === 3 ? '流量' :
                                                    item.questionCategory === 4 ? '账单' : '未知分类'}
                                </Col>
                                <Col span={3}><Icon type="check-square-o" style={{marginRight: '5px'}}/>
                                    NPS评分题：{item.isNps === 0 ? '否' : item.isNps === 1 ? '是' : ''}
                                </Col>
                                <Col span={3}><Icon type="like-o" style={{marginRight: '5px'}}/>
                                    满意度评分题：{item.isSatisfied === 0 ? '否' : item.isSatisfied === 1 ? '是' : ''}
                                </Col>
                                <Col span={3}><Icon type="user" style={{marginRight: '5px'}}/>创建人：{item.createUname}</Col>
                                <Col span={5}><Icon type="clock-circle-o" style={{marginRight: '5px'}}/>创建时间： {item.create_time}
                                </Col>
                            </Row>
                        </div>
                    )
                }) : <div style={{padding: '20px', textAlign: 'center'}}>暂无数据</div>}
            </Spin>
            <Pagination current={pageNum} onChange={this.onPageChange} total={total} pageSize={pageSize} showQuickJumper/>
        </div>;
        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => {
                let obj = {
                    pageNum: 1,
                    questionCategory: '',
                    questionName: value,
                    pageSize: this.state.pageSize,
                    isNps: '',
                    questionType: '',
                    isSatisfied: ''
                };
                this.setState({
                    pageNum: 1,
                }, this.getQuestionList(obj));
            }
            }
            enterButton
        />;

        return (
            <div className={'questionnaire'}>
                <Button type="primary" icon="plus" onClick={this.createQuestion}>
                    创建题目
                </Button>
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab={tabTitle} key="1">
                        {questionLIst}
                    </TabPane>
                </Tabs>
                <QuestionShow {...showQuestionProps}/>
            </div>
        )
    }
}

export default QuestionLibMgr;