package com.ztesoft.nps.business.surveyTaskMgr.model;

public class TaskChannel {
    private Long channelId;

    private String taskId;

    private Short channelType;

    private Short sampleType;

    private Long sampleSum;

    private Short userType;

    private Long userSum;

    private Short smsWay;

    private String smsContent;

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
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