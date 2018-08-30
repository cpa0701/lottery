package com.ztesoft.nps.business.surveyResultMgr.mapper;

import com.ztesoft.nps.business.surveyResultMgr.model.SurveyNpsInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyNpsInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SurveyNpsInfoMapper {
    int countByExample(SurveyNpsInfoExample example);

    int deleteByExample(SurveyNpsInfoExample example);

    int insert(SurveyNpsInfo record);

    int insertSelective(SurveyNpsInfo record);

    List<SurveyNpsInfo> selectByExample(SurveyNpsInfoExample example);

    int updateByExampleSelective(@Param("record") SurveyNpsInfo record, @Param("example") SurveyNpsInfoExample example);

    int updateByExample(@Param("record") SurveyNpsInfo record, @Param("example") SurveyNpsInfoExample example);
}