package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Created by 64671 on 2018/8/29.
 */
@ApiModel
public class SurveyTaskQuery {

    @ApiModelProperty("任务名称")
    private String taskName;

    @ApiModelProperty("审核状态")
    private String actType;

    @ApiModelProperty("任务状态")
    private String status;

    @ApiModelProperty("任务类型")
    private String taskType;

    @ApiModelProperty("当前页")
    private String pageNum;

    @ApiModelProperty("每页大小")
    private String pageSize;

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getPageNum() {
        return pageNum;
    }

    public void setPageNum(String pageNum) {
        this.pageNum = pageNum;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }

    public String getActType() {
        return actType;
    }

    public void setActType(String actType) {
        this.actType = actType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }
}
