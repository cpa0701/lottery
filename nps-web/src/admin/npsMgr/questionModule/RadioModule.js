import React, {PureComponent} from 'react';
import {Radio, Input, Icon} from 'antd';

const RadioGroup = Radio.Group;

//单选
export default class RadioModule extends PureComponent {
    render() {
        const {index, questionName, optionList, isView, onChange, value} = this.props;
        const optionLIst = optionList.map((item) => {
            return <Radio className="optionInput" style={optionList.length > 3 ? {
                display: 'block',
                height: '34px',
                lineHeight: '34px',
                marginLeft: '20px'
            } : {marginLeft: '20px'}} questionIndex={index} value={item.optionOrder} key={item.optionOrder}
                          logicList={item.logicList}>{isView ? item.optionName :
                <span>
                                <Input defaultValue={item.optionName}
                                       onBlur={(e) => this.props.optionNameBlur(e, item.optionOrder)}/>
                                <Icon type="delete" title="删除"
                                      onClick={(e) => this.props.optionDelete(item.optionOrder)}/>
                            </span>
            }</Radio>;
        });

        return (
            <div style={{padding: '12px'}} className={'radio-module'}>
                <h3>{index}、{isView ? questionName : <Input className="titleInput" defaultValue={questionName}
                                                            onBlur={(e) => this.props.questionNameBlur(e, index)}/>}</h3>
                <RadioGroup onChange={onChange} defaultValue={value}>
                    {optionLIst}
                </RadioGroup>
            </div>
        );
    }
}