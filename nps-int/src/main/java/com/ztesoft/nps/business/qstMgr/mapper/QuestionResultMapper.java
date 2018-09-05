package com.ztesoft.nps.business.qstMgr.mapper;

import com.ztesoft.nps.business.qstMgr.model.QuestionResult;
import com.ztesoft.nps.business.qstMgr.model.QuestionResultExample;
import java.util.List;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireQuestion;
import org.apache.ibatis.annotations.Param;

public interface QuestionResultMapper {
    int countByExample(QuestionResultExample example);

    int deleteByExample(QuestionResultExample example);

    int insert(QuestionResult record);

    int insertSelective(QuestionResult record);

    List<QuestionResult> selectByExample(QuestionResultExample example);

    int updateByExampleSelective(@Param("record") QuestionResult record, @Param("example") QuestionResultExample example);

    int updateByExample(@Param("record") QuestionResult record, @Param("example") QuestionResultExample example);

    int insertByList(List<QuestionResult> questionResultList);
}