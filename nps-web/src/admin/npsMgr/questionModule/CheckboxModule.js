import React,{PureComponent} from 'react';
import { Checkbox, Input, Icon } from 'antd';

//多选
export default class CheckboxModule extends PureComponent {
    render() {
        const {index, questionName, optionList, isView, onChange} = this.props;

        const optionLIst = optionList.map((item, key) => {
            return <Checkbox onChange={onChange} className="optionInput" style={optionList.length > 3 ? {
                display: 'block',
                height: '34px',
                lineHeight: '34px',
                marginLeft: '20px'
            } : {marginLeft: '20px'}}
                             questionIndex={index} value={item.optionOrder} key={item.optionOrder}
                             logicList={item.logicList}>{isView ? item.optionName :
                            <span>
                                <Input defaultValue={item.optionName} onBlur={(e) => this.props.optionNameBlur(e, item.optionOrder)}/>
                                <Icon type="delete" title="删除" onClick={(e) => this.props.optionDelete(item.optionOrder)}/>
                            </span>
                             }</Checkbox>;
        });

        return (
            <div style={{padding: '12px'}}  className={'radio-module'}>
                <h3>{index}、[多选题]{isView ? questionName :
                    <Input className="titleInput" defaultValue={questionName} onBlur={(e) => this.props.questionNameBlur(e, index)}/>}</h3>
                    {optionLIst}
            </div>
        );
    }
}