package com.ztesoft.nps.business.qstnaireMgr.model;

import java.util.Date;

public class QstnaireBank {
    private String qstnaireId;

    private String qstnaireTitle;

    private String qstnaireLeadin;

    private String catalogId;

    private Short belongTo;

    private Long createUid;

    private Date createTime;

    private String status;

    private Short isInst;

    private Date updateTime;

    private Short isUse;

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId == null ? null : qstnaireId.trim();
    }

    public String getQstnaireTitle() {
        return qstnaireTitle;
    }

    public void setQstnaireTitle(String qstnaireTitle) {
        this.qstnaireTitle = qstnaireTitle == null ? null : qstnaireTitle.trim();
    }

    public String getQstnaireLeadin() {
        return qstnaireLeadin;
    }

    public void setQstnaireLeadin(String qstnaireLeadin) {
        this.qstnaireLeadin = qstnaireLeadin == null ? null : qstnaireLeadin.trim();
    }

    public String getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(String catalogId) {
        this.catalogId = catalogId == null ? null : catalogId.trim();
    }

    public Short getBelongTo() {
        return belongTo;
    }

    public void setBelongTo(Short belongTo) {
        this.belongTo = belongTo;
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

    public Short getIsInst() {
        return isInst;
    }

    public void setIsInst(Short isInst) {
        this.isInst = isInst;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Short getIsUse() {
        return isUse;
    }

    public void setIsUse(Short isUse) {
        this.isUse = isUse;
    }
}