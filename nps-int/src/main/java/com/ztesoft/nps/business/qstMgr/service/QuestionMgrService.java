package com.ztesoft.nps.business.qstMgr.service;

import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.qstMgr.model.query.QuestionQuery;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;

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
