package com.ztesoft.nps.business.qstnaireMgr.model.query;

import io.swagger.annotations.ApiModelProperty;

public class QstnaireIdQuery {
    @ApiModelProperty("问卷ID")
    private String qstnaireId;

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }
}
