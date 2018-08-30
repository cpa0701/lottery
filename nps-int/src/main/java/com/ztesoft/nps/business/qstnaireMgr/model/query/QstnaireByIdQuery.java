package com.ztesoft.nps.business.qstnaireMgr.model.query;

import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireLogicSetup;
import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class QstnaireByIdQuery {
    @ApiModelProperty("问卷归属")
    private int belongTo;
    @ApiModelProperty("分类名")
    private String catalogName;
    @ApiModelProperty("分类Id")
    private String catalogId;
    @ApiModelProperty("逻辑列表")
    private List<QstnaireLogicSetup> logic;
    @ApiModelProperty("问卷标题")
    private String qstnaireId;
    @ApiModelProperty("问卷欢迎语")
    private String qstnaireLeadin;
    @ApiModelProperty("问卷标题")
    private String qstnaireTitle;
    @ApiModelProperty("问题列表")
    private List<QstnaireQuestionQuery> question;


    public int getBelongTo() {
        return belongTo;
    }

    public void setBelongTo(int belongTo) {
        this.belongTo = belongTo;
    }

    public String getCatalogName() {
        return catalogName;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }

    public List<QstnaireLogicSetup> getLogic() {
        return logic;
    }

    public void setLogic(List<QstnaireLogicSetup> logic) {
        this.logic = logic;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }

    public String getQstnaireLeadin() {
        return qstnaireLeadin;
    }

    public void setQstnaireLeadin(String qstnaireLeadin) {
        this.qstnaireLeadin = qstnaireLeadin;
    }

    public String getQstnaireTitle() {
        return qstnaireTitle;
    }

    public void setQstnaireTitle(String qstnaireTitle) {
        this.qstnaireTitle = qstnaireTitle;
    }

    public List<QstnaireQuestionQuery> getQuestion() {
        return question;
    }

    public void setQuestion(List<QstnaireQuestionQuery> question) {
        this.question = question;
    }

    public String getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(String catalogId) {
        this.catalogId = catalogId;
    }

}
