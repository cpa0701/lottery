package com.ztesoft.nps.qstMgr.service;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/17.
 */
public interface QuestionMgrService {
    int deleteQuestion(String id);

    int addQuestion(Map<String,Object> params);

    Object questionById(String id);

    int editQuestion(Map<String,Object> params);

    Object questionBank();
}
