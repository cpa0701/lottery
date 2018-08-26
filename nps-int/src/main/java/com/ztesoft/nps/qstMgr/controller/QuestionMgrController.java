package com.ztesoft.nps.qstMgr.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.qstMgr.model.QuestionBank;
import com.ztesoft.nps.qstMgr.service.QuestionMgrService;
import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by 64671 on 2018/8/16.
 */
@RestController
@RequestMapping(value = "questionMgr")
public class QuestionMgrController {

    @Autowired
    private QuestionMgrService questionMgrService;

    @PostMapping("/deleteQuestion")
    public Result<Object> deleteQuestion(@RequestBody Map<String,Object> params){
        String questionId = MapUtil.getString(params,"questionId");
        if(StringUtil.isNull(questionId) || questionMgrService.deleteQuestion(questionId)==0){
            throw new NpsObjectNotFoundException(questionId);
        }
        return Result.success();
    }

    @PostMapping("/addQuestion")
    public Result<Object> addQuestion(@RequestBody Map<String,Object> params){
        questionMgrService.addQuestion(params);
        return Result.success();
    }

    @PostMapping("/questionById")
    public Result<Object> questionById(@RequestBody Map<String,Object> params){
        String questionId = MapUtil.getString(params,"questionId");
        if(StringUtil.isNull(questionId)){
            throw new NpsObjectNotFoundException(questionId);
        }
        Object obj = questionMgrService.questionById(questionId);
        return Result.success(obj);
    }

    @PostMapping("/editQuestion")
    public Result<Object> editQuestion(@RequestBody Map<String,Object> params){
        questionMgrService.editQuestion(params);
        return Result.success();
    }

    @PostMapping("/questionBank")
    public Result<Object> questionBank(@RequestBody Map<String,Object> params){
        if(StringUtil.isNull(MapUtil.getString(params,"pageNum")) ||
                StringUtil.isNull(MapUtil.getString(params,"pageSize"))){
            throw new NpsBusinessException("分页参数缺失");
        }

        List<QuestionBank> bankList = questionMgrService.questionBank(params);
        PageInfo<QuestionBank> page = new PageInfo<QuestionBank>(bankList);
        return Result.success(page);
    }
}
