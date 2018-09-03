package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.util.Date;

public class TaskUser {
    private String taskUserId;

    private Short channelType;

    private String taskId;

    private String userAccount;

    private Date createTime;

    private String areaId;

    private Short isTest;

    private Short isFlag;

    private String resSys;

    public String getTaskUserId() {
        return taskUserId;
    }

    public void setTaskUserId(String taskUserId) {
        this.taskUserId = taskUserId == null ? null : taskUserId.trim();
    }

    public Short getChannelType() {
        return channelType;
    }

    public void setChannelType(Short channelType) {
        this.channelType = channelType;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount == null ? null : userAccount.trim();
    }

    public Date getCreatTime() {
        return createTime;
    }

    public void setCreatTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId == null ? null : areaId.trim();
    }

    public Short getIsTest() {
        return isTest;
    }

    public void setIsTest(Short isTest) {
        this.isTest = isTest;
    }

    public Short getIsFlag() {
        return isFlag;
    }

    public void setIsFlag(Short isFlag) {
        this.isFlag = isFlag;
    }

    public String getResSys() {
        return resSys;
    }

    public void setResSys(String resSys) {
        this.resSys = resSys == null ? null : resSys.trim();
    }
}