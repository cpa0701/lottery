package com.ztesoft.nps.model;

import java.util.Date;

public class Role {
	/**
	 * 角色ID
	 */
	private Long id;

	/**
	 * 角色名称
	 */
	private String name;

	/**
	 * 角色描述
	 */
	private String description;

	/**
	 * 父角色ID
	 */
	private Long parentId;

	/**
	 * 创建人
	 */
	private String createdBy;

	/**
	 * 创建时间
	 */
	private Date createdAt;

	/**
	 * 修改人
	 */
	private String modifiedBy;

	/**
	 * 修改时间
	 */
	private Date modifiedAt;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

}
