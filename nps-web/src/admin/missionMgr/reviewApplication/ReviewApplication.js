import React from 'react';
import { Row, Col, Tabs, Input, Button, Tag, Spin, Icon, Pagination } from 'antd';

import TaskResearchService from "../../../services/research/TaskResearchService";

const [Search, TabPane, CheckableTag] = [Input.Search, Tabs.TabPane, Tag.CheckableTag];

const auditTags = [
    {
        title: '全部',
        value: '0'
    },
    {
        title: '正常结束',
        value: '1'
    },
    {
        title: '执行中',
        value: '2'
    },
    {
        title: '草稿',
        value: '3'
    },
    {
        title: '审批',
        value: '4'
    },
    {
        title: '否决',
        value: '5'
    },
    {
        title: '作废',
        value: '6'
    },
    {
        title: '发布',
        value: '7'
    },
    {
        title: '人工终止',
        value: '8'
    }
];

class ReviewApplication extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            taskList: [],
            auditTag: ['0'],
            taskName: '',
            status: "01",
            waitAudit: 0,
            passAudit: 0,
            vetoAudit: 0,
            invalAudit: 0,
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
    }
    componentWillMount() {
        this.getMissionList()
    }

    // 获取申请单列表
    getMissionList = (param) => {
        let params = Object.assign({
            taskName: "",
            actType: "",
            status: '',
            taskType: '',
            pageNum: 1,
            pageSize: 10,
        }, {
            taskName: this.state.taskName,
            ...param
        });
        this.setState({
            loading: true
        }, () => TaskResearchService.getMissionList(params).then(result => {
            if (result){
                let waitAudit = [], passAudit = [], vetoAudit = [], invalAudit = [];
                if(params.status === '') {
                    waitAudit = result.rows.filter(item => item.status === '待审核');
                    passAudit = result.rows.filter(item => item.status === '审核通过');
                    vetoAudit = result.rows.filter(item => item.status === '审核否决');
                    invalAudit = result.rows.filter(item => item.status === '审核作废');
                    this.setState({
                        total: result.totalCount,
                        waitAudit: waitAudit.length,
                        passAudit: passAudit.length,
                        vetoAudit: vetoAudit.length,
                        invalAudit: invalAudit.length,
                        taskList: waitAudit,
                        loading: false
                    })
                } else {
                    this.setState({
                        taskList: result.rows,
                        loading: false
                    })
                }
            }
        }))
    };

    // 任务状态选择
    catalogChange(tag, checked) {
        const { auditTag } = this.state;
        const nextSelectedTags = checked ? [tag] : auditTag.filter(t => t !== tag);
        this.setState({ auditTag: nextSelectedTags }, () => {
            this.getMissionList();
        });
    }

    //tab标签被点击
    onTabClick = (key) => {
        this.setState({
            taskList: []
        }, () => this.getMissionList({status: key}))
    };
    //输入框输入
    onSearch = (value) => {
        this.setState({
            taskName: value
        }, () => this.getMissionList())
    };
    //列表分页
    refreshList = (page) => {
        this.getMissionList({pageNum: page,});
    };

    render(){
        const { taskList, waitAudit, passAudit, vetoAudit, invalAudit, auditTag } = this.state;

        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => this.onSearch(value)}
            enterButton
        />;

        // let tab1Title = "全部任务( 共" + total + "条 )";
        let tab2Title = "待我审核( 共" + waitAudit + "条 )";
        let tab3Title = "审核通过( " + passAudit + " )";
        let tab4Title = "审核否决( " + vetoAudit + " )";
        let tab5Title = "审核作废( " + invalAudit + " )";
        let tab6Title = "已发布( " + passAudit + " )";

        const checkableTag = <Row style={{padding: '10px'}}>
                                <Col span={24}>
                                    <div style={{padding: '10px 5px'}}>
                                        <h6 style={{ marginRight: 8, display: 'inline' }}>任务状态：</h6>
                                        {auditTags.map((tag,k) => (
                                            <CheckableTag
                                                key={k}
                                                checked={auditTag.indexOf(tag.value) > -1}
                                                onChange={checked => this.catalogChange(tag.value, checked)}
                                            >
                                                {tag.title}
                                            </CheckableTag>
                                        ))}
                                    </div>
                                </Col>
                            </Row>;
        const questionLIst = <div>
            <Spin spinning={this.state.loading}>
                {taskList.map(item => {
                    return (<div key={item.qstnaireId} className={'sub-li'}>
                            <Row type="flex" justify="space-between">
                                <Col span={15} className={'subject-name'}>{item.qstnaireTitle}</Col>
                                <Col span={9} style={{textAlign: 'right', paddingRight: '40px'}}>
                                    <Button type="primary" onClick={() => this.showQstnaire(item.qstnaireId)}>查看</Button>
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
            {taskList.length === 0 ?
                <div style={{padding: '20px', textAlign: 'center'}}>暂无数据</div> :
                <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total}/>}
        </div>;

        return(
            <div>
                <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                    <TabPane tab={tab2Title} key="1">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab3Title} key="2">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab4Title} key="3">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab5Title} key="4">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab6Title} key="5">{checkableTag} {questionLIst}</TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ReviewApplication;