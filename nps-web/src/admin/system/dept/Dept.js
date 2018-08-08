import React, {PureComponent} from 'react';
import {
    Form,
    Layout,
    Icon,
    TreeSelect,
    Input,
    Button,
    Tree,
    Popconfirm,
    Tabs,
    Radio,
    Table,
    message,
    Modal
} from 'antd';

import "./Dept.less"
import DeptService from "../../../services/DeptService"
import DeptModal from "./DeptModal"
import DeptForm from "./DeptForm"
import StandardTable from '../../../common/components/table/index';
import {inject, observer} from "mobx-react/index"

const TreeNode = Tree.TreeNode;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item;
const info = Modal.info;
const {Header, Sider, Content} = Layout;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

@Form.create({})
@inject('stores')
export default class Dept extends PureComponent {
    state = {
        collapsed: false,
        value: undefined,
        treeData: [],
        domainTreeDate: [],
        departmentData: [],
        departmentDataTree: [],
        selectedKeys: [],
        departmentEditData: null,
        modalVisible: false,
        columns: [
            {
                title: '登录账号',
                dataIndex: 'sStaffAccount',
                render: (text, record, index) => {
                    return (
                        <span>
                            <Icon type="user"/>{text}
                        </span>
                    )
                }
            },
            {
                title: '人员工号',
                dataIndex: 'sStaffNo'
            },
            {
                title: '人员姓名',
                dataIndex: 'sStaffName',
            },
            {
                title: '性别',
                dataIndex: 'sSex',
            },
            {
                title: '账号状态',
                dataIndex: 'iDelFlag',
            },
            {
                title: '是否有效',
                dataIndex: 'sValid',
            },
            {
                title: '电话号码',
                dataIndex: 'sTelphone'
            },
            {
                title: '手机号码',
                dataIndex: 'sMobile',
            },
            {
                title: '内部邮箱',
                dataIndex: 'sInEmail',
            },
            {
                title: '传真号码',
                dataIndex: 'sFaxCode',
            },
            {
                title: '部门名称',
                dataIndex: 'sDispName',
            },
            {
                title: '公司名称',
                dataIndex: 'sDomainName',
            },
            {
                title: '职位名称',
                dataIndex: 'sTitleName',
            },
            {
                title: '上级领导',
                dataIndex: 'sLeaderName',
            }
        ],
        formValues: {}
    };

    constructor(props) {
        super(props);
        this.handlerSearchDepartment = this.handlerSearchDepartment.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        let a = JSON.stringify({
            "IDOMAINID": 10000,
            "ISEQ": 1,
            "SDOMAINNAME": "全国",
            "children": [
                {
                    "IDOMAINID": 20000,
                    "ISEQ": 1,
                    "SDOMAINNAME": "北京",
                    "SDOMAINCODE": "beijing",
                    "SPATHID": "/10000/20000",
                    "IPARENTID": 10000,
                    "IDOMAINTYPE": 1
                },
                {
                    "IDOMAINID": 30000,
                    "ISEQ": 1,
                    "SDOMAINNAME": "湖南",
                    "children": [{
                        "IDOMAINID": 31000,
                        "ISEQ": 1,
                        "SDOMAINNAME": "长沙",
                        "SDOMAINCODE": "changsha",
                        "SPATHID": "/10000/30000/31000",
                        "IPARENTID": 30000,
                        "IDOMAINTYPE": 1
                    }],
                    "SDOMAINCODE": "hunan",
                    "SPATHID": "/10000/30000",
                    "IPARENTID": 10000,
                    "IDOMAINTYPE": 1
                }
            ],
            "SDOMAINCODE": "all",
            "SPATHID": "/10000",
            "IPARENTID": 0,
            "IDOMAINTYPE": 0
        })
        a = a.replace(/SDOMAINNAME/g, "title").replace(/SDOMAINCODE/g, "value").replace(/IDOMAINID/g, "key")
        this.setState({
            domainTreeDate: [JSON.parse(a)]
        });
        DeptService.getDeptTree().then(result => {
            this.setState({
                treeData: result.treeData,
            });
        });
    }

