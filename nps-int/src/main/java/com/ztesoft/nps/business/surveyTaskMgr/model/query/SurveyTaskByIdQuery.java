package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import com.ztesoft.nps.business.surveyTaskMgr.model.SurveyTask;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskChannel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.List;

public class SurveyTaskByIdQuery {
    @ApiModelProperty("任务ID")
    private String taskId;
    @ApiModelProperty("任务名称")
    private String taskName;
    @ApiModelProperty("任务类型：0一般任务/1触发性任务")
    private Short taskType;
    @ApiModelProperty("问卷ID")
    private String qstnaireId;
    @ApiModelProperty("开始日期")
    private Date surveySdate;
    @ApiModelProperty("结束日期")
    private Date surveyEdate;
    @ApiModelProperty("创建人")
    private Long createUid;
    @ApiModelProperty("创建时间")
    private Date createTime;
    @ApiModelProperty("修改时间")
    private Date updateTime;
    @ApiModelProperty("任务状态")
    private String status;
    @ApiModelProperty("当前处理环节")
    private String dealTache;
    @ApiModelProperty("处理角色")
    private Long dealRole;
    @ApiModelProperty("处理人")
    private Long dealUid;
    @ApiModelProperty("处理部门")
    private Long dealOrg;
    @ApiModelProperty("处理类型")
    private String dealType;
    @ApiModelProperty("调研渠道")
    private List<TaskChannel> taskChannel;
    @ApiModelProperty("测试号码")
    private List<String> testNumberList;

    public List<String> getTestNumberList() {
        return testNumberList;
    }

    public void setTestNumberList(List<String> testNumberList) {
        this.testNumberList = testNumberList;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Short getTaskType() {
        return taskType;
    }

    public void setTaskType(Short taskType) {
        this.taskType = taskType;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }

    public Date getSurveySdate() {
        return surveySdate;
    }

    public void setSurveySdate(Date surveySdate) {
        this.surveySdate = surveySdate;
    }

    public Date getSurveyEdate() {
        return surveyEdate;
    }

    public void setSurveyEdate(Date surveyEdate) {
        this.surveyEdate = surveyEdate;
    }

    public Long getCreateUid() {
        return createUid;
    }

    public void setCreateUid(Long createUid) {
        this.createUid = createUid;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDealTache() {
        return dealTache;
    }

    public void setDealTache(String dealTache) {
        this.dealTache = dealTache;
    }

    public Long getDealRole() {
        return dealRole;
    }

    public void setDealRole(Long dealRole) {
        this.dealRole = dealRole;
    }

    public Long getDealUid() {
        return dealUid;
    }

    public void setDealUid(Long dealUid) {
        this.dealUid = dealUid;
    }

    public Long getDealOrg() {
        return dealOrg;
    }

    public void setDealOrg(Long dealOrg) {
        this.dealOrg = dealOrg;
    }

    public String getDealType() {
        return dealType;
    }

    public void setDealType(String dealType) {
        this.dealType = dealType;
    }

    public List<TaskChannel> getTaskChannel() {
        return taskChannel;
    }

    public void setTaskChannel(List<TaskChannel> taskChannel) {
        this.taskChannel = taskChannel;
    }

    public SurveyTaskByIdQuery beanToQuery(SurveyTask surveyTask){
        this.createTime = surveyTask.getCreateTime();
        this.createUid = surveyTask.getCreateUid();
        this.dealOrg = surveyTask.getDealOrg();
        this.dealRole = surveyTask.getDealRole();
        this.dealTache = surveyTask.getDealTache();
        this.dealType = surveyTask.getDealType();
        this.dealUid = surveyTask.getDealUid();
        this.qstnaireId = surveyTask.getQstnaireId();
        this.status = surveyTask.getStatus();
        this.surveyEdate = surveyTask.getSurveyEdate();
        this.surveySdate = surveyTask.getSurveySdate();
        this.taskId = surveyTask.getTaskId();
        this.taskName = surveyTask.getTaskName();
        this.taskType = surveyTask.getTaskType();
        this.updateTime = surveyTask.getUpdateTime();
        return this;
    }
}
