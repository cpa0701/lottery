import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form, Checkbox, Tabs, Button, Table, Tree, TreeSelect } from 'antd';
import DeptService from "../../../../services/DeptService";

const {TextArea} = Input;
const [FormItem, CheckboxGroup, TabPane, SHOW_PARENT, TreeNode] =
    [Form.Item, Checkbox.Group, Tabs.TabPane, TreeSelect.SHOW_PARENT, Tree.TreeNode];

@Form.create()
export default class extends Component {
    state = {
        selRowKeys: ['Apple', 'Pear', 'Orange'],
        checkedList: [],
        userData: [],
        treeData: [],
        domainTreeDate: [],
        selectedKeys: [],
        value: undefined,
        indeterminate: false,
        checkAll: false,
        loading: false,
    };
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
        });
        a = a.replace(/SDOMAINNAME/g, "title").replace(/SDOMAINCODE/g, "value").replace(/IDOMAINID/g, "key");
        this.setState({
            domainTreeDate: [JSON.parse(a)]
        });
        DeptService.getDeptTree().then(result => {
            this.setState({
                treeData: result.treeData,
            });
        });
    }
    onSubmit = () => {
      this.props.form.validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return;
        }
        this.props.onCreate(values);
      });
    };
    afterClose = () => {
      this.props.form.resetFields();
    };
    //选择区域树
    onSelChange = (value) => {
        this.setState({value});
    };
    //点击部门树节点时
    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys: selectedKeys
        })
    };
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
    };

    //渲染树节点
    renderTreeNodes = (data) => {
        return data.map((item) => {
            item.title = item.sdeptName;
            item.key = item.ideptId;
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
    };

    // 右侧勾选单个框
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.state.selRowKeys.length),
            checkAll: checkedList.length === this.state.selRowKeys.length,
        });
    };
    // 右侧勾选所有框
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.state.selRowKeys : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    // 获取勾选人员表格id
    onSelectChange = (selectedRowKeys) => {
          this.setState({ selRowKeys: selectedRowKeys });
    };

    render() {
      const {add, form: {getFieldDecorator}} = this.props;
      const {userData, loading, indeterminate, checkAll, selRowKeys, checkedList, domainTreeDate} = this.state;

      const formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14},
      };

      // 表格列
      const userColumns = [
          {
              title: '人员账号',
              dataIndex: 'ID'
          },
          {
              title: '人员姓名',
              dataIndex: 'name'
          },
          {
              title: '部门名称',
              dataIndex: 'deptName'
          },
          {
              title: '是否同步',
              dataIndex: 'synch'
          },
          {
              title: '手机号码',
              dataIndex: 'phone'
          }
      ];
      const userColumnsel = [
          {
              title: '人员姓名',
              dataIndex: 'name'
          },
          {
              title: '人员账号',
              dataIndex: 'ID'
          },
          {
              title: '是否同步',
              dataIndex: 'synch'
          }
        ];
      const rowSelection = {
            selectedRowKeys: selRowKeys,
            onChange: this.onSelectChange,
        };

      return (
        <Modal
          title="新增人员"
          width={1000}
          maskClosable={false}
          visible={add}
          onOk={this.onSubmit}
          onCancel={() => this.props.onClose()}
          afterClose={this.afterClose}
        >
          <Row>
              <Col span={20}>
                  <Tabs type="card">
                      <TabPane tab="选择" key="1">
                          <Col span={6}>
                              <div>
                                  <Form>
                                      <FormItem {...formItemLayout} label="所属区域">
                                          {getFieldDecorator('region', {
                                              rules: [
                                                  {required: true, message: '请选择所属区域'},
                                              ],
                                          })(
                                              <TreeSelect
                                                value={this.state.value}
                                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                                treeData={domainTreeDate}
                                                treeCheckable={true}
                                                showCheckedStrategy={SHOW_PARENT}
                                                searchPlaceholder={'请选择区域'}
                                                onChange={this.onSelChange}
                                            />
                                          )}
                                      </FormItem>
                                      <FormItem {...formItemLayout} label="部门名称">
                                          {getFieldDecorator('deptName', {
                                              rules: [
                                                  {required: true, message: '请输入部门名称'},
                                              ],
                                          })(<Input placeholder="请输入部门名称"/>)}
                                      </FormItem>
                                  </Form>
                              </div>
                              <div className="deptManage">
                                  <header>部门导航树</header>
                                  <Tree
                                      checkable
                                      defaultExpandedKeys={['0-0-0']}
                                      onSelect={this.onSelect}
                                      onCheck={this.onSelect}
                                      loadData={this.onLoadData}
                                  >
                                      {this.renderTreeNodes(this.state.treeData)}
                                  </Tree>
                              </div>
                          </Col>
                          <Col span={18}>
                              <Table
                                  columns={userColumnsel}
                                  rowSelection={rowSelection}
                                  rowKey={record => `${record.id}`}
                                  dataSource={userData}
                                  loading={loading}
                                  size="small"
                              />
                          </Col>
                      </TabPane>
                      <TabPane tab="搜索" key="2">
                          <div>
                            <Form layout="inline">
                                <Col span={7}>
                                    <FormItem {...formItemLayout} label="人员账号">
                                        {getFieldDecorator('ID', {
                                            rules: [
                                                {required: true, message: '请输入人员账号'},
                                            ],
                                        })(<Input placeholder="请输入人员账号"/>)}
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem {...formItemLayout} label="人员姓名">
                                        {getFieldDecorator('name', {
                                            rules: [
                                                {required: true, message: '请输入人员姓名'},
                                            ],
                                        })(<Input placeholder="请输入人员姓名"/>)}
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem {...formItemLayout} label="部门名称">
                                        {getFieldDecorator('deptName', {
                                            rules: [
                                                {required: true, message: '请输入部门名称'},
                                            ],
                                        })(<Input placeholder="请输入部门名称"/>)}
                                    </FormItem>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" icon="search" onClick={() => this.search()}>搜索</Button>
                                </Col>
                            </Form>
                          </div>
                          <Table
                              columns={userColumns}
                              rowSelection={rowSelection}
                              rowKey={record => `${record.id}`}
                              dataSource={userData}
                              loading={loading}
                              size="small"
                          />
                      </TabPane>
                  </Tabs>
              </Col>
              <Col span={4}>
                <div>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
                    >
                       人员名称
                    </Checkbox>
                </div>
                <div>
                    <CheckboxGroup options={selRowKeys} value={checkedList} onChange={this.onChange} />
                </div>
              </Col>
          </Row>
        </Modal>
      );
    }
}

