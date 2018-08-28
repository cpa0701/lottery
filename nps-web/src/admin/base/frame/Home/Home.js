import React from 'react';
import {
    Pagination, DatePicker, TimePicker, Calendar,
    Table, Modal, Button, Select, Transfer
} from 'antd';
import moment from 'moment';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    filters: [{
        text: 'filter1',
        value: 'filter1',
    }],
}, {
    title: 'Age',
    dataIndex: 'age',
}];
const echarts = require('echarts');

class Home extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            locale: null,
            visible: false,
        };
    }

    showModal = () => {
        this.setState({visible: true});
    }

    hideModal = () => {
        this.setState({visible: false});
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('example'));
        const option = {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 绘制图表
        myChart.setOption(option);

    }
    render() {
        const info = () => {
            Modal.info({
                title: 'some info',
                content: 'some info',
            });
        };
        const confirm = () => {
            Modal.confirm({
                title: 'some info',
                content: 'some info',
            });
        };
        return (
            <div className="locale-components">
                <div className="example">
                    <Pagination defaultCurrent={1} total={50} showSizeChanger/>
                </div>
                <div className="example">
                    <Select showSearch style={{width: 200}}>
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                    </Select>
                    <DatePicker/>
                    <TimePicker/>
                    <RangePicker style={{width: 200}}/>
                </div>
                <div className="example">
                    <Button type="primary" onClick={this.showModal}/>Show Modal
                    <Button onClick={info}/>Show info
                    <Button onClick={confirm}/>Show confirm
                </div>
                <div className="example">
                    <Transfer
                        dataSource={[]}
                        showSearch
                        targetKeys={[]}
                        render={item => item.title}
                    />
                </div>
                <div style={{width: 319, border: '1px solid #d9d9d9', borderRadius: 4}}>
                    <Calendar fullscreen={false} value={moment()}/>
                </div>
                <div className="example">
                    <Table dataSource={[]} columns={columns}/>
                </div>
                <Modal title="Locale Modal" visible={this.state.visible} onCancel={this.hideModal}>
                    <p>Locale Modal</p>
                </Modal>
                <div id="example" style={{height:500}}/>
            </div>
        );
    }
}

export default Home;
