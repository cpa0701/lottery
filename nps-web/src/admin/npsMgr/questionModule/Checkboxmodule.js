import {Checkbox, Row, Col} from 'antd';
import {PureComponent} from "react";
import React from 'react';

//多选
export default class Checkboxmodule extends PureComponent {

    render() {
        const { index, title, option } = this.props;

        const items = option.map((item, key) => {
            return <Checkbox style={{display: 'block',height: '30px',lineHeight: '30px', marginLeft: '20px'}} value={key} key={key}>{item}</Checkbox>;
        });

        return (
            <div style={{padding: '5px'}}>
                <h3>{index}、{title}[多选题]</h3>
                <Checkbox.Group onChange={this.props.onChange}>
                    {items}
                </Checkbox.Group>
            </div>
        );
    }
}