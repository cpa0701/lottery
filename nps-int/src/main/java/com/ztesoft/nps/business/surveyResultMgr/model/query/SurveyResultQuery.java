package com.ztesoft.nps.business.surveyResultMgr.model.query;

import io.swagger.annotations.ApiModelProperty;

public class SurveyResultQuery {
    @ApiModelProperty("调研地区")
    private String areaId;
    @ApiModelProperty("问卷ID")
    private String qstnaireId;
    @ApiModelProperty("调研任务类型")
    private int taskType;

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public int getTaskType() {
        return taskType;
    }

    public void setTaskType(int taskType) {
        this.taskType = taskType;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }

    @Override
    public String toString() {
        return "SurveyResultQuery{" +
                "areaId='" + areaId + '\'' +
                ", qstnaireId='" + qstnaireId + '\'' +
                ", taskType=" + taskType +
                '}';
    }
}
