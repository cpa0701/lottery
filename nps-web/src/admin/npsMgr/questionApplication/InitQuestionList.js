/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Radio, Checkbox, Input} from "antd"

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {RadioModule} from "../questionModule/QuestionModules"
import {CheckboxModule} from "../questionModule/QuestionModules"
import {BlankModule} from "../questionModule/QuestionModules"


class InitQuestionList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getDom = this.getDom.bind(this);
    }

    getDom = (e) => {
        // 阻止合成事件间的冒泡
        e.stopPropagation();
        if (this.props.getDom)
            this.props.getDom(this.props)
    }

    render() {
        const {
            type, index, questionName, optionList,isLib,
        } = this.props;
        let dom = '';
        switch (type) {
            case 'radio':
                dom = <RadioModule questionName={questionName} index={index}
                                   optionList={[
                                           {
                                               optionOrder: 1, // 选项序号
                                               optionId: 1,
                                               optionName: '选项 1',
                                           },
                                           {
                                               optionOrder: 2, // 选项序号
                                               optionId: 2,
                                               optionName: '选项2',
                                           }
                                       ]} isView={true}/>
                break;
            case 'checkbox':
                dom = <CheckboxModule questionName={questionName} index={index}
                                      optionList={[
                                          {
                                              optionOrder: 1, // 选项序号
                                              optionId: 1,
                                              optionName: '选项 1',
                                          },
                                          {
                                              optionOrder: 2, // 选项序号
                                              optionId: 2,
                                              optionName: '选项2',
                                          },
                                          {
                                              optionOrder: 3, // 选项序号
                                              optionId: 3,
                                              optionName: '选项3',
                                          },
                                          {
                                              optionOrder: 4, // 选项序号
                                              optionId: 4,
                                              optionName: '选项4',
                                          },
                                          {
                                              optionOrder: 5, // 选项序号
                                              optionId: 5,
                                              optionName: '选项5',
                                          },
                                          {
                                              optionOrder: 6, // 选项序号
                                              optionId: 6,
                                              optionName: '选项6',
                                          }
                                      ]}isView={true}/>
                break;
            case 'blank':
                dom = <BlankModule questionName={questionName} index={index}
                                   optionList={[
                                       {
                                           optionOrder: 1, // 选项序号
                                           optionId: 1,
                                           optionName: '选项 1',
                                       },
                                       {
                                           optionOrder: 2, // 选项序号
                                           optionId: 2,
                                           optionName: '选项2',
                                       },
                                       {
                                           optionOrder: 3, // 选项序号
                                           optionId: 3,
                                           optionName: '选项3',
                                       },
                                       {
                                           optionOrder: 4, // 选项序号
                                           optionId: 4,
                                           optionName: '选项4',
                                       },
                                       {
                                           optionOrder: 5, // 选项序号
                                           optionId: 5,
                                           optionName: '选项5',
                                       },
                                       {
                                           optionOrder: 6, // 选项序号
                                           optionId: 6,
                                           optionName: '选项6',
                                       }
                                   ]}isView={true}/>
                break;
        }
        return (<div onClick={this.getDom} className={'questionList'}>
            {isLib ? <span>{index + 1}.{questionName}</span> : ''}
            {isLib ? '' : (<div>
                {dom}
            </div>)}
        </div>);
    }
}

export default InitQuestionList;