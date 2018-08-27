import Http from '../../common/Http';

class QuestionApplicationService {
    // 获取问卷列表
    getQuestionnaireList = async (param) => {
        let url = 'http://rapapi.org/mockjsdata/36231/questionMgr/questionBank';
        return await Http.post(url, param);
    };
    // 新建保存问卷
    addQstnaireBank = async (param) => {
        let url = 'qstnaireMgr/addQstnaireBank';
        return await Http.post(url, param);
    }
}

export default new QuestionApplicationService();
