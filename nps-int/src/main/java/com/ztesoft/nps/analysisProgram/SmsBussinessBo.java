package com.ztesoft.nps.analysisProgram;

import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.utils.sys.constance.DateFormatConst;
import com.ztesoft.utils.sys.util.*;

import java.util.Date;
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
    public static Map<String,Object> getBaseUrlFromShortUrl(String shortUrl){
        Map<String,Object> result = DatabaseUtil.queryForMap("select * from task_exe where short_url ='"+shortUrl+"'");
        return result;
    }

    public static Map<String,Object> getSurveyResultInfo(String taskId,String channelType,String accNum){
        StringBuffer resQuerySql = new StringBuffer();
        resQuerySql.append(" select * from survey_result where 1=1 ");
        resQuerySql.append(" and task_id='").append(taskId).append("', ");
        resQuerySql.append(" and channel_type='").append(channelType).append("', ");
        resQuerySql.append(" and user_account='").append(accNum).append("' ");
        Map<String,Object> resultMap = DatabaseUtil.queryForMap(resQuerySql.toString());
        return resultMap;
    }

    /**
     * 记录问卷访问信息
     * 更新统计表"开始答卷状态"
     */
    public static void updateAccessRecord(final String taskId, final String channelType, final String accNum, final String flag){
        StringBuffer sql = new StringBuffer();
        if(ConstantUtils.SURVEY_RESULT_UPDATE_TYPE_INSERT.equals(flag)){
            //初始化插入结果表数据
            sql.append(" insert into survey_result(task_id,channel_type,user_account,status,start_time) ");
            sql.append(" values( ");
            sql.append(" '").append(taskId).append("', ");
            sql.append(" '").append(channelType).append("', ");
            sql.append(" '").append(accNum).append("', ");
            sql.append(" '").append(ConstantUtils.SURVEY_RESULT_TYPE_0).append("', ");
            sql.append(" '").append(DateUtil.getFormat(new Date(), DateFormatConst.YMDHMS_)).append("' ");
            DatabaseUtil.updateDateBase(sql.toString());

            //同时更新统计结果 参与人+1 参与率更新
            sql.setLength(0);
            sql.append(" update survey_user_info set ");
            sql.append(" partake_count = partake_count + 1, ");
            sql.append(" partake_ratio = convert(partake_count/task_count,decimal(4,2)) ");
            sql.append(" where task_id = '").append(taskId).append("' ");
            DatabaseUtil.updateDateBase(sql.toString());
        }else{
            //更新统计结果 完成人+1 完成率更新
            sql.setLength(0);
            sql.append(" update survey_user_info set ");
            sql.append(" finish_count = finish_count + 1, ");
            sql.append(" finish_ratio = convert(finish_count/partake_count,decimel(4,2)) ");
            sql.append(" where task_id = '").append(taskId).append("' ");
            DatabaseUtil.updateDateBase(sql.toString());
            sql.setLength(0);
        }
    }

    public static void updateResultStatistics(final String taskId, final Integer option){
        Map<String,Object> countMap = DatabaseUtil.queryForMap("select finish_count from survey_user_info where task_id ='"+taskId+"'");
        Integer finishCount = MapUtil.getInteger(countMap,"finish_count");
        if(finishCount > 0){
            StringBuffer updateSql = new StringBuffer(" update survey_nps_info set ");
            if(option<=6){
                updateSql.append(" nps_count3 = nps_count3 + 1, ");
                updateSql.append(" nps_ratio3 = convert(nps_count3/").append(finishCount).append(",decimel(4,2) )");
            }else if(option<=8){
                updateSql.append(" nps_count2 = nps_count2 + 1, ");
                updateSql.append(" nps_ratio2 = convert(nps_ratio2/").append(finishCount).append(",decimel(4,2) )");
            }else{
                updateSql.append(" nps_count1 = nps_count1 + 1, ");
                updateSql.append(" nps_ratio1 = convert(nps_count1/").append(finishCount).append(",decimel(4,2) )");
            }
            updateSql.append(" where task_id = '").append(taskId).append("' ");
            DatabaseUtil.updateDateBase(updateSql.toString());
            updateSql.setLength(0);
        }
    }

}
