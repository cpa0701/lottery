import React from 'react';
import {Row, Col, Tabs, Button, Input, Popconfirm, Icon, Pagination, Spin} from "antd"
import FilterTool from "../../../../src/common/utils/FilterTool.js"
import TaskResearchService from "../../../services/research/TaskResearchService"
import './missionApplication.less'

const Search = Input.Search;
const TabPane = Tabs.TabPane;

class MissionApplication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            taskList: [],
            taskName: '',
            pageNum: 1,
            total: 0
        };
        this.createRequisition = this.createRequisition.bind(this);
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
            if (result)
                this.setState({
                    taskList: result.rows,
                    total: result.totalCount,
                    loading: false
                })
        }))
    };

    //tab标签被点击
    onTabClick = (key) => {
        // let params={status: key};
        // if(key==='00'){
        //     params={status: '03',uid:''}
        // }
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

    // 查看问卷
    showQstnaire = (id) => {
        let params = {id: id, type: 'check'};
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/qstnairePreview/${params}`);
    };
    // 预览问卷
    previewQstnaire = (id) => {
        let params = {id: id, type: 'preview'};
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/questionPreview/${params}`);
    };
    //新建任务
    createRequisition = () => {
        TaskResearchService.getNewTaskId().then((result) => {
            if (result) {
                this.props.history.push(`/missionMgr/newApplicationForm/${result}&byAdd`);
            }
        })
    };
    // 编辑任务
    editTask = (id) => {
        this.props.history.push(`/missionMgr/newApplicationForm/${id}`);
    };
    // 删除任务
    delTask = (id) => {
        TaskResearchService.deleteSurveyTask({taskId: id}).then(result => {
            if (result) {
                alert('删除成功')
            }
        })
    };

    render() {
        const {taskList, total} = this.state;

        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => this.onSearch(value)}
            enterButton
        />;
        const questionLIst = <div>
            <Spin spinning={this.state.loading}>
                {taskList.map((item, k) => {
                    return (<div key={k} className="sub-li">
                        <Row type="flex" justify="space-between">
                            <Col span={16} className="subject-name">{item.taskName}
                                <br/>
                                <span className="c1">测试结果:{item.testFlag}</span>
                            </Col>
                            <Col span={8} style={{textAlign: 'right', paddingRight: '40px'}}>
                                <Button type="primary" onClick={() => this.showQstnaire(item.qstnaireId)}>查看</Button>
                                {/*{item.status !== '05' ? '' :*/}
                                    <div style={{display: 'inline-block'}}>
                                        <Button type="primary" onClick={() => this.editTask(item.taskId)}>编辑</Button>
                                        <Popconfirm title="你确定删除该任务?" onConfirm={() => this.delTask(item.taskId)}>
                                            <Button type="primary">删除</Button>
                                        </Popconfirm>
                                    </div>
                                {/*}*/}
                                <Button type="primary" onClick={() => this.previewQstnaire(item.qstnaireId)}>预览</Button>
                                {item.status !== '02' ? '' :
                                    <Popconfirm
                                        title="该任务是否走审批流程?"
                                        onCancel={() => this.delTask(item.taskId)}
                                        okText={'是'}
                                        cancelText={'否'}
                                    >
                                        <Button type="primary">审批流程</Button>
                                    </Popconfirm>
                                }
                                {/*<Button >*/}
                                {/*流程图 <Icon type="down"/>*/}
                                {/*</Button>*/}
                            </Col>
                        </Row>
                        <Row type="flex" justify="start">
                            <Col span={5}><Icon type="appstore"
                                                style={{marginRight: '5px', color: '#88d7fd'}}/>问卷分类：{item.catalogName}
                            </Col>
                            <Col span={3}><Icon type="retweet"
                                                style={{marginRight: '5px'}}/>适用渠道：{FilterTool.filterChannel(item.channelName)}
                            </Col>
                            <Col span={3}><Icon type="ant-design"
                                                style={{marginRight: '5px'}}/>任务状态：{FilterTool.filterStatus(item.status)}
                            </Col>
                            <Col span={5}><Icon type="clock-circle"
                                                style={{marginRight: '5px', color: '#fecb45'}}/>申请时间：{item.createTime}
                            </Col>
                            <Col span={5}><Icon type="eye-o" style={{marginRight: '5px'}}/>调研数： {item.userSum}
                            </Col>
                        </Row>
                    </div>)
                })}
            </Spin>
            {taskList.length === 0 ?
                <div style={{padding: '20px', textAlign: 'center'}}>暂无数据</div> :
                <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total}
                            showQuickJumper/>}
        </div>;
        let tab1Title = "我的申请单( 共" + total + "条 )";
        let tab2Title = "审批中( 共" + total + "条 )";
        let tab3Title = "发布中( 共" + total + "条 )";
        let tab4Title = "草稿( 共" + total + "条 )";

        return (
            <div className='missionApplication '>
                <Button type="primary" icon="plus" onClick={this.createRequisition}>
                    新建申请单
                </Button>
                <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                    <TabPane tab={tab1Title} key="00">{questionLIst}</TabPane>
                    <TabPane tab={tab2Title} key="03">{questionLIst}</TabPane>
                    <TabPane tab={tab3Title} key="06">{questionLIst}</TabPane>
                    <TabPane tab="审核否决(0)" key="04">{questionLIst}</TabPane>
                    <TabPane tab="审核作废(0)" key="05">{questionLIst}</TabPane>
                    <TabPane tab={tab4Title} key="02">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default MissionApplication;
