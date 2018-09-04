package com.ztesoft.nps.business.surveyTaskMgr.service.impl;

import com.ztesoft.nps.business.surveyResultMgr.mapper.SurveyNpsInfoMapper;
import com.ztesoft.nps.business.surveyResultMgr.mapper.SurveyUserInfoMapper;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyNpsInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyUserInfo;
import com.ztesoft.nps.business.surveyTaskMgr.mapper.SurveyTaskMapper;
import com.ztesoft.nps.business.surveyTaskMgr.mapper.TaskChannelMapper;
import com.ztesoft.nps.business.surveyTaskMgr.mapper.TaskUserMapper;
import com.ztesoft.nps.business.surveyTaskMgr.model.*;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.*;
import com.ztesoft.nps.business.surveyTaskMgr.service.SurveyTaskMgrService;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.utils.ExcelUtils;
import com.ztesoft.nps.common.utils.Md5Tool;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.constance.DateFormatConst;
import com.ztesoft.utils.sys.util.*;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.*;

/**
 * Created by 64671 on 2018/8/28.
 */
@Service("surveyTaskMgrServiceImpl")
public class SurveyTaskMgrServiceImpl implements SurveyTaskMgrService {

    @Autowired
    private SurveyTaskMapper surveyTaskMapper;

    @Autowired
    private TaskChannelMapper taskChannelMapper;

    @Autowired
    private TaskUserMapper taskUserMapper;

    @Autowired
    private SurveyUserInfoMapper surveyUserInfoMapper;

    @Autowired
    private SurveyNpsInfoMapper surveyNpsInfoMapper;

    @Override
    public LPageHelper surveyTaskList(SurveyTaskQuery condition) {
        if(StringUtil.isNull(condition.getPageNum())){
            condition.setPageNum(ConstantUtils.PAGE_NUM_DEFAULT);
        }
        if(StringUtil.isNull(condition.getPageSize())){
            condition.setPageSize(ConstantUtils.PAGE_SIZE_DEFAULT);
        }
        return DatabaseUtil.queryForPageResult(getSurveyTaskQuerySql(condition),
                StringUtil.getInteger(condition.getPageNum()),
                StringUtil.getInteger(condition.getPageSize()));
    }

    @Override
    public void addSurveyTask(SurveyTaskAddBo bo) {
        addSurveyMethod(bo, "add");
    }

    @Override
    public void addSurveyTaskToDraft(SurveyTaskAddBo bo) {
        addSurveyMethod(bo, "draft");
    }

    @Override
    public Map<String, Object> userTargetImport(UserTargetBo bo,MultipartFile file) {
        Map<String, Object> result = new HashMap<String, Object>();

        Workbook workbook = ExcelUtils.create(file);

        String taskId = bo.getTaskId();
        String channelType = bo.getChannelType();

        Map<String, String> accNbrMap = new HashMap<String, String>(); // key:用户号码 | value : 区域id
        int allCount = 0; //导入总数
        int blackCount = 0; //黑名单剔除数
        int repeatCount = 0; //重复剔除数
        int limitCount = 0;  //不符合规格剔除数(电话号码and区域id)

        Map<String, Object> initData = initExcelImportData(workbook);
        Map<String, String> userMap = (Map<String, String>) initData.get("userMap");

        allCount = MapUtil.getInteger(initData, "allCount");
        repeatCount = allCount - userMap.size();

        //查询区域信息
        Set<String> areaSet = new HashSet<String>();

        String regexPhone = "^(1[0-9])\\d{9}$";

        String batchSaveSql = "insert into task_user(task_user_id,channel_type,task_id,user_account,create_time,area_id,is_test,is_flag,res_sys) values(?,?,?,?,?,?,?,?,?)";
        List<String[]> sqlParamList = new ArrayList<String[]>();
        int saveFlag = 0;
        for (Map.Entry<String, String> entry : userMap.entrySet()) {
            String accNum = entry.getKey();
            String areaId = entry.getValue();
            if (accNum.matches(regexPhone) && !areaSet.contains(areaId)) {
                sqlParamList.add(
                        new String[]{StringUtil.getRandom32PK(), channelType, taskId, accNum,
                                DateUtil.getFormat(new Date(), DateFormatConst.YMDHM_), areaId, "1", "1", ConstantUtils.RES_SYSTEM_NAME});
                saveFlag++;
            } else {
                limitCount++;
            }

            if (saveFlag != 0 && saveFlag % 20000 == 0) {//20000上传一次
                try {
                    DatabaseUtil.excuteBatch(batchSaveSql, sqlParamList);
                } catch (SQLException e) {
                    throw new NpsBusinessException(e.getMessage());
                }
                sqlParamList.clear();
            }
        }

        if (sqlParamList != null && sqlParamList.size() > 0) {
            try {
                DatabaseUtil.excuteBatch(batchSaveSql, sqlParamList);
            } catch (SQLException e) {
                throw new NpsBusinessException(e.getMessage());
            }
            sqlParamList.clear();
        }

        result.put("allCount", allCount);  //导入总数
        result.put("blackCount", blackCount);  //黑名单剔除数
        result.put("repeatCount", repeatCount);  //重复剔除数
        result.put("limitCount", limitCount);  //不符合规格剔除数(电话号码and区域id)
        result.put("sumCount","");//数据库统计条数
        return result;
    }

