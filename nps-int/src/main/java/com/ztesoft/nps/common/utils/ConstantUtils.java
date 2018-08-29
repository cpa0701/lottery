package com.ztesoft.nps.common.utils;

/**
 * Created by 64671 on 2018/8/28.
 */
public class ConstantUtils {

    public static final String RES_SYSTEM_NAME = "NPS";

    public static final String PAGE_PARAMS_DEFICIENCY = "分页参数缺失";
    public static final String EXPORT_FILE_NOT_ALLOWED = "不支持当前版本！";

    /**调查任务表survey_task的任务状态STATUS*/
    public static final String SURVEY_TASK_STATUS_00 = "00";//00 正常结束
    public static final String SURVEY_TASK_STATUS_01 = "01";//01 执行中
    public static final String SURVEY_TASK_STATUS_02 = "02";//02 草稿
    public static final String SURVEY_TASK_STATUS_03 = "03";//03 审批中
    public static final String SURVEY_TASK_STATUS_04 = "04";//04 审核退单
    public static final String SURVEY_TASK_STATUS_05 = "05";//05 审核作废
    public static final String SURVEY_TASK_STATUS_06 = "06";//06 发布中
    public static final String SURVEY_TASK_STATUS_10 = "10";//10 人工终止

    public static final String SURVEY_TASK_CHANNEL_0 = "0";//链接与二维码
    public static final String SURVEY_TASK_CHANNEL_1 = "1";//微信
    public static final String SURVEY_TASK_CHANNEL_2 = "2";//邮件
    public static final String SURVEY_TASK_CHANNEL_3 = "3";//短信
}
