package com.ztesoft.nps.business.qstnaireMgr.model;

import java.util.Date;

public class QstnaireBank {
    private String qstnaireId;

    private String qstnaireTitle;

    private String qstnaireLeadin;

    private String catalogId;

    private int belongTo;

    private Long createUid;

    private Date createTime;

    private String status;

    private int isInst;

    private Date updateTime;

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

    public int getBelongTo() {
        return belongTo;
    }

    public void setBelongTo(int belongTo) {
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

    public int getIsInst() {
        return isInst;
    }

    public void setIsInst(int isInst) {
        this.isInst = isInst;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "QstnaireBank{" +
                "qstnaireId='" + qstnaireId + '\'' +
                ", qstnaireTitle='" + qstnaireTitle + '\'' +
                ", qstnaireLeadin='" + qstnaireLeadin + '\'' +
                ", catalogId='" + catalogId + '\'' +
                ", belongTo=" + belongTo +
                ", createUid=" + createUid +
                ", createTime=" + createTime +
                ", status='" + status + '\'' +
                ", isInst=" + isInst +
                ", updateTime=" + updateTime +
                '}';
    }
}