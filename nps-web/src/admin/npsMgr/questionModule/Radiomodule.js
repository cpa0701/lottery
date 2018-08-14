import {Radio} from 'antd';
import {PureComponent} from "react";
import React from 'react';
const RadioGroup = Radio.Group;

//单选
export default class Radiomodule extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            value:0,
            id:props.id,
            title:props.title,
            num:props.num,
            options:props.options,
        }
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        var items = [];
        for (var i = 0; i < this.state.num; i++) {
            items.push( <Radio style={radioStyle} value={i}>{this.state.options[i]}</Radio>);
        }
        return (
            <div>
                <h3>{this.state.id}.{this.state.title}</h3>
                <RadioGroup value={this.state.value} onChange={this.onChange}>
                    {items}
                </RadioGroup>
            </div>
        );
    }
}