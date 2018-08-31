package com.ztesoft.nps.business.qstnaireMgr.service.impl;

import com.ztesoft.nps.business.qstMgr.mapper.QuestionBankMapper;
import com.ztesoft.nps.business.qstMgr.mapper.QuestionOptionMapper;
import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.qstMgr.model.QuestionOption;
import com.ztesoft.nps.business.qstMgr.model.QuestionOptionExample;
import com.ztesoft.nps.business.qstMgr.service.QuestionMgrService;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireBankMapper;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireCatalogMapper;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireLogicSetupMapper;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireQuestionMapper;
import com.ztesoft.nps.business.qstnaireMgr.model.*;
import com.ztesoft.nps.business.qstnaireMgr.model.query.*;
import com.ztesoft.nps.business.qstnaireMgr.service.QstnaireBankService;
import com.ztesoft.nps.safe.mapper.UserMapper;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.ListUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("qstnaireBankServiceImpl")

public class QstnaireBankServiceImpl implements QstnaireBankService {
    @Autowired
    private QstnaireBankMapper qstnaireBankMapper;

    @Autowired
    private QstnaireLogicSetupMapper qstnaireLogicSetupMapper;

    @Autowired
    private QstnaireQuestionMapper qstnaireQuestionMapper;

    @Autowired
    private QuestionBankMapper questionBankMapper;

    @Autowired
    private QstnaireCatalogMapper qstnaireCatalogMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private QuestionMgrService questionMgrService;

    @Autowired
    private QuestionOptionMapper questionOptionMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public QstnaireIdQuery addQstnaireBank(AddQstnaireBankQuery addQstnaireBankQuery) {
        String qstnaireId = insertQstnaireBank(addQstnaireBankQuery,"add");
        QstnaireIdQuery qstnaireIdQuery = new QstnaireIdQuery();
        qstnaireIdQuery.setQstnaireId(qstnaireId);
        return qstnaireIdQuery;
    }

    @Override
    public QstnaireIdQuery eiditQstnaire(AddQstnaireBankQuery addQstnaireBankQuery) {
        QstnaireIdQuery qstnaireIdQuery = new QstnaireIdQuery();
        qstnaireIdQuery.setQstnaireId(addQstnaireBankQuery.getQstnaireId());
        deleteQstnaire(qstnaireIdQuery);//先删除再添加完成编辑
        String qstnaireId = insertQstnaireBank(addQstnaireBankQuery,"eidit");
        return qstnaireIdQuery;
    }

    private String insertQstnaireBank(AddQstnaireBankQuery addQstnaireBankQuery,String action){//根据Action插入或编辑QstnaireBank
        String qstnaireId = null;
        if("add".equals(action)){
            qstnaireId = StringUtil.getRandom32PK(); //生成问卷ID
        }else if ("eidit".equals(action)){
            qstnaireId = addQstnaireBankQuery.getQstnaireId();//生成问卷ID
        }
        List<QstnaireQuestion> questionList = addQstnaireBankQuery.getQuestion();
        List<QstnaireLogicSetup> logicList = addQstnaireBankQuery.getLogic();
        QstnaireBank qstnaireBank = addQstnaireBankQuery.toQstnaireBank();//转化
        qstnaireBank.setQstnaireId(qstnaireId);
        qstnaireBank.setCreateUid(1L);//用户
        qstnaireBank.setStatus("02");
        qstnaireBank.setCreateTime(new Date());
        qstnaireBank.setUpdateTime(new Date());
        qstnaireBankMapper.insertSelective(qstnaireBank);
        for(QstnaireQuestion qstnaireQuestion : questionList){
            qstnaireQuestion.setQstnaireId(qstnaireId);
        }

        Short i = 0;
        for(QstnaireLogicSetup qstnaireLogicSetup:logicList){
            qstnaireLogicSetup.setQstnaireId(qstnaireId);
            qstnaireLogicSetup.setLogicId(StringUtil.getRandom32PK());//生成逻辑id并插入
            qstnaireLogicSetup.setLogicOrder(i++);//逻辑序号(取出时按照序号排序)
            qstnaireLogicSetupMapper.insertSelective(qstnaireLogicSetup);//插入逻辑表
        }
        return qstnaireId;
    }
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteQstnaire(QstnaireIdQuery qstnaireIdQuery){
        String qstnaireId = qstnaireIdQuery.getQstnaireId();
        QstnaireLogicSetupExample qstnaireLogicSetupExample = new QstnaireLogicSetupExample();
        qstnaireLogicSetupExample.createCriteria().andQstnaireIdEqualTo(qstnaireId);
        QstnaireQuestionExample qstnaireQuestionExample = new QstnaireQuestionExample();
        qstnaireQuestionExample.createCriteria().andQstnaireIdEqualTo(qstnaireId);
        qstnaireLogicSetupMapper.deleteByExample(qstnaireLogicSetupExample);
        qstnaireQuestionMapper.deleteByExample(qstnaireQuestionExample);
        qstnaireBankMapper.deleteByPrimaryKey(qstnaireId);
        return 0;
    }

