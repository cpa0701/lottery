import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form } from 'antd';
import {inject} from "mobx-react/index";
const {TextArea} = Input;
const FormItem = Form.Item;

@Form.create()
@inject('stores')
export default class extends Component {
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

  render() {
    const { role } = this.props.stores.I18nModel.outputLocale;
    const {add, parentId = '0',form: {getFieldDecorator}} = this.props;
    const formItemLayout = {
      labelCol: {xs: {span: 24}, sm: {span: 6}},
      wrapperCol: {xs: {span: 24}, sm: {span: 16}},
    };

    return (
      <Modal
        title={role.newRole}
        width={400}
        maskClosable={false}
        visible={add}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}
        afterClose={this.afterClose}
      >
        <Form>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label={role.characterName}>
                {getFieldDecorator('name', {
                  rules: [
                    {required: true, message: role.enterRoleName},
                  ],
                })(<Input placeholder={role.enterRoleName}/>)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label={role.noteInformation}>
                {getFieldDecorator('description', {
                  initialValue: '',
                  rules: [
                    {max: 255, message: role.noteexcceed},
                  ],
                })(
                  <TextArea placeholder={role.enterRemarks}/>
                )}
              </FormItem>
                {getFieldDecorator('parentId', {
                    initialValue: parentId,
                })(<Input type="hidden"/>)}
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

