package com.ztesoft.nps.business.surveyTaskMgr.mapper;

import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExe;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TaskExeMapper {
    int countByExample(TaskExeExample example);

    int deleteByExample(TaskExeExample example);

    int deleteByPrimaryKey(String serialId);

    int insert(TaskExe record);

    int insertSelective(TaskExe record);

    List<TaskExe> selectByExample(TaskExeExample example);

    TaskExe selectByPrimaryKey(String serialId);

    int updateByExampleSelective(@Param("record") TaskExe record, @Param("example") TaskExeExample example);

    int updateByExample(@Param("record") TaskExe record, @Param("example") TaskExeExample example);

    int updateByPrimaryKeySelective(TaskExe record);

    int updateByPrimaryKey(TaskExe record);
}