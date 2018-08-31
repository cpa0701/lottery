import React from 'react';
import {Row, Col, Tabs, Button, Input, Tag, Icon, Pagination, Spin} from "antd"

import './questionApplication.less'
import QuestionApplicationService from "../../../services/question/QuestionApplicationService";

const [Search, TabPane, CheckableTag] = [Input.Search, Tabs.TabPane, Tag.CheckableTag];

const naireCatalog = [
    {
        title: '全部',
        value: '0',
        key: '0-0',
    },
    {
        title: '终端',
        value: '1',
        key: '0-0',
    }, {
        title: '套餐',
        value: '2',
        key: '0-1',
    },{
        title: '流量',
        value: '3',
        key: '0-3',
    }, {
        title: '账单',
        value: '4',
        key: '0-4',
    }, {
        title: '其它',
        value: '5',
        key: '0-5',
    }];
const createTimeTags = ['全部', '近一个月', '近三个月', '近半年', '近一年'];

class QuestionnaireLibrary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            collapsed: false,
            qstnaireList: [],
            catalogTags: ['0'],
            selTimeTags: ['全部'],
            qstnaireTitle: '',
            status: "01",
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
    }

    componentWillMount() {
        this.getQuestionnaireList()
    }

    // 收起展开高级筛选
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            catalogTags: ['0'],
            selTimeTags: ['全部']
        });
        this.getQuestionnaireList();
    };

    // 获取问卷列表
    getQuestionnaireList = (param) => {
        let params = {
            qstnaireTitle: this.state.qstnaireTitle,
            status: this.state.status,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            catalogId: Number(this.state.catalogTags[0]),
            createTime: this.state.selTimeTags[0],
            ...param
        };
        this.setState({
            loading: true
        }, () => QuestionApplicationService.getQuestionnaireList(params).then(result => {
            if(result) {
                this.setState({
                    total: result.totalCount,
                    qstnaireList: result.rows,
                    loading: false
                })
            }
        }))
    };

    // 查看问卷
    showQstnaire = (id) => {
        let params = {id: id, type: 'check'};
        params = JSON.stringify(params);
        this.props.history.push(`/npsMgr/questionMgr/qstnairePreview/${params}`);
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

    // 问卷分类选择
    catalogChange(tag, checked) {
        const { catalogTags } = this.state;
        const nextSelectedTags = checked ? [tag] : catalogTags.filter(t => t !== tag);
        this.setState({ catalogTags: nextSelectedTags }, () => {
            this.getQuestionnaireList();
        });
    }
    // 问卷创建时间选择
    selTimeChange(tag, checked) {
        const { selTimeTags } = this.state;
        const nextSelectedTags = checked ? [tag] : selTimeTags.filter(t => t !== tag);
        this.setState({ selTimeTags: nextSelectedTags }, () => {
            this.getQuestionnaireList();
        });
    }

    render() {
        const { qstnaireList, total, collapsed, catalogTags, selTimeTags } = this.state;

        const operations = <div style={{display: 'flex'}}>
                                <Search
                                    placeholder="在结果中查询"
                                    onSearch={value => this.onSearch(value)}
                                    enterButton
                                />
                                <Button type="dashed" onClick={this.toggle} style={{marginLeft: '4px'}}>高级筛选 {collapsed ? <Icon type="up" /> : <Icon type="down" />}</Button>
                            </div>;
        const questionLIst = <div>
                                <Spin spinning={this.state.loading}>
                                    {qstnaireList.map(item => {
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
                                {qstnaireList.length === 0 ?
                                    <div style={{padding: '20px', textAlign: 'center'}}>暂无数据</div> :
                                    <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total}/>}
                            </div>;

        let tab1Title = "问卷列表( 共" + total + "条 )";

        return (
            <div className={'questionnaire'}>
                <Tabs tabBarExtraContent={operations} defaultActiveKey={"01"} onTabClick={this.onTabClick}>
                    <TabPane tab={tab1Title} key="01" >
                        {collapsed ?
                            <Row style={{padding: '10px'}}>
                                <Col span={24}>
                                    <div style={{padding: '10px 5px'}}>
                                        <h6 style={{ marginRight: 8, display: 'inline' }}>问卷分类：</h6>
                                        {naireCatalog.map((tag,k) => (
                                            <CheckableTag
                                                key={k}
                                                checked={catalogTags.indexOf(tag.value) > -1}
                                                onChange={checked => this.catalogChange(tag.value, checked)}
                                            >
                                                {tag.title}
                                            </CheckableTag>
                                        ))}
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div style={{padding: '10px 5px'}}>
                                        <h6 style={{ marginRight: 8, display: 'inline' }}>创建时间：</h6>
                                        {createTimeTags.map(tag => (
                                            <CheckableTag
                                                key={tag}
                                                checked={selTimeTags.indexOf(tag) > -1}
                                                onChange={checked => this.selTimeChange(tag, checked)}
                                            >
                                                {tag}
                                            </CheckableTag>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                            : ''}
                        {questionLIst}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default QuestionnaireLibrary;
