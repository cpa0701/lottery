package com.ztesoft.nps.business.qstnaireMgr.model.query;

import com.ztesoft.nps.business.qstMgr.model.QuestionResult;

import java.util.Date;
import java.util.List;

public class QuestionResultQuery {

    private List<QuestionResult> questionResultList;

    private String sendUser;

    private String targetUser;

    private String taskId;

    private String time;

    private Long resultId;

    public String getSendUser() {
        return sendUser;
    }

    public void setSendUser(String sendUser) {
        this.sendUser = sendUser;
    }

    public String getTargetUser() {
        return targetUser;
    }

    public void setTargetUser(String targetUser) {
        this.targetUser = targetUser;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<QuestionResult> getQuestionResultList() {
        return questionResultList;
    }

    public void setQuestionResultList(List<QuestionResult> questionResultList) {
        this.questionResultList = questionResultList;
    }

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }
}
