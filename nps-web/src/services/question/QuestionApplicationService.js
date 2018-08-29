import Http from '../../common/Http';

class QuestionApplicationService {
    // 获取问卷列表
    getQuestionnaireList = async (param) => {
        let url = 'http://10.45.49.87:18088/qstnaireMgr/qstnaireBank';
        // let url = 'http://rapapi.org/mockjsdata/36231/questionMgr/questionBank';
        return await Http.post(url, param);
    };
    // 根据ID查询问卷
    getQstnaireById = async (param) => {
        let url = 'http://10.45.49.87:18088/ qstnaireMgr/qstnaireById';
        // let url = 'questionMgr/editQuestion';
        return await Http.post(url, param);
    };
    // 新建问卷
    addQstnaireBank = async (param) => {
        let url = 'http://10.45.49.87:18088/qstnaireMgr/addQstnaire';
        // let url = 'qstnaireMgr/addQstnaireBank';
        return await Http.post(url, param);
    };
    // 编辑问卷
    editQstnaire = async (param) => {
        let url = 'http://10.45.49.87:18088/qstnaireMgr/eiditQstnaire';
        // let url = 'questionMgr/editQuestion';
        return await Http.post(url, param);
    };
    // 删除问卷
    delQstnaire = async (param) => {
        let url = 'http://10.45.49.87:18088/qstnaireMgr/deleteQstnaire';
        // let url = 'qstnaireMgr/deleteQstnaire';
        return await Http.post(url, param);
    };
    // 提交问卷
    submitQstnaire = async (param) => {
        let url = 'http://10.45.49.87:18088/qstnaireMgr/actionQstnaire';
        // let url = 'qstnaireMgr/submitQstnaire';
        return await Http.post(url, param);
    };
}

export default new QuestionApplicationService();
