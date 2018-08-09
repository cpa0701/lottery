package com.ztesoft.nps.query;

import io.swagger.annotations.ApiModelProperty;

/**
 * 部门查询条件
 * 
 * @author huyao
 *
 */
public class DepartmentQuery {
	/**
	 * 部门名称
	 */
	@ApiModelProperty("部门名称")
	private String name;

	/**
	 * 区域ID
	 */
	@ApiModelProperty("区域ID")
	private Long regionId;

	/**
	 * 父部门ID
	 */
	@ApiModelProperty("父部门ID")
	private Long parentId;

	/**
	 * 状态
	 */
	@ApiModelProperty("状态")
	private Integer status;

	/**
	 * 部门类型
	 */
	@ApiModelProperty("部门类型(1:常规部门 2:代维部门 3:团队)")
	private Integer type;

	/**
	 * 部门级别
	 */
	@ApiModelProperty("部门级别(1:中心 2:科室 3:班组)")
	private Integer level;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getRegionId() {
		return regionId;
	}

	public void setRegionId(Long regionId) {
		this.regionId = regionId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

}
