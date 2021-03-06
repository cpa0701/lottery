package com.ztesoft.nps.common.utils;

/**
 * Created by 64671 on 2018/8/28.
 */
public class ConstantUtils {

    public static final String RES_SYSTEM_NAME = "NPS";
    public static final String RES_SYSTEM_TOKEN_ALIAS = "NPS-TOKEN";

    public static final String EXECPTION_REQUEST_PARAM_DEFICIENCY = "请求参数缺失！";
    public static final String EXECPTION_EXPORT_FILE_NOT_ALLOWED = "不支持当前版本！";
    public static final String EXECPTION_SYSTEM_DATA_DEFICIENCY = "系统数据异常！";

    public static final String PAGE_NUM_DEFAULT = "1";  //当前页
    public static final String PAGE_SIZE_DEFAULT = "10"; //每页10条

    public static final String SURVEY_TASK_WAY_ALL = "1";  //全量
    public static final String SURVEY_TASK_WAY_SAMPLE = "2"; //抽样

    public static final String SMS_SEND_STREAMING_NO = "08512016011315215";
    public static final String SMS_SEND_USER_10001 = "10001";
    public static final String SMS_SEND_USER_10086 = "10086";
    public static final String SMS_SEND_BASE_URL = "http://10.45.48.139:3000/question.html#/?access_token=";
    public static final String SMS_SEND_Short_URL = "http://10.45.48.139:3000/";

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

    public static final String SURVEY_TASK_TEST_YES = "0";  //测试数据
    public static final String SURVEY_TASK_TEST_NO = "1"; //正式数据

    public static final String SURVEY_RESULT_UPDATE_TYPE_UPDATE = "update";
    public static final String SURVEY_RESULT_UPDATE_TYPE_INSERT = "insert";
    public static final String SURVEY_RESULT_TYPE_0 = "0";  //答题状态 开始
    public static final String SURVEY_RESULT_TYPE_1 = "1";  //答题状态 结束

    public static final String QSTNAIRE_STATUS_00_CHM = "停用";//00 停用
    public static final String QSTNAIRE_STATUS_01_CHM = "启用";//01 启用
    public static final String QSTNAIRE_STATUS_02_CHM = "草稿";//02 草稿
    public static final String QSTNAIRE_STATUS_03_CHM = "待审核";//03 待审核
    public static final String QSTNAIRE_STATUS_04_CHM = "审核不通过";//04 审核不通过

    public static final String QSTNAIRE_STATUS_00 = "00";//00 停用
    public static final String QSTNAIRE_STATUS_01 = "01";//01 启用
    public static final String QSTNAIRE_STATUS_02 = "02";//02 草稿
    public static final String QSTNAIRE_STATUS_03 = "03";//03 待审核
    public static final String QSTNAIRE_STATUS_04 = "04";//04 审核不通过

    public static final String PAGE_QUESTION_ID = "cf7a7a35dec14c4bab5fa6a9b8bf3009";//分页题目ID

    public static final String NPS_RESULT_OPTION_1 = "1"; //nps题目选项
    public static final String NPS_RESULT_OPTION_2 = "2"; //nps题目选项
    public static final String NPS_RESULT_OPTION_3 = "3"; //nps题目选项
    public static final String NPS_RESULT_OPTION_4 = "4"; //nps题目选项
    public static final String NPS_RESULT_OPTION_5 = "5"; //nps题目选项
    public static final String NPS_RESULT_OPTION_6 = "6"; //nps题目选项
    public static final String NPS_RESULT_OPTION_7 = "7"; //nps题目选项
    public static final String NPS_RESULT_OPTION_8 = "8"; //nps题目选项
    public static final String NPS_RESULT_OPTION_9 = "9"; //nps题目选项
    public static final String NPS_RESULT_OPTION_10 = "10"; //nps题目选项

    public static final String LOGIN_ACCEPT = "application/json";
    public static final String LOGIN_CONTENT_TYPE = "application/x-www-form-urlencoded";
    public static final String LOGIN_AUTHORIZATION = "Basic Y2xpZW50LW5wczoxMjM0NTY=";

    public static final String AUTH = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ6dGVzb2Z0Iiwic2NvcGUiOlsibnBzLWFwaSJdLCJvcmdhbml6YXRpb24iOiJ6dGVzb2Z0IiwiYXBwSWQiOiJucHMiLCJleHAiOjE1MzY1ODA5ODYsInVzZXJJZCI6IjEiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOGI0OTlmYmQtNjU0NC00ZTMzLTk0ODYtNGMzMTc5ZWRhNDU3IiwiY2xpZW50X2lkIjoiY2xpZW50LW5wcyJ9.Yn-e9QW4nAxWIzWp5PYRC0vrZWmsYZZfTzKYS4SNGV8";



}
