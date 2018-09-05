package com.ztesoft.nps.business.qstnaireMgr.service.impl;

import com.ztesoft.nps.business.qstMgr.mapper.QuestionBankMapper;
import com.ztesoft.nps.business.qstMgr.mapper.QuestionOptionMapper;
import com.ztesoft.nps.business.qstMgr.mapper.QuestionResultMapper;
import com.ztesoft.nps.business.qstMgr.model.QuestionOption;
import com.ztesoft.nps.business.qstMgr.model.QuestionOptionExample;
import com.ztesoft.nps.business.qstMgr.model.QuestionResult;
import com.ztesoft.nps.business.qstMgr.service.QuestionMgrService;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireBankMapper;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireCatalogMapper;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireLogicSetupMapper;
import com.ztesoft.nps.business.qstnaireMgr.mapper.QstnaireQuestionMapper;
import com.ztesoft.nps.business.qstnaireMgr.model.*;
import com.ztesoft.nps.business.qstnaireMgr.model.query.*;
import com.ztesoft.nps.business.qstnaireMgr.service.QstnaireBankService;
import com.ztesoft.nps.business.surveyResultMgr.mapper.SurveyResultMapper;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyResult;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyResultExample;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.safe.mapper.UserMapper;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.ListUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    @Autowired
    private QuestionResultMapper questionResultMapper;
    @Autowired
    private SurveyResultMapper surveyResultMapper;


    @Override
    @Transactional(rollbackFor = Exception.class)
    public QstnaireIdQuery addQstnaireBank(AddQstnaireBankQuery addQstnaireBankQuery) {
        String qstnaireId = insertQstnaireBank(addQstnaireBankQuery,"add");
        QstnaireIdQuery qstnaireIdQuery = new QstnaireIdQuery();
        qstnaireIdQuery.setQstnaireId(qstnaireId);
        return qstnaireIdQuery;
    }

    @Override
    @Transactional(rollbackFor = NpsDeleteException.class)
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
            qstnaireId = addQstnaireBankQuery.getQstnaireId();//查找问卷ID
        }

        //插入问卷表
        QstnaireBank qstnaireBank = addQstnaireBankQuery.toQstnaireBank();//转化
        qstnaireBank.setQstnaireId(qstnaireId);
        qstnaireBank.setCreateUid(1L);//用户
        qstnaireBank.setStatus(ConstantUtils.QSTNAIRE_STATUS_02);
        qstnaireBank.setCreateTime(new Date());
        qstnaireBank.setUpdateTime(new Date());
        qstnaireBankMapper.insertSelective(qstnaireBank);

        //批量插入问卷-问题表
        Short questionOrder = 1;
        List<QstnaireQuestion> questionList = addQstnaireBankQuery.getQuestion();
        for(QstnaireQuestion  qstnaireQuestion:questionList){
            qstnaireQuestion.setQstnaireId(qstnaireId);
        }
        qstnaireQuestionMapper.insertByList(questionList);

        //批量插入逻辑表
        short logicOrder = 0;
        List<QstnaireLogicSetup> logicList = addQstnaireBankQuery.getLogic();
        //如果逻辑表非空则进行插入
        if(ListUtil.isNotNull(logicList)){
            for(QstnaireLogicSetup   logicSetup :logicList){
                logicSetup.setQstnaireId(qstnaireId);
                logicSetup.setLogicId(StringUtil.getRandom32PK());
                logicSetup.setLogicOrder(logicOrder++);
            }
            qstnaireLogicSetupMapper.insertByList(logicList);
        }
        return qstnaireId;
    }
    @Override
    @Transactional(rollbackFor = NpsDeleteException.class)
    public int deleteQstnaire(QstnaireIdQuery qstnaireIdQuery){
        //获取问卷ID
        String qstnaireId = qstnaireIdQuery.getQstnaireId();
        //删除逻辑表数据
        QstnaireLogicSetupExample qstnaireLogicSetupExample = new QstnaireLogicSetupExample();
        qstnaireLogicSetupExample.createCriteria().andQstnaireIdEqualTo(qstnaireId);
        qstnaireLogicSetupMapper.deleteByExample(qstnaireLogicSetupExample);
        //删除问卷问题表内数据
        QstnaireQuestionExample qstnaireQuestionExample = new QstnaireQuestionExample();
        qstnaireQuestionExample.createCriteria().andQstnaireIdEqualTo(qstnaireId);
        qstnaireQuestionMapper.deleteByExample(qstnaireQuestionExample);
        //删除主表数据
        qstnaireBankMapper.deleteByPrimaryKey(qstnaireId);
        return 0;
    }

    @Override
    public QstnaireByIdQuery qstnaireById(QstnaireIdQuery qstnaireIdQuery){
        QstnaireByIdQuery qstnaireByIdQuery = new QstnaireByIdQuery();
        String qstnaireId = qstnaireIdQuery.getQstnaireId();
        //查询问卷信息
        QstnaireBank qstnaireBank = qstnaireBankMapper.selectByPrimaryKey(qstnaireId);
        String catalogName = qstnaireCatalogMapper.selectByPrimaryKey(qstnaireBank.getCatalogId()).getCatalogName();//根据目录ID查询目录名
        qstnaireByIdQuery.setBelongTo(qstnaireBank.getBelongTo());
        qstnaireByIdQuery.setCatalogId(qstnaireBank.getCatalogId());
        qstnaireByIdQuery.setCatalogName(catalogName);
        qstnaireByIdQuery.setQstnaireLeadin(qstnaireBank.getQstnaireLeadin());
        qstnaireByIdQuery.setQstnaireTitle(qstnaireBank.getQstnaireTitle());
        qstnaireByIdQuery.setQstnaireId(qstnaireId);
        //查询逻辑
        List<QstnaireLogicSetup> qstnaireLogicSetupList = qstnaireLogicSetupMapper.selectOrderByLogicOrder(qstnaireId);
        qstnaireByIdQuery.setLogic(qstnaireLogicSetupList);

        //查询问题信息
        //根据ID查询问卷基础信息
        List<QstnaireQuestionQuery> qstnaireQuestionQueryList = qstnaireQuestionMapper.selectQstnaireQuestionById(qstnaireId);
        List<String> questionIdList = new ArrayList<String>();
        //问题ID List
        for(QstnaireQuestionQuery qqq : qstnaireQuestionQueryList){
            questionIdList.add(qqq.getQuestionId());
        }

        Map<String,List<QuestionOption>>questionOptionMap = new HashMap<String, List<QuestionOption>>();

        //查询所有问题选项
        QuestionOptionExample questionOptionExample = new QuestionOptionExample();
        questionOptionExample.createCriteria().andQuestionIdIn(questionIdList);
        //查询问卷所有问题
        List<QuestionOption> questionOptionList = questionOptionMapper.selectByExample(questionOptionExample);
        //问题选项Map<问卷id，选项List>
        for(QuestionOption qo : questionOptionList){
            if(questionOptionMap.containsKey(qo.getQuestionId())){
                questionOptionMap.get(qo.getQuestionId()).add(qo);
            }else{
                questionOptionMap.put(qo.getQuestionId(),new ArrayList<QuestionOption>(){{add(qo);}});
            }
        }
        //选项List插入问卷
        for(QstnaireQuestionQuery qqq : qstnaireQuestionQueryList){
            if(questionOptionMap.containsKey(qqq.getQuestionId())){
                qqq.setOptionList(questionOptionMap.get(qqq.getQuestionId()));
            }
            //如果是分页题，设置isPaging为1
            if(ConstantUtils.PAGE_QUESTION_ID.equals(qqq.getQuestionId())){
                qqq.setIsPaging(1);
            }
        }
        //问卷问题插入
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
        //获得qstnaireBank的查询sql语句
        StringBuilder qstnaireBankSql = getQstnaireBankSql();
        String qstnaireTitle = qstnaireBankQuery.getQstnaireTitle();
        String status = qstnaireBankQuery.getStatus();
        //增加查询条件 qb.
        if(StringUtil.isNotNull(qstnaireTitle)){
            qstnaireBankSql.append(" and qb.qstnaire_title like '%"+qstnaireTitle+"%'");
        }
        if (StringUtil.isNotNull(status)){
            qstnaireBankSql.append(" and qb.status = '"+status+"'");
        }
        //查询
        LPageHelper bankResult = DatabaseUtil.queryForPageResult(qstnaireBankSql.toString(),
                Integer.valueOf(qstnaireBankQuery.getPageNum()),Integer.valueOf(qstnaireBankQuery.getPageSize()));
        //对status进行修改，改为汉字
        List<Map<String,Object>> row = bankResult.getRows();
        List<String> catalogIdlist = new ArrayList<String>();
        if(ListUtil.isNotNull(row)){
            for(Map<String,Object> map : row ){
                status = MapUtil.getString(map,"status");
                //(00 停用/01 启用/02 草稿/03 待审核/04 审核不通过)
                map.put("status",status);
            }
        }
        return bankResult;
    }

    @Override
    public int submitQstnaire(QuestionResult questionResult) {
        //插入questionResult 表
        questionResultMapper.insertSelective(questionResult);
        //更新 surveyResult 表 更改状态，更改完成时间
        SurveyResult surveyResult = new SurveyResult();
        //更新完成时间
        surveyResult.setFinishTime(new Date());
        //更改状态为完成 1
        surveyResult.setStatus(new Short("1"));
        //根据resultId 更新数据
        SurveyResultExample surveyResultExample = new SurveyResultExample();
        surveyResultExample.createCriteria().andResultIdEqualTo(questionResult.getSurveyResultNo());
        surveyResultMapper.updateByExampleSelective(surveyResult,surveyResultExample);
        return 0;
    }

    private StringBuilder getQstnaireBankSql(){
        StringBuilder qstnaireBankSql = new StringBuilder();
        qstnaireBankSql.append(" select qb.qstnaire_id as qstnaireId, qb.qstnaire_title as qstnaireTitle,  ");
        qstnaireBankSql.append(" qb.qstnaire_leadin as qstnaireLeadin ,qb.catalog_id as catalogId ,qb.belong_to as belongTo, ");
        qstnaireBankSql.append(" qb.create_uid as createUid ,qb.create_time as createTime ,qb.status as status ,qb.is_inst as isInst, ");
        qstnaireBankSql.append(" qb.update_time as updateTime,u.name as createUname,qc.catalog_name as catalogName ");
        qstnaireBankSql.append(" from qstnaire_bank qb LEFT JOIN  Users u ON u.id = qb.create_uid ");
        qstnaireBankSql.append(" Left Join  qstnaire_catalog qc On qc.catalog_id = qb.catalog_id where 1=1 ");
        return qstnaireBankSql;
    }
}
