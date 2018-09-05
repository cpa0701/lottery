package com.ztesoft.nps.safe.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/9/5.
 */
@ApiModel
public class DeletePermissionRoleBo implements Serializable{

    @ApiModelProperty("权限id")
    private Long pid;

    @ApiModelProperty("角色id")
    private Long rid;

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }
}
