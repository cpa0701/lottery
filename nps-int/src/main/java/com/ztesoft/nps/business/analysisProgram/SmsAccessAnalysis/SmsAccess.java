package com.ztesoft.nps.business.analysisProgram.SmsAccessAnalysis;

import com.ztesoft.nps.business.analysisProgram.SmsBussinessBo;
import com.ztesoft.utils.sys.util.LogUtil;

/**
 * Created by 64671 on 2018/8/29.
 */
public class SmsAccess {
    private String accessId;

    public SmsAccess(String accessId){
        super();
        this.accessId = accessId;
    }

    public String getAccessId(){
        return this.accessId;
    }

    public String invokeAnalysis(){
        String result = "NO";
        try{
            SmsBussinessBo service = new SmsBussinessBo();
            service.updateAccessRecord();
            result = "OK";
        }catch(Exception e){
            LogUtil.error(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

}
