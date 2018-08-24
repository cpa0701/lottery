import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Select, Popconfirm, Icon} from 'antd';
import {inject} from "mobx-react/index"
const Option = Select.Option;
const FormItem = Form.Item;
@inject('stores')
class AdvancedSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            depart:this.props.stores.I18nModel.outputLocale.dept,
            expand: true
        }
        this.toggle = this.toggle.bind(this);
    }

    //查询
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.getStaffParams(values)
        });
    }

    //收起
    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 0;
        const {getFieldDecorator} = this.props.form;
        const children = [];
        const fieldList = [
            {
                label: this.props.stores.I18nModel.outputLocale.dept.scopedepartment,
                key: 'range',
                type: 'select',
                optionList: [{key: 'dept', title:this.props.stores.I18nModel.outputLocale.dept.subdepartment }, {key: 'currentDept', title: '当前部门'}, {
                    key: 'domain',
                    title: this.props.stores.I18nModel.outputLocale.dept.accordArea
                }]
            }, {
                label: this.props.stores.I18nModel.outputLocale.dept.personnelAccount,
                key: 'account', type: 'input'
            }, {
                label: this.props.stores.I18nModel.outputLocale.dept.personnelWorking,
                key: 'no',
                type: 'input'
            }, {
                label:this.props.stores.I18nModel.outputLocale.dept.stuffName ,
                key: 'name',
                type: 'input'
            }, {
                label: this.props.stores.I18nModel.outputLocale.dept.accountStatus,
                type: 'select',
                key: 'status ',
                optionList: [{key: '', title:this.props.stores.I18nModel.outputLocale.dept.all }, {key: 1, title: this.props.stores.I18nModel.outputLocale.dept.normal}, {key: 2, title: this.props.stores.I18nModel.outputLocale.dept.seal}, {
                    key: 3,
                    title:this.props.stores.I18nModel.outputLocale.dept.changepwd,
                }, {key: 4, title:this.props.stores.I18nModel.outputLocale.dept.longLock }, {key: 5, title: this.props.stores.I18nModel.outputLocale.dept.shortLock}]
            }, {
                label: this.props.stores.I18nModel.outputLocale.dept.isitEffective,
                type: 'select',
                key: 'valid',
                optionList: [{key: '', title: this.props.stores.I18nModel.outputLocale.dept.all}, {key: 1, title: this.props.stores.I18nModel.outputLocale.dept.effective}, {key: 0, title: this.props.stores.I18nModel.outputLocale.dept.invalid}]
            }]
        for (let i = 0; i < fieldList.length; i++) {
            children.push(
                <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
                    <FormItem label={fieldList[i].label}>
                        {getFieldDecorator(fieldList[i].key, {
                            initialValue: i === 0 ? 'dept' : ''
                        })(
                            fieldList[i].type === 'input' ? (<Input/>) : (
                                <Select>
                                    {fieldList[i].optionList.map((a) =>
                                        <Option key={a.key} value={a.key}>{a.title}</Option>
                                    )}
                                </Select>)
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        const {handleAdd, handleEdit, handleDelete, handleChangeDept} = this.props
        const {dept} = this.props.stores.I18nModel.outputLocale
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">{dept.query}</Button>
                        <Button onClick={handleAdd}>{dept.insert}</Button>
                        <Button onClick={handleEdit} type="dashed">{dept.modify}</Button>
                        <Popconfirm title={dept.shuredelete} okText={dept.ok} cancelText={dept.cancel} onConfirm={handleDelete}>
                            <Button type="danger">{dept.delete}</Button>
                        </Popconfirm>
                        <Popconfirm title={dept.shurechange} okText={dept.ok} cancelText={dept.cancel} onConfirm={handleChangeDept}>
                            <Button>{dept.changeDepartment}</Button>
                        </Popconfirm>
                        <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                            {dept.packUp} <Icon type={this.state.expand ? 'up' : 'down'}/>
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(AdvancedSearchForm);