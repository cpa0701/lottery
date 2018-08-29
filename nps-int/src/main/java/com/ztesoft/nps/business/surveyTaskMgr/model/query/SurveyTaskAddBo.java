package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import com.ztesoft.nps.business.surveyTaskMgr.model.TaskChannel;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/**
 * Created by 64671 on 2018/8/28.
 */
@ApiModel
public class SurveyTaskAddBo implements Serializable{

    @ApiModelProperty("任务ID")
    private String taskId;

    @ApiModelProperty("任务名称")
    private String taskName;

    @ApiModelProperty("任务类型 1调研任务 / 2触发式调研")
    private String taskType;

    @ApiModelProperty("任务开始时间")
    private String surveySdate;

    @ApiModelProperty("任务结束时间")
    private String surveyEdate;

    @ApiModelProperty("问卷id")
    private String qstnaireId;

    @ApiModelProperty("处理人id")
    private String dealUid;

    @ApiModelProperty("测试号码")
    private List<String> testNumberList;

    @ApiModelProperty("调研渠道")
    private TaskChannel taskChannel;

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

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public String getSurveySdate() {
        return surveySdate;
    }

    public void setSurveySdate(String surveySdate) {
        this.surveySdate = surveySdate;
    }

    public String getSurveyEdate() {
        return surveyEdate;
    }

    public void setSurveyEdate(String surveyEdate) {
        this.surveyEdate = surveyEdate;
    }

    public String getQstnaireId() {
        return qstnaireId;
    }

    public void setQstnaireId(String qstnaireId) {
        this.qstnaireId = qstnaireId;
    }

    public String getDealUid() {
        return dealUid;
    }

    public void setDealUid(String dealUid) {
        this.dealUid = dealUid;
    }

    public List<String> getTestNumberList() {
        return testNumberList;
    }

    public void setTestNumberList(List<String> testNumberList) {
        this.testNumberList = testNumberList;
    }

    public TaskChannel getTaskChannel() {
        return taskChannel;
    }

    public void setTaskChannel(TaskChannel taskChannel) {
        this.taskChannel = taskChannel;
    }
}
