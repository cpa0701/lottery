import Http from '../../common/Http';

class QuestionPreviewService {
    //获取题库
    getPreviewList = async (param) => {
        const url = 'mock/questionPreview/getPreviewLIst';
        return await Http.post(url, param);
    }
}

export default new QuestionPreviewService();
