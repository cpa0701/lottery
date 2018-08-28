package com.ztesoft.nps.business.surveyTaskMgr.controller;

import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.common.views.Result;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/16.
 */
@RestController
@RequestMapping(value = "surveyTaskMgr")
public class SurveyTaskMgrController {


    @PostMapping("/userTargetImport")
    public Result<Object> userTargetImport(@RequestParam MultipartFile file){
        return Result.success();
    }

    @PostMapping("/addSurveyTask")
    public Result<Object> addSurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/addSurveyTaskToDraft")
    public Result<Object> addSurveyTaskToDraft(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/addSurveyTaskToProcess")
    public Result<Object> addSurveyTaskToProcess(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/deleteSurveyTask")
    public Result<Object> deleteSurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/editSurveyTask")
    public Result<Object> editSurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/copySurveyTask")
    public Result<Object> copySurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/publishSurveyTask")
    public Result<Object> publishSurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }
}
