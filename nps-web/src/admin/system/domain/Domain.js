import React, {PureComponent} from 'react';
import { Button, Table, Modal, Row, Col, Input, Select, InputNumber, Form } from 'antd'
import {inject, observer} from "mobx-react/index";

import DomainService from '../../../services/system/DomainService';
import './Domain.less'

const [ Option, FormItem, info ] = [Select.Option, Form.Item, Modal.info ];

@inject('stores')
@observer
@Form.create({})
export default class Domain extends PureComponent {
    constructor(props) {
        super(props);
        this.store = this.props.stores;
        this.state = {
            //树形数据展示
            bordered:true,
            pagination:false,
            data:[],
            domainEditData:[],
            domainAddData:[],
            domainUserData:[],
            domainDeleteData:[],
            domainData:[],
            //模态框
            addVisible: false,
            userVisible:false,
            editVisible:false,
            confirmLoading: false,
            domain:this.props.stores.I18nModel.outputLocale.domain,
        }
    }
    componentDidMount(){
        this.domainQuery();
        this.setState({
            domainAddData:false,
            domainEditData: false,
            domainUserData:false,
            domainDeleteData:false
        });
    }

    //新增方法
    handleAdd = () => {
        this.setState({
            addVisible: true,
        });
    };
    //修改方法
    handleUpdate = () => {
        if (this.state.domainEditData) {
            this.setState({
                domainData: this.state.domainData,
                editVisible: true,
            });
        } else {
            const ref = info({
                title: this.state.domain.selectModifyItem,
                content: '',
                okText: this.state.domain.ok,
                cancelText: this.state.domain.Cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    };
    //删除方法
    handleDelete = () => {
        if (this.state.domainDeleteData) {
            this.setState({
                domainData: this.state.domainData,

            });
            DomainService.deleteDomain({id:Number(this.state.domainData.id),userId: String(sessionStorage.getItem('userId'))}).then((data) => {
                const ref = info({
                    title: this.state.domain.deleted,
                    content: '',
                    okText: this.state.domain.ok,
                    cancelText: this.state.domain.Cancel,
                    onOk: () => {
                        ref.destroy();
                    }
                });
                this.domainQuery();
                this.handleOk();
            })

        } else {
            const ref = info({
                title: this.state.domain.selectDeleteItem,
                content: '',
                okText: this.state.domain.ok,
                cancelText: this.state.Cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
        this.domainQuery();
    };
    //详情方法
    handleDetail = () => {
        if (this.state.domainUserData) {
            this.setState({
                domainData: this.state.domainData,
                userVisible: true,
            });
        } else {
            const ref = info({
                title: this.state.domain.selectedAreaItem,
                content: '',
                okText: this.state.domain.ok,
                cancelText: this.state.domain.Cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    };

    //获取区域树
    domainQuery = (param) => {
        DomainService.domainTree(param)
            .then(result => {
                if (result) {
                    result.map(item => {
                        if(!item.leaf){
                            item.children=[];
                        }
                        if(item.parentId!==0){
                            result.map((e) => {
                                if(e.id === item.parentId){
                                    e.children.push(item)
                                }
                                return '';
                            })
                        }
                        return '';
                    });
                    let data=[];
                    result.map(item=>{
                        if(item.parentId===0){
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

    handleOk = () => {
        this.setState({
            addVisible: false,
            userVisible:false,
            editVisible:false,
        });
    };
    handleCancel = () => {
        this.setState({
            addVisible: false,
            userVisible:false,
            editVisible:false,
        });
    };
    handleAddSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let value = {
                ...values,
                type: Number(values.type),
                userId: String(sessionStorage.getItem('userId')),
                leaf: false,
                createBy: String(sessionStorage.getItem('userId')),
                modifiedBy: String(sessionStorage.getItem('userId')),
            };
            if (this.state.domainAddData) {
                value = {
                    ...value,
                    parentId: this.state.domainData.id
                }
            } else {
                value = {
                    ...value,
                    parentId: 0
                }
            }
            DomainService.addDomain(value).then((data) => {
                if(data) {
                    this.domainQuery();
                    this.handleOk();
                }
            })
        });
    };
    handleUpdateSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let value={
                ...values,
                type: Number(values.type),
                userId: String(sessionStorage.getItem('userId')),
                leaf: true,
                createBy: String(sessionStorage.getItem('userId')),
                modifiedBy: String(sessionStorage.getItem('userId')),
            };
            DomainService.updateDomain(value).then((data) => {
                if(data) {
                    this.domainQuery();
                    this.handleOk();
                }
            })
        });
    };

    render() {
        const { domain } = this.props.stores.I18nModel.outputLocale;
        const { getFieldDecorator } = this.props.form;

        const columns = [
                {
                    title: domain.domainName,
                    dataIndex: 'name',
                    key: 'name',
                    width: '32%',
                },
                {
                    title: domain.domainType,
                    dataIndex: 'type',
                    key: 'type',
                    width: '32%',
                    render: (text, record, index) => {
                        switch(text){
                            case 1: return this.state.domain.province;
                            case 2: return this.state.domain.localNet;
                            case 3: return this.state.domain.countyCity;
                            case 4: return this.state.domain.sector;
                            case 5: return this.state.domain.theCustom;
                            default: return ''
                        }
                    }
                },
                {
                    title: domain.domainID,
                    dataIndex: 'code',
                    key: 'code',
                    width: '32%',

                }];

        const rowSelection = {
            onSelect:(record, selected, selectedRows) => {
                this.setState({
                    domainAddData: selected,
                    domainEditData: selected,
                    domainUserData: selected,
                    domainDeleteData: selected,
                    domainData: record
                })
            },
        };

        return (
            <div className={'domain'}>
                <div className="headerDomain">
                    <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd}>{domain.insert}</Button>
                    <Button type="primary" icon="edit" onClick={this.handleUpdate}>{domain.modify}</Button>
                    <Button type="danger" icon="delete" onClick={this.handleDelete}>{domain.delete}</Button>
                    <Button type="primary" icon="user" onClick={this.handleDetail}>{domain.detail}</Button>
                </div>
                <div className="gridTree" style={{marginTop: '10px'}}>
                    <Table
                        {...this.state}
                        rowKey={record => `${record.id}`}
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.data}
                        onRow={(record) => {
                            return {
                                onClick: (e) => {
                                    e.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                },       // 点击行
                                onDoubleClick: (e) => {
                                    this.setState({
                                        domainUserData:true
                                    },()=>{
                                        this.handleDetail()
                                    });
                                },
                            }
                        }}
                    />
                    <Modal
                        title={domain.AddDomain}
                        width={600}
                        centered
                        visible={this.state.addVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                         footer={[
                            <Button key="submit" type="primary" icon="check-circle-o" onClick={this.handleAddSubmit}>{domain.Save}</Button>,
                            <Button key="back"  icon="close-circle-o" onClick={this.handleCancel}>{domain.Cancel}</Button>
                         ]}
                    >
                        <Form>
                            <Row>
                                <Col span={24}>
                                    <FormItem
                                        label={domain.DomainMark}
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('areaId', {
                                            rules: [{ required: true }],
                                        })(<Input/>)}
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem
                                        label={domain.DomainName}
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true,}],
                                            initialValue:" ",
                                        })(<Input/>)}
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem
                                        label={domain.DomainType}
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{ required: true,}],
                                            initialValue:"6",
                                        })(
                                            <Select>
                                                <Option value="6" disabled>{domain.Select}</Option>
                                                <Option value="1">{domain.province}</Option>
                                                <Option value="2">{domain.localNet} </Option>
                                                <Option value="3">{domain.countyCity}</Option>
                                                <Option value="4">{domain.sector}</Option>
                                                <Option value="5">{domain.custom}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem
                                        label={domain.DomainId}
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('code', {
                                            rules: [{ required: true,}],
                                            initialValue:" ",
                                        })(<Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title={domain.ModifyDomain}
                        width={800}
                        centered
                        visible={this.state.editVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" icon="check-circle-o" onClick={this.handleUpdateSubmit}>{domain.Save}</Button>,
                            <Button key="back"  icon="close-circle-o" onClick={this.handleCancel}>{domain.Cancel}</Button>
                        ]}
                    >
                        <Form  onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainNo}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('sequence', {
                                            initialValue: Number(this.state.domainData.sequence),
                                        })(
                                            <InputNumber min={1} max={10000}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainMark}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('areaId', {
                                            rules: [{ required: true,}],
                                            initialValue: this.state.domainData.areaId,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                    {getFieldDecorator('id', {
                                        initialValue: this.state.domainData.id,
                                    })(<Input type="hidden"/>)}
                                    {getFieldDecorator('parentId', {
                                        initialValue: this.state.domainData.parentId,
                                    })(<Input type="hidden"/>)}
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainName}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true,}],
                                            initialValue:this.state.domainData.name,
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{ required: true,}],
                                            initialValue:String(this.state.domainData.type),
                                        })(
                                            <Select >
                                                <Option value="1">{domain.province}</Option>
                                                <Option value="2">{domain.localNet} </Option>
                                                <Option value="3">{domain.countyCity}</Option>
                                                <Option value="4">{domain.sector}</Option>
                                                <Option value="5">{domain.theCustom}</Option>
                                                <Option value="6" disabled>{domain.Select}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainId}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('code', {
                                            rules: [{ required: true,}],
                                            initialValue:this.state.domainData.code,
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title={domain.detail}
                        width={800}
                        centered
                        visible={this.state.userVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <Form  onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainMark}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >{this.state.domainData.areaId}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainName}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >{this.state.domainData.name}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainType}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        <Select value={String(this.state.domainData.type)} disabled>
                                            <Option value="1">{domain.province}</Option>
                                            <Option value="2">{domain.localNet} </Option>
                                            <Option value="3">{domain.countyCity}</Option>
                                            <Option value="4">{domain.sector}</Option>
                                            <Option value="5">{domain.theCustom}</Option>
                                            <Option value="6" disabled>{domain.Select}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainNo}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.domainData.code}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainId}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.domainData.sequence}
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

