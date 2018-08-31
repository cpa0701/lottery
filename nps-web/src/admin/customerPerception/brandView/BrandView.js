import React from 'react';
import {Row, Col,Form, Select, Input, Button, DatePicker,Icon} from "antd"
import moment from 'moment';
import { Table} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const echarts = require('echarts');
const { MonthPicker, } = DatePicker;
const monthFormat = 'YYYY/MM';
class BrandView extends React.PureComponent {
    componentDidMount() {
        //正方形
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        cxt.fillStyle = "#81b509";
        cxt.fillRect(0, 0, 155, 155);

        //长方形
        var t1 = document.getElementById("Canvastwo");
        var cxt1 = t1.getContext("2d");
        cxt1.fillStyle = "#87cefa";
        cxt1.fillRect(0, 0, 5, 50);
        //长方形
        var t2 = document.getElementById("Canvasthree");
        var cxt2 = t2.getContext("2d");
        cxt2.fillStyle = "#F6FA31";
        cxt2.fillRect(0, 0, 5, 50);
        //长方形
        var t3 = document.getElementById("Canvasfour");
        var cxt3 = t3.getContext("2d");
        cxt3.fillStyle = "#FA0D39";
        cxt3.fillRect(0, 0, 5, 50);
       //  折线图
        // 基于准备好的dom，初始化折线图echarts实例
        let lineChart = echarts.init(document.getElementById('lineChart'));
        const option = {
            title: {
                text: '支局忠诚度趋势'
            },
            tooltip: {
                trigger: 'axis'
            },
            color:['#FA0D39','#34fa35','#1422fa'],
            legend: {
                data:['贬损者占比','被动者占比','推荐者占比'],
                style:{
                    top:'bottom',
                }

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['201804','201805','201806','201807','201808']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'贬损者占比',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90],
                    lineStyle:{
                        color:"#FA0D39"
                    }

                },
                {
                    name:'被动者占比',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290],
                    lineStyle:{
                        color:"#34fa35"
                    }
                },
                {
                    name:'推荐者占比',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190],
                    lineStyle:{
                        color:"#1422fa"
                    }
                },

            ]
        };
        // 绘制折线图图表
        lineChart.setOption(option);
    }
    render() {
        const columnsone = [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '因子名称',
            dataIndex: 'factorName',
            key: 'factorName',
        }, {
            title: '影响客户数',
            dataIndex: 'keyName',
            key: 'keyName',
        }, {
            title: '占总客户数比例%',
            dataIndex: 'keyIndexWeight',
            key: 'keyIndexWeight',
        },];
        const columnsthree = [
            {
                title: '亲密度',
                dataIndex: 'intimacy',
                key: 'intimacy',
                render: intimacy => (
                    <span>
                        { intimacy.map(intimacy =>
                            <Icon type="heart" key={intimacy} style={{color:'#FF0203',marginLeft:"10px"}}>
                            </Icon>
                        )
                        }
                    </span>
                ),
            },{
                title: '人数',
                dataIndex: 'number',
                key: 'number',
            },{
                title: '占比',
                dataIndex: 'accountfor',
                key: 'accountfor',
            },
        ];
        const dataSourcethree = [{
            key: '1',
            intimacy:  ['1', '2','3','4','5'],
            number: 32,
            accountfor: 'kong'
        }, {
            key: '2',
            intimacy: ['1', '2','3','4'],
            number: 42,
            accountfor: 'kong'
        }, {
            key: '3',
            intimacy: ['1','2','3',],
            number: 42,
            accountfor: 'kong'
        }, {
            key: '4',
            intimacy: ['1', '2'],
            number: 42,
            accountfor: 'kong'
        }, {
            key: '5',
            intimacy: ['1'],
            number: 42,
            accountfor:'kong'
        }];
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
                        <Col span='6'>
                            <FormItem  label="支局名称" labelCol={{ span: 4 }} wrapperCol={{ span: 18}}>
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
                                <Select defaultValue="移动用户" >
                                    <Option value="yidong">移动用户</Option>
                                    <Option value="kuandai">宽带用户</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='3' offset='1'>
                            <FormItem>
                                <Button type="primary" htmlType="submit" >
                                    查询
                                </Button>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Col span='12'>
                        <Col span='6'>
                            <h4 style={{fontWeight:'bold'}}>忠诚度概况</h4>
                            <canvas width='135' height='135' id="myCanvas" style={{padding:'30px'}}/>
                        </Col>
                        <Col span='18'>
                            <p style={{paddingLeft:'100px',marginTop:'90px' ,background:'#ccc',marginRight:'200px'}}>客户数（人）：</p>
                            <canvas width='5' height='50' id="Canvastwo" style={{padding:'10px'}}/>
                            <p style={{width:'80px' ,display:'inline',position:'absolute',top:'150px'}}>0% 推荐者占比 </p>
                            <canvas width='5' height='50' id="Canvasthree" style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'80px',paddingRight:'10px'}}/>
                            <p style={{width:'80px' ,display:'inline',position:'absolute',top:'150px'}}>0% 被动者占比 </p>
                            <canvas width='5' height='50' id="Canvasfour" style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'90px',paddingRight:'10px'}}/>
                            <p style={{width:'80px' ,display:'inline',position:'absolute',top:'150px'}}>0% 贬损者占比 </p>
                        </Col>
                        <Col span='24' style={{marginTop:'50px'}}>
                            <h4 style={{fontWeight:'bold'}}>支局痛点分析(TOP3)</h4>
                            <Table columns={columnsone} />
                        </Col>
                    </Col>
                    <Col span="12" id="lineChart"  style={{height:500}}>

                    </Col>
                    <Col span="12" offset="12">
                        <Table columns={columnsthree} dataSource={dataSourcethree} />
                    </Col>
                </Row>
            </div>

        );
    }
}

export default BrandView;
