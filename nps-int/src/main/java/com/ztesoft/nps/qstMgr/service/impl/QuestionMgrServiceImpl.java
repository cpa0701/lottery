package com.ztesoft.nps.qstMgr.service.impl;

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
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public int addQuestion(Map<String,Object> params) {
        updateQuestionByParam(params,"add");
        return 1;
    }

    @Override
    public Object questionById(String id) {
        Map<String,Object> result = MapUtil.convertBean2Map(questionBankMapper.selectByPrimaryKey(id));
        QuestionOptionExample example = new QuestionOptionExample();
        example.createCriteria().andQuestionIdEqualTo(id);
        List<QuestionOption> optList = questionOptionMapper.selectByExample(example);
        result.put("optionList",optList);
        return result;
    }

    @Override
    public int editQuestion(Map<String,Object> params) {
        String questionId = MapUtil.getString(params,"questionId");
        if(StringUtil.isNull(questionId)){
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

        updateQuestionByParam(params,"edit");

        return 1;
    }

    @Override
    public Object questionBank() {
        return null;
    }

    private void updateQuestionByParam(Map<String,Object> params,String type){

        Var param = Var.fromObject(params.get("question"));

        String uuid = "";
        if("add".equals(type)){
            uuid = StringUtil.getRandom32PK();
        }else{
            uuid = param.getString("questionId");
        }

        //插入题目信息
        QuestionBank questionBank = MapUtil.convertMap2Bean(param.getObjectMap(),QuestionBank.class);
        questionBank.setQuestionId(uuid);
        questionBankMapper.insertSelective(questionBank);

        //插入题目选项信息
        final String questionId = uuid;
        List<QuestionOption> optList = new ArrayList<QuestionOption>();
        param.getArray("optionList").foreach(new IVarForeachHandler() {
            @Override
            public void execute(String s, Var var) {
                QuestionOption option = MapUtil.convertMap2Bean(var.getObjectMap(),QuestionOption.class);
                option.setQuestionId(questionId);
                optList.add(option);
            }
        });
        questionOptionMapper.batchSaveOpt(optList);
    }
}
