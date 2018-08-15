import React, { PureComponent } from 'react';
import RadioModule from './RadioModule'


//单选
export default class Test extends PureComponent {
    render() {
        const param = {
            index: '1',
            title: 'aaaa',
            option: ['是', '否'],
            value: 0
        };
        return (
            <div style={{padding: '5px'}}>
                <RadioModule {...param}/>
            </div>
        );
    }
}