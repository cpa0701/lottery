import React, {PureComponent} from 'react';
import {Tree} from 'antd';
import {inject} from "mobx-react/index"
const TreeNode = Tree.TreeNode;
const loop = data => data.map((item) => {
    if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {loop(item.children)}
            </TreeNode>
        );
    }
    return <TreeNode {...item} dataRef={item} isLeaf={item.isLeaf}/>;
});
@inject('stores')
class TreeComponent extends PureComponent {

    render() {
        const {dept} = this.props.stores.I18nModel.outputLocale
        const {treeData, onSelect, onCheck, checkedKeys, onLoadData, checkable, showLine, defaultExpandedKeys, defaultDeptSelectedKeys} = this.props;

        return treeData.length
            ? <Tree
                showLine={showLine}
                checkable={checkable}
                defaultExpandedKeys={defaultExpandedKeys ? defaultExpandedKeys : [treeData[0].key.toString()]}
                defaultSelectedKeys={defaultDeptSelectedKeys ? defaultDeptSelectedKeys : [treeData[0].key.toString()]}
                defaultCheckedKeys={defaultDeptSelectedKeys ? defaultDeptSelectedKeys : [treeData[0].key.toString()]}
                onSelect={onSelect}
                onCheck={onCheck}
                loadData={onLoadData}>{loop(treeData)}</Tree>
            : dept.nodata;
    }
}

export default TreeComponent;