    componentDidMount() {
        //第一次默认加载
        this.standardTable.handleSearch({current: 1, pageSize: 10})
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    //点击区域树
    onChange = (value) => {
        this.setState({value});
    }
    //点击部门树节点时
    onSelect = (selectedKeys, info) => {
        info.selectedNodes = info.selectedNodes ? info.selectedNodes : info.checkedNodes;
        this.setState({
            departmentEditData: info.selectedNodes.length ? info.selectedNodes[0].props : "",
            selectedKeys: selectedKeys
        })
    }
    //异步加载树节点
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            DeptService.getDeptTree(treeNode.props.dataRef).then(result => {
                treeNode.props.dataRef.children = [...result.treeData];
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            })
        });
    }

    //渲染树节点
    renderTreeNodes = (data) => {
        return data.map((item) => {
            item.title = item.sdeptName;
            item.key = item.ideptId
            item.isLeaf = !item.childCount;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item} isLeaf={item.isLeaf}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item}/>;
        });
    }

    //点击查询部门树
    handlerSearchDepartment = () => {
        let params = this.props.form.getFieldsValue();
        this.setState({
            treeData: [],
        });
        DeptService.getDeptTree(params).then(result => {
            this.setState({
                treeData: [...result.treeData]
            });
        });
    }
    //新增方法
    handleAdd = () => {
        if (this.state.departmentEditData) {
            this.setState({
                departmentData: {
                    sdispName: this.state.departmentEditData.sdispName,
                    parentId: this.state.departmentEditData.ideptId,
                    sdeptName: this.state.departmentEditData.sdeptName,
                }
            }, () => this.handleModalVisible(true));

        } else {
            this.setState({
                departmentData: {
                    sdispName: "",
                    parentId: 0,
                    sdeptName: "",
                }
            }, () => this.handleModalVisible(true));
            // const ref = info({
            //     title: '请先选择要新增的所属部门',
            //     content: '',
            //     okText: '确定',
            //     cancelText: '取消',
            //     onOk: () => {
            //         ref.destroy();
            //     }
            // });
        }
    }

    //修改方法
    handleUpdate = () => {
        if (this.state.departmentEditData) {
            this.setState({
                departmentData: this.state.departmentEditData,
                thisTime: 'M',
            });
            this.handleModalVisible(true);
        } else {
            const ref = info({
                title: '请先选择要修改的部门',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    }

    //删除方法
    handleDelete = () => {

        let row = this.state.selectedKeys;
        let params = {};
        if (row.length !== 0) {
            params.menuIds = row.map(item => item + ''); //平台角色id，必填
            DeptService.dleDept(params).then(result => {
                message.success('删除成功');
                this.handlerSearchDepartment();
            });
        } else {
            const ref = info({
                title: '请先选择要删除的部门',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    ref.destroy();
                }
            });
        }
        this.handleSelectRows([])

    }
    //点击勾选方法
    handleSelectRows = (record, selected, selectedRows) => {
        this.setState({
            selectedRows: record,
            departmentEditData: record[record.length - 1],
        });
    }

    //控制弹出框的显示状态
    handleModalVisible = (flag) => {
        let visible = !!flag
        this.setState({
            modalVisible: visible,
        });

        // 页面关闭了要重新查询
        !visible && this.handlerSearchDepartment();
    }
    //获取人员表格数据
    getStaffData = (params) => {
        this.setState({
            formValues: params
        }, () => {
            this.standardTable.handleSearch({current: 1, pageSize: 10, ...params})
        });
    }
    // 获取第三区域的数据
    getThirdData = (data) => {
        console.log(data)
    }

    render() {
        const {departmentData, modalVisible, domainTreeDate, columns, formValues} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout className='dept'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    collapsedWidth="0"
                    style={{background: '#fff'}}
                    width={300}
                >
                    <div className='dept-logo'>部门列表
                        <Icon
                            className={this.state.collapsed ? 'trigger triggered' : 'trigger'}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{'float': 'right'}}
                        />
                    </div>
                    <Form>
                        <FormItem
                            labelCol={{span: 6}}
                            wrapperCol={{span: 17}}
                            label="所属区域"
                            style={{"marginBottom": 0}}
                        >
                            <TreeSelect
                                value={this.state.value}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                treeData={domainTreeDate}
                                treeCheckable={true}
                                showCheckedStrategy={SHOW_PARENT}
                                searchPlaceholder={'请选择区域'}
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem
                            labelCol={{span: 6}}
                            wrapperCol={{span: 17}}
                            label="部门名称"
                            style={{"marginBottom": 0}}
                        >
                            {getFieldDecorator('deptName', {
                                rules: [{required: false}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                    <div className='departmentBtn'>
                        <Button onClick={this.handlerSearchDepartment} type="primary">查询</Button>
                        <Button onClick={this.handleAdd}>新增</Button>
                        <Button type="dashed" onClick={this.handleUpdate}>修改</Button>
                        <Popconfirm title="确定删除吗?" okText="确定" cancelText="取消" onConfirm={this.handleDelete}>
                            <Button type="danger">删除</Button>
                        </Popconfirm>,
                    </div>
                    <h6 className='departmentH6'>部门导航树</h6>
                    {this.state.treeData.length
                        ? <Tree
                            showLine
                            checkable
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={this.onSelect}
                            onCheck={this.onSelect}
                            loadData={this.onLoadData}>{this.renderTreeNodes(this.state.treeData)}</Tree>
                        : 'loading tree'}
                    <DeptModal
                        departmentData={departmentData}
                        domainTreeDate={[{key: 0, title: '全国'}, {key: 1, title: '湖南'}, {key: 2, title: '北京'}]}
                        modalVisible={modalVisible}
                        thisTime={this.state.thisTime}
                        handleModalVisible={this.handleModalVisible}
                    />
                </Sider>
                <Layout>
                    <Content style={{background: '#fff', minHeight: 280, paddingLeft: "10px"}}>
                        <div>
                            <Tabs type="card">
                                <TabPane tab="人员管理" key="1">
                                    <DeptForm getStaffParams={this.getStaffData}/>
                                    <StandardTable
                                        ref={child => this.standardTable = child}
                                        rowKey={"iStaffId"}
                                        // rowSelection={{selectedRowKeys:[10000]}}
                                        columns={columns}
                                        service={DeptService}
                                        method="getStaffData"
                                        formValues={formValues}
                                        onSelectRow={this.getThirdData}
                                    />
                                </TabPane>
                                <TabPane tab="职位管理" key="2">
                                    待开发
                                </TabPane>
                                <TabPane tab="岗位管理" key="3">
                                    待开发
                                </TabPane>
                            </Tabs>
                        </div>
                        <div>
                            <Tabs type="card">
                                <TabPane tab="角色" key="1">
                                    角色页面
                                </TabPane>
                                <TabPane tab="权限" key="2">
                                    待开发
                                </TabPane>
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}