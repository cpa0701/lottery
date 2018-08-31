import React, {PureComponent} from 'react';
import {Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;
//多选
export default class CheckboxGroupModule extends PureComponent {
    render() {
        const {index, questionName, optionList, onChange, jumpDescribe = null, connDescribe = null, infoView} = this.props;

        const optionLIst = optionList.map((item, key) => {
            return <Checkbox className="optionInput" style={optionList.length > 3 ? {
                display: 'block',
                height: '34px',
                lineHeight: '34px',
                marginLeft: '20px'
            } : {marginLeft: '20px'}}
                             value={item.optionOrder} key={item.optionOrder}>
                {item.optionName}
            </Checkbox>;
        });

        return (
            <div style={{padding: '12px'}} className={'radio-module'}>
                <h3>{index}、[多选题]{questionName}</h3>
                <CheckboxGroup onChange={(checkList) => {
                    onChange(index, checkList)
                }}>
                    {optionLIst}
                </CheckboxGroup>
                <br/>{infoView ? <div style={{display: 'inline-block', marginLeft: '8px', marginTop: '5px', color: '#efa030'}}>{jumpDescribe ? "* " + jumpDescribe : ''}  {connDescribe ? "*" + connDescribe : ''}</div> : ''}
            </div>
        );
    }
}