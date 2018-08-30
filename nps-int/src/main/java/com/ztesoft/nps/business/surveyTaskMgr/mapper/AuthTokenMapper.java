package com.ztesoft.nps.business.surveyTaskMgr.mapper;

import com.ztesoft.nps.business.surveyTaskMgr.model.AuthToken;
import com.ztesoft.nps.business.surveyTaskMgr.model.AuthTokenExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AuthTokenMapper {
    int countByExample(AuthTokenExample example);

    int deleteByExample(AuthTokenExample example);

    int insert(AuthToken record);

    int insertSelective(AuthToken record);

    List<AuthToken> selectByExample(AuthTokenExample example);

    int updateByExampleSelective(@Param("record") AuthToken record, @Param("example") AuthTokenExample example);

    int updateByExample(@Param("record") AuthToken record, @Param("example") AuthTokenExample example);
}