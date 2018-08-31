package com.ztesoft.nps.business.qstnaireMgr.mapper;

import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireCatalog;
import com.ztesoft.nps.business.qstnaireMgr.model.QstnaireCatalogExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface QstnaireCatalogMapper {
    int countByExample(QstnaireCatalogExample example);

    int deleteByExample(QstnaireCatalogExample example);

    int deleteByPrimaryKey(String catalogId);

    int insert(QstnaireCatalog record);

    int insertSelective(QstnaireCatalog record);

    List<QstnaireCatalog> selectByExample(QstnaireCatalogExample example);

    QstnaireCatalog selectByPrimaryKey(String catalogId);

    int updateByExampleSelective(@Param("record") QstnaireCatalog record, @Param("example") QstnaireCatalogExample example);

    int updateByExample(@Param("record") QstnaireCatalog record, @Param("example") QstnaireCatalogExample example);

    int updateByPrimaryKeySelective(QstnaireCatalog record);

    int updateByPrimaryKey(QstnaireCatalog record);
}