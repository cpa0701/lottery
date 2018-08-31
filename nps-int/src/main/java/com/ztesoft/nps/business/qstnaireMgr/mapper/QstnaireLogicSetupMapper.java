package com.ztesoft.nps.business.qstnaireMgr.mapper;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireLogicSetup;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireLogicSetupExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface QstnaireLogicSetupMapper {
    int countByExample(QstnaireLogicSetupExample example);

    int deleteByExample(QstnaireLogicSetupExample example);

    int deleteByPrimaryKey(String logicId);

    int insert(QstnaireLogicSetup record);

    int insertSelective(QstnaireLogicSetup record);

    List<QstnaireLogicSetup> selectByExample(QstnaireLogicSetupExample example);

    QstnaireLogicSetup selectByPrimaryKey(String logicId);

    int updateByExampleSelective(@Param("record") QstnaireLogicSetup record, @Param("example") QstnaireLogicSetupExample example);

    int updateByExample(@Param("record") QstnaireLogicSetup record, @Param("example") QstnaireLogicSetupExample example);

    int updateByPrimaryKeySelective(QstnaireLogicSetup record);

    int updateByPrimaryKey(QstnaireLogicSetup record);

    List<QstnaireLogicSetup> selectOrderByLogicOrder(String qstnaireId);

    int insertByList (List<QstnaireLogicSetup> qstnaireLogicSetupList);
}