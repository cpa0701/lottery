package com.ztesoft.nps.qstMgr.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.qstMgr.model.QuestionBank;
import com.ztesoft.nps.qstMgr.query.QuestionIdQuery;
import com.ztesoft.nps.qstMgr.query.QuestionQuery;
import com.ztesoft.nps.qstMgr.service.QuestionMgrService;
import com.ztesoft.nps.safe.model.Department;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import com.ztesoft.utils.sys.datastruct.Var;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
        if(StringUtil.isNull(questionId) || questionMgrService.deleteQuestion(questionId)==0){
            throw new NpsObjectNotFoundException(questionId);
        }
        return Result.success();
    }

    @PostMapping("/addQuestion")
    @ApiOperation(value = "新增题目", notes = "新增题目")
    public Result<Object> addQuestion(@RequestBody QuestionBank bank){
        questionMgrService.addQuestion(bank);
        return Result.success();
    }

    @PostMapping("/questionById")
    @ApiOperation(value = "根据ID查询题目", notes = "根据ID查询题目")
    public Result<Object> questionById(@RequestBody QuestionIdQuery condition){
        String questionId = condition.getQuestionId();
        if(StringUtil.isNull(questionId)){
            throw new NpsObjectNotFoundException(questionId);
        }
        Object obj = questionMgrService.questionById(questionId);
        return Result.success(obj);
    }

    @PostMapping("/editQuestion")
    @ApiOperation(value = "编辑题目", notes = "编辑题目")
    public Result<Object> editQuestion(@RequestBody QuestionBank bank){
        questionMgrService.editQuestion(bank);
        return Result.success();
    }

    @PostMapping("/questionBank")
    @ApiOperation(value = "查询题目列表", notes = "查询题目列表")
    public Result<Object> questionBank(@RequestBody QuestionQuery condition){
        if(StringUtil.isNull(condition.getPageNum()) ||
                StringUtil.isNull(condition.getPageSize())){
            throw new NpsBusinessException("分页参数缺失");
        }

        LPageHelper result = questionMgrService.questionBank(condition);
        return Result.success(result);
    }
}
