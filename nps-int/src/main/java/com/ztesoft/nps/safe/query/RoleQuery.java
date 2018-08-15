package com.ztesoft.nps.safe.query;

import io.swagger.annotations.ApiModelProperty;

/**
 * 角色查询条件
 * 
 * @author huyao
 *
 */
public class RoleQuery {
	/**
	 * 角色名称
	 */
	@ApiModelProperty("角色名称")
	private String name;

	/**
	 * 父角色ID
	 */
	@ApiModelProperty("父角色ID")
	private Long parentId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

}
