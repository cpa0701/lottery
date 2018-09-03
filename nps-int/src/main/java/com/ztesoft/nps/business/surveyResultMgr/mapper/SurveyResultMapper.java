package com.ztesoft.nps.business.surveyResultMgr.mapper;

import com.ztesoft.nps.business.surveyResultMgr.model.SurveyResult;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyResultExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SurveyResultMapper {
    int countByExample(SurveyResultExample example);

    int deleteByExample(SurveyResultExample example);

    int deleteByPrimaryKey(Long resultId);

    int insert(SurveyResult record);

    int insertSelective(SurveyResult record);

    List<SurveyResult> selectByExample(SurveyResultExample example);

    SurveyResult selectByPrimaryKey(Long resultId);

    int updateByExampleSelective(@Param("record") SurveyResult record, @Param("example") SurveyResultExample example);

    int updateByExample(@Param("record") SurveyResult record, @Param("example") SurveyResultExample example);

    int updateByPrimaryKeySelective(SurveyResult record);

    int updateByPrimaryKey(SurveyResult record);
}