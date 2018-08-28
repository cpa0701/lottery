package com.ztesoft.nps.business.qstMgr.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.List;

@ApiModel
public class QuestionBank {

    @ApiModelProperty("题目ID")
    private String questionId;

    @ApiModelProperty("题目名称")
    private String questionName;

    @ApiModelProperty("题目副标题")
    private String questionName2;

    @ApiModelProperty("题目类型")
    private String questionType;

    @ApiModelProperty("题目分类")
    private Integer questionCategory;

    @ApiModelProperty("是否公共题目")
    private Integer isCommon;

    @ApiModelProperty("是否nps评分题")
    private Integer isNps;

    @ApiModelProperty("是否满意度评分题")
    private Integer isSatisfied;

    @ApiModelProperty("选项布局")
    private Integer optionLayout;

    @ApiModelProperty("内容校验")
    private Integer contentCheck;

    @ApiModelProperty("字数限制")
    private Long lenthCheck;

    @ApiModelProperty("创建人")
    private Long createUid;

    @ApiModelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty("状态")
    private String status;

    @ApiModelProperty("标签")
    private String questionTags;

    @ApiModelProperty("选项信息")
    private List<QuestionOption> optionList;

    public List<QuestionOption> getOptionList() {
        return optionList;
    }

    public void setOptionList(List<QuestionOption> optionList) {
        this.optionList = optionList;
    }

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

    public Integer getQuestionCategory() {
        return questionCategory;
    }

    public void setQuestionCategory(Integer questionCategory) {
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