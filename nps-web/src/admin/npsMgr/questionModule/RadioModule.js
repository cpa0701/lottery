import React, {PureComponent} from 'react';
import {Radio} from 'antd';

const RadioGroup = Radio.Group;

//单选
export default class RadioModule extends PureComponent {
    render() {
        const {index, questionName, optionList} = this.props;

        const optionLIst = optionList.map((item) => {
            return <Radio style={optionList.length > 3 ? {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
                marginLeft: '20px'
            } : {marginLeft: '20px'}} value={item.optionId} key={item.optionOrder}
                          setupQuestionId={item.setupQuestionId}
                          skiptoQuestionId={item.skiptoQuestionId}>{item.optionName}</Radio>;
        });

        return (
            <div style={{padding: '5px'}}>
                <h3>{index}、{questionName}</h3>
                <RadioGroup onChange={this.props.onChange}>
                    {optionLIst}
                </RadioGroup>
            </div>
        );
    }
}