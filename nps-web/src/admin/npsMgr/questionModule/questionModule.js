/* eslint-disable react/react-in-jsx-scope */
/**
 * Create by chenpengan on 2018/8/14
 */
import { Radio} from 'antd';
import {PureComponent} from "react";
import React from 'react';
const RadioGroup = Radio.Group;
 //单选
export default class Radiomodule extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            value:1,
            id:props.id,
            title:props.title,
            optionA:props.optionA,
            optionB:props.optionB
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
        return (
            <div>
                <h3>{this.state.id}.{this.state.title}</h3>
            <RadioGroup value={this.state.value} onChange={this.onChange}>
                <Radio style={radioStyle} value={1}>{this.state.optionA}</Radio>
                <Radio style={radioStyle} value={2}>{this.state.optionB}</Radio>
            </RadioGroup>
            </div>
        );
    }
}

//多选

//单项填空

//多项填空
