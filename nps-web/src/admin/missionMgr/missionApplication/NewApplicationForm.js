import React from 'react';
import ReQuestionaire from './modal/ReQuestionaire';
import SelectTabs from './modal/SelectTabs';
import './NewApplicationForm.less'
import { Form, Input, Row, Col, Button, DatePicker,Radio,Icon,Upload,Select,Checkbox,Tabs} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
// const QRCode = require('qrcode.react');
@Form.create({})
class NewApplicationForm extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            startValue: null,
            endValue: null,
            endOpen: false,
            checkedMeasure:false,
            checkedResearch:false,
            rsFlag:true,
            accessFlag:true,
            checkedObject:false,
            add:false,
            selecttabs:false,
            path: null
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
    accessHandleChange=(value)=>{
        if(value==1) this.setState({accessFlag:true})
        else  this.setState({accessFlag:false})

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
    handleChange=(value)=>{
        if(value==2) this.setState({rsFlag:false})
        else  this.setState({rsFlag:true})

    }
    render() {
        const {getFieldDecorator} = this.props.form;
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
            <Checkbox onChange={this.onTrigger} checked={this.state.checkedObject} style={{display:'inline'}}>是否触发式任务</Checkbox>
        </div>
        //奖励措施
        let measure=null;
        if (this.state.checkedMeasure) {
            measure = (
                <div>
                    <Row className={'row2'}>
                        <Col span='12' className={'select'}>
                            <FormItem label="赠费类型：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('measureType', {
                                    rules: [],
                                    initialValue: " ",
                                })(
                                    <Select multiple placeholder="--请选择--" style={{width: '100%'}}>
                                        <Option value="shortmessage">10元赠费</Option>
                                        <Option value="wechart">30元赠费</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='12' className={'select'}>
                            <FormItem label="赠费数量：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('measureNumber', {
                                    rules: [],
                                    initialValue: " ",
                                })(
                                    <Input size="default"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>)
        }
        //常态调研
        let research=null;
        if (this.state.checkedResearch) {
            research = (
                <div>
                    <Row className={'row2'}>
                        <Col span='4' className={'select'}>
                            <FormItem>
                                {getFieldDecorator('researchType', {
                                    rules: [],
                                    initialValue: " ",
                                })(
                                    <Select defaultValue="1" onChange={this.handleChange}>
                                        <Option value="1">每月</Option>
                                        <Option value="2">每季度</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        {this.state.rsFlag ?
                            <div>
                                <Col span='12' className={'select'}>
                                    <FormItem>
                                        {getFieldDecorator('measureSelect', {
                                            rules: [],
                                            initialValue: " ",
                                        })(
                                            <RadioGroup>
                                                <Radio className={'radio'} value={1} disabled>1</Radio>
                                                <Radio className={'radio'} value={2} disabled>2</Radio>
                                                <Radio className={'radio'} value={3} disabled>3</Radio>
                                                <Radio className={'radio'} value={4} disabled>4</Radio>
                                                <Radio className={'radio'} value={5} disabled>5</Radio>
                                                <Radio className={'radio'} value={6}>6</Radio>
                                                <Radio className={'radio'} value={7}>7</Radio>
                                                <Radio className={'radio'} value={8}>8</Radio>
                                                <Radio className={'radio'} value={9}>9</Radio>
                                                <Radio className={'radio'} value={10}>10</Radio>
                                                <Radio className={'radio'} value={11}>11</Radio>
                                                <Radio className={'radio'} value={12}>12</Radio>
                                                <Radio className={'radio'} value={13}>13</Radio>
                                                <Radio className={'radio'} value={14}>14</Radio>
                                                <Radio className={'radio'} value={15}>15</Radio>
                                                <Radio className={'radio'} value={16}>16</Radio>
                                                <Radio className={'radio'} value={17}>17</Radio>
                                                <Radio className={'radio'} value={18}>18</Radio>
                                                <Radio className={'radio'} value={19}>19</Radio>
                                                <Radio className={'radio'} value={20}>20</Radio>
                                                <Radio className={'radio'} value={21}>21</Radio>
                                                <Radio className={'radio'} value={22}>22</Radio>
                                                <Radio className={'radio'} value={23}>23</Radio>
                                                <Radio className={'radio'} value={24}>24</Radio>
                                                <Radio className={'radio'} value={25}>25</Radio>
                                                <Radio className={'radio'} value={26}>26</Radio>
                                                <Radio className={'radio'} value={27} disabled>27</Radio>
                                                <Radio className={'radio'} value={28} disabled>28</Radio>
                                                <Radio className={'radio'} value={29} disabled>29</Radio>
                                                <Radio className={'radio'} value={30} disabled>30</Radio>
                                                <Radio className={'radio'} value={31} disabled>31</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span='4' className={'select'}>
                                    <span>注：按月前后五天不可选择</span>
                                </Col>
                            </div> : <div>
                                <Col span='12' className={'select'}>
                                    <FormItem>
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>第一月</Radio>
                                            <Radio value={2}>第二月</Radio>
                                            <Radio value={3}>第三月</Radio>
                                        </RadioGroup>
                                        <RadioGroup>
                                            <Radio className={'radio'} value={1} disabled>1</Radio>
                                            <Radio className={'radio'} value={2} disabled>2</Radio>
                                            <Radio className={'radio'} value={3} disabled>3</Radio>
                                            <Radio className={'radio'} value={4} disabled>4</Radio>
                                            <Radio className={'radio'} value={5} disabled>5</Radio>
                                            <Radio className={'radio'} value={6}>6</Radio>
                                            <Radio className={'radio'} value={7}>7</Radio>
                                            <Radio className={'radio'} value={8}>8</Radio>
                                            <Radio className={'radio'} value={9}>9</Radio>
                                            <Radio className={'radio'} value={10}>10</Radio>
                                            <Radio className={'radio'} value={11}>11</Radio>
                                            <Radio className={'radio'} value={12}>12</Radio>
                                            <Radio className={'radio'} value={13}>13</Radio>
                                            <Radio className={'radio'} value={14}>14</Radio>
                                            <Radio className={'radio'} value={15}>15</Radio>
                                            <Radio className={'radio'} value={16}>16</Radio>
                                            <Radio className={'radio'} value={17}>17</Radio>
                                            <Radio className={'radio'} value={18}>18</Radio>
                                            <Radio className={'radio'} value={19}>19</Radio>
                                            <Radio className={'radio'} value={20}>20</Radio>
                                            <Radio className={'radio'} value={21}>21</Radio>
                                            <Radio className={'radio'} value={22}>22</Radio>
                                            <Radio className={'radio'} value={23}>23</Radio>
                                            <Radio className={'radio'} value={24}>24</Radio>
                                            <Radio className={'radio'} value={25}>25</Radio>
                                            <Radio className={'radio'} value={26}>26</Radio>
                                            <Radio className={'radio'} value={27} disabled>27</Radio>
                                            <Radio className={'radio'} value={28} disabled>28</Radio>
                                            <Radio className={'radio'} value={29} disabled>29</Radio>
                                            <Radio className={'radio'} value={30} disabled>30</Radio>
                                            <Radio className={'radio'} value={31} disabled>31</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span='4' className={'select'}>
                                    <span>注：按月前后五天不可选择</span>
                                </Col>
                            </div>}
                    </Row>
                </div>)
        }
        //调研对象
        let object=(
            <div>
                <Row style={{background: '#ECECEC', padding: '5px'}}>
                    <Col span="24">
                        <span className={'spantitle'}>*</span>
                        调研对象
                    </Col>
                </Row>
                <Row>
                    <RadioGroup>
                        <Radio style={{display: 'block'}} value={1}>
                            <FormItem label="选择标签对象：" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                                {getFieldDecorator('tagName', {
                                    rules: [],
                                    initialValue: '',
                                })(
                                    <Input placeholder="点击选择标签" onClick={() => this.selectTab(true)}/>
                                )}
                            </FormItem>
                        </Radio>
                        <Radio style={{display: 'block'}} value={2}>
                            <Row>
                                <Col span='10'>
                                    <FormItem label="手工导入数据:" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                                        {getFieldDecorator('DataName', {
                                            rules: [],
                                            initialValue: '',
                                        })(
                                            <Upload>
                                                <Button type="ghost">
                                                    <Icon type="upload"/>选择文件
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span='1' style={{paddingTop: '10px'}}>
                                    <Button>上传</Button>
                                </Col>
                                <Col span='2' style={{paddingTop: '10px'}}>
                                    <Button>删除目标号码</Button>
                                </Col>
                                <Col span='5' offset={2} style={{paddingTop: '17px'}}>
                                    <a>下载批量导入模板</a>
                                </Col>
                            </Row>
                        </Radio>
                    </RadioGroup>
                    {/*<Col span='12'>*/}
                        {/*<FormItem labelCol={{span: 2}} wrapperCol={{span: 22}}>*/}
                            {/*<Input placeholder="点击选择标签" size="default" onClick={() => this.selectTab(true)}/>*/}
                        {/*</FormItem>*/}
                        {/*<FormItem labelCol={{span: 2}} wrapperCol={{span: 22}}>*/}
                            {/*<Upload>*/}
                                {/*<Button type="ghost">*/}
                                    {/*<Icon type="upload"/> 点击上传*/}
                                {/*</Button>*/}
                            {/*</Upload>*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*<Col span='2' style={{paddingTop: '50px'}}>*/}
                        {/*<Button>删除目标号码</Button>*/}
                    {/*</Col>*/}
                    {/*<Col span='5' style={{paddingTop: '55px'}}>*/}
                        {/*<a>下载批量导入模板</a>*/}
                    {/*</Col>*/}
                </Row>
            </div>);
        let messageway=null;//短信下发方式
        if(this.state.checkedObject){
            object=null;
            messageway=(
                <div>
                    <Row className={'row2'}>
                        <Col span='12' className={'selectmessage'} offset='12'>
                            <FormItem label="短信下发方式：" required={true} labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                <Select multiple placeholder="--请选择--" style={{width: '100%'}}>
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
                    <Row style={{background: '#ECECEC', padding: '5px'}}>
                        <Col span="24">
                            <span className={'spantitle'}>*</span>
                            调研基本信息
                        </Col>
                    </Row>
                    <Row className={'required'}>
                        <FormItem label="调研任务名称：" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                            {getFieldDecorator('taskName', {
                                rules: [{required: true,}],
                                initialValue: '',
                            })(
                                <Input size="default"/>
                            )}
                            {TriggerTask}
                        </FormItem>
                    </Row>
                    <Row className={'row2'}>
                        <Col span='12'>
                            <FormItem label="调研触发时间：" labelCol={{span: 4}} wrapperCol={{span: 8}}>
                                {getFieldDecorator('startTime', {
                                    rules: [{required: true,}],
                                    // initialValue: 'Start',
                                })(
                                    <DatePicker
                                        disabledDate={this.disabledStartDate}
                                        showTime
                                        format="YYYY-MM-DD "
                                        value={this.state.startValue}
                                        onChange={this.onStartChange}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span='12'>
                            <FormItem label="调研结束时间：" labelCol={{span: 4}} wrapperCol={{span: 8}}>
                                {getFieldDecorator('endTime', {
                                    rules: [{required: true,}],
                                    // initialValue: 'End',
                                })(
                                    <DatePicker
                                        disabledDate={this.disabledEndDate}
                                        showTime
                                        format="YYYY-MM-DD "
                                        value={this.state.endValue}
                                        onChange={this.onEndChange}
                                        open={this.state.endOpen}
                                        onOpenChange={this.handleEndOpenChange}
                                    />
                                )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <FormItem label="调研问卷：" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                            {getFieldDecorator('taskQuestionNaire', {
                                rules: [{required: true,}],
                            })(
                                <Input placeholder='点击选择调研问卷' onClick={() => this.addQuestionaire(true)}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="测试号码：" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                            {getFieldDecorator('testNumber', {
                                rules: [{required: true,}],
                            })(
                                <Input placeholder="多个号码用英文逗号分隔"/>
                            )}
                        </FormItem>
                    </Row>
                    {object}

                    <Row style={{background: '#ECECEC', padding: '5px'}}>
                        <Col span="24">
                            <span className={'spantitle'}>*</span>
                            调研渠道
                        </Col>
                    </Row>
                    {this.state.accessFlag?
                        <Row className={'row2'}>
                        <Col span='12' className={'select'}>
                            <FormItem label="调研渠道：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('taskChannel', {
                                    rules: [{required: true,}],
                                    // initialValue: 'Start',
                                })(
                                    <Select multiple placeholder="--请选择--" style={{width: '100%'}}>
                                        <Option value="1">短信发送</Option>
                                        <Option value="2">微信发送</Option>
                                        <Option value="3">邮件发送</Option>
                                        <Option value="4">二维码发送</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='12' className={'select'}>
                            <FormItem label="获取样本方式：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('taskAccess', {
                                    rules: [{required: true,}],
                                    // initialValue: 'Start',
                                })(
                                    <Select onChange={this.accessHandleChange}multiple placeholder="--请选择--" style={{width: '100%'}}>
                                        <Option value="1">全量</Option>
                                        <Option value="2">抽样</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                        :
                        <Row className={'row2'}>
                        <Col span='8' className={'select'}>
                            <FormItem label="调研渠道：" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                {getFieldDecorator('taskChannel', {
                                    rules: [{required: true,}],
                                    // initialValue: 'Start',
                                })(
                                    <Select multiple placeholder="--请选择--" style={{width: '100%'}}>
                                        <Option value="1">短信发送</Option>
                                        <Option value="2">微信发送</Option>
                                        <Option value="3">邮件发送</Option>
                                        <Option value="4">二维码发送</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='8' className={'select'}>
                            <FormItem label="获取样本方式：" labelCol={{span: 6}} wrapperCol={{span: 10}}>
                                {getFieldDecorator('taskAccess', {
                                    rules: [{required: true,}],
                                    // initialValue: 'Start',
                                })(
                                    <Select onChange={this.accessHandleChange}multiple placeholder="--请选择--" style={{width: '100%'}}>
                                        <Option value="1">全量</Option>
                                        <Option value="2">抽样</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='8' className={'select'}>
                                <FormItem label="抽样数量：" labelCol={{span:6}} wrapperCol={{span: 10}}>
                                    {getFieldDecorator('taskAccessNum', {
                                        rules: [{required: true,}],
                                        // initialValue: 'Start',
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                        </Col>
                    </Row>}

                    {messageway}
                    <Row style={{background: '#ECECEC', padding: '5px'}}>
                        <Col span="24">
                            <Checkbox onChange={this.onMeasure} checked={this.state.checkedMeasure}>奖励措施</Checkbox>
                        </Col>
                    </Row>
                    {measure}
                    <Row style={{background: '#ECECEC', padding: '5px', marginTop: '20px'}}>
                        <Col span="24">
                            <Checkbox onChange={this.onResearch} checked={this.state.checkedResearch}>常态调研</Checkbox>
                        </Col>
                    </Row>
                    {research}
                    <Row style={{background: '#ECECEC', padding: '5px', marginTop: '20px'}}>
                        <Col span="24">
                            <span className={'spantitle'}>*</span>
                            上传客服文档
                        </Col>
                    </Row>
                    <Row>
                        <Col span='18' style={{paddingTop: '20px', paddingLeft: '50px'}}>
                            <Upload>
                                <Button type="ghost">
                                    <Icon type="upload"/> 点击上传
                                </Button>
                            </Upload>
                        </Col>
                        <Col span='6' style={{paddingTop: '20px', paddingLeft: '50px'}}>
                            （文档类型仅支持doc、docx、txt、xls、xlsx、pdf格式，且大小不能超过5M）
                        </Col>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                        <FormItem wrapperCol={{span: 12, offset: 6}}>
                            <Button type="primary" onClick={this.handleSubmit}>保存草稿(save)</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick={this.handleSubmit}>提交审核(save)</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>取消</Button>
                        </FormItem>
                    </Row>
                </Form>
                {/*<Tabs defaultActiveKey="2">*/}
                {/*<TabPane tab={<span><Icon type="apple" />链接与二维码</span>} key="1">*/}
                {/*<div>*/}
                {/*<div>问卷链接与二维码</div>*/}
                {/*<QRCode size={150} value="http://www.baidu.com"/>*/}
                {/*</div>*/}
                {/*</TabPane>*/}
                {/*<TabPane tab={<span><Icon type="android" />微信发送</span>} key="2">*/}
                {/*微信发送*/}
                {/*</TabPane>*/}
                {/*<TabPane tab={<span><Icon type="apple" />邮件发送</span>} key="3">*/}
                {/*邮件发送*/}
                {/*</TabPane>*/}
                {/*<TabPane tab={<span><Icon type="android" />短信发送</span>} key="4">*/}
                {/*短信发送*/}
                {/*</TabPane>*/}
                {/*</Tabs>*/}
                <ReQuestionaire {...addModalProps}/>
                <SelectTabs {...selectModalProps}/>
            </div>

        )
    }

}export default NewApplicationForm;















