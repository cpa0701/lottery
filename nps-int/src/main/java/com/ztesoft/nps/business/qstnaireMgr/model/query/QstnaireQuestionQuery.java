package com.ztesoft.nps.business.qstnaireMgr.model.query;

import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.qstMgr.model.QuestionOption;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireQuestion;

import java.util.Date;
import java.util.List;

public class QstnaireQuestionQuery {
    private int contentCheck;
    private Date createTime;
    private int isBlank;
    private int isCommon;
    private int isNps;
    private int isPaging;
    private int isSatisfied;
    private Long lenthCheck;
    private int optionLayout;
    private List<QuestionOption> optionList;
    private int questionCategory;
    private String questionId;
    private String questionName;
    private String questionName2;
    private String questionType;
    private int questionOrder;

    public int getContentCheck() {
        return contentCheck;
    }

    public void setContentCheck(int contentCheck) {
        this.contentCheck = contentCheck;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getIsBlank() {
        return isBlank;
    }

    public void setIsBlank(int isBlank) {
        this.isBlank = isBlank;
    }

    public int getIsCommon() {
        return isCommon;
    }

    public void setIsCommon(int isCommon) {
        this.isCommon = isCommon;
    }

    public int getIsNps() {
        return isNps;
    }

    public void setIsNps(int isNps) {
        this.isNps = isNps;
    }

    public int getIsPaging() {
        return isPaging;
    }

    public void setIsPaging(int isPaging) {
        this.isPaging = isPaging;
    }

    public int getIsSatisfied() {
        return isSatisfied;
    }

    public void setIsSatisfied(int isSatisfied) {
        this.isSatisfied = isSatisfied;
    }

    public Long getLenthCheck() {
        return lenthCheck;
    }

    public void setLenthCheck(Long lenthCheck) {
        this.lenthCheck = lenthCheck;
    }

    public int getOptionLayout() {
        return optionLayout;
    }

    public void setOptionLayout(int optionLayout) {
        this.optionLayout = optionLayout;
    }

    public List<QuestionOption> getOptionList() {
        return optionList;
    }

    public void setOptionList(List<QuestionOption> optionList) {
        this.optionList = optionList;
    }

    public int getQuestionCategory() {
        return questionCategory;
    }

    public void setQuestionCategory(int questionCategory) {
        this.questionCategory = questionCategory;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getQuestionName() {
        return questionName;
    }

    public void setQuestionName(String questionName) {
        this.questionName = questionName;
    }

    public String getQuestionName2() {
        return questionName2;
    }

    public void setQuestionName2(String questionName2) {
        this.questionName2 = questionName2;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public int getQuestionOrder() {
        return questionOrder;
    }

    public void setQuestionOrder(int questionOrder) {
        this.questionOrder = questionOrder;
    }

}
