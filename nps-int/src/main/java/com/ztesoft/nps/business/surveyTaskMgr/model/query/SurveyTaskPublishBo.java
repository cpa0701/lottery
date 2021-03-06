package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Created by 64671 on 2018/8/30.
 */
@ApiModel
public class SurveyTaskPublishBo {

    @ApiModelProperty("任务id")
    private String taskId;

    @ApiModelProperty("渠道")
    private String channelType;

    @ApiModelProperty("是否成功")
    private int isSuccee;

    public int getIsSuccee() {
        return isSuccee;
    }

    public void setIsSuccee(int isSuccee) {
        this.isSuccee = isSuccee;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }
}
