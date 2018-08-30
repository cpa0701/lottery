package com.ztesoft.nps.analysisProgram.SmsAccessAnalysis;

import com.ztesoft.nps.analysisProgram.SmsBussinessBo;
import com.ztesoft.utils.sys.util.LogUtil;

/**
 * Created by 64671 on 2018/8/29.
 */
public class SmsAccess {
    private String accessId;  //taskExe表serail_id
    private String taskId; //调研任务id

    public SmsAccess(String accessId,String taskId){
        super();
        this.accessId = accessId;
        this.taskId = taskId;
    }

    public String getAccessId(){
        return this.accessId;
    }

    public String invokeAnalysis(){
        String result = "NO";
        try{
            SmsBussinessBo service = new SmsBussinessBo();
            service.updateAccessRecord(getTaskId());
            result = "OK";
        }catch(Exception e){
            LogUtil.error(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}
