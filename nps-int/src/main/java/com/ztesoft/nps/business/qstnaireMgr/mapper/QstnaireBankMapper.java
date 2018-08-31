package com.ztesoft.nps.business.qstnaireMgr.mapper;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireBank;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireBankExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface QstnaireBankMapper {
    int countByExample(QstnaireBankExample example);

    int deleteByExample(QstnaireBankExample example);

    int deleteByPrimaryKey(String qstnaireId);

    int insert(QstnaireBank record);

    int insertSelective(QstnaireBank record);

    List<QstnaireBank> selectByExample(QstnaireBankExample example);

    QstnaireBank selectByPrimaryKey(String qstnaireId);

    int updateByExampleSelective(@Param("record") QstnaireBank record, @Param("example") QstnaireBankExample example);

    int updateByExample(@Param("record") QstnaireBank record, @Param("example") QstnaireBankExample example);

    int updateByPrimaryKeySelective(QstnaireBank record);

    int updateByPrimaryKey(QstnaireBank record);
}