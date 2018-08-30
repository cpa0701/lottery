package com.ztesoft.nps.business.surveyResultMgr.mapper;

import com.ztesoft.nps.business.surveyResultMgr.model.SurveyUserInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyUserInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SurveyUserInfoMapper {
    int countByExample(SurveyUserInfoExample example);

    int deleteByExample(SurveyUserInfoExample example);

    int insert(SurveyUserInfo record);

    int insertSelective(SurveyUserInfo record);

    List<SurveyUserInfo> selectByExample(SurveyUserInfoExample example);

    int updateByExampleSelective(@Param("record") SurveyUserInfo record, @Param("example") SurveyUserInfoExample example);

    int updateByExample(@Param("record") SurveyUserInfo record, @Param("example") SurveyUserInfoExample example);
}