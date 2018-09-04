package com.ztesoft.nps.business.surveyResultMgr.service.impl;

import com.ztesoft.nps.business.surveyResultMgr.mapper.SurveyNpsInfoMapper;
import com.ztesoft.nps.business.surveyResultMgr.mapper.SurveyResultMapper;
import com.ztesoft.nps.business.surveyResultMgr.mapper.SurveyUserInfoMapper;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyNpsInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyNpsInfoExample;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyUserInfo;
import com.ztesoft.nps.business.surveyResultMgr.model.SurveyUserInfoExample;
import com.ztesoft.nps.business.surveyResultMgr.model.query.SurveyResultQuery;
import com.ztesoft.nps.business.surveyResultMgr.service.SurveyResultService;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service("surveyResultServiceImpl")
public class SurveyResultServiceImpl implements SurveyResultService {

    @Autowired
    private SurveyUserInfoMapper surveyUserInfoMapper;
    @Autowired
    private SurveyNpsInfoMapper surveyNpsInfoMapper;


    @Override
    public List<SurveyUserInfo> surveyTargetShow(SurveyResultQuery surveyResultQuery) {
        SurveyUserInfoExample userInfoExample = new SurveyUserInfoExample();
        SurveyUserInfoExample.Criteria criteria =  userInfoExample.createCriteria();
        //根据前端传值确定参数
        //根据问卷查询
        if(StringUtil.isNotNull(surveyResultQuery.getQstnaireId())){
            criteria.andQstnaireIdEqualTo(surveyResultQuery.getQstnaireId());
        }
        //根据地区查询
        if(StringUtil.isNotNull(surveyResultQuery.getAreaId())){
            criteria.andAreaIdEqualTo(surveyResultQuery.getAreaId());
        }
        //根据任务类型查询
        if(surveyResultQuery.getTaskType()>0){
            criteria.andTaskTypeEqualTo(surveyResultQuery.getTaskType());
        }
        //查询条件
        List<SurveyUserInfo> surveyUserInfoList = new ArrayList<SurveyUserInfo>();
        surveyUserInfoList = surveyUserInfoMapper.selectByExample(userInfoExample);

        return surveyUserInfoList;
    }

    @Override
    public List<SurveyNpsInfo> surveyNpsShow(SurveyResultQuery surveyResultQuery) {
        SurveyNpsInfoExample surveyNpsInfoExample = new SurveyNpsInfoExample();
        SurveyNpsInfoExample.Criteria criteria = surveyNpsInfoExample.createCriteria();

        if(StringUtil.isNotNull(surveyResultQuery.getQstnaireId())){
            criteria.andQstnaireIdEqualTo(surveyResultQuery.getQstnaireId());
        }
        //根据地区查询
        if(StringUtil.isNotNull(surveyResultQuery.getAreaId())){
            criteria.andAreaIdEqualTo(surveyResultQuery.getAreaId());
        }
        //根据任务类型查询
        if(surveyResultQuery.getTaskType()>0){
            criteria.andTaskTypeEqualTo(surveyResultQuery.getTaskType());
        }

        List<SurveyNpsInfo> surveyUserInfoList  = new ArrayList<SurveyNpsInfo>();
        surveyUserInfoList = surveyNpsInfoMapper.selectByExample(surveyNpsInfoExample);

        return surveyUserInfoList;
    }
}
