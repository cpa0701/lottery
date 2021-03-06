import {PureComponent} from "react";
import React from 'react';
import {Row, Col} from "antd";
import ResultService from "../../../../services/analysisResult/ResultService"

const echarts = require('echarts');

export default class SurveyModule extends PureComponent {
    constructor(props) {
        super(props);
        this.props.onRef(this);
    }
    getData = (params) => {
        let param = {
            areaId: '00',
            qstnaireId: '',
            taskType: 0,
            ...params
        };
        // 获取nps值分布
        ResultService.getNpsTargetshow(param).then(result=>{
            if(result){
                let xData = [], taskCount = [], partakeCount = [], finishCount = [];
                result.map(item => {
                    xData.push(item.taskName);
                    taskCount.push(item.npsCount1);
                    partakeCount.push(item.npsCount2);
                    finishCount.push(item.npsCount3);
                    return '';
                });
                this.createNPSChart(xData, taskCount, partakeCount, finishCount);
            }
        });
        // 获取对象分析
        ResultService.getObjTargetshow(param).then(result=>{
            if(result){
                let xData = [], taskCount = [], partakeCount = [], finishCount = [];
                result.map(item => {
                    xData.push(item.taskName);
                    taskCount.push(item.taskCount);
                    partakeCount.push(item.partakeCount);
                    finishCount.push(item.finishCount);
                    return '';
                });
                this.createChart(xData, taskCount, partakeCount, finishCount);
            }
        })
    };
    componentWillMount() {
        this.getData();
    }

    //调研结果值分布
    createChart = (xData, taskCount, partakeCount, finishCount) => {
        let myChart = echarts.init(document.getElementById("barChartone"));
        myChart.clear();
        let labelOption = {};

        let option = {
            title: {
                text: '调研对象分析'
            },
            color: ['#4A86E8', '#E5323E', '#4DB24D'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                // formatter: '{a}: {b} {c}'
            },
            legend: {
                data: ['调研人数', '参与人数', '完成人数',],
                bottom: 10
            },

            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    // axisTick: {show: true},
                    // data: ['2012', '2013', '2014', '2015', '2016']
                    data: xData
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
                    // data: [320, 332, 301, 334, 390],
                    data: taskCount,
                    barMaxWidth: 20,//最大宽度
                },
                {
                    name: '参与人数',
                    type: 'bar',
                    label: labelOption,
                    // data: [220, 182, 191, 234, 290],
                    data: partakeCount,
                    barMaxWidth: 20,//最大宽度
                },
                {
                    name: '完成人数',
                    type: 'bar',
                    label: labelOption,
                    // data: [150, 232, 201, 154, 190],
                    data: finishCount,
                    barMaxWidth: 20,//最大宽度
                },
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    };
    //调研NPS值分布
    createNPSChart = (xData, taskCount, partakeCount, finishCount) => {
        let chartTwo = echarts.init(document.getElementById("barCharttwo"));
        chartTwo.clear();
        let optionone = {
            title: {
                text: '调研NPS值分布'
            },
            tooltip: {
                trigger: 'axis',
                // formatter: '{a}: {b} {c}'
            },
            legend: {
                data: ['推荐者', '被动者', '贬损者',],
                bottom: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    data: xData,
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '推荐者',
                    type: 'bar',
                    stack: '人',
                    // data: [120, 132, 101, 134, 90, 230, 210],
                    data: taskCount,
                    itemStyle: {
                        color: '#F3E309'
                    },
                    barMaxWidth: 20,//最大宽度
                },
                {
                    name: '被动者',
                    type: 'bar',
                    stack: '人',
                    // data: [220, 182, 191, 234, 290, 330, 310],
                    data: partakeCount,
                    itemStyle: {
                        color: '#FF4400'
                    }
                },
                {
                    name: '贬损者',
                    type: 'bar',
                    stack: '人',
                    // data: [150, 232, 201, 154, 190, 330, 410],
                    data: finishCount,
                    itemStyle: {
                        color: '#87CEFA'
                    }
                },
            ]
        };
        if (optionone && typeof optionone === "object") {
            chartTwo.setOption(optionone, true);
        }
    };

    render() {
        const { height } = this.props;

        return (
            <div>
                <Row>
                    <Col span='22' offset={1} id="barChartone" style={{height: height}}>
                    </Col>
                    <Col span='22' offset={1} id="barCharttwo" style={{height: height}}>
                    </Col>
                </Row>
            </div>
        )
    }
}