package com.ztesoft.nps.system.query;

import io.swagger.annotations.ApiModelProperty;

/**
 * 权限查询条件
 * 
 * @author huyao
 *
 */
public class PermissionQuery {
	/**
	 * 权限名称
	 */
	@ApiModelProperty("权限名称")
	private String name;

	/**
	 * 权限类型
	 */
	@ApiModelProperty("权限类型(1:菜单 2:功能按钮 3:C/S权限 4:其他 5:tab页 6:多数据源权限)")
	private Integer type;

	/**
	 * 应用类型
	 */
	@ApiModelProperty("应用类型(1:全局 2:网管系统 3:大客户系统 4:江苏有线-移动端 5:报表分析 6:自定义报表 7:统计分析 8:重保 9:广西门户 10:广东资源树)")
	private Integer appType;

	/**
	 * 父权限ID
	 */
	@ApiModelProperty("父权限ID")
	private Integer parentId;

	/**
	 * 状态
	 */
	@ApiModelProperty("状态(0:失效 1:有效)")
	private Integer status;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getAppType() {
		return appType;
	}

	public void setAppType(Integer appType) {
		this.appType = appType;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}
