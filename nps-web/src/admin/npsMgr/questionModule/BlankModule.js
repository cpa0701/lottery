import {Input} from 'antd';
import {PureComponent} from "react";
import React from 'react';

const {TextArea} = Input;
//单项填空
export default class BlankModule extends PureComponent {
    render() {
        const {index, questionName, optionList, isView, questionNameBlur, onChange} = this.props;
        return (
            <div className={'radio-module'} style={{padding: '12px'}}>
                <h3>{index}、{isView ? questionName :
                    <Input className="titleInput" defaultValue={questionName} onBlur={(e) => this.props.questionNameBlur(e, index)}/>}
                </h3>
                <TextArea className="textAreaInput" onBlur={onChange} defaultValue={optionList[0].optionName} autosize={{ minRows: 3, maxRows: 6 }}/>
            </div>
        );
    }
}