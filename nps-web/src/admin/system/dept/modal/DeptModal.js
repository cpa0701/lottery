import React, {PureComponent} from 'react';
import {Form, Input, Modal, message, Select, Row, Col} from 'antd';
import {inject} from "mobx-react/index"
import DeptService from '../../../../services/system/DeptService';

const FormItem = Form.Item;
const {Option} = Select;
const actionTypeMap = {
    'A': '新增部门',
    'M': '更改部门',
    'V': '查看部门',
}
@inject('stores')
class Dept extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            depart:this.props.stores.I18nModel.outputLocale.dept,
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
            promise = DeptService.addDept({...fields, userId: String(sessionStorage.getItem('userId'))})
        }
        else {
            promise = DeptService.ediDept({...fields, id: departmentData.id, userId: String(sessionStorage.getItem('userId'))})
        }

        promise.then(result => {
            message.success(this.state.actionTypeName + this.state.depart.success);
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
                    callback(this.state.depart.exisitSystem)
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
                        label={this.state.depart.area}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('regionId', {
                            rules: [
                                {required: true, message:this.state.depart.areaEmpty}
                            ],
                            initialValue: (departmentData.regionId ? departmentData.regionId : undefined),
                        })(
                            <Select placeholder={this.state.depart.selectArea} disabled={actionType === "V"}>
                                {domainSelect}
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.departmentType}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('type', {
                            rules: [
                                {required: true, message: this.state.departTypeEmpty},
                                // {validator: this.handleCheckName},
                                {whitespace: true, message: this.state.noBlank}
                            ],
                            initialValue: departmentData.type ? departmentData.type.toString() : undefined,
                        })(
                            <Select placeholder={this.state.depart.selectDepartment} disabled={actionType === "V"}>
                                <Option value='1'>{this.state.depart.generalDepartment}</Option>
                                <Option value='2'>{this.state.depart.replaceDepartment}</Option>
                                <Option value='3'>{this.state.depart.team}</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.departmentLevel}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('level', {
                            initialValue: departmentData.level ? departmentData.level.toString() : undefined,
                            rules: [
                                {required: true, message: this.state.depart.selectDepartLevel},
                                // {validator: this.handleConfirmId}
                            ],
                        })(
                            <Select placeholder={this.state.depart.selectLevel} disabled={actionType === "V"}>
                                <Option value='1'>{this.state.depart.center}</Option>
                                <Option value='2'>{this.state.depart.departmentroom}</Option>
                                <Option value='3'>{this.state.depart.classgroup}</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.departmentName}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('name', {
                            rules: [
                                { //type:"url",
                                    required: true, message: this.state.depart.enterDepartName
                                },
                                {validator: this.handleCheckName},
                                {whitespace: true, message: this.state.depart.noBlank}
                            ],
                            initialValue: departmentData.name,
                            // initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },
                        })(
                            <Input placeholder={this.state.depart.enterDepartName} disabled={actionType === "V"}/>
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
        const {dept} = this.props.stores.I18nModel.outputLocale
        // let detailFlag = this.state.detailFlag;
        const {modalVisible, form, handleModalVisible, departmentData, thisTime} = this.props;
        let action = {
            actionType: 'A',
            actionTypeName: dept.newDepartment
        }
        if (departmentData && departmentData.id) {
            if (thisTime === "M") {
                action = {
                    actionType: 'M',
                    actionTypeName: dept.changeDepartment
                };
                this.actionType='M'
            } else {
                action = {
                    actionType: 'V',
                    actionTypeName: dept.checkDepartment
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
