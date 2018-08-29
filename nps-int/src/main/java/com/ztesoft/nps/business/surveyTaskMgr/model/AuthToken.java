package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.util.Date;

public class AuthToken {
    private Long logId;

    private Date createTime;

    private String token;

    private String taskUserId;

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token == null ? null : token.trim();
    }

    public String getTaskUserId() {
        return taskUserId;
    }

    public void setTaskUserId(String taskUserId) {
        this.taskUserId = taskUserId == null ? null : taskUserId.trim();
    }
}