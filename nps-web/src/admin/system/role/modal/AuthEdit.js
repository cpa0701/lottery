import React, {Component} from 'react';
import {Modal} from 'antd';

import Tree from '../Tree';
import SysRoleMgService from "../../../../services/RoleService";

export default class extends Component {
  state = {
      authData: [], // 权限树
  };
  componentDidMount() {
        // 获取权限树
        this.authQuery();
  }
  // 获取所有权限树数据
  authQuery = () => {
      SysRoleMgService.qryAuthTree()
            .then(res => {
                this.setState({
                    authData: res.treeData,
                });
            });
    };
  //异步加载权限树节点
  loadAuthData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            SysRoleMgService.qryAuthTree(treeNode.props.dataRef)
                .then(result => {
                    treeNode.props.dataRef.children = [...result.treeData];
                    this.setState({
                        authData: [...this.state.authData]
                    });
                    resolve();
                })
        });
    };

  onSubmit = () => {
      this.props.onCreate(this.state.checkedKeys);
  };
  // 勾选权限树树节点时
  onCheck = (checkedKeys) => {
      this.props.onCheck(checkedKeys);
  };

  render() {
    const {editAuth, checkedKeys} = this.props;
    const authProps = { // 树索要用到的参数
          treeData: this.state.authData, // 要一级数据.
          checkedKeys,
          checkable: true,
          onLoadData: (treeNode) => { // 载入数据.
              this.loadAuthData(treeNode);
          },
      };

    return (
      <Modal
        title="编辑角色权限"
        width={600}
        maskClosable={false}
        visible={editAuth}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}
      >
       <Tree {...authProps}/>
      </Modal>
    );
  }
}
