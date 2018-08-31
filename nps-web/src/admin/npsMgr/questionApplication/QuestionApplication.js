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
            vetoAudit: 0,
            waitMission: 0,
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
            pageSize: this.state.pageSize,
            ...param
        };
        this.setState({
            loading: true
        }, () => QuestionApplicationService.getQuestionnaireList(params).then(result => {
            if(result) {
                if(params.status === '') {
                    let opened = result.rows.filter(item => item.status === '启用');
                    let waitMission = result.rows.filter(item => item.status === '待审核');
                    let vetoAudit = result.rows.filter(item => item.status === '审核不通过');
                    let draught = result.rows.filter(item => item.status === '草稿');
                    this.setState({
                        total: result.totalCount,
                        opened: opened.length,
                        waitMission: waitMission.length,
                        vetoAudit: vetoAudit.length,
                        draught: draught.length
                    })
                }
                this.setState({
                    qstnaireList: result.rows,
                    loading: false
                })
            }
        }))
    };

    //创建问卷
    createQuestion = () => {
        this.props.history.push('/npsMgr/questionMgr/questionEdit/666');
    };
    // 编辑问卷
    editQstnaire = (id) => {
        this.props.history.push('/npsMgr/questionMgr/questionEdit/'+ id)
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
    submitQstnaire = (id, status) => {
        let params = {
            qstnaireId: id,
            actType: status,
            actInfo: ''
        };

        this.setState({
            loading: true
        }, () => QuestionApplicationService.submitQstnaire(params).then(result => {
            message.success('已提交审核');
            this.setState({loading: false});
            this.getQuestionnaireList();
        }))
    };
    // 查看问卷
    showQstnaire = (id) => {
        let params = {id: id, type: 'check'};
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/qstnairePreview/${params}`);
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
        const { qstnaireList, total, opened, waitMission, draught, vetoAudit } = this.state;

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
                                                    <Col span={15} className={'subject-name'}>{item.qstnaireTitle}</Col>
                                                    <Col span={9} style={{textAlign: 'right', paddingRight: '40px'}}>
                                                        <Button type="primary" onClick={() => this.showQstnaire(item.qstnaireId)}>查看</Button>
                                                        {item.status === '启用' || item.status === '待审核' ? '' :
                                                           <div style={{display: 'inline-block'}}>
                                                               <Button type="primary" onClick={() => this.editQstnaire(item.qstnaireId)}>编辑</Button>
                                                               <Popconfirm title="确定删除该问卷?" onConfirm={() => this.delQstnaire(item.qstnaireId)}>
                                                                   <Button type="danger" icon="delete">删除</Button>
                                                               </Popconfirm>
                                                               <Button type="primary" onClick={() => this.submitQstnaire(item.qstnaireId, '03')}>提交</Button>
                                                           </div>
                                                        }
                                                        {/*<Dropdown overlay={menu}>*/}
                                                            {/*<Button>*/}
                                                                {/*审核日志 <Icon type="down"/>*/}
                                                            {/*</Button>*/}
                                                        {/*</Dropdown>*/}
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
                                {qstnaireList.length === 0 ?
                                    <div style={{padding: '20px', textAlign: 'center'}}>暂无数据</div> :
                                    <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total} showQuickJumper/>}
                            </div>;

        let tab1Title = "我的全部问卷( 共" + total + "条 )";
        let tab2Title = "已启用( " + opened + " )";
        let tab3Title = "待审核( " + waitMission + " )";
        let tab4Title = "审核否决( " + vetoAudit + " )";
        let tab5Title = "草稿( " + draught + " )";

        return (
            <div className={'questionnaire'}>
                <Button type="primary" icon="plus" onClick={this.createQuestion}>
                    创建问卷
                </Button>
                <Tabs tabBarExtraContent={operations} defaultActiveKey={""} onTabClick={this.onTabClick}>
                    <TabPane tab={tab1Title} key="" >{questionLIst}</TabPane>
                    <TabPane tab={tab2Title} key="01">{questionLIst}</TabPane>
                    <TabPane tab={tab3Title} key="03">{questionLIst}</TabPane>
                    <TabPane tab={tab4Title} key="04">{questionLIst}</TabPane>
                    <TabPane tab={tab5Title} key="02">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default QuestionApplication;
