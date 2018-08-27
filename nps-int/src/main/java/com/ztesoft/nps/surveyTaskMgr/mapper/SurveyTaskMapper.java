package com.ztesoft.nps.surveyTaskMgr.mapper;

import com.ztesoft.nps.surveyTaskMgr.model.SurveyTask;
import com.ztesoft.nps.surveyTaskMgr.model.SurveyTaskExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SurveyTaskMapper {
    int countByExample(SurveyTaskExample example);

    int deleteByExample(SurveyTaskExample example);

    int deleteByPrimaryKey(String taskId);

    int insert(SurveyTask record);

    int insertSelective(SurveyTask record);

    List<SurveyTask> selectByExample(SurveyTaskExample example);

    SurveyTask selectByPrimaryKey(String taskId);

    int updateByExampleSelective(@Param("record") SurveyTask record, @Param("example") SurveyTaskExample example);

    int updateByExample(@Param("record") SurveyTask record, @Param("example") SurveyTaskExample example);

    int updateByPrimaryKeySelective(SurveyTask record);

    int updateByPrimaryKey(SurveyTask record);
}