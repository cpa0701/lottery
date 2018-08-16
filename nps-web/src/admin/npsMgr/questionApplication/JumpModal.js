import React, {Component} from 'react';
import {Modal, Form,Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@Form.create()
export default class extends Component {
    state = {
        value:0,
    }
    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }

        });
    };
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    afterClose = () => this.props.form.resetFields();
    render() {
        const {jump,data, form: {getFieldDecorator}} = this.props;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return(
            <Modal
                width={400}
                maskClosable={true}
                visible={jump}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
            >
                <form>
                    <RadioGroup onChange={this.onChange} >
                        <Radio style={radioStyle} value={1}>按选项跳题</Radio>
                        <div>{(this.state.value===1)?<div>选项</div>:''}</div>
                        <Radio style={radioStyle} value={2}>无条件跳题</Radio>
                        <div>{(this.state.value===2)?<div>无条件跳题</div>:''}</div>
                    </RadioGroup>
                </form>
            </Modal>
        )
    }
}
