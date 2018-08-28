import Http from '../../common/Http';
class TaskResearchService {
    //获取调研任务列表
    getMissionList = async (param) => {
        // var url = 'http://rapapi.org/mockjsdata/36231/questionMgr/questionBank';
        let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
}

export default new TaskResearchService();