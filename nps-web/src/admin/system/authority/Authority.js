import React, {PureComponent} from 'react';
import {Col, Row, Select, Button, Table, Input, Form, Modal} from 'antd';

import {inject, observer} from "mobx-react/index";
import AuthorityService from "../../../services/system/AuthorityService";
import './Authority.less'

const [ FormItem, info, Option ] = [ Form.Item, Modal.info, Select.Option ];

@inject('stores')
@observer
@Form.create({})
export default class Authority extends PureComponent {
    constructor(props) {
        super(props);
        this.store = this.props.stores;
        this.state = {
            //树形数据展示
            bordered: true,
            pagination: false,
            data: [],
            authorityEditData: [],
            authorityAddData: [],
            authorityUserData: [],
            authorityDeleteData: [],
            authorityData: [],
            //模态框
            addVisible: false,
            userVisible: false,
            editVisible: false,
            confirmLoading: false,
            authority:this.props.stores.I18nModel.outputLocale.authority,
        }
    }
    componentDidMount() {
        this.AuthorityQuery();
        this.setState({
            authorityEditData: false,
            authorityAddData: false,
            authorityUserData: false,
            authorityDeleteData: false,
        });
    }

    //获取权限树
    AuthorityQuery = (param) => {
        AuthorityService.getAuthTree({status:1}).then(result => {
            if (result) {
                result.map(item => {
                    if (!item.leaf) {
                        item.children = [];
                    }
                    if (item.parentId !== 0) {
                        result.map((e) => {
                            if (e.id === item.parentId) {
                                e.children.push(item)
                            }
                            return '';
                        })
                    }
                    return '';
                });
                let data = [];
                result.map(item => {
                    if (item.parentId === 0) {
                        data.push(item);
                    }
                    return '';
                });
                this.setState({
                    data: data,
                });
            }
        });
    };

    //新增方法
    handleAdd = () => {
        this.setState({
            addVisible: true,
        });
    };
    //修改方法
    handleUpdate = () => {
        if (this.state.authorityEditData) {
            this.setState({
                authorityData: this.state.authorityData,
                editVisible: true,
            });
        } else {
            const ref = info({
                title: this.state.authority.pleaseSelect,
                content: '',
                okText: this.state.ok,
                cancelText: this.state.cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    };
    //删除方法
    handleDelete = () => {
        if (this.state.authorityDeleteData) {
            this.setState({
                authorityData: this.state.authorityData,
            });
            let param = {
                id: this.state.authorityData.id,
                userId: Number(sessionStorage.getItem('userId'))
            };
            AuthorityService.deleteAuthority(param).then((data) => {
                if(data) {
                    this.freshTable();
                    this.handleOk();
                }
            })

        } else {
            const ref = info({
                title: this.state.authority.selectDeleteItem,
                content: '',
                okText: this.state.authority.ok,
                cancelText: this.state.authority.cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
        this.freshTable();
    };
    //详情方法
    handleDetail = () => {
        if (this.state.authorityUserData) {
            this.setState({
                authorityData: this.state.authorityData,
                userVisible: true,
            });
        } else {
            const ref = info({
                title: this.state.authority.pleaseSelect,
                content: '',
                okText: this.state.authority.ok,
                cancelText: this.state.authority.cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    };
    freshTable() {
        this.AuthorityQuery();
    }

    handleOk = () => {
        this.setState({
            addVisible: false,
            userVisible: false,
            editVisible: false,
        });
    };
    handleCancel = () => {
        this.setState({
            addVisible: false,
            userVisible: false,
            editVisible: false,
        });
    };
    handleAddSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            let value = {
                ...values,
                userId: Number(sessionStorage.getItem('userId'))
            };
            if (this.state.authorityAddData) {
                value = {
                    ...value,
                    parentId: this.state.authorityData.id
                }
            } else{
                value = {
                    ...value,
                    parentId: 0
                }
            }
            AuthorityService.addAuthority(value).then((data) => {
                if(data) {
                    this.freshTable();
                    this.handleOk();
                }
            })

        });
    };
    handleUpdateSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            AuthorityService.updateAuthority({...values, userId: Number(sessionStorage.getItem('userId'))}).then((data) => {
                this.freshTable();
                this.handleOk();
            })

        });
    };

    render() {
        const {authority} = this.props.stores.I18nModel.outputLocale;
        const {getFieldDecorator} = this.props.form;

        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    authorityAddData: selected,
                    authorityEditData: selected,
                    authorityUserData: selected,
                    authorityDeleteData: selected,
                    authorityData: record
                })


            },
        };
        const columns = [
            {
                title: authority.authorityName,
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: authority.authorityUrl,
                dataIndex: 'url',
                key: 'url',
                width: '25%',
                render: (text) => <span className="tableText">{text}</span>,

            },
            {
                title: authority.authorityDescribe,
                dataIndex: 'description',
                key: 'description',
                width: '15%',
                render: (text) => <span className="tableText">{text}</span>,
            },
            {
                title: authority.authorityType,
                dataIndex: 'type',
                key: 'type',
                width: '15%',
                render: (text, record, index) => {
                    switch (text) {
                        case 1:
                            return authority.menu;
                        case 2:
                            return authority.functionButton;
                        case 3:
                            return authority.CSright;
                        case 4:
                            return authority.other;
                        case 5:
                            return authority.tab;
                        case 6:
                            return authority.dataSource;
                        default: return ''
                    }

                }

            },
            {
                title: authority.authorityArea,
                dataIndex: 'appType',
                key: 'appType',
                width: '15%',
                render: (text, record, index) => {
                    switch (text) {
                        case 1:
                            return authority.global;
                        case 2:
                            return authority.netManagement;
                        case 3:
                            return authority.keyAccountSystem;
                        case 4:
                            return authority.jiangsu;
                        case 5:
                            return authority.stateAnalysis;
                        case 6:
                            return authority.customReport;
                        case 7:
                            return authority.statisticalAnalysis;
                        case 8:
                            return authority.reInsurance;
                        case 9:
                            return authority.guangxiPortal;
                        case 10:
                            return authority.guangdongResourceTree;
                        default: return ''
                    }

                }

            }];

