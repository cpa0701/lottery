import React from 'react';
import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {Row, Col, Tabs, Button, Input, Menu, Dropdown, Icon, Pagination, Spin} from "antd"

import './questionApplication.less'

const Search = Input.Search;
const TabPane = Tabs.TabPane;

class QuestionApplication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            questionnaireList: [],
            questionnaireName: '',
            pageNum: 1,
            total: 0
        }
        this.createQuestion = this.createQuestion.bind(this);
    }

    componentWillMount() {
        this.getQuestionnaireList()
    }

    // 获取问卷列表
    getQuestionnaireList = (param) => {
        let params = {
            questionnaireName: this.state.questionnaireName,
            questionType: this.state.questionType,
            questionBusiness: this.state.questionBusiness,
            ...param
        }
        this.setState({
            loading: true
        }, () => QuestionApplicationService.getQuestionnaireList(params).then(result => {
            this.setState({
                questionnaireList: result.list,
                pageNum: result.pageNum,
                total: result.total,
                loading: false
            })
        }))
    }
    //创建问卷
    createQuestion = () => {
        this.props.history.push('/npsMgr/questionMgr/questionEdit');
    }
    // 点击审核日志
    handleMenuClick = (key, a, b) => {
        console.log(key, a, b)
    }
    //tab标签被点击
    onTabClick = (key) => {
        this.setState({
            questionnaireList: []
        }, () => this.getQuestionnaireList({catalogId: key}))
    }
    //输入框输入
    onSearch = (value) => {
        this.setState({
            questionnaireName: value
        }, () => this.getQuestionnaireList())
    }
    //列表分页
    refreshList = (page) => {
        this.getQuestionnaireList({pageNum: page,});
    }

    render() {
        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => this.onSearch(value)}
            enterButton
        />;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">1st item</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );
        const {questionnaireList} = this.state;
        const questionLIst = <div>
            <Spin spinning={this.state.loading}>
                {questionnaireList.map(item => {
                    return (<div key={item.qstnaireId} className={'sub-li'}>
                            <Row type="flex" justify="space-between">
                                <Col span={16} className={'subject-name'}>{item.qstnaireTitle}</Col>
                                <Col span={8}>
                                    <Button type="primary">查看</Button>
                                    <Button type="primary">编辑</Button>
                                    <Button type="primary">删除</Button>
                                    <Button type="primary">提交</Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            审核日志 <Icon type="down"/>
                                        </Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={3}><Icon type="appstore" style={{marginRight: '5px'}}/>分类：{item.catalogId}
                                </Col>
                                <Col span={3}><Icon type="ant-design" style={{marginRight: '5px'}}/>状态：{item.status}
                                </Col>
                                <Col span={3}><Icon type="user" style={{marginRight: '5px'}}/>创建人：{item.createUid}</Col>
                                <Col span={3}><Icon type="retweet" style={{marginRight: '5px'}}/>适用渠道：{item.channelId}
                                </Col>
                                <Col span={6}><Icon type="clock-circle"
                                                    style={{marginRight: '5px'}}/>编辑时间： {item.createTime}
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </Spin>
            <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total}
                        showQuickJumper/>
        </div>
        return (
            <div className={'questionnaire'}>
                <Button type="primary" icon="plus" onClick={this.createQuestion}>
                    创建问卷
                </Button>
                <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                    <TabPane tab="我的全部问卷( 共24条 )" key="1">{questionLIst}</TabPane>
                    <TabPane tab="已启用( 5 )" key="2">{questionLIst}</TabPane>
                    <TabPane tab="待审核( 1 )" key="3">{questionLIst}</TabPane>
                    <TabPane tab="审核否决( 0 )" key="4">{questionLIst}</TabPane>
                    <TabPane tab="草稿( 18 )" key="5">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default QuestionApplication;
