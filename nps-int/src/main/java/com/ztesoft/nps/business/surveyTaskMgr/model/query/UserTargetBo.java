package com.ztesoft.nps.business.surveyTaskMgr.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by 64671 on 2018/8/29.
 */
@ApiModel
public class UserTargetBo {

    @ApiModelProperty("任务id")
    private String taskId;

    @ApiModelProperty("渠道类型  0链接与二维码/1微信/2邮件/3短信")
    private String channelType;

    @ApiModelProperty("文件对象")
    private MultipartFile file;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
