import React from 'react';
import { Row, Col, Form, Select, Input, Button } from "antd";

import ReQuestionaire from '../../missionMgr/missionApplication/modal/ReQuestionaire';
import SurveyModule from './modal/SurveyModule';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create({})
class AnalysisResult extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            areaId: '00',
            taskType: 0,
            qstnaireId: '',
            selecttabs: false,
            add: false,
        };
    }

    //点击选择问卷弹框
    selectQuestion = (show) => {
        if (show) {
            this.setState({add: true});
        } else {
            this.setState({add: false});
        }
    };

    //城市
    handleChange = (value) => {
        this.setState({areaId: value})
    };
    //触发式调研任务
    handleChangeTask = (value) => {
        if(value) {
            this.setState({taskType: Number(value)})
        } else {
            this.setState({taskType: null})
        }
    };

    onRef = (ref) => {
        this.chart = ref;
    };

    search = (e) => {
        let params = {
            areaId: this.state.areaId,
            qstnaireId: this.state.qstnaireId,
            taskType: Number(this.state.taskType)
        };
        this.chart.getData(params)
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        //是否显示新增问卷弹框
        const selectModalProps = {
            add: this.state.add,
            onClose: () => {
                this.selectQuestion(false);
            },
            onChoseQuestion: (id, qstnaireTitle) => {
                this.props.form.setFieldsValue({
                    qstnaireId: id,
                    qstnaireTitle
                });
                this.setState({add: false, qstnaireId: id})
            },
        };

        return (
            <div>
                <Row>
                    <Form>
                        <Col span='6'>
                            <FormItem label="调研城市" labelCol={{span: 10}} wrapperCol={{span: 10}}>
                                <Select defaultValue="全市" onChange={this.handleChange}>
                                    <Option value="00">全市</Option>
                                    <Option value="01">渝北</Option>
                                    <Option value="02">九龙坡</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='6'>
                            <FormItem label="问卷名称" labelCol={{span: 10}} wrapperCol={{span: 14}}>
                                {getFieldDecorator('qstnaireTitle', {
                                    rules: [{required: true, message: '请选择调研问卷'}],
                                })(
                                <Input placeholder='点击选择调研问卷' onClick={() => this.selectQuestion(true)}/>
                                )}
                            </FormItem>
                            {getFieldDecorator('qstnaireId', {
                            })(
                                <Input hidden/>
                            )}
                        </Col>
                        <Col span='6'>
                            <FormItem label="任务类型" labelCol={{span: 10}} wrapperCol={{span: 14}}>
                                <Select defaultValue={0} onChange={this.handleChangeTask}>
                                    <Option value={0}>调研任务</Option>
                                    <Option value={1}>触发式调研任务</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span='4' offset='1'>
                            <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                            {/*<Button htmlType="submit" style={{marginLeft: '10px'}}>导出</Button>*/}
                        </Col>
                    </Form>
                </Row>
                <SurveyModule onRef={this.onRef} height={500}/>
                <ReQuestionaire {...selectModalProps}/>
            </div>

        );
    }
}

export default AnalysisResult;
