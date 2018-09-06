package com.ztesoft.nps.business.qstMgr.controller;

import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.business.qstMgr.model.QuestionBank;
import com.ztesoft.nps.business.qstMgr.model.query.QuestionIdQuery;
import com.ztesoft.nps.business.qstMgr.model.query.QuestionQuery;
import com.ztesoft.nps.business.qstMgr.service.QuestionMgrService;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.util.StringUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 64671 on 2018/8/16.
 */
@RestController
@RequestMapping(value = "questionMgr")
@Api(value = "题目管理", description = "题目管理")
public class QuestionMgrController {

    @Autowired
    private QuestionMgrService questionMgrService;

    @PostMapping("/deleteQuestion")
    @ApiOperation(value = "删除题目", notes = "删除题目")
    public Result<Object> deleteQuestion(@RequestBody QuestionIdQuery condition){
        String questionId = condition.getQuestionId();
        int deletestatus = questionMgrService.deleteQuestion(questionId);
        if(StringUtil.isNull(questionId)||deletestatus==0){
            throw new NpsObjectNotFoundException(questionId);
        }
        return Result.success(deletestatus);
    }

    @PostMapping("/addQuestion")
    @ApiOperation(value = "新增题目", notes = "新增题目")
    public Result<Object> addQuestion(@RequestBody QuestionBank bank){
        questionMgrService.addQuestion(bank);
        return Result.success(1);
    }

    @PostMapping("/questionById")
    @ApiOperation(value = "根据ID查询题目", notes = "根据ID查询题目")
    public Result<Object> questionById(@RequestBody QuestionIdQuery condition){
        String questionId = condition.getQuestionId();
        if(StringUtil.isNull(questionId)){
            throw new NpsObjectNotFoundException(questionId);
        }
        return Result.success(questionMgrService.questionById(questionId));
    }

    @PostMapping("/editQuestion")
    @ApiOperation(value = "编辑题目", notes = "编辑题目")
    public Result<Object> editQuestion(@RequestBody QuestionBank bank){
        questionMgrService.editQuestion(bank);
        return Result.success(1);
    }

    @PostMapping("/questionBank")
    @ApiOperation(value = "查询题目列表", notes = "查询题目列表")
    public Result<Object> questionBank(@RequestBody QuestionQuery condition){
        return Result.success(questionMgrService.questionBank(condition));
    }
}
