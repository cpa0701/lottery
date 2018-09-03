package com.ztesoft.nps.analysisProgram.SmsAccessAnalysis;

import com.ztesoft.nps.analysisProgram.SmsBussinessBo;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.LogUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/29.
 */
public class SmsAccess {
    private String accessId;  //taskExe表serail_id
    private String taskId; //调研任务id
    private String channelType; //渠道
    private String accNum; //目标用户

    public SmsAccess(String accessId,String taskId,String channelType, String accNum){
        super();
        this.accessId = accessId;
        this.taskId = taskId;
        this.channelType = channelType;
        this.accNum = accNum;
    }

    public String getAccessId(){
        return this.accessId;
    }

    public String invokeAnalysis(){
        String result = "NO";
        try{
            //对问卷初始化访问、提交答卷的人数统一管理
            Map<String,Object> resultMap = SmsBussinessBo.getSurveyResultInfo(taskId,channelType,accNum);
            if(MapUtil.isNull(resultMap)){
                //处理问卷初始化队列信息
                SmsBussinessBo.updateAccessRecord(taskId,channelType,accNum,ConstantUtils.SURVEY_RESULT_UPDATE_TYPE_INSERT);
            }else{
                //处理提交答卷队列信息
                if(ConstantUtils.SURVEY_RESULT_TYPE_1.equals(MapUtil.getString(resultMap,"status"))){
                    SmsBussinessBo.updateAccessRecord(taskId,channelType,accNum,ConstantUtils.SURVEY_RESULT_UPDATE_TYPE_UPDATE);
                }
            }
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

    public String getChannelType() {
        return channelType;
    }

    public String getAccNum() {
        return accNum;
    }

}
