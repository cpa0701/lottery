import {Input,Button,Tooltip} from 'antd';
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
                    <Tooltip title="填空符用连续3个下划线表示，填空长度跟下划线的个数相关。点击按钮可在光标处插入填空符。">
                    <Button className={'blank-btn'} type="primary">插入填空符</Button>
                    </Tooltip>
                </h3>

                <TextArea className="textAreaInput" onBlur={onChange} defaultValue={optionList[0].optionName} autosize={{ minRows: 3, maxRows: 6 }}/>
            </div>
        );
    }
}