import React, {PureComponent} from 'react';
import {Layout, Icon, Button, Tabs, Table, Form, Input, Popconfirm, message} from 'antd';

import SysRoleMgService from '../../../services/system/RoleService';
import DeptService from '../../../services/system/DeptService';
import AuthorityService from '../../../services/system/AuthorityService'

import Tree from './Tree';
import RoleAdd from './modal/roleModal/RoleAdd';
import RoleEdit from './modal/roleModal/RoleEdit';
import RoleCopy from './modal/roleModal/RoleCopy';

import AuthEdit from './modal/AuthEdit';
// import RegEdit from './modal/RegionEdit';
// import DeptEdit from './modal/DeptEdit';
import UserAdd from './modal/UserAdd';

import './Role.less';
import {inject} from "mobx-react/index";

const [TabPane, FormItem] = [Tabs.TabPane, Form.Item];
const {Sider, Content} = Layout;
@inject('stores')
@Form.create({})
export default class Role extends PureComponent {
    state = {
        role:this.props.stores.I18nModel.outputLocale.role,
        treeData: [], // 角色树
        authData: [], // 角色拥有权限树
        regionData: [], // 用户区域管理树
        deptTreeData: [], // 用户所属部门树
        authCheckedKeys: [], // 勾选的角色存在的权限id
        regSelectKeys: [], // 用户所属区域的id
        deptCheckedKeys: [], // 勾选的角色存在的部门id
        userData: [], // 用户表
        deptData: [], // 部门表
        checkedKeys: [], //角色树勾选
        selRowKeys: [], // 用户表勾选
        checkedAuthKeys: [],//权限树勾选(删除)
        record: {}, // 编辑角色时的obj数据
        parentId: 0,
        selectedKeys: [],
        collapsed: false,
        loading: false,
        add: false,
        addUser: false,
        edit: false,
        copy: false,
        editAuth: false,
        editReg:false,
        editDept: false,
        // value: 1,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条用户信息`,
            current: 1,
            total: null,
            pageSize: 10,
        },
    };

    componentDidMount() {
        // 获取角色树
        this.roleQuery({parentId: 0, name: ''});
    }
    //收起展开角色
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    isMount = true;

    // 获取角色树
    roleQuery = (param) => {
        SysRoleMgService.roleTree(param)
            .then(data => {
                if (data) {
                    data.map(item => {
                        item.title = item.name;
                        item.key = item.id;
                        item.isLeaf = item.leaf;
                        return item;
                    });
                    this.setState({
                        treeData: data,
                    });
                }
            });
    };
    // 异步加载角色树节点
    loadRoleData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            SysRoleMgService.roleTree({parentId: Number(treeNode.props.dataRef.id), name: ''})
                .then(data => {
                    if (data) {
                        data.map(item => {
                            item.title = item.name;
                            item.key = item.id;
                            item.isLeaf = item.leaf;
                            return item;
                        });
                        treeNode.props.dataRef.children = [...data];
                        this.setState({
                            treeData: [...this.state.treeData]
                        });
                    }
                    resolve();
                })
        });
    };
    // 点击、勾选角色树节点时
    onSelect = (selectedKeys, info) => {
        if (selectedKeys.length > 1) {
            message.info(this.state.role.selectOneCharacter);
            return;
        }
        info.selectedNodes = info.selectedNodes ? info.selectedNodes : info.checkedNodes;
        let record =  info.selectedNodes.length ? info.selectedNodes[info.selectedNodes.length - 1].props.dataRef : "";

        this.setState({
            parentId: Number(selectedKeys[selectedKeys.length - 1]),
            checkedKeys: selectedKeys,
            record
        });
        if (selectedKeys.length  === 1) {
            this.authQuery({id: Number(selectedKeys[0])});
            this.getUserData({
                pageNum:String(this.state.pagination.current),
                pageSize:String(this.state.pagination.pageSize),
                id: Number(selectedKeys[0]),
            });
        }
    };

    // 新增角色
    addRoleModal = (show) => {
        if (show) {
            this.setState({add: true});
        } else {
            this.setState({add: false});
        }
    };
    // 编辑角色
    editRoleModal = (show, record, checkedKeys, type) => {
        if (Object.keys(record).length !== 0 ) {
            if(checkedKeys.length > 1) {
                message.info(this.state.role.editOneCharacter);
                return;
            }
            this.setState({
                edit: true
            });
        } else if(type === 1) {
            this.setState({edit: false});
        } else {
            this.setState({edit: false});
            message.info(this.state.role.selectEditCharacter);
        }
    };
    // 复制角色
    copyRoleModal = (show, record, checkedKeys, type) => {
        if (Object.keys(record).length !== 0) {
            if(checkedKeys.length > 1) {
                message.info(this.state.role.copyCharacter);
                return;
            }
            this.setState({
                copy: true
            });
        } else if(type === 1) {
            this.setState({copy: false});
        } else {
            this.setState({copy: false});
            message.info(this.state.role.selectCopyCharacter);
        }
    };
    // 删除角色
    delRoles = () => {
        let checkedKeys = this.state.checkedKeys;
        if(checkedKeys.length === 0) {
            message.info(this.state.role.deleteOneCharacter);
            return;
        } else if(checkedKeys.length > 1) {
            message.info(this.state.role.selectDeleteCharacter);
            return;
        }
        this.setState({loading: true}, () => {
            SysRoleMgService.delRoles({id: Number(checkedKeys[0]),userId: String(sessionStorage.getItem('userId'))}).then((res) => {
                message.success(this.state.role.deleteSuccess);
                this.roleQuery({parentId: 0, name: ''});
                this.setState({checkedKeys: [], record: {}, loading: false});
            });
        });
    };

    // 获取角色拥有权限树
    authQuery = (params) => {
        let authCheckedKeys = [];
        SysRoleMgService.getRoleAuthTree(params)
            .then(data => {
                data.map(item => {
                    item.title = item.name;
                    item.key = item.id;
                    authCheckedKeys.push(item.key);
                    item.isLeaf = item.leaf;
                    return item;
                });
                this.setState({
                    authCheckedKeys,
                    authData: data,
                });
            });
    };
    // 异步加载权限树节点
    loadAuthData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            let authCheckedKeys = [];
            AuthorityService.getAuthTree({parentId: Number(treeNode.props.dataRef.id)})
                .then(data => {
                    data.map(item => {
                        item.title = item.name;
                        item.key = item.id;
                        authCheckedKeys.push(item.key);
                        item.isLeaf = item.leaf;
                        return item;
                    });
                    treeNode.props.dataRef.children = [...data];
                    this.setState({
                        authData: [...this.state.authData]
                    });
                    resolve();
                })
        });
    };
    // 编辑权限
    editAuthModal = (show, checkedKeys, type) => {
        if (checkedKeys.length !== 0) {
            this.setState({
                editAuth: true
            });
        } else if (type === 1) {
            this.setState({editAuth: false});
        } else {
            this.setState({editAuth: false});
            message.info(this.state.role.selectEditRole);
        }
    };
    // 点击、勾选获取权限树时(删除)
    onSelectAuth=(selectedKeys, info)=>{
        if (selectedKeys.length > 1) {
            message.info(this.state.role.selectOneCharacterAuth);
            return;
        }
        this.setState({
            checkedAuthKeys: selectedKeys,
        });
    };
    // 删除权限
    delAuths = () => {
        let checkedKeys = this.state.checkedKeys;
        if(checkedKeys.length === 0) {
            message.info(this.state.role.tickDeleteRole);
            return;
        }
        this.setState({loading: true}, () => {
              let param={
                  rid: Number(checkedKeys[0]),
                  pid: Number(this.state.checkedAuthKeys[0]),
                  userId: String(sessionStorage.getItem('userId'))
              };
            SysRoleMgService.delRoleAuth(param).then((res) => {
                    message.success(this.state.role.deleteSuccess);
                    if (checkedKeys.length  === 1) {
                        this.authQuery({id: Number(checkedKeys[0])});
                    }
                    this.setState({loading: false});
            });
        });
    };

    // 全局域/个性域切换
    // onChange = (e) => {
    //     this.setState({
    //         value: e.target.value,
    //     });
    // };

    // 获取角色区域树
    regionQuery = (params) => {
        SysRoleMgService.qryRegionTree(params)
            .then(res => {
                res.treeData.map(item => {
                    item.title = item.sdeptName;
                    item.key = item.ideptId;
                    item.isLeaf = !item.childCount;
                    return item;
                });
                this.setState({
                    regionData: res.treeData,
                });
            });
    };
    //异步加载区域树节点
    // loadRegData = (treeNode) => {
    //     return new Promise((resolve) => {
    //         if (treeNode.props.children) {
    //             resolve();
    //             return;
    //         }
    //         SysRoleMgService.qryRegTree(treeNode.props.dataRef)
    //             .then(result => {
    //                 result.treeData.map(item => {
    //                     item.title = item.sdeptName;
    //                     item.key = item.ideptId;
    //                     item.isLeaf = !item.childCount;
    //                 });
    //                 treeNode.props.dataRef.children = [...result.treeData];
    //                 this.setState({
    //                     regionData: [...this.state.regionData]
    //                 });
    //                 resolve();
    //             })
    //     });
    // };
    // 编辑选择区域
    editRegionModal = (show, checkedKeys, type) => {
        if (checkedKeys.length !== 0) {
            this.setState({
                editReg: true
            });
        } else if (type === 1) {
            this.setState({editReg: false});
        } else {
            this.setState({editReg: false});
            message.info(this.state.role.selectAreaRole);
        }
    };

    // 获取部门树
    deptQuery = (params) => {
        let param = params ? params : {};
        param.status = 1;
        DeptService.getDeptTree(params)
            .then(res => {
                res.treeData.map(item => {
                    item.title = item.name;
                    item.key = item.id;
                    item.isLeaf = item.leaf;
                    return item;
                });
                this.setState({
                    deptTreeData: res.treeData,
                });
            });
    };
    // 异步加载部门树节点
    loadDeptData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            DeptService.getDeptTree(treeNode.props.dataRef)
                .then(result => {
                    result.treeData.map(item => {
                        item.title = item.name;
                        item.key = item.id;
                        item.isLeaf = item.leaf;
                        return item;
                    });
                    treeNode.props.dataRef.children = [...result.treeData];
                    this.setState({
                        deptTreeData: [...this.state.deptTreeData]
                    });
                    resolve();
                })
        });
    };
    // 编辑部门
    editDeptModal = (show, checkedKeys, type) => {
        if (checkedKeys.length !== 0) {
            this.setState({
                editDept: true
            });
        } else if (type === 1) {
            this.setState({editDept: false});
        } else {
            this.setState({editDept: false});
            message.info(this.state.role.selectEditDepartmentRole);
        }
    };

    // 获取人员信息表格数据
    getUserData = (values) => {
        SysRoleMgService.getRoleUserDate(values).then(data => {
            this.setState({
                userData: [...data.list]
            });
        });
    };
    // 点击查询用户表格
    handleSearch = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            let params = {
                ...values,
                pageNum: String(this.state.pagination.current),
                pageSize: String(this.state.pagination.pageSize),
                id: Number(this.state.checkedKeys[0]),
            };
            this.getUserData(params);
        });
    };
    // 获取勾选用户表格id
    onSelectChange = (selectedRowKeys) => {
        if(selectedRowKeys.length > 1) {
            message.info(this.state.role.checkDeleteUser);
            return;
        }
        this.setState({ selRowKeys: selectedRowKeys });
    };
    // 新增角色
    addUsers = (show, type) => {
        if (show.length !== 0) {
            this.setState({
                addUser: true
            });
        } else if (type === 1) {
            this.setState({addUser: false});
        } else {
            this.setState({addUser: false});
            message.info(this.state.role.selectAddCharacter);
        }
    };
    // 删除用户
    delUsers = () => {
        let selRowKeys = this.state.selRowKeys;
        if(selRowKeys.length === 0) {
            message.info(this.state.role.selectDeleteUser);
            return;
        }
        this.setState({loading: true}, () => {
            SysRoleMgService.delRoleUsers({rid: Number(this.state.checkedKeys[0]),
                    uid: Number(selRowKeys)}).then((res) => {
                message.success(this.state.role.deleteSuccess);
                let param={
                    pageNum: String(this.state.pagination.current),
                    pageSize: String(this.state.pagination.pageSize),
                    //id: Number(this.state.selectedKeys[0])
                    id: Number(this.state.checkedKeys[0])
                };
                this.getUserData(param);

                this.setState({loading: false});
            });
        });
    };

    render() {
        const { role } = this.props.stores.I18nModel.outputLocale;
        const {
            pagination,
            loading,
            userData,
            // deptData,
            treeData,
            authData,
            // regionData,
            selectedKey,
            record,
            checkedKeys,
            authCheckedKeys,
            checkedAuthKeys,
            selRowKeys,
            // regSelectKeys
        } = this.state;
        // 表格列
        const userColumns = [
            {
                title:role.userName,
                dataIndex: 'name',
                width: '20%'
            },
            {
                title: role.department,
                dataIndex: 'deptName',
                width: '60%'
            },
            {
                title: role.creator,
                dataIndex: 'createdName',
                width: '20%'
            }
        ];
        // const deptColumns = [
        //     {
        //         title: '部门名称',
        //         dataIndex: 'name',
        //         width: '20%'
        //     },
        //     {
        //         title: '部门路径',
        //         dataIndex: 'chName',
        //         width: '30%'
        //     },
        //     {
        //         title: '所属区域',
        //         dataIndex: 'modelDir',
        //         width: '30%'
        //     },
        //     {
        //         title: '所属区域标识  ',
        //         dataIndex: 'modelDes'
        //     }
        // ];
        const rowSelection = {
            selectedRowKeys: selRowKeys,
            onChange: this.onSelectChange,
        };

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 12},
        };

        // 角色、权限、区域、部门树
        const roleProps = {// 树索要用到的参数
            treeData, // 要一级数据.
            selectedKey,
            checkedKeys,
            checkable: true,
            onCheck: this.onSelect,
            onSelect: this.onSelect
        };
        const authProps = {// 树索要用到的参数
            treeData: authData, // 要一级数据.
            checkedKeys: checkedAuthKeys,
            selectedKey: checkedAuthKeys,
            checkable: true,
            onCheck: this.onSelectAuth,
            onSelect:this.onSelectAuth,
            onLoadData: this.loadAuthData
        };
        // const regionProps = {// 表所要用到的参数
        //     treeData: regionData,
        //     selectedKey,
        //     checkable: false,
        // };
        // const deptProps = {// 表所要用到的参数
        //     treeData,
        //     checkable: false,
        // };

        // 角色新增、编辑、复制传参
        const addModalProps = {
            add: this.state.add,
            parentId: this.state.parentId,
            onClose: () => {
                this.addRoleModal(false);
            },
            onCreate: (values) => {
                SysRoleMgService.addRoles({...values,userId: String(sessionStorage.getItem('userId'))}).then((data) => {
                    if (data) {
                        message.success(role.success);
                        if (this.isMount) {
                            this.setState({add: false, loading: false}, () => {
                                this.roleQuery({parentId: 0, name: ''});
                            });
                        }
                    } else {
                        message.error(role.saveFailed);
                        if (this.isMount) {
                            this.setState({loading: false});
                        }
                    }
                });
            },
        };
        const editModalProps = {
            edit: this.state.edit,
            role: this.state.record,
            onClose: () => {
                this.editRoleModal(false, {}, {}, 1);
                },
            onCreate: (values) => {
                console.log(values);
                SysRoleMgService.editRoles({...values,userId: String(sessionStorage.getItem('userId'))}).then((data) => {
                    message.success(role.editSuccess);
                    if (this.isMount) {
                        this.setState({checkedKeys: [], record: {}, edit: false}, () => {
                            this.roleQuery({parentId: 0, name: ''});
                        });
                    }
                });
            },
        };
        const copyModalProps = {
            copy: this.state.copy,
            role: this.state.record,
            onClose: () => {
                this.copyRoleModal(false, {}, {}, 1);
            },
            onCreate: (values) => {
                SysRoleMgService.copyRoles({...values}).then((data) => {
                    if (data.code === 0) {
                        message.success(role.copySuccess);
                        if (this.isMount) {
                            this.setState({edit: false}, () => {
                                this.roleQuery({parentId: 0, name: ''});
                            });
                        }
                    } else {
                        message.error(role.copyFailed);
                        if (this.isMount) {
                            this.setState({loading: false});
                        }
                    }
                });
            },
        };
        // 权限编辑
        const editAuthModalProps = {
            editAuth: this.state.editAuth,
            checkedKeys: authCheckedKeys,
            roleId: checkedKeys[0],
            loadAuthData: this.loadAuthData,
            onClose: () => {
                this.editAuthModal(false, [], 1);
            },
            onCreate: () => {
                this.setState({editAuth: false}, () => {
                    if (checkedKeys.length  === 1) {
                        this.authQuery({id: Number(checkedKeys[0])});
                    }
                });
            },
            onCheck: (checkedKeys) => {
                this.setState({ authCheckedKeys: checkedKeys });
            },
        };
        // 区域编辑
        // const editRegModalProps = {
        //     editReg: this.state.editReg,
        //     regSelectKeys,
        //     onClose: () => {
        //         this.editRegionModal(false, [], 1);
        //     },
        //     onCreate: () => {
        //         let params = {
        //             userIds: checkedKeys,
        //             regionIds: regSelectKeys
        //         };
        //         SysRoleMgService.editRegion({...params}).then((data) => {
        //             if (data.code === 0) {
        //                 message.success('修改区域成功!');
        //                 if (this.isMount) {
        //                     this.setState({editAuth: false}, () => {
        //                         // this.treeQuery(); 编辑完后进行的动作
        //                     });
        //                 }
        //             } else {
        //                 message.error('修改区域失败');
        //                 if (this.isMount) {
        //                     this.setState({loading: false});
        //                 }
        //             }
        //         });
        //     },
        //     onSelectChange: (selectedRowKeys, selectedRows) => { // 载入数据.
        //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //         this.setState({ regSelectKeys: selectedRowKeys });
        //     },
        // };
        // 部门编辑
        // const editDeptModalProps = {
        //     edit: this.state.editDept,
        //     checkedKeys: this.state.deptCheckedKeys,
        //     onClose: () => {
        //         this.editDeptModal(false, [], 1);
        //     },
        //     onCreate: (values) => {
        //         let params = new Object();
        //         params.userIds = checkedKeys;
        //         params.deptIds = values;
        //
        //         DeptService.ediDept({...params}).then((data) => {
        //             if (data.code === 0) {
        //                 message.success('修改部门成功!');
        //                 if (this.isMount) {
        //                     this.setState({editDept: false}, () => {
        //                         // this.treeQuery(); 编辑完后进行的动作
        //                     });
        //                 }
        //             } else {
        //                 message.error('修改部门失败');
        //                 if (this.isMount) {
        //                     this.setState({loading: false});
        //                 }
        //             }
        //         });
        //     },
        //     onCheck: (checkedKeys) => {
        //         this.setState({ deptCheckedKeys: checkedKeys });
        //     },
        //     onCheckSelect: (checkedKeys) => {
        //         this.setState({ deptCheckedKeys: checkedKeys });
        //     },
        // };
        // 人员新增
        const addUserModalProps = {
            add: this.state.addUser,
            checkedKeys: this.state.deptCheckedKeys,
            userData: userData,
            onClose: () => {
                this.addUsers([], 1);
            },
            onCreate: (values) => {
                let params = {
                    ...values,
                    roleId: Number(checkedKeys[0]),
                    currentUserId: String(sessionStorage.getItem('userId'))
                };
                SysRoleMgService.addRoleUserDate(params).then((data) => {
                   if(data) {
                       this.setState({addUser: false}, () => {
                           message.success(role.newRecruitSuccess);
                           if (checkedKeys.length  === 1) {
                                   this.getUserData({id: checkedKeys[0],
                                   pageNum:String(this.state.pagination.current),
                                   pageSize:String(this.state.pagination.pageSize)});
                           }
                       });
                   }
                });
            }
        };

        return (
            <Layout className='content-inner'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    collapsedWidth="0"
                    style={{background: '#fff'}}
                    width={300}
                    className="leftTree"
                >
                    <header>
                        {role.roleList}
                        <Icon
                            className={this.state.collapsed ? 'trigger triggered' : 'trigger'}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{'float': 'right'}}
                        />
                    </header>
                    <div className="btnGroup">
                        <Button type="primary" icon="plus-circle-o" onClick={() => this.addRoleModal(true)}>{role.insert}</Button>
                        <div className="divider"/>
                        <Button type="primary" icon="edit" onClick={() => this.editRoleModal(true, record, checkedKeys, 0)}>{role.modify}</Button>
                        <div className="divider"/>
                        <Popconfirm
                            onConfirm={() => this.delRoles()}
                            title={<span>{role.deleteSelectRole}</span>}
                            okText={role.Confirm}
                            cancelText={role.Cancel}
                        >
                            <Button type="danger" icon="delete">{role.delete}</Button>
                        </Popconfirm>
                        {/*<div className="divider"/>*/}
                        {/*<Button type="primary" icon="copy" onClick={() => this.copyRoleModal(true, record, checkedKeys, 0)}>{role.copy}</Button>*/}
                    </div>
                    <div className="treeStyle">
                        <Tree {...roleProps} onLoadData={this.loadRoleData}/>
                    </div>
                </Sider>
                <Layout style={{overflow: 'hidden'}}>
                    <Content style={{background: '#fff', minHeight: 280, paddingLeft: "10px"}}  className="rightContent">
                        <div>
                            <Tabs type="card">
                                <TabPane tab={role.Authority} key="1">
                                    <div className="btnGroup" style={{width: '24%', padding: '5px 0'}}>
                                        <Button type="primary" icon="edit" style={{width: '42%'}} onClick={() => this.editAuthModal(true, this.state.checkedKeys, 0)}>{role.modifyAuthority}</Button>
                                        <div className="divider"/>
                                        <Button type="danger" icon="delete" style={{width: '42%'}} onClick={() => this.delAuths()}>{role.batchdeletion}</Button>
                                        {/*<div className="divider"></div>*/}
                                        {/*<Button type="primary" icon="edit">修改个性域</Button>*/}
                                        {/*<div className="divider"></div>*/}
                                        {/*<Button type="danger" icon="delete">取消个性域</Button>*/}
                                        {/*<div className="divider"></div>*/}
                                        {/*<RadioGroup onChange={this.onChange} value={this.state.value}>*/}
                                        {/*<Radio value={1}>全局域</Radio>*/}
                                        {/*<Radio value={2}>个性域</Radio>*/}
                                        {/*</RadioGroup>*/}
                                    </div>
                                    <div className="authorityManage">
                                        <header>{role.authorityName}</header>
                                        <div className="authorityTree">
                                            <Tree {...authProps}/>
                                        </div>

                                    </div>
                                </TabPane>
                                {/*<TabPane tab="区域管理" key="2">*/}
                                {/*<div className="btnGroup btnGroupOther">*/}
                                {/*<Button type="primary" icon="edit" onClick={() => this.editRegionModal(true, this.state.checkedKeys, 0)}>修改</Button>*/}
                                {/*</div>*/}
                                {/*<div className="deptManage">*/}
                                {/*<header>区域名称(全局区域)</header>*/}
                                {/*<Tree {...regionProps}  onLoadData={this.loadRegData}/>*/}
                                {/*</div>*/}
                                {/*</TabPane>*/}
                                {/*<TabPane tab="部门管理" key="3">*/}
                                {/*<div className="btnGroup btnGroupOther">*/}
                                {/*<Button type="primary" icon="edit" onClick={() => this.editDeptModal(true, this.state.checkedKeys, 0)}>修改</Button>*/}
                                {/*</div>*/}
                                {/*<div className="deptManage">*/}
                                {/*<header>部门名称-区域</header>*/}
                                {/*<Tree {...deptProps}  onLoadData={this.loadDeptData}/>*/}
                                {/*</div>*/}
                                {/*</TabPane>*/}
                            </Tabs>
                        </div>
                        <div>
                            <Tabs type="card">
                                <TabPane tab={role.personnel} key="1">
                                    <div className="searchForm">
                                        <Form layout="inline">
                                            <FormItem
                                                {...formItemLayout}
                                                label={role.department}
                                                style={{"marginBottom": 0}}
                                            >
                                                {getFieldDecorator('deptName', {
                                                    rules: [{required: false}],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label={role.userName}
                                                style={{"marginBottom": 0}}
                                            >
                                                {getFieldDecorator('userName', {
                                                    rules: [{required: false}],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                        </Form>
                                    </div>
                                    <div className="btnGroup" style={{width: '24%', padding: '5px 2px'}}>
                                        <Button type="primary" onClick={this.handleSearch} icon="search" className="btnThre">{role.select}</Button>
                                        <div className="divider"/>
                                        <Button type="primary" icon="plus-circle-o" className="btnThre" onClick={() => this.addUsers(this.state.checkedKeys, 0)}>{role.insert}</Button>
                                        <div className="divider"/>
                                        <Popconfirm
                                            onConfirm={() => this.delUsers()}
                                            title={<span>{role.deleteSelectRole}</span>}
                                            okText={role.Confirm}
                                            cancelText={role.Cancel}
                                        >
                                            <Button type="danger" icon="delete" className="btnThre">{role.delete}</Button>
                                        </Popconfirm>
                                    </div>
                                    <Table
                                        columns={userColumns}
                                        rowSelection={rowSelection}
                                        rowKey={record => `${record.id}`}
                                        dataSource={userData}
                                        pagination={pagination}
                                        onChange={this.handleTableChange}
                                        loading={loading}
                                        size="small"
                                    />
                                </TabPane>
                                {/*<TabPane tab="部门" key="2">*/}
                                {/*<div className="btnGroup btnGroupOther">*/}
                                {/*<Button type="primary" icon="edit" onClick={() => this.editDeptModal(true, this.state.checkedKeys, 0)}>修改</Button>*/}
                                {/*</div>*/}
                                {/*<Table*/}
                                {/*columns={deptColumns}*/}
                                {/*rowKey={record => `${record.id}`}*/}
                                {/*dataSource={deptData}*/}
                                {/*loading={loading}*/}
                                {/*scroll={{ y: 240 }}*/}
                                {/*size="small"*/}
                                {/*/>*/}
                                {/*</TabPane>*/}
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
                <RoleAdd {...addModalProps}/>
                <RoleEdit {...editModalProps}/>
                <RoleCopy {...copyModalProps}/>

                <AuthEdit {...editAuthModalProps}/>
                {/*<RegEdit {...editRegModalProps}/>*/}
                {/*<DeptEdit {...editDeptModalProps}/>*/}
                <UserAdd {...addUserModalProps}/>
            </Layout>
        )
    }
}