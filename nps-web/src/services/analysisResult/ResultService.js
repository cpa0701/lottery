import Http from '../../common/Http';
class ResultService {
    //NPS值分布
    getTargetshow = async (param)=>{
        //var url = 'protal/protalMenuController/qryMenuPage';
        var url = ' npsResultMgr/surveyTargetShow';
        return await Http.post(url,param);
    }
}
export default new ResultService();