    @Override
    public int userTargetDelete(SurveyTaskDelBo bo) {
        TaskUserExample taskUserExample = new TaskUserExample();
        TaskUserExample.Criteria criteria = taskUserExample.createCriteria();
        criteria.andTaskIdEqualTo(bo.getTaskId());
        if(StringUtil.isNotNull(bo.getChannelType())){
            criteria.andChannelTypeEqualTo(StringUtil.getShort(bo.getChannelType()));
        }
        return taskUserMapper.deleteByExample(taskUserExample);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public int deleteSurveyTask(String taskId) {
        //删除目标号码
        taskUserMapper.deleteByPrimaryKey(taskId);

        //删除渠道信息
        TaskChannelExample example = new TaskChannelExample();
        example.createCriteria().andTaskIdEqualTo(taskId);
        taskChannelMapper.deleteByExample(example);

        //删除任务
        surveyTaskMapper.deleteByPrimaryKey(taskId);
        return 1;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void editSurveyTask(SurveyTaskAddBo bo) {
        String taskId = bo.getTaskId();
        //删除渠道信息
        TaskChannelExample example = new TaskChannelExample();
        example.createCriteria().andTaskIdEqualTo(taskId);
        taskChannelMapper.deleteByExample(example);

        //更新任务信息
        surveyTaskMapper.updateByPrimaryKeySelective(caseBo2Bean(bo,"edit"));

        addSurveyMethod(bo,"edit");
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void publishSurvetTask(SurveyTaskPublishBo bo) {
        createSmsSend(bo,ConstantUtils.SURVEY_TASK_TEST_NO);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void testPublishSurvetTask(SurveyTaskPublishBo bo) {
        createSmsSend(bo,ConstantUtils.SURVEY_TASK_TEST_YES);
    }

    /**
     * 生成推送消息
     */
    private void createSmsSend(SurveyTaskPublishBo bo,String isTest){
        //获取上传的目标对象
        String queryTargetUsers = getQueryTargetUserSql(bo,isTest);
        List<Map<String,Object>> targetUserList = DatabaseUtil.queryForList(queryTargetUsers);
        if(ListUtil.isNull(targetUserList)){
            throw new NpsBusinessException(ConstantUtils.EXECPTION_SYSTEM_DATA_DEFICIENCY);
        }

        List<Map<String,Object>> realUserList = new ArrayList<Map<String,Object>>();
        if(isTest.equals(ConstantUtils.SURVEY_TASK_TEST_NO)){  //如果是正式发布
            //根据需要推送的数目获取推送对象
            int realSum = getRealTargetUserSum(bo);
            if(realSum==0 || targetUserList.size()<realSum){
                throw new NpsBusinessException(ConstantUtils.EXECPTION_SYSTEM_DATA_DEFICIENCY);
            }

            Random rand = new Random();
            List<Integer> tempList=new ArrayList<Integer>();
            for(int i=0;i<realSum;i++){
                int index = rand.nextInt(targetUserList.size());
                if(!tempList.contains(index)){
                    tempList.add(index);
                    realUserList.add(targetUserList.get(index));
                }else{
                    i--;
                }
            }
            tempList.clear();
        }else{  //如果是测试
            realUserList = targetUserList;
        }

        //生成token入库
        List<String[]> smsList = new ArrayList<String[]>();
        List<String[]> authTokenInsertSqlList = new ArrayList<String[]>();
        StringBuilder baseUrl = new StringBuilder();
        for (Map<String,Object> userMap : realUserList) {
            TaskExe taskExe = new TaskExe();
            taskExe.setSerialId(StringUtil.getRandom6Number(32));
            taskExe.setTaskId(MapUtil.getString(userMap,"task_id"));
            taskExe.setChannelType(MapUtil.getShort(userMap,"chanel_type"));
            taskExe.setSendUser(ConstantUtils.SMS_SEND_USER_10001);
            taskExe.setTargetUser(MapUtil.getString(userMap,"user_account"));
            taskExe.setIsTest(new Short("0"));
            taskExe.setSmContent(MapUtil.getString(userMap,"sms_content"));
            taskExe.setCreatTime(new Date());

            baseUrl.append(ConstantUtils.SMS_SEND_BASE_URL)
                    .append(getAccessToken(taskExe,MapUtil.getString(userMap,"task_user_id"),authTokenInsertSqlList))
                    .append("&prod_inst_id=").append(taskExe.getTargetUser())
                    .append("&sys_id=").append(taskExe.getSendUser())
                    .append("&tid=").append(taskExe.getTaskId())
                    .append("&t=").append(new Date().getTime());

            taskExe.setBaseUrl(baseUrl.toString());
            taskExe.setShortUrl(ShortUrlUtils.shortUrl(taskExe.getBaseUrl()));

            smsList.add(new String[]{
                    taskExe.getSerialId(),taskExe.getTaskId(),taskExe.getChannelType().toString(),
                    taskExe.getSendUser(),taskExe.getTargetUser(),taskExe.getIsTest().toString(),
                    taskExe.getSmContent(),DateUtil.getFormat(taskExe.getCreatTime(),DateFormatConst.YMDHMS_),
                    taskExe.getBaseUrl(),taskExe.getShortUrl()
            });
            baseUrl.setLength(0);
        }

        if(ListUtil.isNull(authTokenInsertSqlList) || ListUtil.isNull(smsList)){
            throw new NpsBusinessException(ConstantUtils.EXECPTION_SYSTEM_DATA_DEFICIENCY);
        }

        int batchSave = 20000;
        //生成token数据
        String insertAuthTokenSql = "insert into auth_token(create_time,token,task_user_id)values(?,?,?)";
        long startTime = System.currentTimeMillis();
        try {
            DatabaseUtil.excuteBatch(insertAuthTokenSql, authTokenInsertSqlList,batchSave);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        long endTime = System.currentTimeMillis();
        LogUtil.log("用户token表批量保存，taskid:"+bo.getTaskId()+" 共"+authTokenInsertSqlList.size()+"条数据 ,  每次保存"+batchSave+ "条 , 总耗时"+(endTime-startTime)+"ms ");

        //生成消息数据
        String insertTaskExeSql = "insert into task_exe(serial_id,task_id,channel_type,send_user,target_user," +
                "is_test,sm_content,creat_time,base_url,short_url)valus(?,?,?,?,?,?,?,?,?,?)";
        long startTime1 = System.currentTimeMillis();
        try {
            DatabaseUtil.excuteBatch(insertTaskExeSql, smsList,batchSave);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        long endTime1 = System.currentTimeMillis();
        LogUtil.log("短信发送表批量保存，taskid:"+bo.getTaskId()+" 共"+smsList.size()+"条数据 ,  每次保存"+batchSave+ "条 , 总耗时"+(endTime1-startTime1)+"ms ");

        //生成调研结果统计表结果基础数据
        if(isTest.equals(ConstantUtils.SURVEY_TASK_TEST_NO)){
            createSurveyTaskResultBaseData(bo.getTaskId(),smsList.size());
        }
    }

    /**
     * 调研任务发布之后，生成调研结果基础数据
     * @param taskId
     * @param taskNum 调研对象数量
     */
    private void createSurveyTaskResultBaseData(String taskId,int taskNum){
        Map<String,Object> surveyTaskResult = DatabaseUtil.queryForMap(
                "select * from survey_task where task_id ='"+taskId+"'");
        //调研对象分析
        SurveyUserInfo surveyUserInfo = new SurveyUserInfo();
        surveyUserInfo.setTaskId(MapUtil.getString(surveyTaskResult,"task_id"));
        surveyUserInfo.setTaskName(MapUtil.getString(surveyTaskResult,"task_name"));
        surveyUserInfo.setQstnaireId(MapUtil.getString(surveyTaskResult,"qstnaire_id"));
        surveyUserInfo.setTaskCount(Long.valueOf(taskNum));
        surveyUserInfo.setTaskType(MapUtil.getShort(surveyTaskResult,"task_type"));
        surveyUserInfo.setCreateDate(new Date());
        surveyUserInfoMapper.insertSelective(surveyUserInfo);

        //调研nps分析
        SurveyNpsInfo surveyNpsInfo = new SurveyNpsInfo();
        surveyNpsInfo.setTaskId(MapUtil.getString(surveyTaskResult,"task_id"));
        surveyNpsInfo.setTaskName(MapUtil.getString(surveyTaskResult,"task_name"));
        surveyNpsInfo.setQstnaireId(MapUtil.getString(surveyTaskResult,"qstnaire_id"));
        surveyNpsInfo.setTaskType(MapUtil.getShort(surveyTaskResult,"task_type"));
        surveyNpsInfo.setCreateDate(new Date());
        surveyNpsInfoMapper.insertSelective(surveyNpsInfo);
    }

    /**
     * 添加任务信息
     *
     * @param bo
     * @param type
     */
    private void addSurveyMethod(SurveyTaskAddBo bo, String type) {
        if(!type.equals("edit")){
            //插入任务数据
            surveyTaskMapper.insertSelective(caseBo2Bean(bo, type));
        }
        //插入任务渠道信息
        taskChannelMapper.insertSelective(bo.getTaskChannel());

        //插入测试号码
        TaskUser taskUser = new TaskUser();
        List<String> accNumList = bo.getTestNumberList();
        List<String[]> sqlParamList = new ArrayList<String[]>();
        String batchSaveSql = "insert into task_user(task_user_id,channel_type,task_id,user_account,create_time,area_id,is_test,is_flag,res_sys) values(?,?,?,?,?,?,?,?,?)";
        for (String accNum: accNumList) {
            sqlParamList.add(new String[]{StringUtil.getRandom32PK(),bo.getTaskChannel().getChannelType().toString(),bo.getTaskId(),accNum,
                DateUtil.getFormat(new Date(),DateFormatConst.YMDHMS_),"","0","1",ConstantUtils.RES_SYSTEM_NAME});
        }

        try {
            DatabaseUtil.excuteBatch(batchSaveSql, sqlParamList);
        } catch (SQLException e) {
            throw new NpsBusinessException(e.getMessage());
        }
        sqlParamList.clear();

    }

    /**
     * 初始化获取excel信息
     *
     * @param workbook
     * @return
     */
    private Map<String, Object> initExcelImportData(Workbook workbook) {
        Map<String, Object> resultMap = new HashMap<String, Object>();

        Map<String, String> userMap = new HashMap<String, String>();
        int allCount = 0;
        for (int k = 0; k < workbook.getNumberOfSheets(); k++) {
            Sheet sheet = workbook.getSheetAt(k);
            int rows = sheet.getPhysicalNumberOfRows();
            // 遍历行（忽略第一行标题）
            for (int i = 1; i < rows; i++) {
                // 读取行
                Row row = sheet.getRow(i);
                // 行不为空
                if (row != null) {
                    // 获取本行中所有有数据的列数
                    int cells = row.getPhysicalNumberOfCells();
                    String value = "";
                    // 遍历列
                    for (int j = 0; j < cells; j = j + 2) {//两行两行的遍历
                        // 获取列的值
                        Cell cellMobilePhone = row.getCell(j);
                        Cell cellAreaId = row.getCell(j + 1);
                        if (cellMobilePhone != null && cellAreaId != null) {
                            if (cellMobilePhone.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                                if (cellAreaId.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                                    userMap.put(String.format("%11.0f", cellMobilePhone.getNumericCellValue()), String.format("%11.0f", cellAreaId.getNumericCellValue()));
                                    allCount++;
                                }
                            }
                        }
                    }
                }
            }
        }
        resultMap.put("userMap", userMap);
        resultMap.put("allCount", allCount);
        return resultMap;
    }

    /**
     * 转化参数为业务bean
     *
     * @param bo
     * @return
     */
    private SurveyTask caseBo2Bean(SurveyTaskAddBo bo, String type) {
        SurveyTask surveyTask = new SurveyTask();

        surveyTask.setTaskId(bo.getTaskId());
        surveyTask.setTaskName(bo.getTaskName());
        surveyTask.setTaskType(StringUtil.getShort(bo.getTaskType()));
        if (type.equals("add")) {
            surveyTask.setStatus(ConstantUtils.SURVEY_TASK_STATUS_03);  //审批中
        } else if (type.equals("draft")){
            surveyTask.setStatus(ConstantUtils.SURVEY_TASK_STATUS_02);  //草稿
        }
        surveyTask.setSurveySdate(DateUtil.getDate(bo.getSurveySdate(), DateFormatConst.YMD));
        surveyTask.setSurveyEdate(DateUtil.getDate(bo.getSurveyEdate(), DateFormatConst.YMD));
        surveyTask.setQstnaireId(bo.getQstnaireId());
        if(!type.equals("edit")){
            surveyTask.setCreateUid(1L);  //这里需要根据当前用户设置
            surveyTask.setCreateTime(new Date());
        }
        surveyTask.setUpdateTime(new Date());

        return surveyTask;
    }

    /**
     * 获取任务列表查询sql
     * @param condition
     * @return
     */
    private String getSurveyTaskQuerySql(SurveyTaskQuery condition){
        StringBuilder surveyTaskQuerySql = new StringBuilder();
        surveyTaskQuerySql.append(" select st.task_id as taskId, qc.catalog_name as catalogName, ");
        surveyTaskQuerySql.append("     '").append(ConstantUtils.SURVEY_TASK_CHANNEL_3).append("' as channelName, ");
        surveyTaskQuerySql.append("     CASE st.status ");
        surveyTaskQuerySql.append("         WHEN '00' then '").append(ConstantUtils.SURVEY_TASK_STATUS_00).append("' ");
        surveyTaskQuerySql.append("         WHEN '01' then '").append(ConstantUtils.SURVEY_TASK_STATUS_01).append("' ");
        surveyTaskQuerySql.append("         WHEN '02' then '").append(ConstantUtils.SURVEY_TASK_STATUS_02).append("' ");
        surveyTaskQuerySql.append("         WHEN '03' then '").append(ConstantUtils.SURVEY_TASK_STATUS_03).append("' ");
        surveyTaskQuerySql.append("         WHEN '04' then '").append(ConstantUtils.SURVEY_TASK_STATUS_04).append("' ");
        surveyTaskQuerySql.append("         WHEN '05' then '").append(ConstantUtils.SURVEY_TASK_STATUS_05).append("' ");
        surveyTaskQuerySql.append("         WHEN '06' then '").append(ConstantUtils.SURVEY_TASK_STATUS_06).append("' ");
        surveyTaskQuerySql.append("     END '").append(ConstantUtils.SURVEY_TASK_STATUS_10).append("', ");
        surveyTaskQuerySql.append("     st.create_time as createTime, tc.user_sum as userSum ");
        surveyTaskQuerySql.append(" from survey_task st ");
        surveyTaskQuerySql.append(" left join qstnaire_bank qb on st.qstnaire_id = qb.qstnaire_id ");
        surveyTaskQuerySql.append(" left join qstnaire_catalog qc on qc.catalog_id = qb.catalog_id ");
        surveyTaskQuerySql.append(" left join task_channel tc on st.task_id = tc.task_id ");
        surveyTaskQuerySql.append(" where 1=1 ");
        surveyTaskQuerySql.append(" and qc.status = '00A' ");
        surveyTaskQuerySql.append(" and tc.channel_type = '3' ");
        if(StringUtil.isNotNull(condition.getTaskName())){
            surveyTaskQuerySql.append(" and st.task_name like '%").append(condition.getTaskName()).append("%'");
        }
        if(StringUtil.isNotNull(condition.getTaskType())){
            surveyTaskQuerySql.append(" and st.task_type = '").append(condition.getTaskType()).append("'");
        }
        if(StringUtil.isNotNull(condition.getStatus())){
            surveyTaskQuerySql.append(" and st.status = '").append(condition.getStatus()).append("'");
        }
        surveyTaskQuerySql.append(" order by st.update_time desc ");
        return  surveyTaskQuerySql.toString();
    }

    /**
     * 查询上传的目标对象
     * @param bo
     * @return
     */
    private String getQueryTargetUserSql(SurveyTaskPublishBo bo,String type){
        StringBuilder queryTargetUserSql = new StringBuilder();
        queryTargetUserSql.append(" select tu.*,tc.sms_content from task_user tu ");
        queryTargetUserSql.append(" left join task_channel tc ");
        queryTargetUserSql.append(" on tu.task_id = tc.task_id and tu.channel_type= tc.channel_type ");
        queryTargetUserSql.append(" where 1=1 ");
        queryTargetUserSql.append(" and tu.task_id = '").append(bo.getTaskId()).append("' ");
        if(StringUtil.isNotNull(bo.getChannelType())){
            queryTargetUserSql.append(" and tu.channel_type = '").append(bo.getChannelType()).append("'");
        }
        if(StringUtil.isNotNull(type)){
            queryTargetUserSql.append(" and tu.is_test = '").append(type).append("' ");
        }
        return queryTargetUserSql.toString();
    }

    /**
     * 获取需要推送的用户(全量则取全部，抽样则根据抽样数量获取)
     * @return
     */
    private int getRealTargetUserSum(SurveyTaskPublishBo bo){
        //获取抽样方式信息
        Map<String,Object> taskChannelMap = DatabaseUtil.queryForMap(getTaskChanelInfoSql(bo));
        int realSum = 0;
        if(ConstantUtils.SURVEY_TASK_WAY_ALL.equals(MapUtil.getString(taskChannelMap,"sample_type"))){
            realSum = MapUtil.getInteger(taskChannelMap,"sample_sum");
        }else{
            realSum = MapUtil.getInteger(taskChannelMap,"user_sum");
        }
        return realSum;
    }

    /**
     * 根据任务id和渠道查询
     * @param bo
     * @return
     */
    private String getTaskChanelInfoSql(SurveyTaskPublishBo bo){
        StringBuilder taskChanelInfoSql = new StringBuilder();
        taskChanelInfoSql.append(" select * from task_channel ");
        taskChanelInfoSql.append(" where 1=1 ");
        if(StringUtil.isNotNull(bo.getTaskId())){
            taskChanelInfoSql.append(" and task_id = '").append(bo.getTaskId()).append("' ");
        }
        if(StringUtil.isNotNull(bo.getChannelType())){
            taskChanelInfoSql.append(" and channel_type = '").append(bo.getChannelType()).append("' ");
        }
        return taskChanelInfoSql.toString();
    }

    /**
     * 获取用户token
     * @param taskExe
     * @param authTokenInsertSqlList
     * @return
     */
    private String getAccessToken(TaskExe taskExe,String uid,List<String[]> authTokenInsertSqlList){
        GetTokenFromNPSReqVo reqVo = new GetTokenFromNPSReqVo();
        reqVo.setNpsTaskNo(taskExe.getTaskId());
        reqVo.setSysId(taskExe.getSendUser());
        reqVo.setProdInstId(taskExe.getTargetUser());
        String accessToken = Md5Tool.getHashString(reqVo.toString()).toUpperCase();
        authTokenInsertSqlList.add(new String[]{ DateUtil.getFormat(new Date(),DateFormatConst.YMDHMS_),accessToken,uid });
        return accessToken;
    }
}
