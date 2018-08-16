import React,{PureComponent} from 'react';
import {Checkbox, Input} from 'antd';

//多选
export default class CheckboxModule extends PureComponent {

    render() {
        const {index, questionName, optionList, isView, questionNameBlur, optionNameBlur, onChange} = this.props;

        const optionLIst = optionList.map((item, key) => {
            return <Checkbox style={optionList.length > 3 ? {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
                marginLeft: '20px'
            } : {marginLeft: '20px'}}
                             value={item.optionId} key={item.optionOrder}>{isView ? item.optionName :
                <Input defaultValue={item.optionName} onBlur={optionNameBlur}/>}</Checkbox>;
        });

        return (
            <div style={{padding: '5px'}}>
                <h3>{index + 1}、{isView ? questionName :
                    <Input defaultValue={questionName} onBlur={questionNameBlur}/>}[多选题]</h3>
                <Checkbox.Group onChange={onChange}>
                    {optionLIst}
                </Checkbox.Group>
            </div>
        );
    }
}