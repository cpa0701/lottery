import React, {PureComponent} from 'react';
import {Modal, Row, Col, Input, Form, Tabs, Pagination, Button} from 'antd';
import QuestionApplicationModal from '../components/QuestionApplicationModal'

import './ReQuestionaire.less'
import {inject} from "mobx-react/index"

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const FormItem = Form.Item;

@Form.create()
@inject('stores')
export default class extends PureComponent {
    state = {
        loading: false,
        questionList: [],
        pageNum: 1,
        total: 0,
        pageSize: 10,
        createId: '',
        qstnaireTitle: ''
    }
    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            this.props.onCreate(values);
        });
    };
    afterClose = () => {
        this.props.form.resetFields();
    };

    clickList = (id) => {
        this.setState({createId: id ? id : ''}, () => {
            this.questionApplicationList.getQuestionnaireList({pageNum: 1})
        })
    }
    OnRef = (ref) => {
        this.questionApplicationList = ref;
    }

    render() {
        const {add, onChoseQuestion} = this.props;
        const createId = JSON.parse(sessionStorage.getItem('userInfo')).id
        return (
            <Modal
                title="选择问卷"
                width={1200}
                height={1200}
                maskClosable={false}
                visible={add}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
                okText="确认"
                cancelText="取消"
            >
                <Row className={'title'}>
                    <Col span="24">
                        查询
                    </Col>
                </Row>
                <Row className={'search'}>
                    <Search
                        placeholder="请输入问卷名称"
                        enterButton="搜索"
                        size="default"
                        onSearch={value => {
                            this.setState({qstnaireTitle: value}, () => this.questionApplicationList.getQuestionnaireList({
                                pageNum: 1,
                                qstnaireTitle: value
                            }))

                        }}
                    />
                </Row>
                <br/>
                <Row>
                    <span style={{marginRight: '5px'}}>问卷来源：</span>
                    <Button style={{marginRight: '5px'}} type="primary" onClick={() => this.clickList()}>问卷库</Button>
                    <Button style={{marginRight: '5px'}} type="primary"
                            onClick={() => this.clickList(createId)}>我的问卷</Button>
                </Row>
                <QuestionApplicationModal QstnaireTitle={this.state.qstnaireTitle} CreateId={this.state.createId}
                                          ChoseQuestion={onChoseQuestion}
                                          OnRef={this.OnRef}/>
            </Modal>
        );
    }
}

