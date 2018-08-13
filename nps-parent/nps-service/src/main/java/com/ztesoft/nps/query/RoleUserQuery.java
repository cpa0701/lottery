package com.ztesoft.nps.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * 角色用户查询条件
 * 
 * @author huyao
 *
 */
@ApiModel
public class RoleUserQuery {
	/**
	 * 角色ID
	 */
	@ApiModelProperty(value = "角色ID", hidden = true)
	private Long roleId;

	/**
	 * 部门名称
	 */
	@ApiModelProperty("部门名称")
	private String deptName;

	/**
	 * 用户名称
	 */
	@ApiModelProperty("用户名称")
	private String username;

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

}
