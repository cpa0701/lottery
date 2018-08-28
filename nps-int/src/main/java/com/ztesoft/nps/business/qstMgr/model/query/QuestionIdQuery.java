package com.ztesoft.nps.business.qstMgr.model.query;

import io.swagger.annotations.ApiModelProperty;

/**
 * Created by 64671 on 2018/8/27.
 */
public class QuestionIdQuery {

    @ApiModelProperty("题目ID")
    private String questionId;

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }
}
