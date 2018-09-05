package com.ztesoft.nps.business.surveyTaskMgr.service.impl;

import com.ztesoft.nps.business.surveyTaskMgr.mapper.SurveyTaskMapper;
import com.ztesoft.nps.business.surveyTaskMgr.model.SurveyTask;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskIdQuery;
import com.ztesoft.nps.business.surveyTaskMgr.service.SurveyAuditMgrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service("surveyAuditMgrServiceImpl")
public class SurveyAuditMgrServiceImpl implements SurveyAuditMgrService {

    @Autowired
    private SurveyTaskMapper surveyTaskMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void auditPass(SurveyTaskIdQuery surveyTaskIdQuery) {
        SurveyTask surveyTask = new SurveyTask();
        surveyTask.setTaskId(surveyTaskIdQuery.getTaskId());
        surveyTask.setStatus("06");
        surveyTaskMapper.updateByPrimaryKeySelective(surveyTask);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void auditNoPass(SurveyTaskIdQuery surveyTaskIdQuery) {
        SurveyTask surveyTask = new SurveyTask();
        surveyTask.setTaskId(surveyTaskIdQuery.getTaskId());
        surveyTask.setStatus("04");
        surveyTaskMapper.updateByPrimaryKeySelective(surveyTask);
    }
}
