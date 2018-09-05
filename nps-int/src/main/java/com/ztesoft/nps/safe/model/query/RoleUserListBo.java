package com.ztesoft.nps.safe.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/9/5.
 */
@ApiModel
public class RoleUserListBo implements Serializable {

    @ApiModelProperty("角色id")
    private Long id;

    @ApiModelProperty("起始页")
    private String pageNum;

    @ApiModelProperty("每页大小")
    private String pageSize;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPageNum() {
        return pageNum;
    }

    public void setPageNum(String pageNum) {
        this.pageNum = pageNum;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }
}
