package com.ztesoft.nps.business.qstnaireMgr.model.query;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireBank;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

public class QstnaireBankQuery {
    @ApiModelProperty("问卷ID")
    private String qstnaireId;
    @ApiModelProperty("问卷标题")
    private String qstnaireTitle;
    @ApiModelProperty("问卷状态")
    private String status;
    @ApiModelProperty("更新时间")
    private Date updateTime;
    @ApiModelProperty("起始页")
    private String pageNum;
    @ApiModelProperty("每页大小")
    private String pageSize;
    @ApiModelProperty("目录")
    private String catalogName;
    @ApiModelProperty("创建人名字")
    private String createUname;

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }

    public String getQstnaireTitle() {
        return qstnaireTitle;
    }

    public void setQstnaireTitle(String qstnaireTitle) {
        this.qstnaireTitle = qstnaireTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
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

    public String getCatalogName() {
        return catalogName;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }

    public String getCreateUname() {
        return createUname;
    }

    public void setCreateUname(String createUname) {
        this.createUname = createUname;
    }
}
