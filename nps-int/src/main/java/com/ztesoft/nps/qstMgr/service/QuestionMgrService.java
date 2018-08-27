package com.ztesoft.nps.qstMgr.service;

import com.ztesoft.nps.qstMgr.model.QuestionBank;

import java.util.List;
import java.util.Map;

/**
 * Created by 64671 on 2018/8/17.
 */
public interface QuestionMgrService {
    int deleteQuestion(String id);

    int addQuestion(Map<String,Object> params);

    Object questionById(String id);

    int editQuestion(Map<String,Object> params);

    List<QuestionBank> questionBank(Map<String,Object> params);
}
