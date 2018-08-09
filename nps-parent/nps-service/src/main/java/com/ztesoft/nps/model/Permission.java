package com.ztesoft.nps.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

@ApiModel
public class Permission {
	/**
	 * 权限ID
	 */
	@ApiModelProperty("权限ID")
	private Long id;

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
	 * 链接URL
	 */
	@ApiModelProperty("链接URL")
	private String url;

	/**
	 * 应用类型
	 */
	@ApiModelProperty("应用类型(1:全局 2:网管系统 3:大客户系统 4:江苏有线-移动端 5:报表分析 6:自定义报表 7:统计分析 8:重保 9:广西门户 10:广东资源树)")
	private Integer appType;

	/**
	 * 状态
	 */
	@ApiModelProperty("状态")
	private Integer status;

	/**
	 * 父权限ID
	 */
	@ApiModelProperty("父权限ID")
	private Integer parentId;

	/**
	 * 权限描述
	 */
	@ApiModelProperty("权限描述")
	private String description;

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

	public Permission() {

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

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getAppType() {
		return appType;
	}

	public void setAppType(Integer appType) {
		this.appType = appType;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
