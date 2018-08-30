import React from 'react';
import {Row, Col,Form, Select, Input, Button, DatePicker,Icon,Rate} from "antd"
import moment from 'moment';
import './useView.less'
import { Table} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const echarts = require('echarts');
const { MonthPicker, } = DatePicker;
const monthFormat = 'YYYY/MM';
class UseView extends React.PureComponent {


    render() {
        const columnsone = [{
            title: '业务名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
        }, {
            title: '结束时间',
            dataIndex: 'end',
            key: 'end',
        }, {
            title: '评价渠道',
            dataIndex: 'channel',
            key: 'channel',
        }, {
            title: '评价答案',
            dataIndex: 'answer',
            key: 'answer',
        },{
            title: '障碍来源',
            dataIndex: 'obstacle',
            key: 'obstacle',
        },];
        return(
            <div>
                <Row>
                    <Form>
                        <Col span='4'>
                            <FormItem  label="区域" labelCol={{ span: 4 }} wrapperCol={{ span: 18}}>
                                <Select >
                                    <Option value="city">全市</Option>
                                    <Option value="yubei">渝北</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='4'>
                            <FormItem label="月份" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
                                <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />

                            </FormItem>
                        </Col>
                        <Col span='6'>
                            <FormItem  label="账号类型" labelCol={{ span: 4 }} wrapperCol={{ span: 18}}>
                                <Select defaultValue="移动账号">
                                    <Option value="mobile">移动账号</Option>
                                    <Option value="broadband">宽带账号</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        {/*<Col span='6'>*/}
                            {/*<FormItem  label="产品" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>*/}
                                {/*<Select defaultValue="移动用户" >*/}
                                    {/*<Option value="yidong">移动用户</Option>*/}
                                    {/*<Option value="kuandai">宽带用户</Option>*/}
                                {/*</Select>*/}
                            {/*</FormItem>*/}
                        {/*</Col>*/}
                        <Col span='6'>
                            <FormItem  wrapperCol={{ span: 20}}>
                               <Input  placeholder="-请输入-" />
                            </FormItem>
                        </Col>
                        <Col span='3' >
                            <FormItem>
                                <Button type="primary" htmlType="submit" >
                                    查询
                                </Button>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row className="useView">
                    <h4 className="customer">客户基本信息</h4>
                    <Col span='24' className="customerName">
                        客户名称：--
                    </Col>
                    <Col span='6' className="informationFirst">
                        <Icon type="user" style={{color:'#1917FF'}} />
                        客户性别：无数据
                    </Col>
                    <Col span='6' className="informationFirst">
                        <Icon type="user" style={{color:'#1917FF'}} />
                        客户星级：无数据
                    </Col>
                    <Col span='6' className="informationFirst">
                        <Icon type="usergroup-add" style={{color:'#0effb0'}} />
                        营销线分公司名称：无数据
                    </Col>
                    <Col span='6' className="informationFirst">
                        <Icon type="database" style={{color:'#ffca14'}}/>
                        营销线支局名称：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="environment-o" style={{color:'#525cff'}}/>
                        营销线区域网络名称：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="environment-o" style={{color:'#525cff'}}/>
                        营销线网络名称：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="environment-o" style={{color:'#525cff'}}/>
                        客户住址：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="home" style={{color:'#0e17ff'}} />
                        城乡类型：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="shop" style={{color:'#ffac3d'}} />
                        实际销售主套餐名称：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="clock-circle-o" style={{color:'#ff9937'}} />
                        客户入网时长：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="global" style={{color:'#5825ff'}}  />
                        用户入网时长：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="user" style={{color:'#1917FF'}} />
                        客户下的手机数量：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="shop" style={{color:'#ffac3d'}} />
                        客户下的宽带数量：无数据
                    </Col>
                    <Col span='6' className="informationTwo">
                        <Icon type="clock-circle-o" style={{color:'#ff9937'}} />
                        客户下的itv数量：无数据
                    </Col>
                </Row>
                <Row className="useView">
                    <h4 className="customerRate">客户评级</h4>
                    <Col span='8'>
                      忠诚度评价：
                    </Col>
                    <Col span='16'>
                     亲密度：<Rate character={<Icon type="heart" />} style={{color:'red'}}/>
                    </Col>
                </Row>
                <Row className="useView">
                    <h4 className="customerContact">客户接触指标</h4>
                </Row>
                <Row className="useView">
                    <h4 className="customerContact">事件信息</h4>
                    <Table columns={columnsone}>

                    </Table>

                </Row>
            </div>

        );
    }
}

export default UseView;
