import {Input} from 'antd';
import {PureComponent} from "react";
import React from 'react';

const {TextArea} = Input;
//单项填空
export default class BlankModule extends PureComponent {

    render() {
        const {index, questionName, optionList, isView, questionNameBlur, onChange} = this.props;
        return (
            <div>
                <h3>{index + 1}、{isView ? questionName :
                    <Input defaultValue={questionName} onBlur={questionNameBlur}/>}</h3>
                <TextArea onBlur={onChange} defaultValue={optionList[0].optionName} autosize={{ minRows: 2, maxRows: 6 }}/>
            </div>
        );
    }
}