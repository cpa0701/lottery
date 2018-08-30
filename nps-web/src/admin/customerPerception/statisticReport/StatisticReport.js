import React from 'react';
import {Row, Col,Form, Select, Input, Button, DatePicker,Icon} from "antd"
import { Table} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const { MonthPicker, } = DatePicker;
const monthFormat = 'YYYY/MM';
const FormItem = Form.Item;
class StatisticReport extends React.PureComponent {

    render() {
        const columnsone = [{
            title: '区域',
            dataIndex: 'region',
            key: 'region',
        }, {
            title: '产品',
            dataIndex: 'product',
            key: 'product',
        }, {
            title: '总数量',
            dataIndex: 'quantity',
            key: 'quantity',
        }, {
            title: '推荐数量',
            dataIndex: 'recommendNum',
            key: 'recommendNum',
        }, {
            title: '推荐占比',
            dataIndex: 'repropotion',
            key: 'repropotion',
        },{
            title: '被动数量',
            dataIndex: 'passiveNumber',
            key: 'passiveNumber',
        },{
            title: '被动占比',
            dataIndex: 'passivePropotion',
            key: 'passivePropotion',
        },{
            title: '贬损数量',
            dataIndex: 'derogatoryNum ',
            key: 'derogatoryNum',
        },{
            title: '贬损占比',
            dataIndex: 'derogatoryAccount',
            key: 'derogatoryAccount',
        },];
        return(
            <div>
                <Row>
                    <Form>
                        <Col span='6'>
                            <FormItem  label="区域" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
                                <Select defaultValue="--请选择--">
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
                            <FormItem  label="产品" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
                                <Select >
                                    <Option value="yidong">移动用户</Option>
                                    <Option value="kuandai">宽带用户</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='5' offset='1'>
                            <FormItem>
                                <Button type="primary" htmlType="submit" >
                                    查询
                                </Button>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Table columns={columnsone}>

                    </Table>
                </Row>
            </div>

        );
    }
}

export default StatisticReport;
