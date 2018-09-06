import React from 'react';
import { Row, Col, Tabs, Input, Button, Tag, Spin, Icon, Pagination, message } from 'antd';

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

class MissionTermination extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            taskList: [],
            auditTag: [''],
            taskName: "",
            status: "",
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
    }
    componentWillMount() {
        this.getMissionList()
    }

    // 获取调研任务列表
    getMissionList = (param) => {
        let params = {
            taskName: this.state.taskName,
            status: this.state.auditTag[0],
            taskType: "",
            actType: "",
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
                    loading: false
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

    // 查看问卷
    showQstnaire = (id) => {
        let params = {id, type: 'check'};
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/qstnairePreview/${params}`);
    };
    // 进入预览
    preview = (id) => {
        let params = {id, type:'preview'};
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/questionPreview/${params}`);
    };
    // 结束调研
    stopMission = (id) => {
        this.setState({
            loading: true
        }, () => TaskResearchService.stopMission({id}).then(result => {
            if (result){
                message.info("结束成功");
                this.setState({
                    loading: false
                });
                this.getMissionList();
            }
        }))
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
        const { taskList, total, auditTag } = this.state;

        const operations = <Search
            placeholder="在结果中查询"
            onSearch={value => this.onSearch(value)}
            enterButton
        />;

        let tabTitle = "调研任务列表( 共" + total + "条 )";

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
                                    <Button type="primary" onClick={() => this.preview(item.taskId)}>预览</Button>
                                    {item.status === '执行中' ?
                                        <Button type="primary" onClick={() => this.stopMission(item.taskId)}>结束调研</Button>
                                        : ''
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
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab={tabTitle} key="00">{checkableTag} {questionLIst}</TabPane>
                </Tabs>
            </div>
        );
    }
}
export default MissionTermination;