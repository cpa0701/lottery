import React, { Component } from 'react';
import { Modal, Button, Row, Col, Card, Input, Form, message } from 'antd';

import './questionLibMgr.less';

const {TextArea} = Input;
const FormItem = Form.Item;

@Form.create()
export default class extends Component {
  state = {
      btnGroupList: [
          {
              id: 1,
              name: '性别',
              value: ['男', '女']
          },
          {
              id: 2,
              name: '年龄',
              value: ['18岁以下', '18～25', '26～30', '31～40', '41～50', '51～60', '60以上']
          },
          {
              id: 3,
              name: '学历',
              value: ['初中', '高中', '大学本科', '硕士研究生', '博士研究生']
          },
          {
              id: 4,
              name: '省份',
              value: ['安徽', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '黑龙江', '河南', '香港', '湖北', '湖南', '江苏', '江西', '吉林', '辽宁', '澳门', '内蒙古', '宁夏', '青海', '山东', '上海', '山西', '陕西', '四川', '台湾', '天津', '新疆', '西藏', '云南', '浙江', '海外']
          },
          {
              id: 5,
              name: '满意度',
              value: ['很不满意', '不满意', '一般', '满意', '很满意']
          },
          {
              id: 6,
              name: '认可度',
              value: ['很不同意', '不同意', '一般', '同意', '很同意']
          },
          {
              id: 7,
              name: '是否',
              value: ['是', '否']
          },
          {
              id: 8,
              name: '数字',
              value: [1, 2, 3, 4, 5, 6]
          },
          {
              id: 9,
              name: '星期',
              value: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          },
          {
              id: 10,
              name: '月份',
              value: ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份']
          },
          {
              id: 11,
              name: '年份',
              value: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
          }
      ]
  };
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }

      let value = [];
      if (values.option) {
        value = values.option.trim().split(/\s+/);
        this.props.onCreate(value);
      } else {
        message.info(' 请输入内容');
      }
    });
  };
  getValue = (id) => {
    let value = '';
    this.state.btnGroupList.map(item => {
      if (item.id === id) {
        value = item.value.join('\r\n')
      }
      return '';
    });
    this.props.form.setFieldsValue({option: value})
  };
  afterClose = () => {
    this.props.form.resetFields();
  };

  render() {
    const { btnGroupList } = this.state;
    const {add,form: {getFieldDecorator}} = this.props;
    const btnGroup = btnGroupList.map((item, key) => {
      return <Button type="primary" key={key} onClick={() => this.getValue(item.id)}>{item.name}</Button>;
    });

    return (
      <Modal
        title="批量新增选项"
        width={500}
        maskClosable={false}
        visible={add}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}
        afterClose={this.afterClose}
        className="optionsAdd"
      >
        <Form>
          <Row>
            <Col span={6} className="leftBtn">
                <Card title="预定义选项">
                    {btnGroup}
                </Card>
            </Col>
            <Col span={18}>
              <FormItem>
                {getFieldDecorator('option', {
                  initialValue: '',
                  rules: [
                    {max: 255, message: '不能超过255个字符'},
                  ],
                })(
                  <TextArea placeholder="请输入新增选项"rows={17}/>
                )}
              </FormItem>
              <span style={{color: '#e4393c'}}>注：每行代表一个选项，可以添加多个选项</span>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

