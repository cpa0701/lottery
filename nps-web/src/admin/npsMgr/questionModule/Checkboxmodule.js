import {Checkbox, Row, Col} from 'antd';
import {PureComponent} from "react";
import React from 'react';

//多选
export default class Checkboxmodule extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            id:props.id,
            title:props.title,
            num:props.num,
            options:props.options,
        }
    }
    onChange = (e) => {
    }
    render() {
        var items = [];
        for (var i = 0; i < this.state.num; i++) {
            items.push( <Col span={24}><Checkbox value={i}>{this.state.options[i]}</Checkbox></Col>);
        }
        return (
            <div>
                <h3>{this.state.id}.{this.state.title}[多选题]</h3>
                <Checkbox.Group onChange={this.onChange}>
                    <Row>
                        {items}
                    </Row>
                </Checkbox.Group>,
            </div>
        );
    }
}