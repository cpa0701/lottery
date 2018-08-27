import React, {PureComponent} from 'react';
import {Modal} from 'antd';
import {inject} from "mobx-react/index"
import TreeComponent from '../../../../common/components/tree/tree';
import DeptService from "../../../../services/system/DeptService"
@inject('stores')
class AddRoleModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            depart:this.props.stores.I18nModel.outputLocale.dept,
            confirmLoading: false
        }
    }
    //点击角色树节点时
    onSelectRoleTree = (selectedKeys, info) => {
        info.selectedNodes = info.selectedNodes ? info.selectedNodes : info.checkedNodes;
        this.setState({selectedKeys: selectedKeys})
    }
    //提交更改角色信息
    handleAddRole = () => {
        this.setState({
            confirmLoading: true,
        });
        DeptService.addRole(this.state.selectedKeys).then(result => {
            this.setState({
                confirmLoading: false,
            }, () => this.props.addRoleVisible(false));
        })
    }

    render() {
        const {addRoleTreeDate, modalChangeRoleVisible, addRoleVisible,onLoadData} = this.props
        const {confirmLoading} = this.state;
        return (
            <Modal
                title={this.state.depart.changeDepartment}
                visible={modalChangeRoleVisible}
                onOk={this.handleAddRole}
                confirmLoading={confirmLoading}
                onCancel={() => addRoleVisible(false)}
                okText={this.state.depart.ok}
                cancelText={this.state.depart.cancel}
            >
                <h6 className='departmentH6'>角色树</h6>
                <div>
                    <TreeComponent
                        checkable={true}
                        onSelect={this.onSelectRoleTree}
                        onCheck={this.onSelectRoleTree}
                        treeData={addRoleTreeDate}
                        onLoadData={onLoadData}/>
                </div>
            </Modal>
        );
    }
}

export default AddRoleModal;
