import React from 'react';
import {Row, Col, Tabs, Button, Icon, Pagination, Spin} from "antd"

import QuestionApplicationService from "../../../../services/question/QuestionApplicationService";
import FilterTool from "../../../../common/utils/FilterTool";

const TabPane = Tabs.TabPane;

class QuestionApplicationModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            qstnaireList: [],
            status: "01",
            opened: 0,
            draught: 0,
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
        props.OnRef(this);
    }

    componentWillMount() {
        this.getQuestionnaireList()
    }

    // 获取问卷列表
    getQuestionnaireList = (param) => {
        let params = {
            qstnaireTitle: this.props.QstnaireTitle,
            status: this.state.status,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            createId: this.props.CreateId,
            ...param
        };
        this.setState({
            loading: true
        }, () => QuestionApplicationService.getQuestionnaireList(params).then(result => {
            if (result) {
                this.setState({
                    total: result.totalCount,
                    qstnaireList: result.rows,
                    loading: false
                })
            }
        }))
    };
    //列表分页
    refreshList = (page) => {
        this.getQuestionnaireList({pageNum: page,});
    };

    render() {
        const { qstnaireList, total } = this.state;
        const { ChoseQuestion } = this.props;
        const questionLIst = <div>
            <Spin spinning={this.state.loading}>
                {qstnaireList.map(item => {
                    return (<div key={item.qstnaireId} className={'sub-li'}>
                            <Row type="flex" justify="space-between">
                                <Col span={20} className={'subject-name'}>{item.qstnaireTitle}</Col>
                                <Col span={4}>

                                    <Button type="primary" onClick={() => {
                                        ChoseQuestion(item.qstnaireId, item.qstnaireTitle)
                                    }}>选择</Button>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={5}><Icon type="appstore" style={{marginRight: '5px'}}/>分类：{item.catalogName}
                                </Col>
                                <Col span={4}><Icon type="ant-design" style={{marginRight: '5px'}}/>任务状态：{FilterTool.filterStatus(item.status)}
                                </Col>
                                <Col span={4}><Icon type="user" style={{marginRight: '5px'}}/>创建人：{item.createUname}
                                </Col>
                                <Col span={6}><Icon type="clock-circle"
                                                    style={{marginRight: '5px'}}/>编辑时间： {item.updateTime}
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </Spin>
            <Pagination current={this.state.pageNum} onChange={this.refreshList} total={this.state.total}/>
        </div>;

        let tab1Title = "问卷列表( 共" + total + "条 )";

        return (
            <div className={'questionnaire'}>
                <Tabs>
                    <TabPane tab={tab1Title} key="">{questionLIst}</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default QuestionApplicationModal;
