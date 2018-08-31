import React from 'react';
import {Row, Col, Tabs, Button, Input, Menu, Icon, Pagination, Spin, Popconfirm, message} from "antd"

import './questionApplication.less'
import QuestionApplicationService from "../../../services/question/QuestionApplicationService";

const Search = Input.Search;
const TabPane = Tabs.TabPane;

class QuestionReview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            qstnaireList: [],
            qstnaireTitle: '',
            status: "",
            waitAudit: 0,
            passAudit: 0,
            vetoAudit: 0,
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
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
                let waitAudit = [], passAudit = [], vetoAudit = [];
                if(params.status === '') {
                    waitAudit = result.rows.filter(item => item.status === '待审核');
                    passAudit = result.rows.filter(item => item.status === '启用');
                    vetoAudit = result.rows.filter(item => item.status === '审核不通过');
                    this.setState({
                        total: result.totalCount,
                        waitAudit: waitAudit.length,
                        passAudit: passAudit.length,
                        vetoAudit: vetoAudit.length,
                        qstnaireList: waitAudit,
                        loading: false
                    })
                } else {
                    this.setState({
                        qstnaireList: result.rows,
                        loading: false
                    })
                }
            }
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
            if(status === '01') {
                message.success('已审核通过');
            } else {
                message.success('已审核否决');
            }
            this.setState({loading: false});
            this.getQuestionnaireList();
        }))
    };

    // 查看问卷
    showQstnaire = (id) => {
        let params = { id: id, type: 'check' };
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/qstnairePreview/${params}`);
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
        const { qstnaireList, waitAudit, passAudit, vetoAudit } = this.state;

        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => this.onSearch(value)}
            enterButton
        />;
        const questionLIst = <div>
                                <Spin spinning={this.state.loading}>
                                    {qstnaireList.map(item => {
                                        return (<div key={item.qstnaireId} className={'sub-li'}>
                                                <Row type="flex" justify="space-between">
                                                    <Col span={15} className={'subject-name'}>{item.qstnaireTitle}</Col>
                                                    <Col span={9} style={{textAlign: 'right', paddingRight: '40px'}}>
                                                        <Button type="primary" onClick={() => this.showQstnaire(item.qstnaireId)}>查看</Button>
                                                        {item.status === '' || item.status === '启用' || item.status === '审核不通过' ? '' :
                                                            <div style={{display: 'inline-block'}}>
                                                                <Button type="primary" onClick={() => this.submitQstnaire(item.qstnaireId, '01')}>通过</Button>
                                                                <Popconfirm title="确定否决该问卷?" onConfirm={() => this.submitQstnaire(item.qstnaireId, '04')}>
                                                                    <Button type="danger">否决</Button>
                                                                </Popconfirm>
                                                            </div>
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="start">
                                                    <Col span={3}><Icon type="appstore" style={{marginRight: '5px'}}/>问卷分类：{item.catalogName}
                                                    </Col>
                                                    <Col span={3}><Icon type="ant-design" style={{marginRight: '5px'}}/>状态：{item.status}
                                                    </Col>
                                                    <Col span={3}><Icon type="user" style={{marginRight: '5px'}}/>创建人：{item.createUname}</Col>
                                                    <Col span={6}><Icon type="clock-circle" style={{marginRight: '5px'}}/>创建时间： {item.updateTime}
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
        // let tab1Title = "全部问卷( 共" + total + "条 )";
        let tab2Title = "待我审核( 共" + waitAudit + "条 )";
        let tab3Title = "审核通过( " + passAudit + " )";
        let tab4Title = "审核否决( " + vetoAudit + " )";

        return (
            <div className={'questionnaire'}>
                <Tabs tabBarExtraContent={operations} defaultActiveKey={"03"} onTabClick={this.onTabClick}>
                    {/*<TabPane tab={tab1Title} key="" >{questionLIst}</TabPane>*/}
                    <TabPane tab={tab2Title} key="03" >{questionLIst}</TabPane>
                    <TabPane tab={tab3Title} key="01">{questionLIst}</TabPane>
                    <TabPane tab={tab4Title} key="04">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default QuestionReview;
