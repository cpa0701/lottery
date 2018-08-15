/**
 * Create by chenpengan on 2018/8/15
 */
import React from 'react';
import QuestionPreviewService from '../../../services/question/QuestionPreviewService'

class QuestionPreview extends React.PureComponent {
    constructor(props) {
        super(props);
        let id = JSON.parse(props.match.params.id);
        console.log(id);
        this.state = {}
    }

    componentWillMount() {
        QuestionPreviewService.getQuestionList().then(result => {
            console.log(result)
        })
    }

    render() {
        return (
            <div>
                我是预览
            </div>
        )
    }
}

export default QuestionPreview;
