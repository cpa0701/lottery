import Http from '../../common/Http';
class TaskResearchService {
    //获取调研任务列表
    getMissionList = async (param) => {
        let url = 'surveyTaskMgr/surveyTaskList';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    };
    // 结束调研
    stopMission = async (param) => {
        let url = 'mock/missionMgr/stopMission';
        return await Http.post(url, param);
    }
}

export default new TaskResearchService();