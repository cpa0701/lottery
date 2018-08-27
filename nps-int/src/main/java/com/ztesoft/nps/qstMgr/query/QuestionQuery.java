package com.ztesoft.nps.qstMgr.query;

import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/8/27.
 */
public class QuestionQuery{

    @ApiModelProperty("题目分类(")
    private String questionCategory;

    @ApiModelProperty("nps评分题")
    private String isNps;

    @ApiModelProperty("满意度评分题")
    private String isSatisfied;

    @ApiModelProperty("题目名称")
    private String questionName;

    @ApiModelProperty("题目类型")
    private String questionType;

    @ApiModelProperty("起始页")
    private String pageNum;

    @ApiModelProperty("每页大小")
    private String pageSize;

    public String getQuestionCategory() {
        return questionCategory;
    }

    public void setQuestionCategory(String questionCategory) {
        this.questionCategory = questionCategory;
    }

    public String getIsNps() {
        return isNps;
    }

    public void setIsNps(String isNps) {
        this.isNps = isNps;
    }

    public String getIsSatisfied() {
        return isSatisfied;
    }

    public void setIsSatisfied(String isSatisfied) {
        this.isSatisfied = isSatisfied;
    }

    public String getQuestionName() {
        return questionName;
    }

    public void setQuestionName(String questionName) {
        this.questionName = questionName;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
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
}
