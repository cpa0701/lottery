package com.ztesoft.nps.business.qstMgr.model;

import io.swagger.annotations.ApiModelProperty;

public class QuestionResult {
    @ApiModelProperty("调研结果流水")
    private Long surveyResultNo;
    @ApiModelProperty("答题题目")
    private String questionId;
    @ApiModelProperty("矩阵行序号")
    private Short rowOrder;
    @ApiModelProperty("答题结果序号")
    private String questionResult;

    public Long getSurveyResultNo() {
        return surveyResultNo;
    }

    public void setSurveyResultNo(Long surveyResultNo) {
        this.surveyResultNo = surveyResultNo;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId == null ? null : questionId.trim();
    }

    public Short getRowOrder() {
        return rowOrder;
    }

    public void setRowOrder(Short rowOrder) {
        this.rowOrder = rowOrder;
    }

    public String getQuestionResult() {
        return questionResult;
    }

    public void setQuestionResult(String questionResult) {
        this.questionResult = questionResult == null ? null : questionResult.trim();
    }
}