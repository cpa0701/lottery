import Http from '../../common/Http';

class QuestionLibMgrService {
    // 新增题目
    addQuestion = async (param) => {
        let url = 'mock/questionMgr/addQuestion';
        return await Http.post(url, param);
    };

    // 得到题目分类树数据
    getQuestionCategory = async (param) => {
        let url = 'mock/questionMgr/getQuestionCategory';
        return await Http.get(url, param);
    }
}

export default new QuestionLibMgrService();
