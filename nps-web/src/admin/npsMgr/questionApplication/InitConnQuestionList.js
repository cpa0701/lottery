import React from 'react';
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
    };

    render() {
        const { index, onCheckBoxChange, question, infoView = false } = this.props;
        let dom = '';
        switch (question.questionType) {
            case '01':
            case '02':
                dom = <CheckboxModule questionName={question.questionName} index={index} connDescribe={question.connDescribe} jumpDescribe={question.jumpDescribe} optionList={question.optionList} onChange={onCheckBoxChange} isView={true} infoView={infoView}/>;
                break;
            case '03':
                dom = <BlankModule questionName={question.questionName} connDescribe={question.connDescribe} jumpDescribe={question.jumpDescribe} index={index} optionList={question.optionList} isView={true} infoView={infoView}/>;
                break;
            case '04':
                dom = <BlankModule questionName={question.questionName} connDescribe={question.connDescribe} jumpDescribe={question.jumpDescribe} index={index} optionList={question.optionList} isView={true} infoView={infoView}/>;
                break;
            default:
                dom = <div/>
        }
        return (<div onClick={this.getDom} className={'questionList'}>
           <div>
                {dom}
            </div>
        </div>);
    }
}

export default InitQuestionList;