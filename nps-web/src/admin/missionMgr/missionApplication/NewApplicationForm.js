import React from 'react';
import ReQuestionaire from './modal/ReQuestionaire';
import SelectTabs from './modal/SelectTabs';
import './NewApplicationForm.less'
import { Form, Input, Row, Col, Button, DatePicker,Radio,Icon,Upload,Select,Checkbox } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class NewApplicationForm extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            startValue: null,
            endValue: null,
            endOpen: false,
            checkedMeasure:false,
            checkedResearch:false,
            checkedObject:false,
            add:false,
            selecttabs:false,
        }
    }
    // 新增问卷弹框
    addQuestionaire = (show) => {
        if (show) {
            this.setState({add: true});
        } else {
            this.setState({add: false});
        }
    };
    //选择标签弹框
    selectTab= (show) =>{
        debugger;
        if (show) {
            this.setState({selecttabs: true});
        } else {
            this.setState({selecttabs: false});
        }
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    onMeasure=(e)=>{
        this.setState({checkedMeasure: e.target.checked})
    }
    onResearch=(e)=>{
        this.setState({checkedResearch:e.target.checked})
    }
    onTrigger=(e)=>{
        this.setState({checkedObject:e.target.checked})
    }

    render() {
        //新增问卷弹框属性传值是否显示弹窗
        const addModalProps = {
            add: this.state.add,
            onClose: () => {
                this.addQuestionaire(false);
            },
        };
        //新增标签弹窗属性传值是否显示弹窗
        const selectModalProps = {
            selecttabs: this.state.selecttabs,
            onClose: () => {
                this.selectTab(false);
            },
        };
        //触发式调研任务
        const TriggerTask=<div style={{position: 'absolute',right:'20px',top:'-10px'}}>
            <Checkbox onChange={this.onTrigger} checked={this.state.checkedObject} style={{display:'inline'}}>是否触发时任务</Checkbox>
        </div>
        //奖励措施
        let measure=null;
        if(this.state.checkedMeasure){
            measure=(
                <div><Row className={'row2'}>
                <Col span='12' className={'select'}>
                    <FormItem label="赠费类型："labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                        <Select  multiple placeholder="--请选择--" style={{ width: '100%' }}>
                            <Option value="shortmessage">10元赠费</Option>
                            <Option value="wechart">30元赠费</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='12' className={'select'}>
                    <FormItem label="赠费数量："labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                       <Input size="default"/>
                    </FormItem>
                </Col>
            </Row>
                </div>)
        }
        //奖励调研
        let research=null;
        if(this.state.checkedResearch){
            research=(
                <div><Row className={'row2'}>
                    <Col span='12' className={'select'}>
                        <FormItem label="赠费类型："labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                            <Select  multiple placeholder="--请选择--" style={{ width: '100%' }}>
                                <Option value="shortmessage">10元赠费</Option>
                                <Option value="wechart">30元赠费</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span='12' className={'select'}>
                        <FormItem label="赠费数量："labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                            <Input size="default"/>
                        </FormItem>
                    </Col>
                </Row>
                </div>)
        }
        //调研对象
        let object=(
            <div> <Row style={{ background: '#ECECEC',padding:'5px'}} >
                <Col span="24">
                    <span className={'spantitle'}>*</span>
                    调研对象
                </Col>
            </Row>
                <Row className={'required'}>
                    <Col span='2'>
                        <RadioGroup >
                            <Radio value="male" style={{paddingBottom:'20px',paddingTop:'8px'}}>选择标签对象</Radio>
                            <Radio value="female">手工导入数据</Radio>
                        </RadioGroup>
                    </Col>
                    <Col span='12'>
                        <FormItem  labelCol={{ span: 2}} wrapperCol={{ span: 22 }} >
                            <Input placeholder="点击选择标签" size="default" onClick={() => this.selectTab(true)}/>
                        </FormItem>
                        <FormItem  labelCol={{ span: 2}} wrapperCol={{ span: 22 }} >
                            <Upload >
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>
                    </Col>
                    <Col span='2' style={{paddingTop:'50px'}}>
                    <Button>删除目标号码</Button>
                    </Col>
                    <Col span='5' style={{paddingTop:'55px'}}>
                        <a >下载批量导入模板</a>
                    </Col>
                </Row>
            </div>);
        let messageway=null;//短信下发方式
        if(this.state.checkedObject){
            object=null;
            messageway=(<div>
                <Row className={'row2'}>
                    <Col span='12' className={'selectmessage'} offset='12'>
                        <FormItem label="短信下发方式：" required={true} labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                            <Select  multiple placeholder="--请选择--" style={{ width: '100%' }}>
                                <Option value="link">短信超链接</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>)
        }

        return (
            <div className={'newApplicationForm'}>
                <Form layout={'horizontal'} className="ant-advanced-search-form">
                    <Row style={{ background: '#ECECEC',padding:'5px'}} >
                        <Col span="24">
                            <span className={'spantitle'}>*</span>
                            调研基本信息
                        </Col>
                    </Row>
                    <Row className={'required'}>
                    <FormItem  label="调研任务名称："  required={true} labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} >

                        <Input  size="default" />
                        {TriggerTask}
                    </FormItem>
                    </Row>
                    <Row className={'row2'}  >
                        <Col span='12'>
                            <FormItem label="调研触发时间：" required={true} labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    showTime
                                    format="YYYY-MM-DD "
                                    value={this.state.startValue}
                                    placeholder="Start"
                                    onChange={this.onStartChange}
                                    onOpenChange={this.handleStartOpenChange}
                                />
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem label="调研结束时间：" required={true} labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                                <DatePicker
                                    disabledDate={this.disabledEndDate}
                                    showTime
                                    format="YYYY-MM-DD "
                                    value={this.state.endValue}
                                    placeholder="End"
                                    onChange={this.onEndChange}
                                    open={this.state.endOpen}
                                    onOpenChange={this.handleEndOpenChange}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <FormItem label="调研问卷：" required={true} labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            <Input placeholder="点击选择调研问卷" size="default" onClick={() => this.addQuestionaire(true)}/>
                        </FormItem>
                        <Col span='12'>
                            <FormItem label="调研任务编码：" required={true} labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} >
                                <Input placeholder="自动生成" size="default" readOnly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <FormItem  label="测试号码：" required={true} labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} >
                            <Input placeholder="多个号码用英文逗号分隔" size="default" />
                        </FormItem>
                    </Row>
                      {object}

                    <Row style={{ background: '#ECECEC',padding:'5px'}} >
                        <Col span="24">
                            <span className={'spantitle'}>*</span>
                            调研渠道
                        </Col>
                    </Row>
                    <Row className={'row2'}>
                        <Col span='12' className={'select'}>
                            <FormItem label="调研渠道：" required={true} labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                                <Select  multiple placeholder="--请选择--" style={{ width: '100%' }}>
                                    <Option value="message">短信</Option>
                                    <Option value="wechart">微信</Option>
                                    <Option value="huawei">华为外呼</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='12' className={'select'}>
                            <FormItem label="获取样本方式：" required={true} labelCol={{ span: 4}} wrapperCol={{ span: 12 }} >
                                <Select  multiple placeholder="--请选择--" style={{ width: '100%' }}>
                                    <Option value="all">全量</Option>
                                    <Option value="sample">抽样</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    {messageway}
                    <Row style={{ background: '#ECECEC',padding:'5px'}} >
                        <Col span="24">
                                <Checkbox onChange={this.onMeasure} checked={this.state.checkedMeasure}>奖励措施</Checkbox>
                        </Col>
                    </Row>
                    {measure}
                    <Row style={{ background: '#ECECEC',padding:'5px',marginTop:'20px'}}>
                        <Col span="24">
                            <Checkbox onChange={this.onResearch} checked={this.state.checkedResearch}>常态调研</Checkbox>
                        </Col>
                    </Row>
                    {research}
                    <Row style={{ background: '#ECECEC',padding:'5px',marginTop:'20px'}}>
                        <Col span="24">
                            <span className={'spantitle'}>*</span>
                            上传客服文档
                        </Col>
                    </Row>
                    <Row>
                        <Col span='18' style={{paddingTop:'20px' ,paddingLeft:'50px'}}>
                        <Upload >
                            <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                        </Col>
                        <Col span='6' style={{paddingTop:'20px' ,paddingLeft:'50px'}}>
                            （文档类型仅支持doc、docx、txt、xls、xlsx、pdf格式，且大小不能超过5M）
                        </Col>
                    </Row>
                    <Row style={{paddingTop:'10px'}}>
                        <FormItem wrapperCol={{ span: 12, offset: 7 }} >
                            <Button type="primary" onClick={this.handleSubmit}>保存草稿(save)</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick={this.handleSubmit}>提交审核(save)</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>取消</Button>
                        </FormItem>
                    </Row>
                </Form>
                <ReQuestionaire {...addModalProps}/>
                <SelectTabs {...selectModalProps}/>
            </div>

        )
    }

}export default NewApplicationForm;















