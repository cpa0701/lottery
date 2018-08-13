import React, {Component} from 'react';
import {Modal} from 'antd';

import Tree from '../Tree';
import AuthorityService from '../../../../services/AuthorityService'

export default class extends Component {
  state = {
      authData: [], // 权限树
  };
  componentDidMount() {
        // 获取权限树
        this.authQuery({parentId: '0'});
  }
  // 获取所有权限树数据
  authQuery = (params) => {
      AuthorityService.getAuthTree(params)
            .then(data => {
                data.map(item => {
                    item.title = item.name;
                    item.key = item.id;
                    item.isLeaf = item.leaf;
                });
                this.setState({
                    authData: data,
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
            AuthorityService.getAuthTree({parentId: treeNode.props.dataRef.id})
                .then(data => {
                    data.map(item => {
                        item.title = item.name;
                        item.key = item.id;
                        item.isLeaf = item.leaf;
                    });
                    treeNode.props.dataRef.children = [...data];
                    this.setState({
                        authData: [...this.state.authData]
                    });
                    resolve();
                })
        });
    };

  onSubmit = () => {
      this.props.onCreate();
  };

  render() {
    const {editAuth, checkedKeys} = this.props;
    const authProps = { // 树索要用到的参数
          treeData: this.state.authData, // 要一级数据.
          checkedKeys,
          checkable: true,
          onCheck: this.props.onCheck,
          onLoadData: this.loadAuthData
      };

    return (
      <Modal
        title="编辑角色权限"
        width={600}
        maskClosable={false}
        visible={editAuth}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}
        className="authModal-content"
      >
       <Tree {...authProps}/>
      </Modal>
    );
  }
}
