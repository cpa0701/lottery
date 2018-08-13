import React, {PureComponent} from 'react';
import {Tree} from 'antd';

const TreeNode = Tree.TreeNode;
const loop = data => data.map((item) => {
    if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item} isLeaf={item.isLeaf}>
                {loop(item.children)}
            </TreeNode>
        );
    }
    return <TreeNode {...item} dataRef={item}/>;
});

class TreeComponent extends PureComponent {
    render() {
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
            : '暂无数据';
    }
}

export default TreeComponent;