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
            optionA:props.optionA,
            optionB:props.optionB,
            optionC:props.optionC,
            optionD:props.optionD,
            optionE:props.optionE,
            optionF:props.optionF
        }
    }
    onChange = (e) => {
    }
    render() {
        return (
            <div>
                <h3>{this.state.id}.{this.state.title}</h3>
                <Checkbox.Group onChange={this.onChange}>
                    <Row>
                        <Col span={24}><Checkbox value="1">{this.state.optionA}</Checkbox></Col>
                        <Col span={24}><Checkbox value="2">{this.state.optionB}</Checkbox></Col>
                        <Col span={24}><Checkbox value="3">{this.state.optionC}</Checkbox></Col>
                        <Col span={24}><Checkbox value="4">{this.state.optionD}</Checkbox></Col>
                        <Col span={24}><Checkbox value="5">{this.state.optionE}</Checkbox></Col>
                        <Col span={24}><Checkbox value="6">{this.state.optionF}</Checkbox></Col>
                    </Row>
                </Checkbox.Group>,
            </div>
        );
    }
}