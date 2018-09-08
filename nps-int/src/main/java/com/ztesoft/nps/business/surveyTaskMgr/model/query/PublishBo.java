package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import io.swagger.annotations.ApiModelProperty;

public class PublishBo {
    @ApiModelProperty("状态码")
    private int code;
    @ApiModelProperty("描述信息")
    private String desInfo;

    public PublishBo(int code ,String desInfo){
        this.code = code;
        this.desInfo = desInfo;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getDesInfo() {
        return desInfo;
    }

    public void setDesInfo(String desInfo) {
        this.desInfo = desInfo;
    }
}
