package com.ztesoft.nps.business.surveyTaskMgr.controller;

import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskIdQuery;
import com.ztesoft.nps.business.surveyTaskMgr.service.SurveyAuditMgrService;
import com.ztesoft.nps.common.views.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/28.
 */
@RestController
@RequestMapping(value = "surveyAuditMgr")
@Api(value = "任务审核管理", description = "任务审核管理")
public class SurveyAuditMgrController {

    @Autowired
    private SurveyAuditMgrService surveyAuditMgrService;

    @PostMapping("/auditPass")
    @ApiOperation(value = "审核通过", notes = "审核通过")
    public Result<Object> auditPass(@RequestBody SurveyTaskIdQuery surveyTaskIdQuery){
        surveyAuditMgrService.auditPass(surveyTaskIdQuery);
        return Result.success(1);
    }

    @PostMapping("/auditNoPass")
    @ApiOperation(value = "审核不通过", notes = "审核不通过")
    public Result<Object> auditNoPass(@RequestBody SurveyTaskIdQuery surveyTaskIdQuery){
        surveyAuditMgrService.auditNoPass(surveyTaskIdQuery);
        return Result.success(1);
    }
}
