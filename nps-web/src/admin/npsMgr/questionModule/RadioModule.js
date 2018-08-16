import React, {PureComponent} from 'react';
import {Radio, Input} from 'antd';

const RadioGroup = Radio.Group;

//单选
export default class RadioModule extends PureComponent {
    render() {
        const {index, questionName, optionList, isView,questionNameBlur,optionNameBlur,onChange} = this.props;

        const optionLIst = optionList.map((item) => {
            return <Radio style={optionList.length > 3 ? {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
                marginLeft: '20px'
            } : {marginLeft: '20px'}} value={item.optionId} key={item.optionOrder}
                          setupQuestionId={item.setupQuestionId}
                          skiptoQuestionId={item.skiptoQuestionId}>{isView ? item.optionName :
                <Input defaultValue={item.optionName} onBlur={optionNameBlur}/>}</Radio>;
        });

        return (
            <div style={{padding: '5px'}} className={'radio-module'}>
                <h3>{index+1}、{isView ? questionName : <Input defaultValue={questionName} onBlur={questionNameBlur}/>}</h3>
                <RadioGroup onChange={onChange}>
                    {optionLIst}
                </RadioGroup>
            </div>
        );
    }
}