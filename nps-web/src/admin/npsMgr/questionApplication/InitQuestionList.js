/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Radio, Checkbox, Input} from "antd"

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"

const RadioGroup = Radio.Group;

class InitQuestionList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getDom = this.getDom.bind(this);
    }

    getDom = (e) => {
        // 阻止合成事件间的冒泡
        e.stopPropagation();
        if (this.props.getDom)
            this.props.getDom(this.props.type)
    }

    render() {
        const {type, index} = this.props
        let dom = '';
        switch (type) {
            case 'radio':
                dom = <RadioGroup>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </RadioGroup>;
                break;
            case 'checkbox':
                dom = <Checkbox.Group
                    style={{width: '100%'}}>
                    <Row>
                        <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                        <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                        <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                        <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                        <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                    </Row>
                </Checkbox.Group>
                break;
            case 'blank':
                dom = <Input placeholder="Basic usage"/>
                break;
        }
        return (<div onClick={this.getDom} className={'questionList'}>
            <span>{index + 1}</span>
            <div>
                {dom}
            </div>
        </div>);
    }
}

export default InitQuestionList;