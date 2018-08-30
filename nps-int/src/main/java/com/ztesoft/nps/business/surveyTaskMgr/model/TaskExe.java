package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.util.Date;

public class TaskExe {
    private String serialId;

    private String taskId;

    private Short channelType;

    private String sendUser;

    private String targetUser;

    private Short isTest;

    private String smContent;

    private Date creatTime;

    private String baseUrl;

    private String shortUrl;

    private Short isExe;

    private Date exeTime;

    private String testUid;

    private Short urlFlag;

    public String getSerialId() {
        return serialId;
    }

    public void setSerialId(String serialId) {
        this.serialId = serialId == null ? null : serialId.trim();
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

    public String getSendUser() {
        return sendUser;
    }

    public void setSendUser(String sendUser) {
        this.sendUser = sendUser == null ? null : sendUser.trim();
    }

    public String getTargetUser() {
        return targetUser;
    }

    public void setTargetUser(String targetUser) {
        this.targetUser = targetUser == null ? null : targetUser.trim();
    }

    public Short getIsTest() {
        return isTest;
    }

    public void setIsTest(Short isTest) {
        this.isTest = isTest;
    }

    public String getSmContent() {
        return smContent;
    }

    public void setSmContent(String smContent) {
        this.smContent = smContent == null ? null : smContent.trim();
    }

    public Date getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(Date creatTime) {
        this.creatTime = creatTime;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl == null ? null : baseUrl.trim();
    }

    public String getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl == null ? null : shortUrl.trim();
    }

    public Short getIsExe() {
        return isExe;
    }

    public void setIsExe(Short isExe) {
        this.isExe = isExe;
    }

    public Date getExeTime() {
        return exeTime;
    }

    public void setExeTime(Date exeTime) {
        this.exeTime = exeTime;
    }

    public String getTestUid() {
        return testUid;
    }

    public void setTestUid(String testUid) {
        this.testUid = testUid == null ? null : testUid.trim();
    }

    public Short getUrlFlag() {
        return urlFlag;
    }

    public void setUrlFlag(Short urlFlag) {
        this.urlFlag = urlFlag;
    }
}