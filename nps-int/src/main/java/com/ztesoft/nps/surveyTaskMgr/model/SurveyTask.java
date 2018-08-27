package com.ztesoft.nps.surveyTaskMgr.model;

import java.util.Date;

public class SurveyTask {
    private String taskId;

    private String taskName;

    private Short taskType;

    private String qstnaireId;

    private Date surveySdate;

    private Date surveyEdate;

    private Long createUid;

    private Date createTime;

    private Date updateTime;

    private String status;

    private String dealTache;

    private Long dealRole;

    private Long dealUid;

    private Long dealOrg;

    private String dealType;

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

    public Short getTaskType() {
        return taskType;
    }

    public void setTaskType(Short taskType) {
        this.taskType = taskType;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId == null ? null : qstnaireId.trim();
    }

    public Date getSurveySdate() {
        return surveySdate;
    }

    public void setSurveySdate(Date surveySdate) {
        this.surveySdate = surveySdate;
    }

    public Date getSurveyEdate() {
        return surveyEdate;
    }

    public void setSurveyEdate(Date surveyEdate) {
        this.surveyEdate = surveyEdate;
    }

    public Long getCreateUid() {
        return createUid;
    }

    public void setCreateUid(Long createUid) {
        this.createUid = createUid;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getDealTache() {
        return dealTache;
    }

    public void setDealTache(String dealTache) {
        this.dealTache = dealTache == null ? null : dealTache.trim();
    }

    public Long getDealRole() {
        return dealRole;
    }

    public void setDealRole(Long dealRole) {
        this.dealRole = dealRole;
    }

    public Long getDealUid() {
        return dealUid;
    }

    public void setDealUid(Long dealUid) {
        this.dealUid = dealUid;
    }

    public Long getDealOrg() {
        return dealOrg;
    }

    public void setDealOrg(Long dealOrg) {
        this.dealOrg = dealOrg;
    }

    public String getDealType() {
        return dealType;
    }

    public void setDealType(String dealType) {
        this.dealType = dealType == null ? null : dealType.trim();
    }
}