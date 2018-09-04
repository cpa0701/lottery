import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form, Checkbox, Tabs, Button, Table, Tree, TreeSelect, message } from 'antd';

import '../Role.less';
import DeptService from "../../../../services/system/DeptService";

const [FormItem, CheckboxGroup, TabPane, SHOW_PARENT, TreeNode] =
    [Form.Item, Checkbox.Group, Tabs.TabPane, TreeSelect.SHOW_PARENT, Tree.TreeNode];

@Form.create()
export default class extends Component {
    state = {
        selRowName: [],
        selRowName1: [],
        selRowName2: [],
        selRowKeys: [],
        selRowKeys1: [],
        selRowKeys2: [],
        checkedId: [],
        checkedList: [],
        tableList: [],
        tableList1: [],
        tableList2: [],
        userData1: [],
        userData: [],
        treeData: [],
        domainTreeDate: [],
        selectedRowKeys: [],
        value: undefined,
        indeterminate: false,
        checkAll: true,
        loading: false,
    };
    componentDidMount() {
        this.deptQuery();
        this.getDomainTree();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.userData.length !== 0){
            let checkedId = [], checkedList = [], selectedRowKeys = [], selRowName = [];
            nextProps.userData.map(item => {
                checkedId.push(String(item.id));
                checkedList.push(item.name);
                selRowName.push(item.name);
                selectedRowKeys.push(String(item.id));
               return '';
            });
            this.setState({
                checkedId,
                checkedList,
                selRowName,
                selectedRowKeys,
                userData1: nextProps.userData,
                userData: nextProps.userData
            });
        }
    }

    onSubmit = () => {
        this.props.onCreate({userId: Number(this.state.checkedId[0])});
    };
    afterClose = () => {
      this.props.form.resetFields();
      this.setState({
          selRowName: [],
          selRowKeys: [],
          checkedList: [],
          userData1: [],
          userData: [],
          treeData: [],
          domainTreeDate: [],
          selectedRowKeys1: [],
          selectedRowKeys: [],
          value: undefined,
          indeterminate: false,
          checkAll: false,
      })
    };

    // 选择区域树
    onSelChange = (value) => {
        console.log(value);
        this.setState({value});
        let name = this.props.form.getFieldValue('deptName');
        this.setState({value});
        let params = {
            name,
            regionId: value
        };
        this.deptQuery(params);
    };
    // 输入部门搜索时
    deptNameChange = (e) => {
        let params = {
            name: e.target.value,
            regionId: this.state.value
        };
        this.deptQuery(params);
    };

    // 获取部门树
    deptQuery = (params) => {
        let param = params ? params : {};
        param.status = 1;
        DeptService.getDeptTree(param).then(result => {
            if (result) {
                result.treeData = result;
                let treeData = result.map(item => {
                    item.title = item.name;
                    item.key = item.id;
                    item.isLeaf = item.leaf;
                    return item;
                });
                this.setState({
                    treeData
                });
            }
        });
    };
    // 异步加载树节点
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            let params = {
                parentId: treeNode.props.dataRef.id,
                regionId: treeNode.props.dataRef.regionId,
            };
            DeptService.getDeptTree(params).then(result => {
                result.treeData = result;
                if (result.treeData.length) {
                    let treeData = result.map(item => {
                        item.title = item.name;
                        item.key = item.id;
                        item.isLeaf = item.leaf;
                        return item;
                    });
                    treeNode.props.dataRef.children = [...treeData];
                    this.setState({
                        treeData: [...this.state.treeData],
                    });
                }
                resolve();
            })
        });
    };
    // 点击部门树节点时
    onSelect = (selectedKeys, info) => {
        if (selectedKeys.length > 1) {
            message.info('每次只能选择一个部门');
            return;
        }
        this.setState({
            selectedKeys: selectedKeys[selectedKeys.length - 1],
        });
        let params = {
            deptId: selectedKeys[selectedKeys.length - 1]
        };
        if (selectedKeys.length  === 1) {
            this.userInfoQuery(params, 1);
        }
    };

    //获取区域树
    getDomainTree = () => {
        DeptService.getDomainTree().then(result => {
            if (result) {
                result.treeData = result;
                let treeData = result.map(item => {
                    item.title = item.name;
                    item.value = item.id.toString();
                    item.key = item.id;
                    item.isLeaf = item.leaf;
                    return item;
                });
                this.setState({
                    domainTreeDate: treeData,
                });
            }
        });
    };
    //异步加载地区树
    onLoadDomainTreeData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.dataRef.children) {
                resolve();
                return;
            }
            let params = {
                parentId: treeNode.props.dataRef.id
            };
            DeptService.getDomainTree(params).then(result => {
                if (result) {
                    result.treeData = result;
                    if (result.treeData.length) {
                        let treeData = result.map(item => {
                            item.title = item.name;
                            item.key = item.id;
                            item.isLeaf = item.leaf;
                            return item;
                        });
                        treeNode.props.dataRef.children = treeData;
                        this.setState({
                            domainTreeDate: [...this.state.domainTreeDate],
                        });
                    }
                    resolve();
                }
            })
        });
    };

    // 渲染树节点
    renderTreeNodes = (data) => {
        return data.map((item) => {
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
        var checkedId = checkedList.map((item) => {
           return this.state.tableList.find(k => k.name === item).id;
        });
        this.setState({
            checkedId,
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.state.selRowName.length),
            checkAll: checkedList.length === this.state.selRowName.length,
        });
    };
    // 右侧勾选所有框
    onCheckAllChange = (e) => {
        this.setState({
            checkedId: e.target.checked ? this.state.selRowKeys : [],
            checkedList: e.target.checked ? this.state.selRowName : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    // 获取人员表格信息
    userInfoQuery = (params, type) => {
        DeptService.getStaffData(params)
            .then(data => {
                if(data) {
                    if(type === 1) {
                        this.setState({
                            userData1: data.list,
                        });
                    } else {
                        this.setState({
                            userData: data.list,
                        });
                    }
                }
            });
    };

    // 获取选择页勾选人员表格id
    onSelectChange = (selectedRowKeys, selectedRowsValue) => {
        console.log(selectedRowKeys);
        if (selectedRowKeys.length > 1) {
            message.info('每次只能选择一个角色');
            return;
        } else if ( selectedRowKeys.length === 0 ) {
            this.setState({
                selRowName: [],
                selRowName1: [],
                selRowName2: [],
                selRowKeys: [],
                selRowKeys1: [],
                selRowKeys2: [],
                checkedId: [],
                checkedList: [],
                tableList: [],
                tableList1: [],
                tableList2: [],
            });
        }
        if(selectedRowsValue) {
            let selRowName = [], selRowKeys = [];
            selectedRowsValue.map(item => {
                // if(!this.state.selRowName.includes(item.name)){
                selRowName.push(item.name);
                selRowKeys.push(item.id);
                // }
                return '';
            });
            this.setState({
                selRowName1: selRowName,
                selRowKeys1: selRowKeys,
                tableList1: selectedRowsValue,
                selectedRowKeys,
                selRowName: [...new Set([...selRowName, ...this.state.selRowName2])],
                selRowKeys: [...new Set([...selRowKeys, ...this.state.selRowKeys2])],
                tableList: [...selectedRowsValue, ...this.state.tableList2]
            }, () => {
                this.setState({checkedId: this.state.selRowKeys, checkedList: this.state.selRowName})
            });
        }
    };
    // 获取搜索页勾选人员表格id
    onSearchChange = (selectedRowKeys, selectedRowsValue) => {
        if (selectedRowKeys.length > 1) {
            message.info('每次只能选择一个角色');
            return;
        } else if ( selectedRowKeys.length === 0 ) {
            this.setState({
                    selRowName: [],
                    selRowName1: [],
                    selRowName2: [],
                    selRowKeys: [],
                    selRowKeys1: [],
                    selRowKeys2: [],
                    checkedId: [],
                    checkedList: [],
                    tableList: [],
                    tableList1: [],
                    tableList2: [],
                });
        }
        if(selectedRowsValue) {
            let selRowName = [], selRowKeys = [];
            selectedRowsValue.map(item => {
                selRowName.push(item.name);
                selRowKeys.push(item.id);
                return '';
            });
            this.setState({
                selRowName2: selRowName,
                selRowKeys2: selRowKeys,
                tableList2: selectedRowsValue,
                selectedRowKeys,
                selRowName: [...new Set([...selRowName, ...this.state.selRowName1])],
                selRowKeys: [...new Set([...selRowKeys, ...this.state.selRowKeys1])],
                tableList: [...selectedRowsValue, ...this.state.tableList1]
            }, () => {
                this.setState({checkedId: this.state.selRowKeys, checkedList: this.state.selRowName})
            });
        }
    };

    // 点击搜索按钮
    search =() => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            this.userInfoQuery(values, 0);
        });
    };

    render() {
      const {add, form: {getFieldDecorator}} = this.props;
      const {
          userData1,
          userData,
          loading,
          // indeterminate,
          // checkAll,
          selRowName,
          // selRowKeys,
          checkedList,
          // selectedRowKeys1,
          selectedRowKeys,
          domainTreeDate
      } = this.state;

      const formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14},
      };

      const loop = data => data.map((item) => {
          if (item.children) {
              return (
                  <TreeNode title={item.name} key={item.id} dataRef={item} isLeaf={item.leaf}>
                      {loop(item.children)}
                  </TreeNode>
              );
          }
          return <TreeNode {...item} dataRef={item}/>;
       });

      // 表格列
      const userColumns = [
          {
              title: '人员账号',
              dataIndex: 'account'
          },
          {
              title: '人员姓名',
              dataIndex: 'name'
          },
          {
              title: '部门名称',
              dataIndex: 'deptId'
          },
          {
              title: '是否同步',
              dataIndex: 'status'
          },
          {
              title: '手机号码',
              dataIndex: 'cellphone'
          }
      ];
      const userColumnsel = [
          {
              title: '人员姓名',
              dataIndex: 'name'
          },
          {
              title: '人员账号',
              dataIndex: 'account'
          },
          {
              title: '是否同步',
              dataIndex: 'status'
          }
        ];
      const rowSelection1 = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
      const rowSelection = {
            selectedRowKeys,
            onChange: this.onSearchChange,
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
          className="userModal-content"
        >
          <Row >
              <Col span={20} className="left-content">
                  <Tabs type="card">
                      <TabPane tab="选择" key="1">
                          <Col span={8} style={{paddingRight: '16px'}}>
                              <Form className="ant-search-left-form">
                                  <FormItem labelCol={{span: 8}} wrapperCol={{span: 14}} label="所属区域">
                                          <TreeSelect
                                              value={this.state.value}
                                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                              treeCheckable={false}
                                              showCheckedStrategy={SHOW_PARENT}
                                              searchPlaceholder={'请选择区域'}
                                              loadData={this.onLoadDomainTreeData}
                                              onChange={this.onSelChange}
                                          >{loop(domainTreeDate)}</TreeSelect>
                                  </FormItem>
                                  <FormItem labelCol={{span: 8}} wrapperCol={{span: 14}} label="部门名称">
                                      {getFieldDecorator('deptName', {
                                          onChange: this.deptNameChange,
                                          initialValue: '',
                                          rules: [
                                              {required: false, message: '请输入部门名称'},
                                          ],
                                      })(<Input placeholder="请输入部门名称"/>)}
                                  </FormItem>
                              </Form>
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
                          <Col span={16}>
                              <Table
                                  columns={userColumnsel}
                                  rowSelection={rowSelection1}
                                  rowKey={record => `${record.id}`}
                                  dataSource={userData1}
                                  loading={loading}
                                  scroll={{ y: 253 }}
                                  size="small"
                              />
                          </Col>
                      </TabPane>
                      <TabPane tab="搜索" key="2">
                          <Form layout="inline" className="ant-search-form">
                              <Col span={7}>
                                  <FormItem {...formItemLayout} label="人员账号">
                                      {getFieldDecorator('account', {
                                          rules: [
                                              {required: false, message: '请输入人员账号'},
                                          ],
                                      })(<Input placeholder="请输入人员账号"/>)}
                                  </FormItem>
                              </Col>
                              <Col span={7}>
                                  <FormItem {...formItemLayout} label="人员姓名">
                                      {getFieldDecorator('name', {
                                          rules: [
                                              {required: false, message: '请输入人员姓名'},
                                          ],
                                      })(<Input placeholder="请输入人员姓名"/>)}
                                  </FormItem>
                              </Col>
                              <Col span={7}>
                                  <FormItem {...formItemLayout} label="部门名称">
                                      {getFieldDecorator('deptName', {
                                          rules: [
                                              {required: false, message: '请输入部门名称'},
                                          ],
                                      })(<Input placeholder="请输入部门名称"/>)}
                                  </FormItem>
                              </Col>
                              <Col span={1}>
                                  <Button type="primary" icon="search" onClick={() => this.search()}>搜索</Button>
                              </Col>
                          </Form>
                          <Table
                              columns={userColumns}
                              rowSelection={rowSelection}
                              rowKey={record => `${record.id}`}
                              dataSource={userData}
                              loading={loading}
                              scroll={{ y: 193 }}
                              size="small"
                          />
                      </TabPane>
                  </Tabs>
              </Col>
              <Col span={4} className="right-content">
                <div className="rightHeader">
                    {/*<Checkbox*/}
                        {/*indeterminate={indeterminate}*/}
                        {/*onChange={this.onCheckAllChange}*/}
                        {/*checked={checkAll}*/}
                    {/*>*/}
                       {/*人员名称*/}
                    {/*</Checkbox>*/}
                    人员名称
                </div>
                <div className="rightContent">
                    <CheckboxGroup options={selRowName} value={checkedList} onChange={this.onChange} />
                </div>
              </Col>
          </Row>
        </Modal>
      );
    }
}

