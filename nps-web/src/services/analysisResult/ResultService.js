import Http from '../../common/Http';
class ResultService {
    //分页列表查询
    getTargetshow = async (param)=>{
        //var url = 'protal/protalMenuController/qryMenuPage';
        var url = ' npsResultMgr/surveyTargetShow';
        return await Http.post(url,param);
    }
}
export default new ResultService();