package com.ztesoft.nps.business.surveyTaskMgr.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
public class TaskChannel {

    @ApiModelProperty("渠道ID")
    private String channelId;

    @ApiModelProperty("任务id")
    private String taskId;

    @ApiModelProperty("渠道类型")
    private Short channelType;

    @ApiModelProperty("样本方式（1全量 2抽样）")
    private Short sampleType;

    @ApiModelProperty("样本数量")
    private Long sampleSum;

    @ApiModelProperty("用户类型0 用户/1用户标签")
    private Short userType;

    @ApiModelProperty("用户数量")
    private Long userSum;

    @ApiModelProperty("发送方式 1短信超链接/2短信纯文本")
    private Short smsWay;

    @ApiModelProperty("信息内容")
    private String smsContent;

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId == null ? null : channelId.trim();
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public Short getChannelType() {
        return channelType;
    }

    public void setChannelType(Short channelType) {
        this.channelType = channelType;
    }

    public Short getSampleType() {
        return sampleType;
    }

    public void setSampleType(Short sampleType) {
        this.sampleType = sampleType;
    }

    public Long getSampleSum() {
        return sampleSum;
    }

    public void setSampleSum(Long sampleSum) {
        this.sampleSum = sampleSum;
    }

    public Short getUserType() {
        return userType;
    }

    public void setUserType(Short userType) {
        this.userType = userType;
    }

    public Long getUserSum() {
        return userSum;
    }

    public void setUserSum(Long userSum) {
        this.userSum = userSum;
    }

    public Short getSmsWay() {
        return smsWay;
    }

    public void setSmsWay(Short smsWay) {
        this.smsWay = smsWay;
    }

    public String getSmsContent() {
        return smsContent;
    }

    public void setSmsContent(String smsContent) {
        this.smsContent = smsContent == null ? null : smsContent.trim();
    }
}