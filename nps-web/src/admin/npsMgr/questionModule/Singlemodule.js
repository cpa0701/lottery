import {Input} from 'antd';
import {PureComponent} from "react";
import React from 'react';
const { TextArea } = Input;
//单项填空
export default class Singlemodule extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            id:props.id,
            title: props.title ? props.title : '单项填空题标题',
        }
    }
    render() {
        return (
            <div>
                <h3>{this.state.id}.{this.state.title}</h3>
                    <TextArea style={{ width: '60%' }} autosize />
            </div>
        );
    }
}