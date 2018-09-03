package com.ztesoft.nps.business.surveyResultMgr.service;

import com.ztesoft.nps.business.surveyResultMgr.model.SurveyNpsInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyUserInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.query.SurveyResultQuery;

import java.util.List;

public interface SurveyResultService {
    List<SurveyUserInfo> surveyTargetShow(SurveyResultQuery surveyResultQuery);

    List<SurveyNpsInfo> surveyNpsShow(SurveyResultQuery surveyResultQuery);
}
