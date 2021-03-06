package com.ztesoft.nps.business.surveyResultMgr.controller;

import com.ztesoft.nps.business.surveyResultMgr.model.query.SurveyResultQuery;
import com.ztesoft.nps.business.surveyResultMgr.service.SurveyResultService;
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
 * Created by 64671 on 2018/8/30.
 */
@RestController
@RequestMapping(value = "npsResultMgr")
@Api(value = "调研结果分析管理", description = "调研结果分析管理")
public class SurveyResultMgrController {

    @Autowired
    private SurveyResultService surveyResultService;

    @PostMapping("/surveyTargetShow")
    @ApiOperation(value = "调研对象分析", notes = "调研对象分析")
    public Result<Object> surveyTargetShow(@RequestBody SurveyResultQuery surveyResultQuery){
        return Result.success(surveyResultService.surveyTargetShow(surveyResultQuery));
    }

    @PostMapping("/surveyNpsShow")
    @ApiOperation(value = "调研NPS值分析", notes = "调研NPS值分析")
    public Result<Object> surveyNpsShow(@RequestBody SurveyResultQuery surveyResultQuery){
        return Result.success(surveyResultService.surveyNpsShow(surveyResultQuery));
    }
}
