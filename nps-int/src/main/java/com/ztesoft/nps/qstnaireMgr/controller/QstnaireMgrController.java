package com.ztesoft.nps.qstnaireMgr.controller;

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.qstMgr.service.QuestionMgrService;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/16.
 */
@RestController
@RequestMapping(value = "qstnaireMgr")
public class QstnaireMgrController {


    @PostMapping("/deleteQuestion")
    public Result<Object> deleteQuestion(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/addQuestion")
    public Result<Object> addQuestion(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/questionById")
    public Result<Object> questionById(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/editQuestion")
    public Result<Object> editQuestion(@RequestBody Map<String,Object> params){
        return Result.success();
    }

    @PostMapping("/questionBank")
    public Result<Object> questionBank(@RequestBody Map<String,Object> params){
        return Result.success();
    }
}
