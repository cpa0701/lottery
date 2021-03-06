import React from 'react';
import ReQuestionaire from './modal/ReQuestionaire';
import SelectTabs from './modal/SelectTabs';
import moment from 'moment';
import './NewApplicationForm.less'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    DatePicker,
    Radio,
    Icon,
    Upload,
    Select,
    Checkbox,
    Tabs,
    Modal,
    message
} from 'antd';
import reqwest from 'reqwest';
import TaskResearchService from "../../../services/research/TaskResearchService"

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;
// const QRCode = require('qrcode.react');
//获取url参数
const GetRequest = () => {
    let url = window.location.hash.substr(2); //获取url中"?"符后的字串
    let theRequest = {};
    if (url.indexOf("?") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        strs.map(s => {
            theRequest[s.split("=")[0]] = unescape(s.split("=")[1]);
            return '';
        })
    }
    return theRequest;
};

@Form.create({})
class NewApplicationForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
            checkedMeasure: false,
            checkedResearch: false,
            rsFlag: true,
            accessFlag: false,
            taskType: 0,
            add: false,
            selecttabs: false,
            path: null,
            fileList: [],
            uploading: false,
            userSum: 0,
            taskId: JSON.parse(this.props.match.params.id).id,
            resultDescripe: '共导入0条数据'
        };
        this.delUpload = this.delUpload.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentWillMount() {
        let params = this.props.match ? JSON.parse(this.props.match.params.id) : GetRequest();
        let {id, type} = params;
        if(type === 'edit') {
            TaskResearchService.selectSurveyTaskById({taskId: id}).then(result=>{
                if(result){
                    this.setState({
                        taskType: result.taskType,
                        accessFlag: String(result.taskChannel[0].sampleType) === '2',
                        userSum: result.taskChannel[0].userSum,
                        resultDescripe: `共导入${result.taskChannel[0].userSum}条数据`
                    });
                    this.props.form.setFieldsValue({
                        taskName: result.taskName,
                        surveySdate: moment(result.surveySdate, "YYYY-MM-DD"),
                        surveyEdate: moment(result.surveyEdate, "YYYY-MM-DD"),
                        qstnaireId: result.qstnaireId,
                        qstnaireTitle: result.qstnaireTitle,
                        testNumberList: result.testNumberList.join(','),
                        sampleType: String(result.taskChannel[0].sampleType),
                        sampleSum: result.taskChannel[0].sampleSum,
                        smsWay: String(result.taskChannel[0].smsWay),
                        smsContent: result.taskChannel[0].smsContent,
                    });
                }
            })
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
    selectTab = (show) => {
        if (show) {
            this.setState({selecttabs: true});
        } else {
            this.setState({selecttabs: false});
        }
    };
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return startValue <= moment().endOf('day');
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return endValue >= moment().endOf('day');
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({endOpen: true});
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open});
    };
    accessHandleChange = (value) => {
        if (value === '2') this.setState({accessFlag: true});
        else this.setState({accessFlag: false})

    };
    onMeasure = (e) => {
        this.setState({checkedMeasure: e.target.checked})
    };
    onResearch = (e) => {
        this.setState({checkedResearch: e.target.checked})
    };
    onTrigger = (e) => {
        this.setState({taskType: e.target.checked ? 1 : 0})
    };
    handleChange = (value) => {
        if (value === 2) this.setState({rsFlag: false})
        else this.setState({rsFlag: true})

    };
    info = () => {
        Modal.info({
            title: '',
            content: (
                <div>
                    <p>您好，中国电信目前正在对新入网用户做一项综合满意度调研，希望了解您的意见和建议，点击链接即可参与：{'{'}{'url'}{'}'}，感谢您的支持。 中国电信</p>
                </div>
            ),
            onOk() {
            },
        });
    };
    //删除目标号码
    delUpload = () => {
        TaskResearchService.userTargetDelete({
            "channelType": this.props.form.getFieldValue('taskChannel'),
            "taskId": this.state.taskId
        }).then(result => {
            if (result) {
                this.setState({
                    fileList: [],
                });
            }
        })
    };
    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });
        let channelType = this.props.form.getFieldValue('taskChannel');
        if (!channelType)
            return message.warn("请选择渠道");
        else
            formData.append('channelType', channelType);
        formData.append('taskId', this.state.taskId);
        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: 'surveyTaskMgr/userTargetImport',
            method: 'post',
            processData: false,
            headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('authToken')
            },
            data: formData,
            success: (result) => {
                this.setState({
                    fileList: [],
                    uploading: false,
                    resultDescripe: `共导入${result.data.sumCount}条数据`,
                    userSum: result.data.sumCount
                });
                message.success('上传成功');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('上传失败');
            },
        });
    };
    beforeUpload = (file) => {
        const isType = ((file.type === 'application/msword') || (file.type === 'text/plain') || (file.type === 'application/vnd.ms-excel') || (file.type === 'application/pdf'));
        if (!isType) {
            message.error('文档类型仅支持doc、docx、txt、xls、xlsx、pdf格式');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('文档大小不能超过5M');
        }
        return isType && isLt5M;
    };
    //提交审核
    handleSubmit = (e) => {
        e.preventDefault();
        let isValidate = true;
        if (this.state.taskType !== 1 && this.state.userSum === 0) {
            isValidate = false;
            return message.info('请先上传用户号码')
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                isValidate = false;
            }
        });
        if (isValidate) {
            let formData = this.props.form.getFieldsValue();
            let channelType = this.props.form.getFieldValue('taskChannel');
            formData.userId = String(sessionStorage.getItem('userId'));
            formData.testNumberList = formData.testNumberList.split(',');
            formData.surveySdate = formData.surveySdate.format('YYYY-MM-DD');
            formData.surveyEdate = formData.surveyEdate.format('YYYY-MM-DD');
            formData.taskId = this.state.taskId;
            formData.taskType = this.state.taskType;
            formData.taskChannel = {
                channelType: channelType,
                sampleSum: formData.sampleSum,
                sampleType: formData.sampleType,
                smsContent: formData.smsContent,
                smsWay: formData.smsWay,
                taskId: this.state.taskId,
                userSum: this.state.userSum,
                userType: 0,
            };
            let params = this.props.match ? JSON.parse(this.props.match.params.id) : GetRequest();
            if(params.type === 'edit') {
                TaskResearchService.editSurveyTask(formData).then(result => {
                    if (result) {
                        message.success('编辑成功');
                        this.props.history.push('/missionMgr/missionApplication')
                    }
                })
            } else {
                TaskResearchService.addSurveyTask(formData).then(result => {
                    if (result) {
                        message.success('新增成功');
                        this.props.history.push('/missionMgr/missionApplication')
                    }
                })
            }
        }
    };
    //保存草稿
    handleSave = (e) => {
        e.preventDefault();
        let isValidate = true;
        if (this.state.taskType !== 1 && this.state.userSum === 0) {
            isValidate = false;
            return message.info('请先上传用户号码')
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                isValidate = false;
            }
        });
        if (isValidate) {
            let formData = this.props.form.getFieldsValue();
            let channelType = this.props.form.getFieldValue('taskChannel');
            formData.userId = String(sessionStorage.getItem('userId'));
            formData.testNumberList = formData.testNumberList.split(',');
            formData.surveySdate = formData.surveySdate.format('YYYY-MM-DD');
            formData.surveyEdate = formData.surveyEdate.format('YYYY-MM-DD');
            formData.taskId = this.state.taskId;
            formData.taskType = this.state.taskType;
            formData.taskChannel = {
                channelType: channelType,
                sampleSum: formData.sampleSum,
                sampleType: formData.sampleType,
                smsContent: formData.smsContent,
                smsWay: formData.smsWay,
                taskId: this.state.taskId,
                userSum: this.state.userSum,
                userType: 0,
            };
            let params = this.props.match ? JSON.parse(this.props.match.params.id) : GetRequest();
            if(params.type === 'edit') {
                TaskResearchService.editSurveyTaskToDraft(formData).then(result => {
                    if (result) {
                        message.success('编辑成功');
                        this.props.history.push('/missionMgr/missionApplication')
                    }
                })
            } else {
                TaskResearchService.addSurveyTaskToDraft(formData).then(result => {
                    if (result) {
                        message.success('新增成功');
                        this.props.history.push('/missionMgr/missionApplication')
                    }
                })
            }
        }
    };
    handleReset = () => {
        this.props.history.push('/missionMgr/missionApplication');
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {uploading} = this.state;
        //新增问卷弹框属性传值是否显示弹窗
        const addModalProps = {
            add: this.state.add,
            onClose: () => {
                this.addQuestionaire(false);
            },
            onChoseQuestion: (id, qstnaireTitle) => {
                this.props.form.setFieldsValue({
                    qstnaireId: id,
                    qstnaireTitle,
                });
                this.setState({add: false})
            },
        };
        //新增标签弹窗属性传值是否显示弹窗
        const selectModalProps = {
            selecttabs: this.state.selecttabs,
            onClose: () => {
                this.selectTab(false);
            },
        };
        const uploadProps = {
            action: 'surveyTaskMgr/userTargetImport',
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };

        //触发式调研任务
        const TriggerTask = <div style={{position: 'absolute', right: '20px', top: '-10px'}}>
            <Checkbox onChange={this.onTrigger} checked={this.state.taskType !== 0}
                      style={{display: 'inline'}}>是否触发式任务</Checkbox>
        </div>;
        //调研基本信息
        let baseInfo = (<div>
            <Row style={{background: '#ECECEC', padding: '5px'}}>
                <Col span="24">
                    <span className={'spantitle'}>*</span>
                    调研基本信息
                </Col>
            </Row>
            <Row className={'required'}>
                <FormItem label="调研任务名称：" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                    {getFieldDecorator('taskName', {
                        rules: [{required: true, message: '请输入调研任务名称'}],
                        initialValue: '',
                    })(
                        <Input size="default"/>
                    )}
                    {TriggerTask}
                </FormItem>
            </Row>
            <Row className={'row2'}>
                <Col span='12'>
                    <FormItem label="调研触发时间：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                        {getFieldDecorator('surveySdate', {
                            rules: [{type: 'object', required: true, message: '请选择调研触发时间'}],
                        })(
                            <DatePicker
                                width={'100%'}
                                disabledDate={this.disabledStartDate}
                                showTime={{
                                    hideDisabledOptions: true
                                }}
                                format="YYYY-MM-DD"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="调研结束时间：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                        {getFieldDecorator('surveyEdate', {
                            rules: [{type: 'object', required: true, message: '请选择调研结束时间'}],
                        })(
                            <DatePicker
                                width={'100%'}
                                disabledDate={this.disabledEndDate}
                                showTime={{
                                    hideDisabledOptions: true
                                }}
                                format="YYYY-MM-DD"
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
                    {getFieldDecorator('qstnaireTitle', {
                        rules: [{required: true, message: '请选择调研问卷'}],
                    })(
                        <Input placeholder='点击选择调研问卷' onClick={() => this.addQuestionaire(true)}/>
                    )}
                    {getFieldDecorator('qstnaireId')(
                        <Input hidden/>
                    )}
                </FormItem>
            </Row>
            <Row>
                <FormItem label="测试号码：" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                    {getFieldDecorator('testNumberList', {
                        rules: [{required: true, message: '请输入测试号码'}],
                    })(
                        <Input placeholder="多个号码用英文逗号分隔"/>
                    )}
                </FormItem>
            </Row>
        </div>);
        //调研对象
        // let object = (<div className='object'>
        //     <Row style={{background: '#ECECEC', padding: '5px'}}>
        //         <Col span="24">
        //             <span className={'spantitle'}>*</span>
        //             调研对象
        //         </Col>
        //     </Row>
        //
        // </div>);
        //调研渠道
        let channel = (<div>
            <Row style={{background: '#ECECEC', padding: '5px'}}>
                <Col span="24">
                    <span className={'spantitle'}>*</span>
                    调研渠道
                </Col>
            </Row>
            <Tabs activeKey={'3'} defaultActiveKey="3" onChange={(activeKey) => {
                if (activeKey !== '1')
                    return message.info('待开发')
                this.props.form.setFieldsValue({
                    taskChannel: activeKey,
                });
            }}>
                <TabPane tab={<span><Icon type="qrcode"/>链接与二维码</span>} key="0">
                    {/*<Row className={'row2'}>*/}
                    {/*<Col span='12' className={'select'}>*/}
                    {/*<FormItem label="获取样本方式：" labelCol={{span: 4}} wrapperCol={{span: 12}}>*/}
                    {/*{getFieldDecorator('sampleType', {*/}
                    {/*rules: [{required: true, message: '请选择获取样本方式'}],*/}
                    {/*initialValue: '1',*/}
                    {/*})(*/}
                    {/*<Select onChange={this.accessHandleChange} multiple placeholder="--请选择--"*/}
                    {/*style={{width: '100%'}}>*/}
                    {/*<Option value="1">全量</Option>*/}
                    {/*<Option value="2">抽样</Option>*/}
                    {/*</Select>*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*{!this.state.accessFlag ? <Col span='12' className={'select'}>*/}
                    {/*<FormItem label="抽样数量：" labelCol={{span: 4}} wrapperCol={{span: 12}}>*/}
                    {/*{getFieldDecorator('sampleSum', {*/}
                    {/*rules: [{required: true, message: '请输入抽样数量'}],*/}
                    {/*// initialValue: 'Start',*/}
                    {/*})(*/}
                    {/*<Input/>*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                    {/*</Col> : ''}*/}
                    {/*</Row>*/}
                    {/*<div>*/}
                    {/*<QRCode size={150} value="http://www.baidu.com"/>*/}
                    {/*</div>*/}
                </TabPane>
                <TabPane tab={<span><Icon type="wechat"/>微信发送</span>} key="1">
                    {/*<Row className={'row2'}>*/}
                    {/*<Col span='12' className={'select'}>*/}
                    {/*<FormItem label="获取样本方式：" labelCol={{span: 4}} wrapperCol={{span: 12}}>*/}
                    {/*{getFieldDecorator('sampleType', {*/}
                    {/*rules: [{required: true, message: '请选择获取样本方式'}],*/}
                    {/*})(*/}
                    {/*<Select onChange={this.accessHandleChange} multiple placeholder="--请选择--"*/}
                    {/*style={{width: '100%'}}>*/}
                    {/*<Option value="1">全量</Option>*/}
                    {/*<Option value="2">抽样</Option>*/}
                    {/*</Select>*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*{!this.state.accessFlag ? <Col span='12' className={'select'}>*/}
                    {/*<FormItem label="抽样数量：" labelCol={{span: 4}} wrapperCol={{span: 12}}>*/}
                    {/*{getFieldDecorator('sampleSum', {*/}
                    {/*rules: [{required: true, message: '请输入抽样数量'}],*/}
                    {/*// initialValue: 'Start',*/}
                    {/*})(*/}
                    {/*<Input/>*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                    {/*</Col> : ''}*/}
                    {/*</Row>*/}
                </TabPane>
                <TabPane tab={<span><Icon type="mail"/>邮件发送</span>} key="2">
                    {/*<Row className={'row2'}>*/}
                    {/*<Col span='12' className={'select'}>*/}
                    {/*<FormItem label="获取样本方式：" labelCol={{span: 4}} wrapperCol={{span: 12}}>*/}
                    {/*{getFieldDecorator('sampleType', {*/}
                    {/*rules: [{required: true, message: '请选择获取样本方式'}],*/}
                    {/*})(*/}
                    {/*<Select onChange={this.accessHandleChange} multiple placeholder="--请选择--"*/}
                    {/*style={{width: '100%'}}>*/}
                    {/*<Option value="1">全量</Option>*/}
                    {/*<Option value="2">抽样</Option>*/}
                    {/*</Select>*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*{!this.state.accessFlag ? <Col span='12' className={'select'}>*/}
                    {/*<FormItem label="抽样数量：" labelCol={{span: 4}} wrapperCol={{span: 12}}>*/}
                    {/*{getFieldDecorator('sampleSum', {*/}
                    {/*rules: [{required: true, message: '请输入抽样数量'}],*/}
                    {/*// initialValue: 'Start',*/}
                    {/*})(*/}
                    {/*<Input/>*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                    {/*</Col> : ''}*/}
                    {/*</Row>*/}
                </TabPane>
                <TabPane tab={<span><Icon type="message"/>短信发送</span>} key="3">
                    <Row style={{display: this.state.taskType !== 1 ? 'block' : 'none'}}>
                        <RadioGroup name="radiogroup">
                            {/*<Row>*/}
                            {/*<Col span={1} offset={1}>*/}
                            {/*<FormItem label="" labelCol={{span: 4}} wrapperCol={{span: 20}}>*/}
                            {/*{getFieldDecorator('tagName543', {*/}
                            {/*rules: [{*/}
                            {/*required: true,*/}
                            {/*message: '请选择调研对象',*/}
                            {/*}],*/}
                            {/*initialValue: '',*/}
                            {/*})(*/}
                            {/*<Radio/>*/}
                            {/*)}*/}
                            {/*</FormItem>*/}
                            {/*</Col>*/}
                            {/*<Col span='20'>*/}
                            {/*<FormItem label="选择标签对象：" labelCol={{span: 2}} wrapperCol={{span: 20}}>*/}
                            {/*{getFieldDecorator('tagName1111', {*/}
                            {/*rules: [],*/}
                            {/*initialValue: '',*/}
                            {/*})(*/}
                            {/*<Input placeholder="点击选择标签" onClick={() => this.selectTab(true)}/>*/}
                            {/*)}*/}
                            {/*</FormItem>*/}
                            {/*</Col>*/}
                            {/*</Row>*/}
                            <Row>
                                {/*<Col span={1} offset={1}>*/}
                                {/*<FormItem label="" labelCol={{span: 4}} wrapperCol={{span: 20}}>*/}
                                {/*{getFieldDecorator('tagName', {*/}
                                {/*rules: [{*/}
                                {/*required: true,*/}
                                {/*message: '请选择调研对象',*/}
                                {/*}],*/}
                                {/*initialValue: '',*/}
                                {/*})(*/}
                                {/*<Radio/>*/}
                                {/*)}*/}
                                {/*</FormItem>*/}
                                {/*</Col>*/}
                                <Col span='10' offset={1}>
                                    <FormItem label="手工导入数据:" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                                        {getFieldDecorator('DataName', {})(
                                            <Upload {...uploadProps}>
                                                <Button type="ghost">
                                                    <Icon type="upload"/> 选择文件
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span='2'>
                                    <Button disabled={this.state.fileList.length === 0} loading={uploading}
                                            onClick={this.handleUpload}>{uploading ? '上传中' : '上传'}</Button>
                                </Col>
                                <Col span='2'>
                                    <Button onClick={this.delUpload}>删除目标号码</Button>
                                </Col>
                                <Col span='5' offset={2}>
                                    <a href="../download/whitelist/nps-batch-insert-template-1.xlsx"
                                       target="_blank">下载批量导入模板</a>
                                </Col>
                            </Row>
                            <div className={'ant-col-offset-1'}>{uploading ? '' : this.state.resultDescripe}</div>
                        </RadioGroup>
                    </Row>
                    <Row className={'row2'}>
                        <Col span='12' className={'select'}>
                            <FormItem label="获取样本方式：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('sampleType', {
                                    rules: [{required: true, message: '请选择获取样本方式'}],
                                    initialValue: '1',
                                })(
                                    <Select onChange={this.accessHandleChange} multiple placeholder="--请选择--"
                                            style={{width: '100%'}}>
                                        <Option value="1">全量</Option>
                                        <Option value="2">抽样</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        {this.state.accessFlag ? <Col span='12' className={'select'}>
                            <FormItem label="抽样数量：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('sampleSum', {
                                    rules: [{required: true, message: '请输入抽样数量'}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col> : ''}
                        <Col span='12' className={'select'}>
                            <FormItem label="短信下发方式：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('smsWay', {
                                    rules: [{required: true, message: '请选择短信下发方式'}],
                                })(
                                    <Select placeholder="--请选择--"
                                            style={{width: '100%'}}>
                                        <Option value="">--请选择--</Option>
                                        <Option value="1">短信超链接</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='12' className={'select'}>
                            <FormItem label="短信提示语：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                {getFieldDecorator('smsContent', {
                                    rules: [{required: true, message: '请选择短信提示语'}],
                                })(
                                    <TextArea placeholder="请填写短信提示语"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span='12' className={'select'}>
                            <Button onClick={this.info}>查看短信提示语模板（短信链接请使用{'{'}{'url'}{'}'}代替）</Button>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            <FormItem>
                {getFieldDecorator('taskChannel', {
                    rules: [{required: true, message: '请选择调研渠道',}],
                    initialValue: '3',
                })(
                    <Input type={'hidden'}/>
                )}
            </FormItem>
        </div>);
        //奖励措施
        // let measure = null;
        // if (this.state.checkedMeasure) {
        //     measure = (
        //         <div>
        //             <Row className={'row2'}>
        //                 <Col span='12' className={'select'}>
        //                     <FormItem label="赠费类型：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
        //                         {getFieldDecorator('measureType', {
        //                             rules: [],
        //                             initialValue: " ",
        //                         })(
        //                             <Select multiple placeholder="--请选择--" style={{width: '100%'}}>
        //                                 <Option value="shortmessage">10元赠费</Option>
        //                                 <Option value="wechart">30元赠费</Option>
        //                             </Select>
        //                         )}
        //                     </FormItem>
        //                 </Col>
        //                 <Col span='12' className={'select'}>
        //                     <FormItem label="赠费数量：" labelCol={{span: 4}} wrapperCol={{span: 12}}>
        //                         {getFieldDecorator('measureNumber', {
        //                             rules: [],
        //                             initialValue: " ",
        //                         })(
        //                             <Input size="default"/>
        //                         )}
        //                     </FormItem>
        //                 </Col>
        //             </Row>
        //         </div>)
        // }
        //常态调研
        // let research = null;
        // if (this.state.checkedResearch) {
        //     research = (
        //         <div>
        //             <Row className={'row2'}>
        //                 <Col span='4' className={'select'}>
        //                     <FormItem>
        //                         {getFieldDecorator('researchType', {
        //                             rules: [],
        //                             initialValue: "1",
        //                         })(
        //                             <Select onChange={this.handleChange}>
        //                                 <Option value="1">每月</Option>
        //                                 <Option value="2">每季度</Option>
        //                             </Select>
        //                         )}
        //                     </FormItem>
        //                 </Col>
        //                 {this.state.rsFlag ?
        //                     <div>
        //                         <Col span='12' className={'select'}>
        //                             <FormItem>
        //                                 {getFieldDecorator('measureSelect', {
        //                                     rules: [],
        //                                     initialValue: " ",
        //                                 })(
        //                                     <RadioGroup>
        //                                         <Radio className={'radio'} value={1} disabled>1</Radio>
        //                                         <Radio className={'radio'} value={2} disabled>2</Radio>
        //                                         <Radio className={'radio'} value={3} disabled>3</Radio>
        //                                         <Radio className={'radio'} value={4} disabled>4</Radio>
        //                                         <Radio className={'radio'} value={5} disabled>5</Radio>
        //                                         <Radio className={'radio'} value={6}>6</Radio>
        //                                         <Radio className={'radio'} value={7}>7</Radio>
        //                                         <Radio className={'radio'} value={8}>8</Radio>
        //                                         <Radio className={'radio'} value={9}>9</Radio>
        //                                         <Radio className={'radio'} value={10}>10</Radio>
        //                                         <Radio className={'radio'} value={11}>11</Radio>
        //                                         <Radio className={'radio'} value={12}>12</Radio>
        //                                         <Radio className={'radio'} value={13}>13</Radio>
        //                                         <Radio className={'radio'} value={14}>14</Radio>
        //                                         <Radio className={'radio'} value={15}>15</Radio>
        //                                         <Radio className={'radio'} value={16}>16</Radio>
        //                                         <Radio className={'radio'} value={17}>17</Radio>
        //                                         <Radio className={'radio'} value={18}>18</Radio>
        //                                         <Radio className={'radio'} value={19}>19</Radio>
        //                                         <Radio className={'radio'} value={20}>20</Radio>
        //                                         <Radio className={'radio'} value={21}>21</Radio>
        //                                         <Radio className={'radio'} value={22}>22</Radio>
        //                                         <Radio className={'radio'} value={23}>23</Radio>
        //                                         <Radio className={'radio'} value={24}>24</Radio>
        //                                         <Radio className={'radio'} value={25}>25</Radio>
        //                                         <Radio className={'radio'} value={26}>26</Radio>
        //                                         <Radio className={'radio'} value={27} disabled>27</Radio>
        //                                         <Radio className={'radio'} value={28} disabled>28</Radio>
        //                                         <Radio className={'radio'} value={29} disabled>29</Radio>
        //                                         <Radio className={'radio'} value={30} disabled>30</Radio>
        //                                         <Radio className={'radio'} value={31} disabled>31</Radio>
        //                                     </RadioGroup>
        //                                 )}
        //                             </FormItem>
        //                         </Col>
        //                         <Col span='4' className={'select'}>
        //                             <span>注：按月前后五天不可选择</span>
        //                         </Col>
        //                     </div> : <div>
        //                         <Col span='12' className={'select'}>
        //                             <FormItem>
        //                                 <RadioGroup onChange={this.onChange}>
        //                                     <Radio value={1}>第一月</Radio>
        //                                     <Radio value={2}>第二月</Radio>
        //                                     <Radio value={3}>第三月</Radio>
        //                                 </RadioGroup>
        //                                 <RadioGroup>
        //                                     <Radio className={'radio'} value={1} disabled>1</Radio>
        //                                     <Radio className={'radio'} value={2} disabled>2</Radio>
        //                                     <Radio className={'radio'} value={3} disabled>3</Radio>
        //                                     <Radio className={'radio'} value={4} disabled>4</Radio>
        //                                     <Radio className={'radio'} value={5} disabled>5</Radio>
        //                                     <Radio className={'radio'} value={6}>6</Radio>
        //                                     <Radio className={'radio'} value={7}>7</Radio>
        //                                     <Radio className={'radio'} value={8}>8</Radio>
        //                                     <Radio className={'radio'} value={9}>9</Radio>
        //                                     <Radio className={'radio'} value={10}>10</Radio>
        //                                     <Radio className={'radio'} value={11}>11</Radio>
        //                                     <Radio className={'radio'} value={12}>12</Radio>
        //                                     <Radio className={'radio'} value={13}>13</Radio>
        //                                     <Radio className={'radio'} value={14}>14</Radio>
        //                                     <Radio className={'radio'} value={15}>15</Radio>
        //                                     <Radio className={'radio'} value={16}>16</Radio>
        //                                     <Radio className={'radio'} value={17}>17</Radio>
        //                                     <Radio className={'radio'} value={18}>18</Radio>
        //                                     <Radio className={'radio'} value={19}>19</Radio>
        //                                     <Radio className={'radio'} value={20}>20</Radio>
        //                                     <Radio className={'radio'} value={21}>21</Radio>
        //                                     <Radio className={'radio'} value={22}>22</Radio>
        //                                     <Radio className={'radio'} value={23}>23</Radio>
        //                                     <Radio className={'radio'} value={24}>24</Radio>
        //                                     <Radio className={'radio'} value={25}>25</Radio>
        //                                     <Radio className={'radio'} value={26}>26</Radio>
        //                                     <Radio className={'radio'} value={27} disabled>27</Radio>
        //                                     <Radio className={'radio'} value={28} disabled>28</Radio>
        //                                     <Radio className={'radio'} value={29} disabled>29</Radio>
        //                                     <Radio className={'radio'} value={30} disabled>30</Radio>
        //                                     <Radio className={'radio'} value={31} disabled>31</Radio>
        //                                 </RadioGroup>
        //                             </FormItem>
        //                         </Col>
        //                         <Col span='4' className={'select'}>
        //                             <span>注：按月前后五天不可选择</span>
        //                         </Col>
        //                     </div>}
        //             </Row>
        //         </div>)
        // }

        return (
            <div className={'newApplicationForm'}>
                <Form layout={'horizontal'} className="ant-advanced-search-form">
                    {baseInfo}
                    {/*{object}*/}
                    {channel}
                    {/*<Row style={{background: '#ECECEC', padding: '5px'}}>*/}
                    {/*<Col span="24">*/}
                    {/*<Checkbox onChange={this.onMeasure} checked={this.state.checkedMeasure}>奖励措施</Checkbox>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    {/*{measure}*/}
                    {/*<Row style={{background: '#ECECEC', padding: '5px', marginTop: '20px'}}>*/}
                    {/*<Col span="24">*/}
                    {/*<Checkbox onChange={this.onResearch} checked={this.state.checkedResearch}>常态调研</Checkbox>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    {/*{research}*/}
                    {/*<Row style={{background: '#ECECEC', padding: '5px', marginTop: '20px'}}>*/}
                    {/*<Col span="24">*/}
                    {/*<span className={'spantitle'}>*</span>*/}
                    {/*上传客服文档*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*<Col span='24' style={{paddingTop: '20px', paddingLeft: '50px'}}>*/}
                    {/*<Upload*/}
                    {/*action="//jsonplaceholder.typicode.com/posts/"*/}
                    {/*beforeUpload={this.beforeUpload}*/}
                    {/*>*/}
                    {/*<Button type="ghost">*/}
                    {/*<Icon type="upload"/> 选择文件*/}
                    {/*</Button>*/}
                    {/*</Upload>*/}
                    {/*（文档类型仅支持doc、docx、txt、xls、xlsx、pdf格式，且大小不能超过5M）*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    <Row style={{paddingTop: '10px'}}>
                        <FormItem wrapperCol={{span: 12, offset: 6}} style={{textAlign: 'center'}}>
                            <Button type="primary" onClick={this.handleSave}>保存草稿(save)</Button>
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

}

export default NewApplicationForm;















