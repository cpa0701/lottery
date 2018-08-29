import React from 'react';
import {Row, Col, Tabs, Button, Input, Menu, Dropdown, Icon, Pagination, Spin, Popconfirm, message} from "antd"

import './questionApplication.less'
import QuestionApplicationService from "../../../services/question/QuestionApplicationService";

const Search = Input.Search;
const TabPane = Tabs.TabPane;

class QuestionApplication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            qstnaireList: [],
            qstnaireTitle: '',
            status: "",
            opened: 0,
            draught: 0,
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
        this.createQuestion = this.createQuestion.bind(this);
        if(this.props.location.state && this.props.location.state.isFresh)   this.getQuestionnaireList();
    }

    componentWillMount() {
        this.getQuestionnaireList()
    }

    // 获取问卷列表
    getQuestionnaireList = (param) => {
        let params = {
            qstnaireTitle: this.state.qstnaireTitle,
            status: this.state.status,
            pageNum: this.state.pageNum,
            pagesize: this.state.pageSize,
            ...param
        };
        this.setState({
            loading: true
        }, () => QuestionApplicationService.getQuestionnaireList(params).then(result => {
            if(result) {
                let opened = result.rows.filter(item => item.status === '已启用');
                let draught = result.rows.filter(item => item.status === '草稿');
                this.setState({
                    qstnaireList: result.rows,
                    total: result.totalCount,
                    opened: opened.length,
                    draught: draught.length,
                    loading: false
                })
            }
        }))
    };

    //创建问卷
    createQuestion = () => {
        this.props.history.push('/npsMgr/questionMgr/questionEdit');
    };
    // 编辑问卷
    editQstnaire = (id) => {
        this.setState({
            loading: true
        }, () => QuestionApplicationService.getQstnaireById({qstnaireId: id}).then(result => {
            if(result) {
                this.setState({loading: false});
                let record = result.data;
                this.props.history.push({pathname: '/npsMgr/questionMgr/questionEdit', state: {record}})
            }
        }))
    };
    // 删除问卷
    delQstnaire = (id) => {
        this.setState({
            loading: true
        }, () => QuestionApplicationService.delQstnaire({qstnaireId: id}).then(result => {
            message.success('删除成功');
            this.setState({loading: false});
            this.getQuestionnaireList();
        }))
    };
    // 提交问卷
    submitQstnaire = (id) => {
        this.setState({
            loading: true
        }, () => QuestionApplicationService.submitQstnaire({qstnaireId: id}).then(result => {
            message.success('提交成功');
            this.setState({loading: false});
            this.getQuestionnaireList();
        }))
    };

    // 点击审核日志
    handleMenuClick = (key, a, b) => {
        console.log(key, a, b)
    };
    //tab标签被点击
    onTabClick = (key) => {
        this.setState({
            questionnaireList: []
        }, () => this.getQuestionnaireList({status: key}))
    };
    //输入框输入
    onSearch = (value) => {
        this.setState({
            qstnaireTitle: value
        }, () => this.getQuestionnaireList())
    };
    //列表分页
    refreshList = (page) => {
        this.getQuestionnaireList({pageNum: page,});
    };

    render() {
        const { qstnaireList, total, opened, draught } = this.state;

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
        const questionLIst = <div>
                                <Spin spinning={this.state.loading}>
                                    {qstnaireList.map(item => {
                                        return (<div key={item.qstnaireId} className={'sub-li'}>
                                                <Row type="flex" justify="space-between">
                                                    <Col span={16} className={'subject-name'}>{item.qstnaireTitle}</Col>
                                                    <Col span={8}>
                                                        <Button type="primary">查看</Button>
                                                        <Button type="primary" onClick={() => this.editQstnaire(item.qstnaireId)}>编辑</Button>
                                                        <Popconfirm title="确定删除该问卷?" onConfirm={() => this.delQstnaire(item.qstnaireId)}>
                                                            <Button type="danger" icon="delete">删除</Button>
                                                        </Popconfirm>
                                                        <Button type="primary" onClick={() => this.submitQstnaire(item.qstnaireId)}>提交</Button>
                                                        <Dropdown overlay={menu}>
                                                            <Button>
                                                                审核日志 <Icon type="down"/>
                                                            </Button>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="start">
                                                    <Col span={3}><Icon type="appstore" style={{marginRight: '5px'}}/>分类：{item.catalogName}
                                                    </Col>
                                                    <Col span={3}><Icon type="ant-design" style={{marginRight: '5px'}}/>状态：{item.status}
                                                    </Col>
                                                    <Col span={3}><Icon type="user" style={{marginRight: '5px'}}/>创建人：{item.createUname}</Col>
                                                    <Col span={6}><Icon type="clock-circle" style={{marginRight: '5px'}}/>编辑时间： {item.updateTime}
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })}
                                </Spin>
                                <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total} showQuickJumper/>
                            </div>;

        let tab1Title = "我的全部问卷( 共" + total + "条 )";
        let tab2Title = "已启用( " + opened + " )";
        let tab3Title = "待审核( " + 0 + " )";
        let tab4Title = "审核否决( " + 0 + " )";
        let tab5Title = "草稿( " + draught + " )";

        return (
            <div className={'questionnaire'}>
                <Button type="primary" icon="plus" onClick={this.createQuestion}>
                    创建问卷
                </Button>
                <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                    <TabPane tab={tab1Title} key="全部问卷">{questionLIst}</TabPane>
                    <TabPane tab={tab2Title} key="已启用">{questionLIst}</TabPane>
                    <TabPane tab={tab3Title} key="待审核">{questionLIst}</TabPane>
                    <TabPane tab={tab4Title} key="审核否决">{questionLIst}</TabPane>
                    <TabPane tab={tab5Title} key="草稿">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default QuestionApplication;
