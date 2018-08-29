package com.ztesoft.nps.business.surveyTaskMgr.service;

import com.ztesoft.nps.business.surveyTaskMgr.model.SurveyTaskAddBo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by 64671 on 2018/8/28.
 */
public interface SurveyTaskMgrService {
    void addSurveyTask(SurveyTaskAddBo bo);

    void userTargetImport(MultipartFile file);
}
