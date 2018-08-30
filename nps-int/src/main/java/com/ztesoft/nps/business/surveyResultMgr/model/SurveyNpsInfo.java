package com.ztesoft.nps.business.surveyResultMgr.model;

import java.math.BigDecimal;
import java.util.Date;

public class SurveyNpsInfo {
    private String taskId;

    private String taskName;

    private String qstnaireId;

    private String npsQuestionId;

    private BigDecimal npsRatio;

    private Long npsCount1;

    private BigDecimal npsRatio1;

    private Long npsCount2;

    private BigDecimal npsRatio2;

    private Long npsCount3;

    private BigDecimal npsRatio3;

    private Short taskType;

    private Date createDate;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName == null ? null : taskName.trim();
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId == null ? null : qstnaireId.trim();
    }

    public String getNpsQuestionId() {
        return npsQuestionId;
    }

    public void setNpsQuestionId(String npsQuestionId) {
        this.npsQuestionId = npsQuestionId == null ? null : npsQuestionId.trim();
    }

    public BigDecimal getNpsRatio() {
        return npsRatio;
    }

    public void setNpsRatio(BigDecimal npsRatio) {
        this.npsRatio = npsRatio;
    }

    public Long getNpsCount1() {
        return npsCount1;
    }

    public void setNpsCount1(Long npsCount1) {
        this.npsCount1 = npsCount1;
    }

    public BigDecimal getNpsRatio1() {
        return npsRatio1;
    }

    public void setNpsRatio1(BigDecimal npsRatio1) {
        this.npsRatio1 = npsRatio1;
    }

    public Long getNpsCount2() {
        return npsCount2;
    }

    public void setNpsCount2(Long npsCount2) {
        this.npsCount2 = npsCount2;
    }

    public BigDecimal getNpsRatio2() {
        return npsRatio2;
    }

    public void setNpsRatio2(BigDecimal npsRatio2) {
        this.npsRatio2 = npsRatio2;
    }

    public Long getNpsCount3() {
        return npsCount3;
    }

    public void setNpsCount3(Long npsCount3) {
        this.npsCount3 = npsCount3;
    }

    public BigDecimal getNpsRatio3() {
        return npsRatio3;
    }

    public void setNpsRatio3(BigDecimal npsRatio3) {
        this.npsRatio3 = npsRatio3;
    }

    public Short getTaskType() {
        return taskType;
    }

    public void setTaskType(Short taskType) {
        this.taskType = taskType;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}