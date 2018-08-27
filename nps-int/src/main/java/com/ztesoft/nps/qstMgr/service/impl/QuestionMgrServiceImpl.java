package com.ztesoft.nps.qstMgr.service.impl;

import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.qstMgr.mapper.QuestionBankMapper;
import com.ztesoft.nps.qstMgr.mapper.QuestionOptionMapper;
import com.ztesoft.nps.qstMgr.model.QuestionBank;
import com.ztesoft.nps.qstMgr.model.QuestionBankExample;
import com.ztesoft.nps.qstMgr.model.QuestionOption;
import com.ztesoft.nps.qstMgr.model.QuestionOptionExample;
import com.ztesoft.nps.qstMgr.query.QuestionQuery;
import com.ztesoft.nps.qstMgr.service.QuestionMgrService;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.datastruct.IVarForeachHandler;
import com.ztesoft.utils.sys.datastruct.Var;
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

/**
 * Created by 64671 on 2018/8/17.
 */
@Service("questionMgrServiceImpl")
public class QuestionMgrServiceImpl implements QuestionMgrService {

    @Autowired
    private QuestionBankMapper questionBankMapper;

    @Autowired
    private QuestionOptionMapper questionOptionMapper;

    @Override
    public int deleteQuestion(String id) {
        QuestionBankExample example = new QuestionBankExample();
        example.createCriteria().andQuestionIdEqualTo(id);
        return questionBankMapper.deleteByExample(example);
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
    public int editQuestion(QuestionBank bank) {
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
        questionBankMapper.deleteByExample(qstExample);

        updateQuestionByParam(bank, "edit");

        return 1;
    }

    @Override
    public LPageHelper questionBank(QuestionQuery condition) {

        StringBuilder qstBankQuerySql = new StringBuilder(" select * from question_bank where 1=1 ");
        if (StringUtil.isNotNull(condition.getQuestionCategory())) {
            qstBankQuerySql.append(" and question_category = '").append(condition.getQuestionCategory()).append("' ");
        }
        if (StringUtil.isNotNull(condition.getQuestionName())) {
            qstBankQuerySql.append(" and question_name like '%").append(condition.getQuestionName()).append("%' ");
        }
        if (StringUtil.isNotNull(condition.getIsNps())) {
            qstBankQuerySql.append(" and isNps = '").append(condition.getIsNps()).append("' ");
        }
        if (StringUtil.isNotNull(condition.getQuestionType())) {
            qstBankQuerySql.append(" and question_type = '").append(condition.getQuestionType()).append("' ");
        }
        if (StringUtil.isNotNull(condition.getIsSatisfied())) {
            qstBankQuerySql.append(" and is_satisfied = '").append(condition.getIsSatisfied()).append("' ");
        }

        LPageHelper bankResult = DatabaseUtil.queryForPageResult(qstBankQuerySql.toString(),
                Integer.valueOf(condition.getPageNum()),Integer.valueOf(condition.getPageSize()));

        List<Map<String,Object>> bankRows = bankResult.getRows();

        String qstIds = "";
        if (ListUtil.isNotNull(bankRows)) {
            for (Map<String,Object> bank : bankRows) {
                qstIds += MapUtil.getString(bank,"question_id") + ",";
            }
        }

        if (StringUtil.isNotNull(qstIds)) {
            StringBuilder optQuerySql = new StringBuilder();
            optQuerySql.append(" select option_id, question_id, option_order, option_name, is_other ");
            optQuerySql.append(" from question_option where question_id in( ");
            optQuerySql.append(StringUtil.getFormatString(qstIds.substring(0, qstIds.lastIndexOf(","))));
            optQuerySql.append(" ) ");

            List<Map<String, Object>> optList = DatabaseUtil.queryForList(optQuerySql.toString());
            List chirlOptList = new ArrayList();
            for (Map<String,Object> bank : bankRows) {
                String questionId = MapUtil.getString(bank,"question_id");
                for (Map<String, Object> optMap : optList) {
                    String qstId = MapUtil.getString(optMap, "question_id");
                    if (StringUtil.isNotNull(qstId) && questionId.equals(qstId)) {
                        chirlOptList.add(optMap);
                    }
                }
                bank.put("optList",chirlOptList);
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
}
