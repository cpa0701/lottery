import React, { PureComponent } from 'react';
import { Modal, Button, Row, Col } from "antd";

import { RadioModule, CheckboxModule, BlankModule } from '../questionModule/QuestionModules'

import './questionLibMgr.less';

export default class QuestionShow extends PureComponent {


    // 根据题目类型生成对应的DOM
    QuestionType = (item) => {
        let items = {
            ...item,
            index: 1,
            isView: true
        };
        switch (items.questionType) {
            case '01':
                return (
                    <div className="list">
                        <RadioModule {...items}/>
                    </div>
                );
            case '02':
                return (
                    <div className="list">
                        <CheckboxModule {...items}/>
                    </div>
                );
            case '03':
                return (
                    <div className="list">
                        <BlankModule {...items}/>
                        <span className="span">注：字数控制在100字以内</span>
                    </div>
                );
            case '04':
                return (
                    <div className="list">
                        <BlankModule {...items}/>
                        <span className="span">注：字数控制在200字以内</span>
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };

    render() {
        const { show, questionList = [] } = this.props;
        console.log(questionList);
        const QuestionType = ({type}) => {
            return this.QuestionType(type)
        };
        const questionListDom = questionList.map((item, k) => {
            return <QuestionType type={item} key={k} index={k} data='0'/>;
        });

        return (
            <Modal
                title="查看题目"
                width={600}
                maskClosable={false}
                visible={show}
                onCancel={() => this.props.onClose()}
                footer={[
                    <Button key="submit" type="primary" onClick={() => this.props.onClose()}>关闭</Button>,
                ]}
            >
                <Row>
                    <Col span={24}>
                        <div className="questionContent">
                            {questionListDom}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }
}
