import React from 'react';
import {
    Form,
    Input,
    Row,
    Col,
    Select,
    Modal,
    Button,
    message
} from 'antd';

import '../missionApplication/NewApplicationForm.less'
import TaskResearchService from "../../../services/research/TaskResearchService";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create({})
class ReviewForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submitBtn: false,
            loading: false,
            accessFlag: false
        };
    }

    // 选择测试结果
    accessHandleChange = (value) => {
        if (value === '0') this.setState({accessFlag: true});
        else this.setState({accessFlag: false})

    };

    // 开始测试
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
               return '';
            }
            delete values.taskName;
            delete values.taskStatus;
            delete values.isSuccee;
            this.setState({
                loading: true
            }, () => TaskResearchService.testPublishSurveyTask(values).then(result => {
                if(result) {
                    this.setState({
                        submitBtn: true,
                        loading: false
                    });
                    this.props.form.setFieldsValue({
                        taskStatus: '号码已提交，测试中'
                    });
                }
            }))
        });
    };

    // 内测并发布
    publicTask = (id, type) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return '';
            }
            let params = {
                channelType: String(type),
                taskId: id,
                isSuccee: values.isSuccee
            };
            TaskResearchService.publicTask(params).then(result => {
                if(result.code === 1) {
                    message.success('已内测发布完成');
                    this.setState({loading: false});
                    this.props.close();
                } else {
                    message.success(result.desInfo);
                }
            })
        })
    };

    afterClose = () => {
        this.props.form.resetFields();
    };

    render() {
        const { submitBtn, accessFlag } = this.state;
        const {show, props, form: { getFieldDecorator }} = this.props;

        return (
            <Modal
                title="调研测试并发布"
                width={600}
                height={800}
                maskClosable={false}
                visible={show}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
                footer={[
                    <Button key="submit" onClick={() => this.props.onClose()}>关闭</Button>,
                ]}
            >
                <div className={'newApplicationForm'} style={{paddingTop: 0, borderTop: 'none'}}>
                    <Form layout={'horizontal'} className="ant-advanced-search-form">
                        <Row className={'required'}>
                            <FormItem label="调研任务ID：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('taskId', {
                                    initialValue: props.taskId,
                                })(
                                    <Input size="default" disabled/>
                                )}
                            </FormItem>
                            {getFieldDecorator('channelType', {
                                initialValue: props.taskChannel ? props.taskChannel[0].channelType : '',
                            })(
                                <Input size="default" hidden/>
                            )}
                        </Row>
                        <Row className={'required'}>
                            <FormItem label="调研任务名称：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('taskName', {
                                    initialValue: props.taskName,
                                })(
                                    <Input size="default" disabled/>
                                )}
                            </FormItem>
                        </Row>
                        <Row className={'required'}>
                            <FormItem label="测试号码输入" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('testNumberList', {
                                    rules: [{required: true, message: '请输入测试号码,多个号码用英文逗号隔开'}],
                                    initialValue: props.testNumberList ? props.testNumberList.join(',') : '',
                                })(
                                    <Input size="default" />
                                )}
                            </FormItem>
                        </Row>
                        <Row className={'required'}>
                            <FormItem label="调研测试状态：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                {getFieldDecorator('taskStatus', {
                                    initialValue: '请确保信息完整，并点击开始测试',
                                })(
                                    <Input size="default" disabled/>
                                )}
                            </FormItem>
                        </Row>
                        { props.taskType === 0 && accessFlag ?
                                <Row className={'required'}>
                                    <FormItem label="测试结果：" labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                        {getFieldDecorator('isSuccee', {
                                            rules: [{required: true, message: '请选择测试结果'}],
                                        })(
                                            <Select onChange={this.accessHandleChange} multiple placeholder="--请选择--"
                                                    style={{width: '100%'}}>
                                                <Option value="0">通过</Option>
                                                <Option value="1">未通过</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Row>
                                : ''
                        }
                        <Row style={{paddingTop: '10px', textAlign: 'center'}}>
                            <Button type="primary" onClick={this.onSubmit} disabled={submitBtn}>开始测试</Button>
                            &nbsp;&nbsp;&nbsp;
                            {
                                accessFlag ? <Button type="primary" onClick={() => this.publicTask(props.taskId, props.channelType)}>提交并发布</Button>
                                    : ''
                            }
                        </Row>
                    </Form>
                </div>
            </Modal>
        )
    }

}

export default ReviewForm;















