package com.ztesoft.nps.business.qstnaireMgr.model.query;

import com.ztesoft.nps.business.qstMgr.model.QuestionResult;

import java.util.List;

public class QuestionResultQuery {

    private List<QuestionResult> questionResultList;

    private String surveyResultNo;

    public List<QuestionResult> getQuestionResultList() {
        return questionResultList;
    }

    public void setQuestionResultList(List<QuestionResult> questionResultList) {
        this.questionResultList = questionResultList;
    }

    public String getSurveyResultNo() {
        return surveyResultNo;
    }

    public void setSurveyResultNo(String surveyResultNo) {
        this.surveyResultNo = surveyResultNo;
    }
}
