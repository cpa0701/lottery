/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Radio, Checkbox, Input} from "antd"

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {RadioModule} from "../questionModule/QuestionModules"
import {CheckboxModule} from "../questionModule/QuestionModules"
import {BlankModule} from "../questionModule/QuestionModules"


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
        const { index, isLib, onRadioChange, onCheckBoxChange, question } = this.props;
        let dom = '';
        switch (question.questionType) {
            case '01':
                dom = <RadioModule questionName={question.questionName} index={index} value={question.value} optionList={question.optionList} onChange={onRadioChange} isView={true}/>;
                break;
            case '02':
                dom = <CheckboxModule questionName={question.questionName} index={index} optionList={question.optionList} onChange={onCheckBoxChange} isView={true}/>;
                break;
            case '03':
                dom = <BlankModule questionName={question.questionName} index={index} optionList={question.optionList} isView={true}/>;
                break;
            case '04':
                dom = <BlankModule questionName={question.questionName} index={index} optionList={question.optionList} isView={true}/>;
                break;
        }
        return (<div onClick={this.getDom} className={'questionList'}>
            {isLib ? <span>{index + 1}.{question.questionName}</span> : ''}
            {isLib ? '' : (<div>
                {dom}
            </div>)}
        </div>);
    }
}

export default InitQuestionList;