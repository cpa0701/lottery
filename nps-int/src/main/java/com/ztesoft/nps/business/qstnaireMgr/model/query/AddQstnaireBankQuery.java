package com.ztesoft.nps.business.qstnaireMgr.model.query;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireBank;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireLogicSetup;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireQuestion;
import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class AddQstnaireBankQuery {

    @ApiModelProperty("问卷标题")
    private String qstnaireTitle;
    @ApiModelProperty("问卷欢迎语")
    private String qstnaireLeadin;
    @ApiModelProperty("问卷分类")
    private String catalogId;
    @ApiModelProperty("逻辑规则列表")
    private List<QstnaireLogicSetup> logic;
    @ApiModelProperty("问题列表")
    private List<QstnaireQuestion> question;
    @ApiModelProperty("问卷归属(1 标准问卷/2 定制问卷),默认2定制问卷")
    private Short belongTo;
    @ApiModelProperty("问卷ID")
    private String  qstnaireId;

    public String getQstnaireTitle() {
        return qstnaireTitle;
    }

    public void setQstnaireTitle(String qstnaireTitle) {
        this.qstnaireTitle = qstnaireTitle;
    }

    public String getQstnaireLeadin() {
        return qstnaireLeadin;
    }

    public void setQstnaireLeadin(String qstnaireLeadin) {
        this.qstnaireLeadin = qstnaireLeadin;
    }

    public String getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(String catalogId) {
        this.catalogId = catalogId;
    }

    public List<QstnaireLogicSetup> getLogic() {
        return logic;
    }

    public void setLogic(List<QstnaireLogicSetup> logic) {
        this.logic = logic;
    }

    public List<QstnaireQuestion> getQuestion() {
        return question;
    }

    public void setQuestion(List<QstnaireQuestion> question) {
        this.question = question;
    }

    public Short getBelongTo() {
        return belongTo;
    }

    public void setBelongTo(Short belongTo) {
        this.belongTo = belongTo;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }

    public QstnaireBank toQstnaireBank(){
        QstnaireBank qstnaireBank = new QstnaireBank();
        qstnaireBank.setBelongTo(this.belongTo);
        qstnaireBank.setCatalogId(this.catalogId);
        qstnaireBank.setQstnaireLeadin(this.qstnaireLeadin);
        qstnaireBank.setQstnaireTitle(this.qstnaireTitle);
        return qstnaireBank;
    }
}
