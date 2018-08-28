package com.ztesoft.nps.business.surveyTaskMgr.controller;

import com.ztesoft.nps.common.views.Result;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by 64671 on 2018/8/16.
 */
@RestController
@RequestMapping(value = "surveyTaskMgr")
public class SurveyTaskMgrController {


    @PostMapping("/userTargetImport")
    public Result<Object> deleteQuestion(@RequestParam MultipartFile file){

        return Result.success();
    }

}
