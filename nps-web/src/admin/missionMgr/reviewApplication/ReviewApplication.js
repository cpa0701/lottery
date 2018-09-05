import React from 'react';
import { Row, Col, Tabs, Input, Button, Tag, Spin, Icon, Pagination, Popconfirm, message } from 'antd';

import TaskResearchService from "../../../services/research/TaskResearchService";
import '../missionApplication/missionApplication.less'
import FilterTool from "../../../common/utils/FilterTool";

const [Search, TabPane, CheckableTag] = [Input.Search, Tabs.TabPane, Tag.CheckableTag];

const auditTags = [
    {
        title: '全部',
        value: ''
    },
    {
        title: '正常结束',
        value: '00'
    },
    {
        title: '执行中',
        value: '01'
    },
    {
        title: '草稿',
        value: '02'
    },
    {
        title: '审批中',
        value: '03'
    },
    {
        title: '否决',
        value: '04'
    },
    {
        title: '作废',
        value: '05'
    },
    {
        title: '发布',
        value: '06'
    },
    {
        title: '人工终止',
        value: '10'
    }
];

class ReviewApplication extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            taskList: [],
            auditTag: [''],
            actType: "03",
            taskName: '',
            waitAudit: 0,
            passAudit: 0,
            vetoAudit: 0,
            invalAudit: 0,
            publicTask: 0,
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
        let params = {
            taskName: this.state.taskName,
            actType: this.state.actType,
            status: this.state.auditTag[0],
            taskType: '',
            pageNum: 1,
            pageSize: 10,
            ...param
        };
        this.setState({
            loading: true
        }, () => TaskResearchService.getMissionList(params).then(result => {
            if (result){
                this.setState({
                    total: result.totalCount,
                    taskList: result.rows,
                    waitAudit: result.other.status03,
                    passAudit: result.other.status06,
                    vetoAudit: result.other.status04,
                    invalAudit: result.other.status05,
                    publicTask: result.other.status01,
                    loading: false,
                })
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

    // 通过审批
    auditPass = (id) => {
        this.setState({
            loading: true
        }, () => TaskResearchService.auditPass({taskId: id}).then(result => {
            if(result) {
                message.success('已审核通过');
                this.setState({loading: false});
                this.getMissionList();
            }
        }))
    };
    // 否决审批
    auditNoPass = (id) => {
        this.setState({
            loading: true
        }, () => TaskResearchService.auditNoPass({taskId: id}).then(result => {
            if(result) {
                message.success('已审核否决');
                this.setState({loading: false});
                this.getMissionList();
            }
        }))
    };

    // 内测并发布
    publicTask = (id, type) => {
        let params = {
            channelType: String(type),
            taskId: id
        };
        this.setState({
            loading: true
        }, () => TaskResearchService.publicTask(params).then(result => {
            if(result) {
                message.success('已内测发布完成');
                this.setState({loading: false});
                this.getMissionList();
            }
        }))
    };

    //tab标签被点击
    onTabClick = (key) => {
        this.setState({
            taskList: [],
            actType: key
        }, () => this.getMissionList())
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
        const { taskList, waitAudit, passAudit, vetoAudit, invalAudit, auditTag, publicTask } = this.state;

        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => this.onSearch(value)}
            enterButton
        />;

        let tab2Title = "待我审核( 共" + waitAudit + "条 )";
        let tab3Title = "审核通过( " + passAudit + " )";
        let tab4Title = "审核否决( " + vetoAudit + " )";
        let tab5Title = "审核作废( " + invalAudit + " )";
        let tab6Title = "已发布( " + publicTask + " )";

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
                {taskList.map((item ,k) => {
                    return (<div key={k} className={'sub-li'}>
                            <Row type="flex" justify="space-between">
                                <Col span={15} className={'subject-name'}>{item.taskName}</Col>
                                <Col span={9} style={{textAlign: 'right', paddingRight: '40px'}}>
                                    <Button type="primary" onClick={() => this.showQstnaire(item.taskId)}>查看</Button>
                                    {item.status === '03' ?
                                        <div style={{display: 'inline-block'}}>
                                            <Button type="primary" onClick={() => this.auditPass(item.taskId)}>通过</Button>
                                            <Popconfirm title="确定否决该任务?" onConfirm={() => this.auditNoPass(item.taskId)}>
                                                <Button type="danger">否决</Button>
                                            </Popconfirm>
                                        </div> : ''
                                    }
                                    {item.status === '06' ?
                                        <div style={{display: 'inline-block'}}>
                                            <Popconfirm title="确定发布该任务?" onConfirm={() => this.publicTask(item.taskId, item.channelType)}>
                                                <Button type="primary">内测发布</Button>
                                            </Popconfirm>
                                        </div> : ''
                                    }
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={3}>
                                    <Icon type="appstore" style={{marginRight: '5px', color: '#88d7fd'}}/>问卷分类：{item.catalogName}
                                </Col>
                                <Col span={3}>
                                    <Icon type="ant-design" style={{marginRight: '5px'}}/>任务状态：{FilterTool.filterStatus(item.status)}</Col>
                                <Col span={5}>
                                    <Icon type="clock-circle" style={{marginRight: '5px', color: '#fecb45'}}/>申请时间：{item.createTime}
                                </Col>
                                <Col span={5}>
                                    <Icon type="eye-o" style={{marginRight: '5px'}}/>调研数： {item.userSum}
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
            <div className='missionApplication '>
                <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                    <TabPane tab={tab2Title} key="03">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab3Title} key="06">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab4Title} key="04">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab5Title} key="05">{checkableTag} {questionLIst}</TabPane>
                    <TabPane tab={tab6Title} key="01">{checkableTag} {questionLIst}</TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ReviewApplication;