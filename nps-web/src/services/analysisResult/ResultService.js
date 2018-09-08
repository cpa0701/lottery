import Http from '../../common/Http';
class ResultService {
    // NPS值分布
    getNpsTargetshow = async (param)=>{
        let url = 'npsResultMgr/surveyNpsShow';
        return await Http.post(url,param);
    };
    // 调研对象分析
    getObjTargetshow = async (param)=>{
        let url = 'npsResultMgr/surveyTargetShow';
        return await Http.post(url,param);
    }
}
export default new ResultService();