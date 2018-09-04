import {PureComponent} from "react";
import React from 'react';
import {Row,Col} from "antd";
import ResultService from "../../../../services/analysisResult/ResultService"
import TaskResearchService from "../../../../services/research/TaskResearchService"

const echarts = require('echarts');
export default class SurveyModule extends PureComponent {
    constructor(props){
        super(props);
        this.props.OnRef(this);
    }
    componentWillMount(){
        // const {params}=this.props;
        // debugger;
        // console.log(params)
        // TaskResearchService.getMissionList(params).then(result=>{
        //     if(result){
        //
        //     }
        // })
    }
    getData=()=>{
        console.log('我是getdata方法');
        // const {params}=this.props;
        // ResultService.getTargetshow(params).then(result=>{
        //     if(result){
        //
        //     }
        // })
    }
    componentDidMount(){
        var myChart = echarts.init(document.getElementById("barChartone"));
        var app = {};
        var posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];
        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                var labelOption = {
                    normal: {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    }
                };
                myChart.setOption({
                    series: [{
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    },]
                });
            }
        };


        var labelOption = { };

        var option = {
            title: {
                text: '调研对象分析'
            },
            color: ['#4A86E8', '#E5323E', '#4DB24D'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data: ['调研人数', '参与人数', '完成人数',]
            },

            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    // axisTick: {show: true},
                    data: ['2012', '2013', '2014', '2015', '2016']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '调研人数',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    data: [320, 332, 301, 334, 390],
                    barMaxWidth:20,//最大宽度
                },
                {
                    name: '参与人数',
                    type: 'bar',
                    label: labelOption,
                    data: [220, 182, 191, 234, 290],
                    barMaxWidth:20,//最大宽度
                },
                {
                    name: '完成人数',
                    type: 'bar',
                    label: labelOption,
                    data: [150, 232, 201, 154, 190],
                    barMaxWidth:20,//最大宽度
                },
            ]
        };;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }


        //调研NPS值分布
        var chartTwo = echarts.init(document.getElementById("barCharttwo"));
        var  optionone = {
            title: {
                text: '调研NPS值分布'
            },
            tooltip : {
                trigger: 'axis',
            },
            legend: {
                data:['推荐者','被动者','贬损者',]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'推荐者',
                    type:'bar',
                    stack: '人',
                    data:[120, 132, 101, 134, 90, 230, 210],
                    itemStyle:{
                        color:'#F3E309'
                    },
                    barMaxWidth:20,//最大宽度
                },
                {
                    name:'被动者',
                    type:'bar',
                    stack: '人',
                    data:[220, 182, 191, 234, 290, 330, 310],
                    itemStyle:{
                        color:'#FF4400'
                    }
                },
                {
                    name:'贬损者',
                    type:'bar',
                    stack: '人',
                    data:[150, 232, 201, 154, 190, 330, 410],
                    itemStyle:{
                        color:'#87CEFA'
                    }
                },
            ]
        };
        ;
        if (optionone && typeof optionone === "object") {
            chartTwo.setOption(optionone, true);
        }
    }
    render() {
        const {params}=this.props;
        console.log(params)
        return(
            <div>
                <Row>
                <Col span='24' id="barChartone"  style={{height:500}}>

                </Col>
                <Col span='24' id="barCharttwo"  style={{height:500}}>

                </Col>
                </Row>
            </div>
        )
    }
}