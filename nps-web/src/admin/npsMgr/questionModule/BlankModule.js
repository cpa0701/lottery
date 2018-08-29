import {Input} from 'antd';
import {PureComponent} from "react";
import React from 'react';

const {TextArea} = Input;
//单项填空
export default class BlankModule extends PureComponent {
    render() {
        const {index, questionName, optionList, isView, questionNameBlur, onChange, isBlank, jumpDescribe = null, connDescribe = null, infoView} = this.props;
        return (
            <div className={'radio-module'} style={{padding: '12px'}}>
                <h3>{index}、{isView ? questionName :
                    <Input className="titleInput" defaultValue={questionName}
                           onBlur={(e) => questionNameBlur(e, index)}/>}
                </h3>
                <TextArea className="textAreaInput" questionindex={index} isblank={isBlank} onBlur={onChange}
                          // defaultValue={optionList}
                          autosize={{minRows: 3, maxRows: 6}}/>
                {infoView ? <div style={{display: 'inline-block', marginLeft: '8px', marginTop: '5px', color: '#efa030'}}>{jumpDescribe ? "* " + jumpDescribe : ''}  {connDescribe ? "*" + connDescribe : ''}</div> : ''}
            </div>
        );
    }
}