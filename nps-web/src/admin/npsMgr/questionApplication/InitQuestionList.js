/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Radio, Checkbox, Input} from "antd"

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import QuestionModules from "../questionModule/QuestionModules"

const Radiomodule = QuestionModules.Radiomodule;

class InitQuestionList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getDom = this.getDom.bind(this);
    }

    getDom = (e) => {
        // 阻止合成事件间的冒泡
        e.stopPropagation();
        if (this.props.getDom)
            this.props.getDom(this.props)
    }

    render() {
        const {type, index, title, isLib} = this.props
        let dom = '';
        switch (type) {
            case 'radio':
                dom = <Radiomodule title={title} index={index} option={['测试1', "测试2"]}/>
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
            {isLib ? <span>{index + 1}.{title}</span> : ''}
            {isLib ? '' : (<div>
                {dom}
            </div>)}
        </div>);
    }
}

export default InitQuestionList;