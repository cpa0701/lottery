/**
 * Create by chenpengan on 2018/8/15
 */
import Http from '../../common/Http';

class QuestionPreviewService {
    //获取题库
    getPreviewLIst = async (param) => {
        var url = 'mock/questionPreview/getPreviewLIst';
        return await Http.post(url, param);
    }
}

export default new QuestionPreviewService();
