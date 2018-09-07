import Http from '../../common/Http';

class QuestionPreviewService {
    //获取题库
    getPreviewList = async (param) => {
        // const url = 'mock/questionPreview/getPreviewLIst';
        const url = 'qstnaireMgr/qstnaireById';
        return await Http.post(url, param);
    };
    // 提交答卷
    submitQstnaire = async (param) => {
        // const url = 'mock/questionPreview/getPreviewLIst';
        const url = 'qstnaireMgr/submitQstnaire';
        return await Http.post(url, param);
    }
}

export default new QuestionPreviewService();
