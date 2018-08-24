package com.ztesoft.nps.qstMgr.service.impl;

import com.github.pagehelper.PageHelper;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.qstMgr.mapper.QuestionBankMapper;
import com.ztesoft.nps.qstMgr.mapper.QuestionOptionMapper;
import com.ztesoft.nps.qstMgr.model.QuestionBank;
import com.ztesoft.nps.qstMgr.model.QuestionBankExample;
import com.ztesoft.nps.qstMgr.model.QuestionOption;
import com.ztesoft.nps.qstMgr.model.QuestionOptionExample;
import com.ztesoft.nps.qstMgr.service.QuestionMgrService;
import com.ztesoft.utils.sys.datastruct.IVarForeachHandler;
import com.ztesoft.utils.sys.datastruct.Var;
import com.ztesoft.utils.sys.datastruct.WeekArray;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.ListUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import net.sf.json.JSONObject;
import org.apache.ibatis.annotations.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public int addQuestion(Map<String, Object> params) {
        updateQuestionByParam(params, "add");
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
    public int editQuestion(Map<String, Object> params) {
        String questionId = MapUtil.getString(params, "questionId");
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

        updateQuestionByParam(params, "edit");

        return 1;
    }

    @Override
    public List<QuestionBank> questionBank(Map<String, Object> params) {

        QuestionBankExample qstExample = new QuestionBankExample();
        QuestionBankExample.Criteria criteria = qstExample.createCriteria();
        if (StringUtil.isNotNull(MapUtil.getString(params, "questionCategory"))) {
            criteria.andQuestionCategoryEqualTo(MapUtil.getShort(params, "questionCategory"));
        }
        if (StringUtil.isNotNull(MapUtil.getString(params, "questionName"))) {
            criteria.andQuestionNameEqualTo(MapUtil.getString(params, "questionName"));
        }
        if (StringUtil.isNotNull(MapUtil.getString(params, "isNps"))) {
            criteria.andIsNpsEqualTo(MapUtil.getInteger(params, "isNps"));
        }
        if (StringUtil.isNotNull(MapUtil.getString(params, "questionType"))) {
            criteria.andQuestionTypeEqualTo(MapUtil.getString(params, "questionType"));
        }
        if (StringUtil.isNotNull(MapUtil.getString(params, "isSatisfied"))) {
            criteria.andIsSatisfiedEqualTo(MapUtil.getInteger(params, "isSatisfied"));
        }

        PageHelper.startPage(MapUtil.getInteger(params, "pageNum"), MapUtil.getInteger(params, "pageSize"));
        List<QuestionBank> bankList = questionBankMapper.selectByExample(qstExample);

//        List<String> qstIdList = new ArrayList<String>();
//        if (ListUtil.isNotNull(bankList)) {
//            for (QuestionBank bank : bankList) {
//                qstIdList.add(bank.getQuestionId());
//            }
//        }
        String qstIds = "";
        if (ListUtil.isNotNull(bankList)) {
            for (QuestionBank bank : bankList) {
                qstIds += bank.getQuestionId() + ",";
            }
        }

        if(StringUtil.isNotNull(qstIds)){
            StringBuilder optQuerySql = new StringBuilder();
            optQuerySql.append(" select option_id as optionId, question_id as questionId, option_order as optionOrder, option_name as optionName, is_other as isOther ");
            optQuerySql.append(" from question_option where question_id in( ");
            optQuerySql.append(StringUtil.getFormatString(qstIds.substring(0,qstIds.lastIndexOf(","))));
            optQuerySql.append(" ) ");

            List<Map<String,Object>> optList = DatabaseUtil.queryForList(optQuerySql.toString());
            List<QuestionOption> chirlOptList = new ArrayList<QuestionOption>();
            for (QuestionBank bank : bankList) {
                String questionId = bank.getQuestionId();
                for(Map<String,Object> optMap : optList){
                    String qstId = MapUtil.getString(optMap,"questionId");
                    if(StringUtil.isNotNull(qstId) && questionId.equals(qstId)){
                        chirlOptList.add(MapUtil.convertMap2Bean(optMap,QuestionOption.class));
                    }
                }
                bank.setOptList(chirlOptList);
            }
//            List<QuestionOption> optList = questionOptionMapper.selectOptionsByIds(qstIdList);
//
//            List<QuestionOption> chirlOptList = new ArrayList<QuestionOption>();
//            for (QuestionBank bank : bankList) {
//                String questionId = bank.getQuestionId();
//                for(QuestionOption opt : optList){
//                    if(questionId.equals(opt.getQuestionId())){
//                        chirlOptList.add(opt);
//                    }
//                }
//                bank.setOptList(chirlOptList);
//            }

        }

        return bankList;
    }

    private void updateQuestionByParam(Map<String, Object> params, String type) {

        Var param = Var.fromObject(params.get("question"));

        String uuid = "";
        if ("add".equals(type)) {
            uuid = StringUtil.getRandom32PK();
        } else {
            uuid = param.getString("questionId");
        }

        //插入题目信息
        QuestionBank questionBank = MapUtil.convertMap2Bean(param.getObjectMap(), QuestionBank.class);
        questionBank.setQuestionId(uuid);
        questionBank.setCreateTime(new Date());
        questionBankMapper.insertSelective(questionBank);

        //插入题目选项信息
        final String questionId = uuid;
        List<QuestionOption> optList = new ArrayList<QuestionOption>();
        param.getArray("optionList").foreach(new IVarForeachHandler() {
            @Override
            public void execute(String s, Var var) {
                QuestionOption option = MapUtil.convertMap2Bean(var.getObjectMap(), QuestionOption.class);
                option.setQuestionId(questionId);
                optList.add(option);
            }
        });
        questionOptionMapper.batchSaveOpt(optList);
    }
}
