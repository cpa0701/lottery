import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form,Tabs,Pagination,Button  } from 'antd';
import './ReQuestionaire.less'
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const FormItem = Form.Item;

@Form.create()
export default class extends Component {
    state = {
        loading: false,
        questionList: [],
        pageNum: 1,
        total: 0,
        pageSize: 10,
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
        const {total} = this.state;
        let tabTitle = "问卷列表( 共" + total + "条 )";
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
                <br />
                <Row>
                        <span style={{marginRight: '5px'}}>问卷来源：</span>
                        <Button type="primary">问卷库</Button>
                        <Button type="primary">我的问卷</Button>
                </Row>
                <Tabs>
                    <TabPane tab={tabTitle} key="1">
                    </TabPane>
                </Tabs>
                <Pagination size="small" total={50} showQuickJumper />
            </Modal>
        );
    }
}

