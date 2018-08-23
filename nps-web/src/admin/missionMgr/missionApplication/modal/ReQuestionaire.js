import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form,Tabs,Pagination  } from 'antd';
import './ReQuestionaire.less'
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const FormItem = Form.Item;

@Form.create()
export default class extends Component {
    state = {
        loading: false,
        pageNum: 1,
        total: 0
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
    //列表分页
    refreshList = (page) => {
        this.getQuestionnaireList({pageNum: page,});
    }

    render() {
        const {add} = this.props;
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
            >
                <Row className={'title'} >
                    <Col span="24">
                        查询
                    </Col>
                </Row>
                <Row className={'search'}>
                    <Search
                        enterButton="搜索"
                        size="default"
                        onSearch={value => console.log(value)}
                    />
                </Row>
                <Row>
                    <Tabs onTabClick={this.onTabClick}>
                        <TabPane tab="问卷库" key="1">33</TabPane>
                        <TabPane tab="我的问卷" key="2">56</TabPane>
                    </Tabs>
                </Row>
                <Pagination size="small" total={50} showSizeChanger showQuickJumper />
            </Modal>
        );
    }
}