    @Override
    public QstnaireByIdQuery qstnaireById(QstnaireIdQuery qstnaireIdQuery){
        QstnaireByIdQuery qstnaireByIdQuery = new QstnaireByIdQuery();
        String qstnaireId = qstnaireIdQuery.getQstnaireId();

        //查询问卷信息
        QstnaireBank qstnaireBank = qstnaireBankMapper.selectByPrimaryKey(qstnaireId);
        qstnaireByIdQuery.setBelongTo(qstnaireBank.getBelongTo());
        qstnaireByIdQuery.setCatalogId(qstnaireBank.getCatalogId());
        String catalogName = qstnaireCatalogMapper.selectByPrimaryKey(qstnaireBank.getCatalogId()).getCatalogName();//根据目录ID查询目录名
        qstnaireByIdQuery.setCatalogName(catalogName);
        qstnaireByIdQuery.setQstnaireLeadin(qstnaireBank.getQstnaireLeadin());
        qstnaireByIdQuery.setQstnaireTitle(qstnaireBank.getQstnaireTitle());
        qstnaireByIdQuery.setQstnaireId(qstnaireId);
        //查询逻辑
        List<QstnaireLogicSetup> qstnaireLogicSetupList = qstnaireLogicSetupMapper.selectOrderByLogicOrder(qstnaireId);
        qstnaireByIdQuery.setLogic(qstnaireLogicSetupList);
        //查询问题ID列表
        QstnaireQuestionExample qstnaireQuestionExample = new QstnaireQuestionExample();
        qstnaireQuestionExample.createCriteria().andQstnaireIdEqualTo(qstnaireId);
        List<String> questionIdList = new ArrayList<String>();
        List<QstnaireQuestion> qstnaireQuestionsList = qstnaireQuestionMapper.selectByExample(qstnaireQuestionExample);
        for( QstnaireQuestion qq : qstnaireQuestionsList ){
            questionIdList.add(qq.getQuestionId());
        }
        //根据问题ID查找问题
        List<QstnaireQuestionQuery> qstnaireQuestionQueryList = new ArrayList<QstnaireQuestionQuery>();
//        QstnaireQuestionQuery qstnaireQuestionQuery = new QstnaireQuestionQuery();
//        QuestionOptionExample questionOptionExample = new QuestionOptionExample();
//        QuestionBank questionBank ;
        String questionId = null;
        for (QstnaireQuestion qq : qstnaireQuestionsList){
            QstnaireQuestionQuery qstnaireQuestionQuery = new QstnaireQuestionQuery();
            QuestionOptionExample questionOptionExample = new QuestionOptionExample();
            QuestionBank questionBank ;
            qstnaireQuestionQuery.QstnaireQuestionTo(qq);

            questionId = qq.getQuestionId();

            questionBank = questionBankMapper.selectByPrimaryKey(questionId);

            qstnaireQuestionQuery.QuestionBankTo(questionBank);

            questionOptionExample.createCriteria().andQuestionIdEqualTo(questionId);

            List<QuestionOption> questionOptionList = questionOptionMapper.selectByExample(questionOptionExample);

            if(ListUtil.isNull(questionOptionList)){
                qstnaireQuestionQuery.setOptionList(null);
            }else{
                qstnaireQuestionQuery.setOptionList(questionOptionList);
            }

            qstnaireQuestionQueryList.add(qstnaireQuestionQuery);
        }
        qstnaireByIdQuery.setQuestion(qstnaireQuestionQueryList);

        return qstnaireByIdQuery;
    }
    @Override
    public int actionQstnaire(ActionQstnaireQuery actionQstnaireQuery){
        QstnaireBank qstnaireBank = new QstnaireBank();
        qstnaireBank.setQstnaireId(actionQstnaireQuery.getQstnaireId());
        qstnaireBank.setStatus(actionQstnaireQuery.getActType());
        qstnaireBankMapper.updateByPrimaryKeySelective(qstnaireBank);
        return 0;
    }

