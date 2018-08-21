package com.ztesoft.nps.qstMgr.mapper;

import com.ztesoft.nps.qstMgr.model.QuestionOption;
import com.ztesoft.nps.qstMgr.model.QuestionOptionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface QuestionOptionMapper {
    int countByExample(QuestionOptionExample example);

    int deleteByExample(QuestionOptionExample example);

    int deleteByPrimaryKey(String optionId);

    int insert(QuestionOption record);

    int insertSelective(QuestionOption record);

    List<QuestionOption> selectByExample(QuestionOptionExample example);

    QuestionOption selectByPrimaryKey(String optionId);

    int updateByExampleSelective(@Param("record") QuestionOption record, @Param("example") QuestionOptionExample example);

    int updateByExample(@Param("record") QuestionOption record, @Param("example") QuestionOptionExample example);

    int updateByPrimaryKeySelective(QuestionOption record);

    int updateByPrimaryKey(QuestionOption record);

    int batchSaveOpt(List<QuestionOption> questionOpt);
}