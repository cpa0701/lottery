package com.ztesoft.nps.qstMgr.service;

import com.ztesoft.nps.qstMgr.model.QuestionBank;
import com.ztesoft.nps.qstMgr.query.QuestionQuery;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/17.
 */
public interface QuestionMgrService {
    int deleteQuestion(String id);

    int addQuestion(QuestionBank bank);

    Object questionById(String id);

    int editQuestion(QuestionBank bank);

    LPageHelper questionBank(QuestionQuery condition);
}
