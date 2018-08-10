import React, {PureComponent} from 'react';
import {Form, Input, Modal, message, Select, Row, Col} from 'antd';

import DeptService from '../../../../services/DeptService';

const FormItem = Form.Item;
const {Option} = Select;
const actionTypeMap = {
    'A': '新增部门',
    'M': '修改部门',
    'V': '查看部门'
}

class Dept extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            actionTypeName: actionTypeMap['A'],
            disabledParentTree: false
        }
        this.actionType = 'A';
    }

    componentDidMount() {
        const {form} = this.props;
        form.resetFields();
    }

    // componentWillReceiveProps = (nextProps) => {
    //     this.setActionType(nextProps);
    // }
    // //   设置动作类型
    // setActionType = (nextProps) => {
    //     const {departmentData} = this.props;
    //     let realSysvData = departmentData;
    //     if (nextProps) {
    //         //如果在props更新的时候调用，那么用nextProps为准
    //         realSysvData = nextProps.departmentData;
    //     }
    //     let action = 'A';
    //     if (nextProps && nextProps.thisTime) {
    //         action = nextProps.thisTime;
    //     }
    //     this.actionType = action
    //     this.setState({
    //         actionTypeName: actionTypeMap[action]
    //     });
    //
    //       if('V' === action){
    //         this.setState({
    //           footer: null
    //         });
    //       }
    //       else {
    //         this.setState({
    //           footer: undefined
    //         });
    //       }
    //
    // }
    //
    //
    // handleConfirmId = (rule, value, callback) => {
    //     const {getFieldValue} = this.props.form
    //     if (getFieldValue('IDOMAINTYPE') === '' || getFieldValue('IDOMAINTYPE') === undefined) {
    //         callback('请先选择上级菜单')
    //     }
    //     callback()
    // }
    // 查询父级部门名字
    // searchName=(parentId)=>{
    //     // debugger
    //   if(!parentId){
    //       return;
    //   }else if(parentId === -1){
    //       return '根菜单'
    //   }else{

    //   }
    // }
    //提交按钮
    handleSubmit = (fields) => {
        const {handleModalVisible, departmentData} = this.props;
        let promise = null;
        fields.parentId = departmentData.parentId;
        //新增
        if (this.actionType === 'A') {
            promise = DeptService.addDept(fields)
        }
        else {
            promise = DeptService.ediDept({...fields, id: departmentData.id})
        }

        promise.then(result => {
            message.success(this.state.actionTypeName + '成功');
            handleModalVisible();
        });
    }
    // 校验部门的唯一性
    handleCheckName = (rule, value, callback) => {
        let code = ''
        let params = {
            name: value
        }
        DeptService.checkDeptName(params)
            .then(result => {
                code = result.code
                if (code && code === '1' && this.actionType === 'A') {
                    callback('系统名称已存在！')
                }
                callback()
            })
    }

    getFields(actionType) {
        const {form, departmentData, domainTreeDate} = this.props;
        const domainSelect = domainTreeDate.map((a) =>
            <Option key={a.key} value={a.key}>{a.title}</Option>
        )
        return (
            <div>
                <Col span={12}>
                    <FormItem
                        label="所属区域"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('regionId', {
                            rules: [
                                {required: true, message: '所属区域不能为空'}
                            ],
                            initialValue: (departmentData.regionId ? departmentData.regionId : undefined),
                        })(
                            <Select placeholder={'请选择所属区域'} disabled={actionType === "V"}>
                                {domainSelect}
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label="部门类型"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('type', {
                            rules: [
                                {required: true, message: '部门类型不能为空'},
                                // {validator: this.handleCheckName},
                                {whitespace: true, message: '请输入非空白内容'}
                            ],
                            initialValue: departmentData.type ? departmentData.type.toString() : undefined,
                        })(
                            <Select placeholder={'请选择部门'} disabled={actionType === "V"}>
                                <Option value='1'>常规部门</Option>
                                <Option value='2'>代维部门</Option>
                                <Option value='3'>团队</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label="部门级别"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('level', {
                            initialValue: departmentData.level ? departmentData.level.toString() : undefined,
                            rules: [
                                {required: true, message: '请选择部门级别'},
                                // {validator: this.handleConfirmId}
                            ],
                        })(
                            <Select placeholder='请选择级别' disabled={actionType === "V"}>
                                <Option value='1'>中心</Option>
                                <Option value='2'>科室</Option>
                                <Option value='3'>班组</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label="部门名称"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('name', {
                            rules: [
                                { //type:"url",
                                    required: true, message: '请输入部门名称'
                                },
                                {validator: this.handleCheckName},
                                {whitespace: true, message: '请输入非空白内容'}
                            ],
                            initialValue: departmentData.name,
                            // initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },
                        })(
                            <Input placeholder={'请输入部门名称'} disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                {/*<Col span={12}>*/}
                {/*<FormItem*/}
                {/*label="显示名称"*/}
                {/*labelCol={{span: 10}}*/}
                {/*wrapperCol={{span: 14}}*/}
                {/*>*/}
                {/*{form.getFieldDecorator('SDOMAINCODE', {*/}
                {/*rules: [*/}
                {/*{ //type:"url",*/}
                {/*required: true, message: '部门编码'*/}
                {/*},*/}
                {/*{whitespace: true, message: '请输入非空白内容'}*/}
                {/*],*/}
                {/*initialValue: this.props.departmentData.SDOMAINCODE,*/}
                {/*// initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },*/}
                {/*})(*/}
                {/*<Input disabled={actionType === "V"}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*</Col>*/}
                {/*<Col span={12}>*/}
                {/*<FormItem*/}
                {/*label="部门简称"*/}
                {/*labelCol={{span: 10}}*/}
                {/*wrapperCol={{span: 14}}*/}
                {/*>*/}
                {/*{form.getFieldDecorator('SDOMAINCODE', {*/}
                {/*initialValue: this.props.departmentData.SDOMAINCODE,*/}
                {/*// initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },*/}
                {/*})(*/}
                {/*<Input disabled={actionType === "V"}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*</Col>*/}
                {/*<Col span={12}>*/}
                {/*<FormItem*/}
                {/*label="部门编码"*/}
                {/*labelCol={{span: 10}}*/}
                {/*wrapperCol={{span: 14}}*/}
                {/*>*/}
                {/*{form.getFieldDecorator('SDOMAINCODE', {*/}
                {/*initialValue: this.props.departmentData.SDOMAINCODE,*/}
                {/*// initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },*/}
                {/*})(*/}
                {/*<Input disabled={actionType === "V"}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*</Col>*/}
                {/*<Col span={12}>*/}
                {/*<FormItem*/}
                {/*label="是否责任部门"*/}
                {/*labelCol={{span: 10}}*/}
                {/*wrapperCol={{span: 14}}*/}
                {/*>*/}
                {/*{form.getFieldDecorator('IDOMAINTYPE', {*/}
                {/*initialValue: this.props.departmentData.IDOMAINTYPE,*/}
                {/*rules: [*/}
                {/*{required: true, message: '请选择部门类型'},*/}
                {/*{validator: this.handleConfirmId}*/}
                {/*],*/}
                {/*})(*/}
                {/*<Select disabled={actionType === "V"}>*/}
                {/*<Option value='1'>是</Option>*/}
                {/*<Option value='2'>否</Option>*/}
                {/*</Select>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*</Col>*/}
                {/*<Col span={12}>*/}
                {/*<FormItem*/}
                {/*label="排序"*/}
                {/*labelCol={{span: 10}}*/}
                {/*wrapperCol={{span: 14}}*/}
                {/*>*/}
                {/*{form.getFieldDecorator('ISEQ', {*/}
                {/*rules: [{required: true, message: '请输入排序'}],*/}
                {/*initialValue: this.props.departmentData.ISEQ,*/}
                {/*// initialValue: { orderId: this.props.departmentData.orderId !== undefined ? this.props.departmentData.orderId + '' : '' },*/}
                {/*})(*/}
                {/*<InputNumber disabled={actionType === "V"}*/}
                {/*min={1} max={100}*/}
                {/*/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*</Col>*/}
            </div>)
    }

    render() {
        // let detailFlag = this.state.detailFlag;
        const {modalVisible, form, handleModalVisible, departmentData, thisTime} = this.props;
        let action = {
            actionType: 'A',
            actionTypeName: '新增部门'
        }
        if (departmentData && departmentData.id) {
            if (thisTime === "M") {
                action = {
                    actionType: 'M',
                    actionTypeName: '修改部门'
                };
                this.actionType='M'
            } else {
                action = {
                    actionType: 'V',
                    actionTypeName: '查看部门'
                };
                this.actionType='V'
            }
        }
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                this.handleSubmit(fieldsValue);
            });
        };

        return (
            <Modal
                title={action.actionTypeName}
                visible={modalVisible}
                width={800}
                destroyOnClose={true}
                onOk={okHandle}
                onCancel={() => handleModalVisible()}
                {...this.props.thisTime}
            >
                <Form>
                    <Row gutter={24}>
                        {this.getFields(action.actionType)}
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({})(Dept);
