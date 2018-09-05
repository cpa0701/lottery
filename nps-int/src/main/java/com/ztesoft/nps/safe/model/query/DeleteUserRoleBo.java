package com.ztesoft.nps.safe.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/9/5.
 */
@ApiModel
public class DeleteUserRoleBo implements Serializable{

    @ApiModelProperty("用户id")
    private Long uid;

    @ApiModelProperty("角色id")
    private Long rid;

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }
}
