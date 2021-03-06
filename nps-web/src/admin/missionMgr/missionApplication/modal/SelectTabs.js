import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import './ReQuestionaire.less'

@Form.create()
export default class extends Component {
    state = {
        loading: false,
        pageNum: 1,
        total: 0
    };
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
    };

    render() {
        const {selecttabs} = this.props;
        return (
            <Modal
                title="选择标签"
                width={1200}
                height={1200}
                maskClosable={false}
                visible={selecttabs}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
            >

            </Modal>
        );
    }
}