        return (
            <div className={'authority'}>
                <div className="headerAuthority">
                    <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd}>{authority.insert}</Button>
                    <Button type="primary" icon="edit" onClick={this.handleUpdate}>{authority.modify}</Button>
                    <Button type="danger" icon="delete" onClick={this.handleDelete}>{authority.delete}</Button>
                    <Button type="primary" icon="user" onClick={this.handleDetail}>{authority.detail}</Button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <Table
                        {...this.state}
                        columns={columns}
                        rowKey={record => `${record.id}`}
                        defaultExpandedRowKeys={[0]}
                        rowSelection={rowSelection} size="small"
                        dataSource={this.state.data} onRow={(record) => {
                            return {
                                onClick: (e) => {
                                    e.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                },       // 点击行
                                onDoubleClick: (e) => {
                                    this.setState({
                                        authorityUserData: true
                                    }, () => {
                                        this.handleDetail()
                                    });
                                },
                            }
                        }
                    }
                    />
                    <Modal
                        title={authority.additionalPermissions}
                        width={800}
                        centered
                        visible={this.state.addVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" icon="check-circle-o"
                                    onClick={this.handleAddSubmit}>{authority.save}</Button>,
                            <Button key="back" icon="close-circle-o" onClick={this.handleCancel}>{authority.cancel}</Button>
                        ]}
                    >
                        <Form>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.authorityName}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{required: true,}],
                                            initialValue: " ",
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{required: true, }],
                                            initialValue: "1",
                                        })(
                                            <Select>
                                                <Option value="1">{authority.menu}</Option>
                                                <Option value="2">{authority.functionButton}</Option>
                                                <Option value="3">{authority.CSbutton}</Option>
                                                <Option value="4">{authority.other}</Option>
                                                <Option value="5">{authority.tab}</Option>
                                                <Option value="6">{authority.dataSource}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.linkURL}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('url', {
                                            initialValue: " ",
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionDescribe}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('description', {
                                            rules: [{}],
                                            initialValue: " ",
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.applicationType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('appType', {
                                            rules: [{required: true,}],
                                            initialValue: "1",
                                        })(
                                            <Select>
                                                <Option value="1">{authority.global}</Option>
                                                <Option value="2">{authority.netManagement}</Option>
                                                <Option value="3">{authority.keyAccountSystem}</Option>
                                                <Option value="4">{authority.jiangsu}</Option>
                                                <Option value="5">{authority.stateAnalysis}</Option>
                                                <Option value="6">{authority.customReport}</Option>
                                                <Option value="7">{authority.stateAnalysis}</Option>
                                                <Option value="8">{authority.reInsurance}</Option>
                                                <Option value="9">{authority.guangxiPortal}</Option>
                                                <Option value="10">{authority.guangdongResourceTree}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title={authority.modifyAuthority}
                        width={800}
                        centered
                        visible={this.state.editVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" icon="check-circle-o" onClick={this.handleUpdateSubmit}>{authority.save}</Button>,
                            <Button key="back" icon="close-circle-o" onClick={this.handleCancel}>{authority.cancel}</Button>
                        ]}
                    >
                        <Form>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionIdentify}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('id', {
                                            rules: [{required: true,}],
                                            initialValue: this.state.authorityData.id,
                                        })(
                                            <Input disabled/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.authorityName}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{required: true,}],
                                            initialValue: this.state.authorityData.name,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{required: true,}],
                                            initialValue: String(this.state.authorityData.status),
                                        })(
                                            <Select>
                                                <Option value="1">{authority.menu}</Option>
                                                <Option value="2">{authority.functionButton}</Option>
                                                <Option value="3">{authority.CSbutton}</Option>
                                                <Option value="4">{authority.other}</Option>
                                                <Option value="5">{authority.tab}</Option>
                                                <Option value="6">{authority.dataSource}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.linkURL}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('url', {
                                            initialValue: this.state.authorityData.url,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionDescribe}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('description', {
                                            initialValue: this.state.authorityData.description,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.applicationType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('appType', {
                                            rules: [{required: true,}],
                                            initialValue: String(this.state.authorityData.appType),
                                        })(
                                            <Select>
                                                <Option value="1">{authority.global}</Option>
                                                <Option value="2">{authority.netManagement}</Option>
                                                <Option value="3">{authority.keyAccountSystem}</Option>
                                                <Option value="4">{authority.jiangsu}</Option>
                                                <Option value="5">{authority.stateAnalysis}</Option>
                                                <Option value="6">{authority.customReport}</Option>
                                                <Option value="7">{authority.statisticalAnalysis}</Option>
                                                <Option value="8">{authority.reInsurance}</Option>
                                                <Option value="9">{authority.guangxiPortal}</Option>
                                                <Option value="10">{authority.guangdongResourceTree}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title={authority.detailedInformation}
                        width={800}
                        centered
                        visible={this.state.userVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <Form>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionIdentify}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.id}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.authorityName}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.name}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        <Select value={String(this.state.authorityData.type)} disabled>
                                            <Option value="1">{authority.menu}</Option>
                                            <Option value="2">{authority.functionButton}</Option>
                                            <Option value="3">{authority.CSbutton}</Option>
                                            <Option value="4">{authority.other}</Option>
                                            <Option value="5">{authority.tab}</Option>
                                            <Option value="6">{authority.dataSource}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.linkURL}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.url}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.permissionDescribe}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.description}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={authority.applicationType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        <Select value={String(this.state.authorityData.appType)} disabled>
                                            <Option value="1">{authority.global}</Option>
                                            <Option value="2">{authority.netManagement}</Option>
                                            <Option value="3">{authority.keyAccountSystem}</Option>
                                            <Option value="4">{authority.jiangsu}</Option>
                                            <Option value="5">{authority.stateAnalysis}</Option>
                                            <Option value="6">{authority.customReport}</Option>
                                            <Option value="7">{authority.statisticalAnalysis}</Option>
                                            <Option value="8">{authority.reInsurance}</Option>
                                            <Option value="9">{authority.guangxiPortal}</Option>
                                            <Option value="10">{authority.guangdongResourceTree}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}