    @Override
    public LPageHelper qstnaireBank(QstnaireBankQuery qstnaireBankQuery){

        StringBuilder qstnaireBankSql = getQstnaireBankSql();
        String qstnaireTitle = qstnaireBankQuery.getQstnaireTitle();
        String status = qstnaireBankQuery.getStatus();
        if(StringUtil.isNotNull(qstnaireTitle)){
            qstnaireBankSql.append(" and qstnaire_title like '%"+qstnaireTitle+"%'");
        }
        if (StringUtil.isNotNull(status)){
            qstnaireBankSql.append(" and status = '"+status+"'");
        }
        LPageHelper bankResult = DatabaseUtil.queryForPageResult(qstnaireBankSql.toString(),
                Integer.valueOf(qstnaireBankQuery.getPageNum()),Integer.valueOf(qstnaireBankQuery.getPageSize()));
        List<Map<String,Object>> row = bankResult.getRows();
        List<String> catalogIdlist = new ArrayList<String>();
        String catalogId = null;
        String createUid = null;
        if(ListUtil.isNotNull(row)){
            for(Map<String,Object> map : row ){
                catalogId = MapUtil.getString(map,"catalogId");
                if(StringUtil.isNotNull(catalogId)){
                    QstnaireCatalog qstnaireCatalog = qstnaireCatalogMapper.selectByPrimaryKey(catalogId);
                    map.put("catalogName",qstnaireCatalog.getCatalogName());
                }
                createUid = MapUtil.getString(map,"createUid");
                if(StringUtil.isNotNull(createUid)&&StringUtil.isInteger(createUid)){
                    User u = userMapper.findById(Long.valueOf(createUid));
                    map.put("createUname",u.getName());
                }
                status = MapUtil.getString(map,"status");
                //(00 停用/01 启用/02 草稿/03 待审核/04 审核不通过)

                map.put("status",status);

            }
        }
        return bankResult;
    }

    private StringBuilder getQstnaireBankSql(){
        StringBuilder qstnaireBankSql = new StringBuilder();
        qstnaireBankSql.append(" select qstnaire_id as qstnaireId,qstnaire_title as qstnaireTitle, ");
        qstnaireBankSql.append(" qstnaire_leadin as qstnaireLeadin ,catalog_id as catalogId ,belong_to as belongTo, ");
        qstnaireBankSql.append(" create_uid as createUid ,create_time as createTime ,status as status ,is_inst as isInst,update_time as updateTime ");
        qstnaireBankSql.append(" from qstnaire_bank where 1=1 ");
        return qstnaireBankSql;
    }
    private String statusToString(String status){
        switch(status){
            case "00":
                status = "停用";
                break;
            case "01":
                status = "启用";
                break;
            case "02":
                status = "草稿";
                break;
            case "03":
                status = "待审核";
                break;
            case "04":
                status = "审核不通过";
                break;
        }
        return status;
    }
}
