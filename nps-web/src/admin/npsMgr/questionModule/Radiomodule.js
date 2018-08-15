import React, { PureComponent } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

//单选
export default class RadioModule extends PureComponent {
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const {index, title, option, value} = this.props;

        const items = option.map((item, key) => {
            return <Radio style={{display: 'block',height: '30px',lineHeight: '30px', marginLeft: '20px'}} value={key} key={key}>{item}</Radio>;
        });

        return (
            <div style={{padding: '5px'}}>
                <h3>{index}.{title}</h3>
                <RadioGroup value={value} onChange={this.onChange}>
                    {items}
                </RadioGroup>
            </div>
        );
    }
}