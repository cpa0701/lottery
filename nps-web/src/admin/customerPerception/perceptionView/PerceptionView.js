import React from 'react';
import {Row, Col,Form, Select, Input, Button, DatePicker} from "antd"
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const echarts = require('echarts');
const { MonthPicker, } = DatePicker;
const monthFormat = 'YYYY/MM';
class PerceptionView extends React.PureComponent {

    render() {
        return(
            <div>
                <Row>
                    <Form>
                        <Col span='6'>
                        <FormItem  label="省市" labelCol={{ span: 4 }} wrapperCol={{ span: 20}}>
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
                    {/*地图展示*/}
                    <Col span='12'> 地图域展示</Col>
                    <Col span='12'>

                    </Col>

                </Row>
            </div>

        );
    }
}

export default PerceptionView;
