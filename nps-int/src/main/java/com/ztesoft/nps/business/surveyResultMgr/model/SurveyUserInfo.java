package com.ztesoft.nps.business.surveyResultMgr.model;

import java.math.BigDecimal;
import java.util.Date;

public class SurveyUserInfo {
    private String taskId;

    private String areaId;

    private String taskName;

    private String qstnaireId;

    private Long taskCount;

    private Long partakeCount;

    private Long finishCount;

    private BigDecimal partakeRatio;

    private BigDecimal finishRatio;

    private Short taskType;

    private Date createDate;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId == null ? null : areaId.trim();
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

    public Long getTaskCount() {
        return taskCount;
    }

    public void setTaskCount(Long taskCount) {
        this.taskCount = taskCount;
    }

    public Long getPartakeCount() {
        return partakeCount;
    }

    public void setPartakeCount(Long partakeCount) {
        this.partakeCount = partakeCount;
    }

    public Long getFinishCount() {
        return finishCount;
    }

    public void setFinishCount(Long finishCount) {
        this.finishCount = finishCount;
    }

    public BigDecimal getPartakeRatio() {
        return partakeRatio;
    }

    public void setPartakeRatio(BigDecimal partakeRatio) {
        this.partakeRatio = partakeRatio;
    }

    public BigDecimal getFinishRatio() {
        return finishRatio;
    }

    public void setFinishRatio(BigDecimal finishRatio) {
        this.finishRatio = finishRatio;
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