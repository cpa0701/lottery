import React from 'react';
import {Row, Col, Tabs, Button, Input, Menu, Dropdown, Icon, Pagination, Spin} from "antd"
import TaskResearchService from "../../../services/research/TaskResearchService"
import './missionApplication.less'
import { Collapse } from 'antd';
const Panel = Collapse.Panel;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

class MissionApplication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            questionnaireList: [],
            questionnaireName: '',
            pageNum: 1,
            total: 0
        }
        this.createRequisition = this.createRequisition.bind(this);
    }

   componentWillMount() {
        this.getQuestionnaireList()
    }

    // 获取申请单列表
    getQuestionnaireList = (param) => {
        let params = {
            questionnaireName: this.state.questionnaireName,
            questionType: this.state.questionType,
            questionBusiness: this.state.questionBusiness,
            ...param
        }
       this.setState({
            loading: true
        }, () => TaskResearchService.getTaskList(params).then(result => {
            this.setState({
                questionnaireList: result.list,
                pageNum: result.pageNum,
                total: result.total,
                loading: false
            })
        }))
    }
    //新建申请单
    createRequisition = () => {
        this.props.history.push('/missionMgr/newApplicationForm');
    }
    // 点击流程图
    //handleMenuClick = (key, a, b) => {
       // console.log(key, a, b)
    //}
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
        //流程图
        function callback(key) {
            console.log(key);
        }
        const text = `
                  A dog is a type of domesticated animal.
                  Known for its loyalty and faithfulness,
                  it can be found as a welcome guest in many households across the world.
                `;
        const menu = (
            //审核日志
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
                                    <Col span={16} className={'subject-name'}>{item.qstnaireTitle}
                                    <br/>
                                    <span className={'c1'}>测试结果:测试成功，已确认</span>
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary">查看</Button>
                                        <Button type="primary">预览</Button>
                                        <Button >
                                            流程图 <Icon type="down"/>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span={3}><Icon type="appstore" style={{marginRight: '5px' ,color:'#88d7fd'}}/>问卷分类：{item.catalogId}</Col>
                                    <Col span={3}><Icon type="retweet" style={{marginRight: '5px'}}/>适用渠道：{item.channelId}</Col>
                                    <Col span={3}><Icon type="ant-design" style={{marginRight: '5px'}}/>任务状态：{item.status}</Col>
                                    <Col span={3}><Icon type="clock-circle" style={{marginRight: '5px' ,color:'#fecb45'}}/>申请时间：{item.createUid}</Col>
                                    <Col span={6}><Icon type="eye-o" style={{marginRight: '5px'}}/>调研数： {item.createTime}</Col>
                                </Row>

                        </div>

                    )
                })}
            </Spin>
            <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total}
                        showQuickJumper/>
        </div>
        return (
            <div className={'requisition '}>
                <Button type="primary" className={'newrequisition'} icon="plus" onClick={this.createRequisition}>
                    新建申请单
                </Button>
                <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                    <TabPane tab="我的申请单" key="1">{questionLIst}</TabPane>
                    <TabPane tab="审批中" key="2">{questionLIst}</TabPane>
                    <TabPane tab="已发布" key="3">{questionLIst}</TabPane>
                    <TabPane tab="审核否决" key="4">{questionLIst}</TabPane>
                    <TabPane tab="审核作废" key="5">{questionLIst}</TabPane>
                    <TabPane tab="草稿" key="6">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default MissionApplication;
