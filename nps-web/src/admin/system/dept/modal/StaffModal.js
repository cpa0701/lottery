import React, {PureComponent} from 'react';
import {Form, Input, Modal, message, Select, Row, Col} from 'antd';
import {inject} from "mobx-react/index"
import DeptService from '../../../../services/system/DeptService';

const {TextArea} = Input;
const FormItem = Form.Item;
const {Option} = Select;
const actionTypeMap = {
    'A': '新增部门',
    'M': '修改部门',
    'V': '查看部门'
}
@inject('stores')
class StaffModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            depart:this.props.stores.I18nModel.outputLocale.dept,
            actionTypeName: actionTypeMap['A'],
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
    //     if ('V' === action) {
    //         this.setState({
    //             footer: null
    //         });
    //     }
    //     else {
    //         this.setState({
    //             footer: undefined
    //         });
    //     }
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
        const {handleModalVisible, staffData, departmentData} = this.props;
        let promise = null;
        //新增
        fields.deptId = departmentData.id;
        if (this.actionType === 'A') {
            promise = DeptService.addStaff({...fields, userId: String(sessionStorage.getItem('userId'))})
        }
        else {
            promise = DeptService.ediStaff({...fields, id: staffData.id, userId: String(sessionStorage.getItem('userId'))})
        }
        promise.then(result => {
            message.success(this.state.actionTypeName + this.state.depart.success);
            handleModalVisible();
        });
    };
    // 校验部门的唯一性
    handleCheckName = (rule, value, callback) => {
        let code = '';
        let params = {
            menuName: value,
            state: "00A"
        };
        DeptService.checkDeptName(params)
            .then(result => {
                code = result.code;
                if (code && code === '1' && this.actionType === 'A') {
                    callback(this.state.depart.exisitSystem)
                }
                callback()
            })
    };
    afterClose = () => {
        this.props.form.resetFields();
    };

    getFields(actionType) {
        const {form, departmentData, staffData} = this.props;
        return (
            <div>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.stuffName}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('name', {
                            rules: [
                                {required: true, message:this.state.depart.nameEmpty}
                            ],
                            initialValue: staffData.name,
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.loginAccount}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('account', {
                            rules: [
                                {required: true, message: this.state.depart.emptyAccount}
                            ],
                            initialValue: staffData.account,
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.userNumber}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('no', {
                            rules: [
                                {required: true, message: this.state.depart.emptyUserNumber}
                            ],
                            initialValue: staffData.no,
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.gender}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('sex', {
                            rules: [
                                {required: true, message: this.state.depart.emptygender}
                            ],
                            initialValue: staffData.sex,
                        })(
                            <Select placeholder={this.state.depart.selectGender} disabled={actionType === "V"}>
                                <Option value="M">{this.state.depart.man}</Option>
                                <Option value="F">{this.state.depart.female}</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.phoneNumber}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('cellphone', {
                            rules: [],
                            initialValue: staffData.cellphone,
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12} style={{'display': 'none'}}>
                    <FormItem
                        label={this.state.depart.departID}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('deptId', {
                            initialValue: departmentData.deptId,
                            rules: [],
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.email}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('email', {
                            rules: [],
                            initialValue: staffData.email,
                            // initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        label={this.state.depart.idCard}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                    >
                        {form.getFieldDecorator('identityCard', {
                            initialValue: staffData.identityCard,
                            // initialValue: { menuUrl: this.props.departmentData.menuUrl !== undefined ? this.props.departmentData.menuUrl + '' : '' },
                        })(
                            <Input disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem
                        label={this.state.depart.notes}
                        labelCol={{span: 5}}
                        wrapperCol={{span: 19}}
                    >
                        {form.getFieldDecorator('remark', {
                            initialValue: staffData.remark
                        })(
                            <TextArea rows={4} disabled={actionType === "V"}/>
                        )}
                    </FormItem>
                </Col>
            </div>)
    }

    render() {
        // let detailFlag = this.state.detailFlag;
        const {modalVisible, form, handleModalVisible, thisTime} = this.props;
        let action = {
            actionType: 'A',
            actionTypeName: this.state.depart.newStaff
        };
        if (thisTime === "M") {
            action = {
                actionType: 'M',
                actionTypeName: this.state.depart.modifyStaff
            };
            this.actionType = 'M'
        } else if (thisTime === "V") {
            action = {
                actionType: 'V',
                actionTypeName: this.state.depart.checkStuff
            };
            this.actionType = 'V'
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
                afterClose={this.afterClose}
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

export default Form.create({})(StaffModal);
