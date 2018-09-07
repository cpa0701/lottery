import Http from '../../common/Http';

class TaskResearchService {
    //新增任务（提交审核）
    addSurveyTask = async (param) => {
        const url = 'surveyTaskMgr/addSurveyTask';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //新编辑任务（提交审核）
    editSurveyTask = async (param) => {
        const url = 'surveyTaskMgr/eiditSurveyTask';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //新增任务获取任务id
    getNewTaskId = async (param) => {
        const url = 'surveyTaskMgr/getNewTaskId';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //根据id获取任务数据
    selectSurveyTaskById = async (param) => {
        const url = 'surveyTaskMgr/selectSurveyTaskById';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //删除任务
    deleteSurveyTask = async (param) => {
        const url = '/surveyTaskMgr/deleteSurveyTask';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //任务保存草稿
    addSurveyTaskToDraft = async (param) => {
        const url = 'surveyTaskMgr/addSurveyTaskToDraft';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //任务编辑保存草稿
    editSurveyTaskToDraft = async (param) => {
        const url = 'surveyTaskMgr/eiditSurveyTaskDraft';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //获取调研任务列表
    getMissionList = async (param) => {
        const url = 'surveyTaskMgr/surveyTaskList';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    }
    //用户上传号码
    userTargetImport = async (param) => {
        const url = 'surveyTaskMgr/userTargetImport';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    };
    //用户删除上传号码
    userTargetDelete = async (param) => {
        const url = '/surveyTaskMgr/userTargetDelete';
        // let url = 'mock/missionMgr/getMissionList';
        return await Http.post(url, param);
    };
    // 内测
    testPublishSurveyTask = async (param) => {
        let url = 'surveyTaskMgr/testPublishSurveyTask';
        return await Http.post(url, param);
    };
    // 内测并发布
    publicTask = async (param) => {
        let url = 'surveyTaskMgr/publishSurveyTask';
        return await Http.post(url, param);
    };
    // 审核通过
    auditPass = async (param) => {
        let url = 'surveyAuditMgr/auditPass';
        return await Http.post(url, param);
    };
    // 审核否决
    auditNoPass = async (param) => {
        let url = 'surveyAuditMgr/auditNoPass';
        return await Http.post(url, param);
    };
    // 结束调研
    stopMission = async (param) => {
        let url = 'mock/missionMgr/stopMission';
        return await Http.post(url, param);
    };
}

export default new TaskResearchService();