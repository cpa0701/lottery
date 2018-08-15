import React, { PureComponent } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

//单选
export default class RadioModule extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            value: 0,
            id: props.id,
            title: props.title ? props.title : '单选题标题',
            option: props.option ? props.option : ['选项1', '选项2']
        }
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {id, title, option, value} = this.state;

        const items = option.map((item, key) => {
            return <Radio style={{display: 'block',height: '30px',lineHeight: '30px', marginLeft: '20px'}} value={key} key={key}>{item}</Radio>;
        });

        return (
            <div style={{padding: '5px'}}>
                <h3>{id}、{title}</h3>
                <RadioGroup value={value} onChange={this.onChange}>
                    {items}
                </RadioGroup>
            </div>
        );
    }
}