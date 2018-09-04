import {PureComponent} from "react";
import React from 'react';
const echarts = require('echarts');
export default class ResourceModule extends PureComponent {
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('exampleone'));
        // 指定图表的配置项和数据
        var optionone = {
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
        myChart1.setOption(optionone);
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('exampletwo'));
        // 指定图表的配置项和数据
        var optiontwo = {
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
        myChart2.setOption(optiontwo);
    }
}