package com.ztesoft.nps.business.surveyTaskMgr.service.impl;

import com.ztesoft.nps.business.surveyTaskMgr.mapper.SurveyTaskMapper;
import com.ztesoft.nps.business.surveyTaskMgr.model.SurveyTask;
import com.ztesoft.nps.business.surveyTaskMgr.model.SurveyTaskAddBo;
import com.ztesoft.nps.business.surveyTaskMgr.service.SurveyTaskMgrService;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.utils.ExcelUtils;
import com.ztesoft.utils.sys.constance.DateFormatConst;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.DateUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by 64671 on 2018/8/28.
 */
@Service("surveyTaskMgrServiceImpl")
public class SurveyTaskMgrServiceImpl implements SurveyTaskMgrService {

    @Autowired
    private SurveyTaskMapper surveyTaskMapper;

    @Override
    public void addSurveyTask(SurveyTaskAddBo bo) {
        //插入任务数据
        surveyTaskMapper.insertSelective(caseBo2Bean(bo));

        //插入任务渠道信息

        //插入调研对象

    }

    @Override
    public void userTargetImport(MultipartFile file) {
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
    private SurveyTask caseBo2Bean(SurveyTaskAddBo bo) {
        SurveyTask surveyTask = new SurveyTask();

        surveyTask.setTaskId(bo.getTaskId());
        surveyTask.setTaskName(bo.getTaskName());
        surveyTask.setTaskType(StringUtil.getShort(bo.getTaskType()));
        surveyTask.setStatus(ConstantUtils.SURVEY_TASK_STATUS_03);  //审批中

        surveyTask.setSurveySdate(DateUtil.getDate(bo.getSurveySdate(), DateFormatConst.YMD));
        surveyTask.setSurveyEdate(DateUtil.getDate(bo.getSurveyEdate(), DateFormatConst.YMD));
        surveyTask.setQstnaireId(bo.getQstnaireId());
        surveyTask.setCreateUid(1L);  //这里需要根据当前用户设置
        surveyTask.setCreateTime(new Date());

        return surveyTask;
    }
}
