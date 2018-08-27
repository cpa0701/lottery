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
    }

    render() {
        const {
            questionType, index, questionName, optionList, isSetup, isShow, isPaging, jumped, isJump,
            questionNameBlur, optionNameBlur, onRadioChange, onCheckBoxChange, onBlankChange, belongToPage
        } = this.props;
        let dom = '';
        switch (questionType) {
            case '00':
                dom = `第${belongToPage}页`;
                break;
            case '01':
                dom = <RadioModule questionName={questionName} index={index}
                                   optionList={optionList} onChange={onRadioChange}
                                   questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}
                                   isView={true}/>
                break;
            case '02':
                dom = <CheckboxModule questionName={questionName} index={index}
                                      optionList={optionList} onChange={onCheckBoxChange}
                                      questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}
                                      isView={true}/>
                break;
            case '03':
                dom = <BlankModule questionName={questionName} index={index}
                                   onChange={onBlankChange} isView={true}/>
                break;
        }
        return (<div
            style={{display: isPaging === '1' ? 'block' : (isJump ? 'block' : (jumped ? "none" : (isShow ? 'block' : (isSetup ? 'none' : 'block'))))}}
            className={`${isPaging === '1' ? 'paging' : 'questionList'}`}>
            {dom}
        </div>);
    }
}

export default InitQuestionList;