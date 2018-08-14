import React, {PureComponent} from 'react';
import {Col, Row, Select, Button, Divider, Table, Input, Form, Modal} from 'antd';
import './Authority.less'
import {inject, observer} from "mobx-react/index";
import AuthorityService from "../../../services/system/AuthorityService";


const Option = Select.Option;//是否激活选择框
//选择框选择内容

//表单
const FormItem = Form.Item;
const info = Modal.info;
@inject('stores')
@observer
@Form.create({})
export default class Authority extends PureComponent {
    //新增方法
    handleAdd = () => {
        if (this.state.authorityAddData) {
            this.setState({
                authorityData: this.state.authorityData,
                addVisible: true,
            });
        } else {
            const ref = info({
                title: '请先选择',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    }
    //修改方法
    handleUpdate = () => {
        if (this.state.authorityEditData) {
            this.setState({
                authorityData: this.state.authorityData,
                editVisible: true,
            });
        } else {
            const ref = info({
                title: '请先选择',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    }
    //删除方法
    handleDelete = () => {
        if (this.state.authorityDeleteData) {
            this.setState({
                authorityData: this.state.authorityData,
            });
            AuthorityService.deleteAuthority(this.state.authorityData).then((data) => {
                this.freshTable();
                this.handleOk();
            })

        } else {
            const ref = info({
                title: '请先选择删除项',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    ref.destroy();
                }
            });
        }
        this.freshTable();
    }
    //详情方法
    handleDetail = () => {
        if (this.state.authorityUserData) {
            this.setState({
                authorityData: this.state.authorityData,
                userVisible: true,
            });
        } else {
            const ref = info({
                title: '请先选择',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    ref.destroy();
                }
            });
        }
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
                        })
                    }
                });
            }
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
        });
    };

    componentDidMount() {
        this.AuthorityQuery();
        this.setState({
            authorityEditData: false,
            authorityAddData: false,
            authorityUserData: false,
            authorityDeleteData: false,

        });

    }

    freshTable() {
        this.AuthorityQuery();
    }

    handleOk = () => {
        this.setState({
            addVisible: false,
            userVisible: false,
            editVisible: false,
        });
    }
    handleCancel = () => {
        this.setState({
            addVisible: false,
            userVisible: false,
            editVisible: false,
        });
    }
    handleAddSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            let value = {
                ...values,
                parentId: this.state.authorityData.id,
            }
            AuthorityService.addAuthority(value).then((data) => {
                console.log(data)
                this.freshTable();
                this.handleOk();
            })

        });
    }
    handleUpdateSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            AuthorityService.updateAuthority(values).then((data) => {
                console.log(data)
                this.freshTable();
                this.handleOk();
            })

        });
    }

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
        }
    }


    render() {
        const {authority} = this.props.stores.I18nModel.outputLocale
        const {getFieldDecorator} = this.props.form;
        const state = this.state;
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
        const columns = [{
            title: authority.authorityName,
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        }, {
            title: authority.authorityUrl,
            dataIndex: 'url',
            key: 'url',
            width: '25%',
            render: (text) => <span className="tableText">{text}</span>,

        }, {
            title: authority.authorityDescribe,
            dataIndex: 'description',
            key: 'description',
            width: '15%',
            render: (text) => <span className="tableText">{text}</span>,
        }, {
            title: authority.authorityType,
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            render: (text, record, index) => {
                switch (text) {
                    case 1:
                        return '菜单'
                    case 2:
                        return '功能按钮'
                    case 3:
                        return 'C/S权限'
                    case 4:
                        return '其他'
                    case 5:
                        return 'tab页'
                    case 6:
                        return '多数据源权限'
                }

            }

        }, {
            title: authority.authorityArea,
            dataIndex: 'appType',
            key: 'appType',
            width: '15%',
            render: (text, record, index) => {
                switch (text) {
                    case 1:
                        return '全局'
                    case 2:
                        return '网管系统'
                    case 3:
                        return '大客户系统'
                    case 4:
                        return '江苏有线-移动端'
                    case 5:
                        return '报表分析'
                    case 6:
                        return '自定义报表'
                    case 7:
                        return '统计分析'
                    case 8:
                        return '重保'
                    case 9:
                        return '广西门户'
                    case 10:
                        return '广东资源树'
                }

            }

        }];
        return (
            <div>
                <div className="headerAuthority">
                    <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd}>{authority.insert}</Button>
                    <Button type="primary" icon="edit" onClick={this.handleUpdate}>{authority.modify}</Button>
                    <Button type="danger" icon="delete" onClick={this.handleDelete}>{authority.delete}</Button>
                    <Button type="primary" icon="user" onClick={this.handleDetail}>{authority.detail}</Button>
                </div>
                <Divider/>
                <div>
                    <Table {...this.state} columns={columns} rowKey={record => `${record.id}`}
                           defaultExpandedRowKeys={[0]} rowSelection={rowSelection} size="small"
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
                        title="新增权限"
                        width={800}
                        centered
                        visible={this.state.addVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" icon="check-circle-o"
                                    onClick={this.handleAddSubmit}>保存</Button>,
                            <Button key="back" icon="close-circle-o" onClick={this.handleCancel}>取消</Button>
                        ]}
                    >
                        <Form>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="权限名称"
                                        labelCol={{span: 10}}
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
                                        label="权限类型"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{required: true,}],
                                            initialValue: "6",
                                        })(
                                            <Select>
                                                <Option value="1">菜单</Option>
                                                <Option value="2">功能按钮</Option>
                                                <Option value="3">C/S按钮</Option>
                                                <Option value="4">其它</Option>
                                                <Option value="5">tab页</Option>
                                                <Option value="6">多数据源权限</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="链接URL"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('url', {
                                            rules: [{}],
                                            initialValue: " ",
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="权限描述"
                                        labelCol={{span: 10}}
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
                                        label="应用类型"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('appType', {
                                            rules: [{required: true,}],
                                            initialValue: "1",
                                        })(
                                            <Select>
                                                <Option value="1">全局</Option>
                                                <Option value="2">网管系统</Option>
                                                <Option value="3">大客户系统</Option>
                                                <Option value="4">江苏有线-移动端</Option>
                                                <Option value="5">报表分析</Option>
                                                <Option value="6">自定义报表</Option>
                                                <Option value="7">统计分析</Option>
                                                <Option value="8">重保</Option>
                                                <Option value="9">广西门户</Option>
                                                <Option value="10">广东资源树</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title="修改权限"
                        width={800}
                        centered
                        visible={this.state.editVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" icon="check-circle-o"
                                    onClick={this.handleUpdateSubmit}>保存</Button>,
                            <Button key="back" icon="close-circle-o" onClick={this.handleCancel}>取消</Button>
                        ]}
                    >
                        <Form>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="权限标识"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('id', {
                                            rules: [{required: true,}],
                                            initialValue: this.state.authorityData.id,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="权限名称"
                                        labelCol={{span: 10}}
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
                                        label="权限类型"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{required: true,}],
                                            initialValue: String(this.state.authorityData.status),
                                        })(
                                            <Select>
                                                <Option value="1">菜单</Option>
                                                <Option value="2">功能按钮</Option>
                                                <Option value="3">C/S按钮</Option>
                                                <Option value="4">其它</Option>
                                                <Option value="5">tab页</Option>
                                                <Option value="6">多数据源权限</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="链接URL"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('url', {
                                            rules: [{}],
                                            initialValue: this.state.authorityData.url,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={12}>
                                    <FormItem
                                        label="权限描述"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('description', {
                                            rules: [{}],
                                            initialValue: this.state.authorityData.description,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="应用类型"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('appType', {
                                            rules: [{required: true,}],
                                            initialValue: String(this.state.authorityData.appType),
                                        })(
                                            <Select>
                                                <Option value="1">全局</Option>
                                                <Option value="2">网管系统</Option>
                                                <Option value="3">大客户系统</Option>
                                                <Option value="4">江苏有线-移动端</Option>
                                                <Option value="5">报表分析</Option>
                                                <Option value="6">自定义报表</Option>
                                                <Option value="7">统计分析</Option>
                                                <Option value="8">重保</Option>
                                                <Option value="9">广西门户</Option>
                                                <Option value="10">广东资源数</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>

                        </Form>
                    </Modal>
                    <Modal
                        title="详情信息"
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
                                        label="权限标识"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.id}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="权限名称"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.name}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="权限类型"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        <Select value={String(this.state.authorityData.type)}disabled>
                                            <Option value="1">菜单</Option>
                                            <Option value="2">功能按钮</Option>
                                            <Option value="3">C/S按钮</Option>
                                            <Option value="4">其它</Option>
                                            <Option value="5">tab页</Option>
                                            <Option value="6">多数据源权限</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="链接URL"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.url}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="权限描述"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.authorityData.description}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="应用类型"
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        <Select value={String(this.state.authorityData.appType)} disabled>
                                            <Option value="1">全局</Option>
                                            <Option value="2">网管系统</Option>
                                            <Option value="3">大客户系统</Option>
                                            <Option value="4">江苏有线-移动端</Option>
                                            <Option value="5">报表分析</Option>
                                            <Option value="6">自定义报表</Option>
                                            <Option value="7">统计分析</Option>
                                            <Option value="8">重保</Option>
                                            <Option value="9">广西门户</Option>
                                            <Option value="10">广东资源数</Option>
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