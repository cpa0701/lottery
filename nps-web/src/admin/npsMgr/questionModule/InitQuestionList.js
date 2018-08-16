/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Radio, Checkbox, Input} from "antd"

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {RadioModule} from "../questionModule/QuestionModules"


class InitQuestionList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onRadioChange = (e) => {
    }

    render() {
        const {type, index, questionName, optionList, isSetup, questionNameBlur, optionNameBlur} = this.props;
        let dom = '';
        switch (type) {
            case 'radio':
                dom = <RadioModule questionName={questionName} index={index}
                                   optionList={optionList} onChange={this.onRadioChange}
                                   questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}
                                   isView={true}/>
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
        return (<div style={{display: isSetup ? 'block' : 'none'}} className={'questionList'}>
            {dom}
        </div>);
    }
}

export default InitQuestionList;