package com.ztesoft.nps.business.surveyTaskMgr.service.impl;

import com.ztesoft.nps.business.surveyTaskMgr.mapper.SurveyTaskMapper;
import com.ztesoft.nps.business.surveyTaskMgr.mapper.TaskChannelMapper;
import com.ztesoft.nps.business.surveyTaskMgr.mapper.TaskUserMapper;
import com.ztesoft.nps.business.surveyTaskMgr.model.SurveyTask;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskChannel;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskChannelExample;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskUser;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskAddBo;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskQuery;
import com.ztesoft.nps.business.surveyTaskMgr.service.SurveyTaskMgrService;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.utils.ExcelUtils;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.constance.DateFormatConst;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.DateUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    @Override
    public LPageHelper surveyTaskList(SurveyTaskQuery condition) {
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
    public Map<String, Object> userTargetImport(MultipartFile file) {
        Map<String, Object> result = new HashMap<String, Object>();

        Workbook workbook = ExcelUtils.create(file);

        String taskId = "";
        String channelId = "";

        Map<String, String> accNbrMap = new HashMap<String, String>(); // key:用户号码 | value : 区域id
        int allCount = 0; //保存总数
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

        String batchSaveSql = "insert into task_user(task_user_id,channel_id,task_id,user_account,create_time,area_id,is_test,is_flag,res_sys) values(?,?,?,?,?,?,?,?,?)";
        List<String[]> sqlParamList = new ArrayList<String[]>();
        int saveFlag = 0;
        for (Map.Entry<String, String> entry : userMap.entrySet()) {
            String accNum = entry.getKey();
            String areaId = entry.getValue();
            if (accNum.matches(regexPhone) && !areaSet.contains(areaId)) {
                sqlParamList.add(
                        new String[]{StringUtil.getRandom32PK(), channelId, taskId, accNum,
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

        result.put("allCount", allCount);
        result.put("blackCount", blackCount);
        result.put("repeatCount", repeatCount);
        result.put("limitCount", limitCount);
        return result;
    }

    @Override
    public int userTargetDelete(String taskId) {
        return taskUserMapper.deleteByPrimaryKey(taskId);
    }

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

    @Override
    public void editSurveyTask(SurveyTaskAddBo bo) {
        String taskId = bo.getTaskId();
        //删除渠道信息
        TaskChannelExample example = new TaskChannelExample();
        example.createCriteria().andTaskIdEqualTo(taskId);
        taskChannelMapper.deleteByExample(example);

        //删除任务
        surveyTaskMapper.deleteByPrimaryKey(taskId);

        //新增任务信息
        addSurveyMethod(bo, "add");
    }

    /**
     * 添加任务信息
     *
     * @param bo
     * @param type
     */
    private void addSurveyMethod(SurveyTaskAddBo bo, String type) {
        //插入任务数据
        surveyTaskMapper.insertSelective(caseBo2Bean(bo, type));

        //插入任务渠道信息
        taskChannelMapper.insertSelective(bo.getTaskChannel());

        //插入测试号码
        TaskUser taskUser = new TaskUser();
        List<String> accNumList = bo.getTestNumberList();
        List<String[]> sqlParamList = new ArrayList<String[]>();
        String batchSaveSql = "insert into task_user(task_user_id,channel_id,task_id,user_account,create_time,area_id,is_test,is_flag,res_sys) values(?,?,?,?,?,?,?,?,?)";
        for (String accNum: accNumList) {
            sqlParamList.add(new String[]{StringUtil.getRandom32PK(),bo.getTaskChannel().getChannelId().toString(),bo.getTaskId(),accNum,
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
        } else {
            surveyTask.setStatus(ConstantUtils.SURVEY_TASK_STATUS_02);  //草稿
        }
        surveyTask.setSurveySdate(DateUtil.getDate(bo.getSurveySdate(), DateFormatConst.YMD));
        surveyTask.setSurveyEdate(DateUtil.getDate(bo.getSurveyEdate(), DateFormatConst.YMD));
        surveyTask.setQstnaireId(bo.getQstnaireId());
        surveyTask.setCreateUid(1L);  //这里需要根据当前用户设置
        surveyTask.setCreateTime(new Date());

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
        surveyTaskQuerySql.append(" and tc.channel_type = '2' ");
        if(StringUtil.isNotNull(condition.getTaskName())){
            surveyTaskQuerySql.append(" and st.task_name like '%").append(condition.getTaskName()).append("%'");
        }
        return  surveyTaskQuerySql.toString();
    }

    /**
     * 生成短信
     * @param taskId
     */
    private void createNairePublish(String taskId){

    }
}
