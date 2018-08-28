import Http from '../../common/Http';

class QuestionLibMgrService {
    // 获取题库
    getQuestionList = async (param) => {
        let url = 'http://10.45.49.87:18088/questionMgr/questionBank';
        // let url = 'http://rapapi.org/mockjsdata/36231/questionBank';
        return await Http.post(url, param);
    };
    // 新增题目
    addQuestion = async (param) => {
        // let url = 'mock/questionMgr/addQuestion';
        let url = 'http://10.45.49.87:18088/questionMgr/addQuestion';
        return await Http.post(url, param);
    };
    // 编辑题目
    editQuestion = async (param) => {
        let url = 'http://10.45.49.87:18088/questionMgr/editQuestion';
        // let url = 'questionMgr/editQuestion';
        return await Http.post(url, param);
    };
    // 删除题目
    delQuestion = async (param) => {
         let url = 'http://10.45.49.87:18088/questionMgr/deleteQuestion';
        // let url = 'questionMgr/deleteQuestion';
        return await Http.post(url, param);
    };

    // 得到题目分类树数据
    getQuestionCategory = async (param) => {
        let url = 'mock/questionMgr/getQuestionCategory';
        return await Http.get(url, param);
    }
}

export default new QuestionLibMgrService();
