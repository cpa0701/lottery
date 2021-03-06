import React from 'react';
import {Row,Button} from "antd"
 const echarts = require('echarts');
class ResourceMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        let myChartone = echarts.init(document.getElementById('exampleone'));
        // 指定图表的配置项和数据
        let optionone = {
            title : {
                text: '全年调研资源统计图(短信类)',
                left:'center',
                textStyle:{
                    align:'center',
                }

            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['已使用数量','总数量'],
                top:'bottom',

            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['一月份','二月份','三月份','四月份','五月份','六月份',
                        '七月份','八月份','九月份','十月份','十一月份','十二月份'
                    ]
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'已使用数量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    barMaxWidth:20,//最大宽度
                    color:'#7CB5EC',
                },
                {
                    name:'总数量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7,6 ,44, 100],
                    barMaxWidth:20,//最大宽度
                    color:'#434348',
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChartone.setOption(optionone);
        // 基于准备好的dom，初始化echarts实例
        let myCharttwo = echarts.init(document.getElementById('exampletwo'));
        // 指定图表的配置项和数据
        let optiontwo = {
            title : {
                text: '全年调研资源统计图(赠费类)',
                left:'center',

            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['已使用数量','总数量'],
                top:'bottom',

            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['第一季度','第二季度','第三季度','第四季度'],


                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'已使用数量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2],
                    barMaxWidth: 30,
                    color:'#7CB5EC',
                },
                {
                    name:'总数量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4],
                    barMaxWidth: 30,
                    color:'#434348',
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myCharttwo.setOption(optiontwo);
    }
    render() {
        return(
            <div>
                <Row>
                年份：
                    <Button style={{marginLeft:'10px'}}>今年</Button>
                    <Button style={{marginLeft:'10px'}}>2016</Button>
                    <Button style={{marginLeft:'10px'}}>2017</Button>
                    <Button style={{marginLeft:'10px'}}>2018</Button>
                    <Button style={{marginLeft:'10px'}}>2019</Button>
                </Row>
               <Row id='exampleone' style={{height:400}}/>
                <Row id='exampletwo' style={{height:400}}/>
            </div>

        );
    }
}

export default ResourceMap;
