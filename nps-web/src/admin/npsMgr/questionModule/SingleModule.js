import {Input} from 'antd';
import {PureComponent} from "react";
import React from 'react';
const { TextArea } = Input;
//单项填空
export default class SingleModule extends PureComponent {

    render() {
        const { index, title } = this.props;
        return (
            <div>
                <h3>{index}、{title}</h3>
                <TextArea style={{ width: '60%' }} autosize />
            </div>
        );
    }
}