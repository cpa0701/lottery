import React, {Component} from 'react';
import {Modal, Form,Select,Button} from 'antd';
import InitQuestionList from './InitQuestionList'
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
export default class extends Component {
    state = {
        value:0,
        question:[],
    };
    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }

        });
        this.props.onClose()
    };
    afterClose = () => this.props.form.resetFields();
    handleChange=(value)=>{
        let question = this.props.connList.filter(item => item.questionId === value);
        this.setState({
            value: 1,
            question,
        });
    };
    render() {
        const {conn,record,connList, form: {getFieldDecorator}} = this.props;
        const optionList = connList.map((item) => {
            return  <Option key={item.questionId} value={item.questionId}>{item.questionName}</Option>
        });

        return(
            <Modal
                width={800}
                maskClosable={true}
                visible={conn}
                onOk={this.onSubmit}
                onCancel={() => this.props.onClose()}
                afterClose={this.afterClose}
                footer={[
                    <Button key="submit" type="primary" icon="check-circle-o" onClick={this.onSubmit}>确定</Button>,
                ]}
            >
                <form>
                    <h2>当前题目：{record.questionName}</h2>
                    <h2>关联题目1：
                        <Select defaultValue="请选择关联的题目" style={{ width: 220 }} onChange={this.handleChange} >
                            {optionList}
                    </Select>
                    </h2>
                    <div>{(this.state.value===1)?<div>
                            当关联题目选择下面的选项<br/>
                        {this.state.question.map((item,i) => {
                            return(
                        <InitQuestionList questionType={item.questionType} questionId={item.questionId} key={item.questionId} index={i+1} questionName={item.questionName} optionList={item.optionList}/>
                            )})}
                        中的任意一个时，"当前题目"才出现

                    </div>:''}</div>
                </form>
            </Modal>
        )
    }
}
