package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/8/30.
 */
public class GetTokenFromNPSReqVo implements Serializable {
    private static final long serialVersionUID = 1L;

    public String streamingNo;
    public String npsTaskNo;
    public String sysId;
    public String prodInstId;
    public String channelType;

    public String getStreamingNo() {
        return streamingNo;
    }

    public void setStreamingNo(String streamingNo) {
        this.streamingNo = streamingNo;
    }

    public String getNpsTaskNo() {
        return npsTaskNo;
    }

    public void setNpsTaskNo(String npsTaskNo) {
        this.npsTaskNo = npsTaskNo;
    }

    public String getSysId() {
        return sysId;
    }

    public void setSysId(String sysId) {
        this.sysId = sysId;
    }

    public String getProdInstId() {
        return prodInstId;
    }

    public void setProdInstId(String prodInstId) {
        this.prodInstId = prodInstId;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }

    public String toString() {
        return getNpsTaskNo() + getSysId() + getProdInstId() + getChannelType() + "nps-token";
    }
}
