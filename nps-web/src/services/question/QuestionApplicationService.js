import Http from '../../common/Http';

class QuestionApplicationService {
    //获取题库
    getQuestionList = async (param) => {
        var url = 'http://rapapi.org/mockjsdata/36231/questionBank';
        return await Http.post(url, param);
    }
    //获取问卷列表
    getQuestionnaireList = async (param) => {
        var url = 'http://rapapi.org/mockjsdata/36231/questionMgr/questionBank';
        return await Http.post(url, param);
    }
}

export default new QuestionApplicationService();
