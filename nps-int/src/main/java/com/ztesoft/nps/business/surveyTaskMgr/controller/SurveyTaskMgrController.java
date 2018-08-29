package com.ztesoft.nps.business.surveyTaskMgr.controller;

import com.ztesoft.nps.business.surveyTaskMgr.model.query.*;
import com.ztesoft.nps.business.surveyTaskMgr.service.SurveyTaskMgrService;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.utils.sys.util.StringUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/16.
 */
@RestController
@RequestMapping(value = "surveyTaskMgr")
@Api(value = "调研任务管理", description = "调研任务管理")
public class SurveyTaskMgrController {

    @Autowired
    private SurveyTaskMgrService surveyTaskMgrService;

    @ApiOperation(value = "任务列表", notes = "任务列表")
    @PostMapping("/surveyTaskList")
    public Result<Object> surveyTaskList(@RequestBody SurveyTaskQuery condition){
        if(StringUtil.isNull(condition.getPageNum()) || StringUtil.isNull(condition.getPageSize())){
            throw new NpsBusinessException(ConstantUtils.PAGE_PARAMS_DEFICIENCY);
        }
        return Result.success(surveyTaskMgrService.surveyTaskList(condition));
    }

    @ApiOperation(value = "新增任务(提交审核)", notes = "新增任务")
    @PostMapping("/addSurveyTask")
    public Result<Object> addSurveyTask(@RequestBody SurveyTaskAddBo bo){
        surveyTaskMgrService.addSurveyTask(bo);
        return Result.success();
    }

    @ApiOperation(value = "任务保存草稿", notes = "任务保存草稿")
    @PostMapping("/addSurveyTaskToDraft")
    public Result<Object> addSurveyTaskToDraft(@RequestBody SurveyTaskAddBo bo){
        surveyTaskMgrService.addSurveyTaskToDraft(bo);
        return Result.success();
    }

    @ApiOperation(value = "删除任务", notes = "删除任务")
    @PostMapping("/deleteSurveyTask")
    public Result<Object> deleteSurveyTask(@RequestBody SurveyTaskIdQuery condition){
        String taskId = condition.getTaskId();
        if(StringUtil.isNull(taskId)||surveyTaskMgrService.deleteSurveyTask(taskId) == 0){
            throw new NpsDeleteException(taskId);
        }
        return Result.success();
    }

    @ApiOperation(value = "编辑任务", notes = "编辑任务")
    @PostMapping("/editSurveyTask")
    public Result<Object> editSurveyTask(@RequestBody SurveyTaskAddBo bo){
        String taskId = bo.getTaskId();
        if(StringUtil.isNull(taskId)){
            throw new NpsObjectNotFoundException(taskId);
        }
        surveyTaskMgrService.editSurveyTask(bo);
        return Result.success();
    }

    @ApiOperation(value = "删除目标用户", notes = "删除目标用户")
    @PostMapping("/userTargetDelete")
    public Result<Object> userTargetDelete(@RequestBody SurveyTaskDelBo condition){
        String taskId = condition.getTaskId();
        if(StringUtil.isNull(taskId)||surveyTaskMgrService.userTargetDelete(condition) == 0){
            throw new NpsDeleteException(taskId);
        }
        return Result.success();
    }

    @ApiOperation(value = "用户上传", notes = "用户上传")
    @PostMapping("/userTargetImport")
    public Result<Object> userTargetImport(@RequestParam UserTargetBo bo){
        return Result.success(surveyTaskMgrService.userTargetImport(bo));
    }

    @ApiOperation(value = "发布任务", notes = "发布任务")
    @PostMapping("/publishSurveyTask")
    public Result<Object> publishSurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @ApiOperation(value = "测试任务", notes = "测试任务")
    @PostMapping("/testPublishSurveyTask")
    public Result<Object> testPublishSurveyTask(@RequestBody Map<String,Object> params){
        return Result.success();
    }
}
