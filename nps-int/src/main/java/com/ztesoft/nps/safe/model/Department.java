package com.ztesoft.nps.safe.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

@ApiModel
public class Department {
	/**
	 * 部门ID
	 */
	@ApiModelProperty("部门ID")
	private Long id;

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
	 * 是否叶子节点
	 */
	@ApiModelProperty("是否叶子节点(true:叶子节点 false:非叶子节点)")
	private Boolean leaf;

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

	/**
	 * 创建人
	 */
	@ApiModelProperty("创建人")
	private String createdBy;

	/**
	 * 创建时间
	 */
	@ApiModelProperty("创建时间")
	private Date createdAt;

	/**
	 * 修改人
	 */
	@ApiModelProperty("修改人")
	private String modifiedBy;

	/**
	 * 修改时间
	 */
	@ApiModelProperty("修改时间")
	private Date modifiedAt;

	/**
	 * 当前用户ID
	 */
	@ApiModelProperty("当前用户ID")
	private Long userId;

	public Department() {

	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Date modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Long getRegionId() {
		return regionId;
	}

	public void setRegionId(Long regionId) {
		this.regionId = regionId;
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

	public Boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

}
