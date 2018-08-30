package com.ztesoft.nps.business.surveyTaskMgr.mapper;

import com.ztesoft.nps.business.surveyTaskMgr.model.TaskChannel;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskChannelExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TaskChannelMapper {
    int countByExample(TaskChannelExample example);

    int deleteByExample(TaskChannelExample example);

    int deleteByPrimaryKey(Long channelId);

    int insert(TaskChannel record);

    int insertSelective(TaskChannel record);

    List<TaskChannel> selectByExample(TaskChannelExample example);

    TaskChannel selectByPrimaryKey(Long channelId);

    int updateByExampleSelective(@Param("record") TaskChannel record, @Param("example") TaskChannelExample example);

    int updateByExample(@Param("record") TaskChannel record, @Param("example") TaskChannelExample example);

    int updateByPrimaryKeySelective(TaskChannel record);

    int updateByPrimaryKey(TaskChannel record);
}