import React, {Component} from 'react';
import {Modal, Form,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
export default class extends Component {
    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }

        });
    };
    afterClose = () => this.props.form.resetFields();
    render() {
        const {conn,data, form: {getFieldDecorator}} = this.props;
        return(
            <Modal
                width={400}
                maskClosable={true}
                visible={conn}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
            >
                <form>
                    <h2>当前题目：{data.questionName}</h2>
                    <h2>关联题目：
                        <Select defaultValue="lucy" style={{ width: 220 }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    </h2>
                </form>
            </Modal>
        )
    }
}
