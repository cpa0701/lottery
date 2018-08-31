/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {RadioModule} from "../questionModule/QuestionModules"
// import {CheckboxModule} from "../questionModule/QuestionModules"
import {BlankModule} from "../questionModule/QuestionModules"
import CheckboxGroupModule from "../questionModule/CheckboxGroupModule"


class InitQuestionList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            questionType, index, questionName, optionList, isPaging, isBlank, display, isShowTip,
            questionNameBlur, optionNameBlur, onRadioChange, onCheckBoxChange, onBlankChange, belongToPage, pageCount
        } = this.props;
        //定义此题是否显示（分页比显示，被跳题>被跳过的题>被关联的题>首次被关联默认隐藏的题)
        const show = isPaging === 1 ? 'block' : (display ? 'block' : 'none');
        let dom = '';
        switch (questionType) {
            case '00':
                dom = `${belongToPage}/${pageCount}页`;
                break;
            case '01':
                dom = <RadioModule questionName={questionName} index={index} isBlank={isBlank}
                                   optionList={optionList} onChange={onRadioChange}
                                   questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}
                                   isView={true}/>
                break;
            case '02':
                dom =<CheckboxGroupModule questionName={questionName} index={index} isBlank={isBlank}
                                      optionList={optionList} onChange={onCheckBoxChange}
                                      questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}/>
                break;
            case '03':
            case '04':
                dom = <BlankModule questionName={questionName} index={index} isBlank={isBlank}
                                   onChange={onBlankChange} isView={true}/>
                break;
        }
        let tipContent='请选择选项';
        if(questionType==='03'||questionType==='04'){
            tipContent='请输入文字'
        }
        return (<div
            style={{display: show, border: isShowTip ? "1px dashed rgb(222, 103, 82)" : 0}}
            className={`${isPaging === 1 ? 'paging' : 'questionList'}`}>
            {dom}
            {isPaging === 1 ? '' : (isBlank === 1 ? <span className="req">*</span> : '')}
            {isShowTip ? <div className={'errorMessage'}>{tipContent}</div> : ''}
        </div>);
    }
}

export default InitQuestionList;