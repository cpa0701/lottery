package com.ztesoft.nps.business.qstnaireMgr.mapper;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireQuestion;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireQuestionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface QstnaireQuestionMapper {
    int countByExample(QstnaireQuestionExample example);

    int deleteByExample(QstnaireQuestionExample example);

    int insert(QstnaireQuestion record);

    int insertSelective(QstnaireQuestion record);

    List<QstnaireQuestion> selectByExample(QstnaireQuestionExample example);

    int updateByExampleSelective(@Param("record") QstnaireQuestion record, @Param("example") QstnaireQuestionExample example);

    int updateByExample(@Param("record") QstnaireQuestion record, @Param("example") QstnaireQuestionExample example);

}