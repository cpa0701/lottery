package com.ztesoft.nps.business.qstnaireMgr.model;

public class QstnaireLogicSetup {
    private String logicId;

    private Short logicOrder;

    private String qstnaireId;

    private Short setupQuestionOrder;

    private String optionOrder;

    private Short skiptoQuestionOrder;

    private String logicType;

    private Short actType;

    private Short andOr;

    public String getLogicId() {
        return logicId;
    }

    public void setLogicId(String logicId) {
        this.logicId = logicId == null ? null : logicId.trim();
    }

    public Short getLogicOrder() {
        return logicOrder;
    }

    public void setLogicOrder(Short logicOrder) {
        this.logicOrder = logicOrder;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId == null ? null : qstnaireId.trim();
    }

    public Short getSetupQuestionOrder() {
        return setupQuestionOrder;
    }

    public void setSetupQuestionOrder(Short setupQuestionOrder) {
        this.setupQuestionOrder = setupQuestionOrder;
    }

    public String getOptionOrder() {
        return optionOrder;
    }

    public void setOptionOrder(String optionOrder) {
        this.optionOrder = optionOrder == null ? null : optionOrder.trim();
    }

    public Short getSkiptoQuestionOrder() {
        return skiptoQuestionOrder;
    }

    public void setSkiptoQuestionOrder(Short skiptoQuestionOrder) {
        this.skiptoQuestionOrder = skiptoQuestionOrder;
    }

    public String getLogicType() {
        return logicType;
    }

    public void setLogicType(String logicType) {
        this.logicType = logicType == null ? null : logicType.trim();
    }

    public Short getActType() {
        return actType;
    }

    public void setActType(Short actType) {
        this.actType = actType;
    }

    public Short getAndOr() {
        return andOr;
    }

    public void setAndOr(Short andOr) {
        this.andOr = andOr;
    }
}