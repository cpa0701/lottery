import React from 'react';
import ReQuestionaire from '../../missionMgr/missionApplication/modal/ReQuestionaire';
import {Row, Col, Form, Select, Input, Button, DatePicker} from "antd"
import SurveyModule from './modal/SurveyModule';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const echarts = require('echarts');
const monthFormat = 'YYYY/MM';
@Form.create({})
class AnalysisResult extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selecttabs: false,
            add: false,
            value: 'city',
            triggerTask: 'all',

        }
        this.search = this.search.bind(this);
    }

    //点击选择问卷弹框
    selectQuestion = (show) => {
        if (show) {
            this.setState({add: true});
        } else {
            this.setState({add: false});
        }
    }
    //城市
    handleChange = (value) => {
        // value1:value,
        this.setState(
            {
                value: value,
            }
        )
    }
    //触发式调研任务
    handleChangeTask = (value) => {
        this.setState(
            {
                triggerTask: value,
            }
        )

    }

    componentDidMount() {
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


        var labelOption = {};

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
                    barMaxWidth: 20,//最大宽度
                },
                {
                    name: '参与人数',
                    type: 'bar',
                    label: labelOption,
                    data: [220, 182, 191, 234, 290],
                    barMaxWidth: 20,//最大宽度
                },
                {
                    name: '完成人数',
                    type: 'bar',
                    label: labelOption,
                    data: [150, 232, 201, 154, 190],
                    barMaxWidth: 20,//最大宽度
                },
            ]
        };
        ;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }


        //调研NPS值分布
        var chartTwo = echarts.init(document.getElementById("barCharttwo"));
        var optionone = {
            title: {
                text: '调研NPS值分布'
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['推荐者', '被动者', '贬损者',]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                    data: [120, 132, 101, 134, 90, 230, 210],
                    itemStyle: {
                        color: '#F3E309'
                    },
                    barMaxWidth: 20,//最大宽度
                },
                {
                    name: '被动者',
                    type: 'bar',
                    stack: '人',
                    data: [220, 182, 191, 234, 290, 330, 310],
                    itemStyle: {
                        color: '#FF4400'
                    }
                },
                {
                    name: '贬损者',
                    type: 'bar',
                    stack: '人',
                    data: [150, 232, 201, 154, 190, 330, 410],
                    itemStyle: {
                        color: '#87CEFA'
                    }
                },
            ]
        };
        ;
        if (optionone && typeof optionone === "object") {
            chartTwo.setOption(optionone, true);
        }
    }

    OnRef1 = (ref) => {
        this.chart = ref;
    }

    search = () => {
        this.chart.getData()

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        //是否显示新增问卷弹框
        const selectModalProps = {
            add: this.state.add,
            onClose: () => {
                this.selectQuestion(false);
            },
            onChoseQuestion: (id) => {
                this.props.form.setFieldsValue({
                    qstnaireId: id,
                });
                this.setState({add: false})
            },
        };
        const map = {
            city: this.state.value,
            questionName: '',
            triggerTask: this.state.triggerTask,
            height: 500,
        }
        return (
            <div>
                <Row>
                    <Form>
                        <Col span='4'>
                            <FormItem label="调研地市" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                <Select defaultValue="全市" onChange={this.handleChange}>
                                    <Option value="city">全市</Option>
                                    <Option value="yubei">渝北</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='6'>
                            <FormItem label="问卷名称" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                {getFieldDecorator('qstnaireId', {
                                    rules: [{required: true, message: '请选择调研问卷'}],
                                })(
                                <Input placeholder='点击选择调研问卷' onClick={() => this.selectQuestion(true)}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='6'>
                            <FormItem label="任务类型" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                                <Select defaultValue="全部" onChange={this.handleChangeTask}>
                                    <Option value="all">全部</Option>
                                    <Option value="research">调研任务</Option>
                                    <Option value="trigger">触发式调研任务</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='3' offset='1'>
                            <FormItem>
                                <Button type="primary" htmlType="submit" onClick={this.search}>
                                    查询
                                </Button>
                                <Button htmlType="submit" style={{marginLeft: '10px'}}>
                                    导出
                                </Button>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <SurveyModule OnRef={this.OnRef1} {...map}/>
                <ReQuestionaire {...selectModalProps}/>
            </div>

        );
    }
}

export default AnalysisResult;
