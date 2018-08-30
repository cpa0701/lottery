package com.ztesoft.nps.business.qstnaireMgr.model;

public class QstnaireQuestion {
    private String qstnaireId;

    private String questionId;

    private Short questionOrder;

    private Short isBlank;

    private Short isPaging;

    private String pageTxt;

    private Short isNps;

    private Short isSatisfied;

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId == null ? null : qstnaireId.trim();
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId == null ? null : questionId.trim();
    }

    public Short getQuestionOrder() {
        return questionOrder;
    }

    public void setQuestionOrder(Short questionOrder) {
        this.questionOrder = questionOrder;
    }

    public Short getIsBlank() {
        return isBlank;
    }

    public void setIsBlank(Short isBlank) {
        this.isBlank = isBlank;
    }

    public Short getIsPaging() {
        return isPaging;
    }

    public void setIsPaging(Short isPaging) {
        this.isPaging = isPaging;
    }

    public String getPageTxt() {
        return pageTxt;
    }

    public void setPageTxt(String pageTxt) {
        this.pageTxt = pageTxt == null ? null : pageTxt.trim();
    }

    public Short getIsNps() {
        return isNps;
    }

    public void setIsNps(Short isNps) {
        this.isNps = isNps;
    }

    public Short getIsSatisfied() {
        return isSatisfied;
    }

    public void setIsSatisfied(Short isSatisfied) {
        this.isSatisfied = isSatisfied;
    }

    @Override
    public String toString() {
        return "QstnaireQuestion{" +
                "qstnaireId='" + qstnaireId + '\'' +
                ", questionId='" + questionId + '\'' +
                ", questionOrder=" + questionOrder +
                ", isBlank=" + isBlank +
                ", isPaging=" + isPaging +
                ", pageTxt='" + pageTxt + '\'' +
                ", isNps=" + isNps +
                ", isSatisfied=" + isSatisfied +
                '}';
    }
}