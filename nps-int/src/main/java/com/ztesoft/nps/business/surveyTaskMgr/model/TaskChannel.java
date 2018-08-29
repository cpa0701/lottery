package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/8/28.
 */
public class TaskChannel implements Serializable {

    /**
     * 调研渠道id
     */
    private String channelId;

    /**
     *  获取样本方式（1全量/ 2抽样）
     */
    private String surveyMagnitude;

    /**
     * 短信下发量
     */
    private String smsNum;

    /**
     * 短信下发方式（1短信超链接 / 2短信纯文本）
     */
    private String smsWay;

    /**
     * 短信提示语
     */
    private String busiName;

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getSurveyMagnitude() {
        return surveyMagnitude;
    }

    public void setSurveyMagnitude(String surveyMagnitude) {
        this.surveyMagnitude = surveyMagnitude;
    }

    public String getSmsNum() {
        return smsNum;
    }

    public void setSmsNum(String smsNum) {
        this.smsNum = smsNum;
    }

    public String getSmsWay() {
        return smsWay;
    }

    public void setSmsWay(String smsWay) {
        this.smsWay = smsWay;
    }

    public String getBusiName() {
        return busiName;
    }

    public void setBusiName(String busiName) {
        this.busiName = busiName;
    }
}
