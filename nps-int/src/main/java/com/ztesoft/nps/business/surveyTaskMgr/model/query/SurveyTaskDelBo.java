package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/8/29.
 */
@ApiModel
public class SurveyTaskDelBo implements Serializable{

    @ApiModelProperty("任务ID")
    private String taskId;

    @ApiModelProperty("渠道 0链接与二维码/1微信/2邮件/3短信")
    private String channelType;

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
