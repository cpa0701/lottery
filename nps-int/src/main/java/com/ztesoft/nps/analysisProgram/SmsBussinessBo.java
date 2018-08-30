package com.ztesoft.nps.analysisProgram;

import com.ztesoft.nps.business.surveyTaskMgr.mapper.TaskExeMapper;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExe;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExeExample;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.ListUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * Created by 64671 on 2018/8/29.
 * 消息推送相关业务
 */
public class SmsBussinessBo {

    /**
     * 根据短链接地址获取长链接地址
     * @param shortUrl
     * @return
     */
    public Map<String,Object> getBaseUrlFromShortUrl(String shortUrl){
        Map<String,Object> result = DatabaseUtil.queryForMap("select * from task_exe where short_url ='"+shortUrl+"'");
        return result;
    }

    /**
     * 记录问卷访问信息
     * 更新统计表"开始答卷状态"
     */
    public void updateAccessRecord(String taskId){
        if(StringUtil.isNotNull(taskId)){
            StringBuilder sql = new StringBuilder();
            sql.append(" update survey_user_info set partake_count = partake_count + 1 ");
            sql.append(" where task_id = '").append(taskId).append("' ");
            DatabaseUtil.updateDateBase(sql.toString());
        }
    }

    public void updateQuestionAnswer(){
        System.out.println("更新答题结果统计信息");
    }
}
