package com.ztesoft.nps.business.surveyTaskMgr.service;

import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskIdQuery;

public interface SurveyAuditMgrService {
    public void auditPass(SurveyTaskIdQuery surveyTaskIdQuery);
    public void auditNoPass(SurveyTaskIdQuery surveyTaskIdQuery);
}
