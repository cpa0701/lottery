package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/8/28.
 */
public class TaskObject implements Serializable{
    /**
     * 对象类型（标签/手工导入）
     */
    private String objType;

    /**
     * 标签id
     */
    private String lableId;

    public String getObjType() {
        return objType;
    }

    public void setObjType(String objType) {
        this.objType = objType;
    }

    public String getLableId() {
        return lableId;
    }

    public void setLableId(String lableId) {
        this.lableId = lableId;
    }
}
