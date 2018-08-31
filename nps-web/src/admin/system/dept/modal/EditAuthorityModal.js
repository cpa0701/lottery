import React, {PureComponent} from 'react';
import {Modal} from 'antd';
import {inject, observer} from "mobx-react/index";
import TreeComponent from '../../../../common/components/tree/tree';
import DeptService from "../../../../services/system/DeptService"
@inject('stores')
class EditAuthorityModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
        }
    }
    //点击角色树节点时
    onSelectRoleTree = (selectedKeys, info) => {
        info.selectedNodes = info.selectedNodes ? info.selectedNodes : info.checkedNodes;
        this.setState({selectedKeys: selectedKeys})
    }
    //提交更改权限
    handleAddRole = () => {
        this.setState({
            confirmLoading: true,
        });
        DeptService.editAuthority(this.state.selectedKeys).then(result => {
            this.setState({
                confirmLoading: false,
            }, () => this.props.EditAuthorityVisible(false));
        })
    }

    render() {
        const {dept} = this.props.stores.I18nModel.outputLocale
        const {authorityTreeAllData, modalChangeAuthorityVisible, EditAuthorityVisible,onLoadData,selectedAuthorityData} = this.props
        const {confirmLoading} = this.state;
        return (
            <Modal
                title={dept.changeDepartment}
                visible={modalChangeAuthorityVisible}
                onOk={this.handleAddRole}
                confirmLoading={confirmLoading}
                onCancel={() => EditAuthorityVisible(false)}
                okText={dept.ok}
                cancelText={dept.cancel}
            >
                <h6 className='departmentH6'>{dept.roletTree}</h6>
                <div>
                    <TreeComponent
                        checkable={true}
                        default={selectedAuthorityData}
                        onSelect={this.onSelectRoleTree}
                        onCheck={this.onSelectRoleTree}
                        treeData={authorityTreeAllData}
                        onLoadData={onLoadData}/>
                </div>
            </Modal>
        );
    }
}

export default EditAuthorityModal;
