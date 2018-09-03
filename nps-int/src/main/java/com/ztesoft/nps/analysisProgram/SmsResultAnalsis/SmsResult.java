package com.ztesoft.nps.analysisProgram.SmsResultAnalsis;

import com.ztesoft.nps.analysisProgram.SmsBussinessBo;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.LogUtil;
import com.ztesoft.utils.sys.util.StringUtil;

/**
 * Created by 64671 on 2018/9/1.
 */
public class SmsResult {
    /**
     * 调研任务结果流水号
     */
    private String resultId;
    /**
     * 调研任务id
     */
    private String taskId;
    /**
     *  nps题答案
     */
    private Integer option;

    public String getResultId(){
        return this.resultId;
    }

    public SmsResult(String resultId,String taskId,Integer option){
        super();
        this.resultId = resultId;
        this.taskId = taskId;
        this.option = option;
    }

    public String invokeAnalysis(){
        String result = "NO";
        try{
            //对提交答卷的结果分析统一管理
            SmsBussinessBo.updateResultStatistics(taskId,option);
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public String getTaskId() {
        return taskId;
    }

    public Integer getResultStr() {
        return option;
    }
}
