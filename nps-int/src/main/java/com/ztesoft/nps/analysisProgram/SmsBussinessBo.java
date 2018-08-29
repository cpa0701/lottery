package com.ztesoft.nps.analysisProgram;

import com.ztesoft.nps.business.surveyTaskMgr.mapper.TaskExeMapper;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExe;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExeExample;
import com.ztesoft.utils.sys.util.ListUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by 64671 on 2018/8/29.
 * 消息推送相关业务
 */
public class SmsBussinessBo {

    @Autowired
    private TaskExeMapper taskExeMapper;
    /**
     * 根据短链接地址获取长链接地址
     * @param shortUrl
     * @return
     */
    public TaskExe getBaseUrlFromShortUrl(String shortUrl){
        TaskExe obj = null;
        TaskExeExample taskExeExample = new TaskExeExample();
        taskExeExample.createCriteria().andShortUrlEqualTo(shortUrl);
        List<TaskExe> taskExeList = taskExeMapper.selectByExample(taskExeExample);
        if(ListUtil.isNotNull(taskExeList) && taskExeList.get(0)!= null){
            obj = taskExeList.get(0);
        }
        return obj;
    }

    /**
     * 记录问卷访问信息
     * 更新统计表"开始答卷状态"
     */
    public void updateAccessRecord(){
        System.out.println("更新状态");
    }

    public void updateQuestionAnswer(){
        System.out.println("更新答题结果统计信息");
    }
}
