package com.ztesoft.nps.common.utils;

import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;

import java.util.Map;

public class LPageHelperExtra extends LPageHelper {
    //构造函数传值
    public LPageHelperExtra(LPageHelper lP){
        super(lP.getRows(),lP.getPageNum(),lP.getPageSize(),lP.getTotalCount());
    }

    private Map<String,Object> other;

    public Map<String, Object> getOther() {
        return other;
    }

    public void setOther(Map<String, Object> other) {
        this.other = other;
    }

}
