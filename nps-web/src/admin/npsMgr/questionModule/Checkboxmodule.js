import {Checkbox, Row, Col} from 'antd';
import {PureComponent} from "react";
import React from 'react';

//多选
export default class Checkboxmodule extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            id:props.id,
            title: props.title ? props.title : '多选题标题',
            option: props.option ? props.option : ['选项1', '选项2','选项3', '选项4']
        }
    }
    onChange = (e) => {
    }
    render() {
        var items = [];
        for (var i = 0; i < this.state.option.length; i++) {
            items.push( <Col span={24}><Checkbox value={i}>{this.state.option[i]}</Checkbox></Col>);
        }
        return (
            <div>
                <h3>{this.state.id}.{this.state.title}[多选题]</h3>
                <Checkbox.Group onChange={this.onChange}>
                    <Row>
                        {items}
                    </Row>
                </Checkbox.Group>
            </div>
        );
    }
}