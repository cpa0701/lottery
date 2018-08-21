package com.ztesoft.nps.qstMgr.model;

import java.util.Date;

public class QuestionBank {
    private String questionId;

    private String questionName;

    private String questionName2;

    private String questionType;

    private Short questionCategory;

    private Integer isCommon;

    private Integer isNps;

    private Integer isSatisfied;

    private Integer optionLayout;

    private Integer contentCheck;

    private Long lenthCheck;

    private Long createUid;

    private Date createTime;

    private String status;

    private String questionTags;

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId == null ? null : questionId.trim();
    }

    public String getQuestionName() {
        return questionName;
    }

    public void setQuestionName(String questionName) {
        this.questionName = questionName == null ? null : questionName.trim();
    }

    public String getQuestionName2() {
        return questionName2;
    }

    public void setQuestionName2(String questionName2) {
        this.questionName2 = questionName2 == null ? null : questionName2.trim();
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType == null ? null : questionType.trim();
    }

    public Short getQuestionCategory() {
        return questionCategory;
    }

    public void setQuestionCategory(Short questionCategory) {
        this.questionCategory = questionCategory;
    }

    public Integer getIsCommon() {
        return isCommon;
    }

    public void setIsCommon(Integer isCommon) {
        this.isCommon = isCommon;
    }

    public Integer getIsNps() {
        return isNps;
    }

    public void setIsNps(Integer isNps) {
        this.isNps = isNps;
    }

    public Integer getIsSatisfied() {
        return isSatisfied;
    }

    public void setIsSatisfied(Integer isSatisfied) {
        this.isSatisfied = isSatisfied;
    }

    public Integer getOptionLayout() {
        return optionLayout;
    }

    public void setOptionLayout(Integer optionLayout) {
        this.optionLayout = optionLayout;
    }

    public Integer getContentCheck() {
        return contentCheck;
    }

    public void setContentCheck(Integer contentCheck) {
        this.contentCheck = contentCheck;
    }

    public Long getLenthCheck() {
        return lenthCheck;
    }

    public void setLenthCheck(Long lenthCheck) {
        this.lenthCheck = lenthCheck;
    }

    public Long getCreateUid() {
        return createUid;
    }

    public void setCreateUid(Long createUid) {
        this.createUid = createUid;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getQuestionTags() {
        return questionTags;
    }

    public void setQuestionTags(String questionTags) {
        this.questionTags = questionTags == null ? null : questionTags.trim();
    }
}