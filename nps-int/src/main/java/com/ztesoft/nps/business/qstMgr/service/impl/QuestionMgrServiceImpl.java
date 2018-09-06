package com.ztesoft.nps.business.qstMgr.service.impl;

import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.business.qstMgr.mapper.QuestionBankMapper;
import com.ztesoft.nps.business.qstMgr.mapper.QuestionOptionMapper;
import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.qstMgr.model.QuestionBankExample;
import com.ztesoft.nps.business.qstMgr.model.QuestionOption;
import com.ztesoft.nps.business.qstMgr.model.QuestionOptionExample;
import com.ztesoft.nps.business.qstMgr.model.query.QuestionQuery;
import com.ztesoft.nps.business.qstMgr.service.QuestionMgrService;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.ListUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ExceptionDepthComparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by 64671 on 2018/8/17.
 */
@Service("questionMgrServiceImpl")
public class QuestionMgrServiceImpl implements QuestionMgrService {

    @Autowired
    private QuestionBankMapper questionBankMapper;

    @Autowired
    private QuestionOptionMapper questionOptionMapper;

    @Transactional(rollbackFor = NpsDeleteException.class)
    @Override
    public int deleteQuestion(String id){
        //删除题目选项
        QuestionOptionExample optExample = new QuestionOptionExample();
        optExample.createCriteria().andQuestionIdEqualTo(id);
        questionOptionMapper.deleteByExample(optExample);

        QuestionBankExample example = new QuestionBankExample();
        example.createCriteria().andQuestionIdEqualTo(id);
        int status = 0;
        try {
            status = questionBankMapper.deleteByExample(example);
        } catch (Exception e) {
            throw new NpsDeleteException("问题已使用");
        }
        return status;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public int addQuestion(QuestionBank bank) {
        updateQuestionByParam(bank, "add");
        return 1;
    }

    @Override
    public Object questionById(String id) {
        Map<String, Object> result = MapUtil.convertBean2Map(questionBankMapper.selectByPrimaryKey(id));
        QuestionOptionExample example = new QuestionOptionExample();
        example.createCriteria().andQuestionIdEqualTo(id);
        List<QuestionOption> optList = questionOptionMapper.selectByExample(example);
        result.put("optionList", optList);
        return result;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public int editQuestion(QuestionBank bank) throws NpsDeleteException{
        String questionId = bank.getQuestionId();
        if (StringUtil.isNull(questionId)) {
            throw new NpsObjectNotFoundException(questionId);
        }
        //删除题目选项
        QuestionOptionExample optExample = new QuestionOptionExample();
        optExample.createCriteria().andQuestionIdEqualTo(questionId);
        questionOptionMapper.deleteByExample(optExample);

        //删除题目信息
        QuestionBankExample qstExample = new QuestionBankExample();
        qstExample.createCriteria().andQuestionIdEqualTo(questionId);

        try {
            questionBankMapper.deleteByExample(qstExample);
        } catch (Exception e) {
            throw new NpsDeleteException("问题已使用，无法编辑");
        }

        updateQuestionByParam(bank, "edit");

        return 1;
    }

    @Override
    public LPageHelper questionBank(QuestionQuery condition) {
        if(StringUtil.isNull(condition.getPageNum())){
            condition.setPageNum(ConstantUtils.PAGE_NUM_DEFAULT);
        }
        if(StringUtil.isNull(condition.getPageSize())){
            condition.setPageSize(ConstantUtils.PAGE_SIZE_DEFAULT);
        }
        StringBuilder qstBankQuerySql = getQuestionBankQuerySql(condition);
        LPageHelper bankResult = DatabaseUtil.queryForPageResult(qstBankQuerySql.toString(),
                StringUtil.getInteger(condition.getPageNum()),StringUtil.getInteger(condition.getPageSize()));

        List<Map<String,Object>> bankRows = bankResult.getRows();

        String qstIds = "";
        if (ListUtil.isNotNull(bankRows)) {
            for (Map<String,Object> bank : bankRows) {
                qstIds += MapUtil.getString(bank,"questionId") + ",";
            }
        }

        if (StringUtil.isNotNull(qstIds)) {
            StringBuilder optQuerySql = getOptionQuerySql();
            optQuerySql.append(" and question_id in( ");
            optQuerySql.append(StringUtil.getFormatString(qstIds.substring(0, qstIds.lastIndexOf(","))));
            optQuerySql.append(" ) ");

            List<Map<String, Object>> optList = DatabaseUtil.queryForList(optQuerySql.toString());
            for (Map<String,Object> bank : bankRows) {
                List chirlOptList = new ArrayList();
                String questionId = MapUtil.getString(bank,"questionId");
                for (Map<String, Object> optMap : optList) {
                    String qstId = MapUtil.getString(optMap, "questionId");
                    if (StringUtil.isNotNull(qstId) && questionId.equals(qstId)) {
                        chirlOptList.add(optMap);
                    }
                }
                bank.put("optionList",chirlOptList);
            }
        }

        return bankResult;
    }

    private void updateQuestionByParam(QuestionBank questionBank, String type) {

        String uuid = "";
        if ("add".equals(type)) {
            uuid = StringUtil.getRandom32PK();
        } else {
            uuid = questionBank.getQuestionId();
        }

        //插入题目信息
        questionBank.setQuestionId(uuid);
        questionBank.setCreateTime(new Date());
        questionBankMapper.insertSelective(questionBank);

        //插入题目选项信息
        List<QuestionOption> optList = questionBank.getOptionList();
        for (QuestionOption option : optList) {
            option.setQuestionId(uuid);
        }
        questionOptionMapper.batchSaveOpt(optList);
    }

    private StringBuilder getQuestionBankQuerySql(QuestionQuery condition){
        StringBuilder qstBankQuerySql = new StringBuilder();
        qstBankQuerySql.append(" select qb.question_id as questionId, qb.question_name as questionName, ");
        qstBankQuerySql.append(" qb.question_type as questionType, qb.question_category as questionCategory, ");
        qstBankQuerySql.append(" qb.is_common as isCommon, qb.is_nps as isNps, ");
        qstBankQuerySql.append(" qb.is_satisfied as isSatisfied, qb.option_layout as optionLayout, ");
        qstBankQuerySql.append(" qb.content_check as contentCheck, qb.lenth_check as lenthCheck, ");
        qstBankQuerySql.append(" qb.create_uid as createUid,u.name as createUname, qb.create_time as create_time, ");
        qstBankQuerySql.append(" qb.status, qb.question_tags as questionTags ");
        qstBankQuerySql.append(" from question_bank qb left join users u on u.id = qb.create_uid where 1=1 ");
        qstBankQuerySql.append(" and qb.question_id <>  '").append(ConstantUtils.PAGE_QUESTION_ID).append("' ");
        if (StringUtil.isNotNull(condition.getQuestionCategory())) {
            qstBankQuerySql.append(" and question_category = '").append(condition.getQuestionCategory()).append("' ");
        }
        if (StringUtil.isNotNull(condition.getQuestionName())) {
            qstBankQuerySql.append(" and question_name like '%").append(condition.getQuestionName()).append("%' ");
        }
        if (StringUtil.isNotNull(condition.getIsNps())) {
            qstBankQuerySql.append(" and is_nps = '").append(condition.getIsNps()).append("' ");
        }
        if (StringUtil.isNotNull(condition.getQuestionType())) {
            qstBankQuerySql.append(" and question_type = '").append(condition.getQuestionType()).append("' ");
        }
        if (StringUtil.isNotNull(condition.getIsSatisfied())) {
            qstBankQuerySql.append(" and is_satisfied = '").append(condition.getIsSatisfied()).append("' ");
        }
        qstBankQuerySql.append(" order by create_time desc ");
        return qstBankQuerySql;
    }

    private StringBuilder getOptionQuerySql(){
        StringBuilder optQuerySql = new StringBuilder();
        optQuerySql.append(" select option_id as optionId, question_id as questionId, ");
        optQuerySql.append(" option_order as optionOrder, option_name as optionName, ");
        optQuerySql.append(" is_other as isOther ");
        optQuerySql.append(" from question_option where 1=1 ");
        return optQuerySql;
    }

}
