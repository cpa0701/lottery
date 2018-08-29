package com.ztesoft.nps.business.surveyTaskMgr.mapper;

import com.ztesoft.nps.business.surveyTaskMgr.model.TaskUser;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskUserExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TaskUserMapper {
    int countByExample(TaskUserExample example);

    int deleteByExample(TaskUserExample example);

    int deleteByPrimaryKey(String taskUserId);

    int insert(TaskUser record);

    int insertSelective(TaskUser record);

    List<TaskUser> selectByExample(TaskUserExample example);

    TaskUser selectByPrimaryKey(String taskUserId);

    int updateByExampleSelective(@Param("record") TaskUser record, @Param("example") TaskUserExample example);

    int updateByExample(@Param("record") TaskUser record, @Param("example") TaskUserExample example);

    int updateByPrimaryKeySelective(TaskUser record);

    int updateByPrimaryKey(TaskUser record);
}