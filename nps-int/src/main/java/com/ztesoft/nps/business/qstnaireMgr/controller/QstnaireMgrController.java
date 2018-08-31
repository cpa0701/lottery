package com.ztesoft.nps.business.qstnaireMgr.controller;

import com.ztesoft.nps.business.qstnaireMgr.model.query.ActionQstnaireQuery;
import com.ztesoft.nps.business.qstnaireMgr.model.query.AddQstnaireBankQuery;
import com.ztesoft.nps.business.qstnaireMgr.model.query.QstnaireBankQuery;
import com.ztesoft.nps.business.qstnaireMgr.model.query.QstnaireIdQuery;
import com.ztesoft.nps.business.qstnaireMgr.service.QstnaireBankService;
import com.ztesoft.nps.common.exception.NpsBusinessException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.views.Result;
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
@RequestMapping(value = "qstnaireMgr")
@Api(value = "问卷管理", description = "问卷管理")
public class QstnaireMgrController {
    @Autowired
    private QstnaireBankService qstnaireBankService;

    @PostMapping("/deleteQstnaire")
    @ApiOperation(value = "删除问卷", notes = "删除问卷")
    public Result<Object> deleteQstnaire(@RequestBody QstnaireIdQuery qstnaireIdQuery){
        String qstnaireId = qstnaireIdQuery.getQstnaireId();
        if(StringUtil.isNull(qstnaireId) || qstnaireBankService.deleteQstnaire(qstnaireIdQuery)!=0){
            throw new NpsObjectNotFoundException(qstnaireId);
        }
        return Result.success();
    }

    @PostMapping("/addQstnaire")
    @ApiOperation(value = "新增问卷", notes = "新增问卷")
    public Result<Object> addQstnaire(@RequestBody AddQstnaireBankQuery addQstnaireBankQuery){
        qstnaireBankService.addQstnaireBank(addQstnaireBankQuery);
        return Result.success();
    }

    @PostMapping("/qstnaireById")
    @ApiOperation(value = "根据ID查询问卷", notes = "根据ID查询问卷")
    public Result<Object> questionById(@RequestBody QstnaireIdQuery qstnaireIdQuery){
        String questionId = qstnaireIdQuery.getQstnaireId();
        if(StringUtil.isNull(questionId)){
            throw new NpsObjectNotFoundException(questionId);
        }
        return Result.success(qstnaireBankService.qstnaireById(qstnaireIdQuery));
    }

    @PostMapping("/eiditQstnaire")
    @ApiOperation(value = "编辑问卷", notes = "编辑问卷")
    public Result<Object> editQuestion(@RequestBody AddQstnaireBankQuery addQstnaireBankQuery){
        qstnaireBankService.eiditQstnaire(addQstnaireBankQuery);
        return Result.success();
    }

    @PostMapping("/qstnaireBank")
    @ApiOperation(value = "查询问卷列表", notes = "查询问卷列表")
    public Result<Object> qstnaireBank(@RequestBody QstnaireBankQuery qstnaireBankQuery){
        if(StringUtil.isNull(qstnaireBankQuery.getPageNum()) ||
                StringUtil.isNull(qstnaireBankQuery.getPageSize())){
            throw new NpsBusinessException(ConstantUtils.EXECPTION_SYSTEM_DATA_DEFICIENCY);
        }
        return Result.success(qstnaireBankService.qstnaireBank(qstnaireBankQuery));
    }

    @PostMapping("/actionQstnaire")
    @ApiOperation(value = "问卷操作", notes = "问卷操作")
    public Result<Object> actionQstnaire(@RequestBody ActionQstnaireQuery actionQstnaireQuery){
        String qstnaireId = actionQstnaireQuery.getQstnaireId();
        if(StringUtil.isNull(qstnaireId)){
            throw new NpsObjectNotFoundException(qstnaireId);
        }
        return Result.success(qstnaireBankService.actionQstnaire(actionQstnaireQuery));
    }
}
