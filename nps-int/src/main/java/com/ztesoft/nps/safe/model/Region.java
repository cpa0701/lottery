package com.ztesoft.nps.safe.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

@ApiModel
public class Region {
	/**
	 * 区域ID
	 */
	@ApiModelProperty("区域ID")
	private Long id;

	/**
	 * 区域标识
	 */
	@ApiModelProperty("区域标识")
	private Long areaId;

	/**
	 * 区域名称
	 */
	@ApiModelProperty("区域名称")
	private String name;

	/**
	 * 区域类型
	 */
	@ApiModelProperty("区域类型(1:省 2:本地网 3:县市 4:扇区 5:自定义)")
	private Integer type;

	/**
	 * 区域码
	 */
	@ApiModelProperty("区域码")
	private String code;

	/**
	 * 序号
	 */
	@ApiModelProperty("序号")
	private Integer sequence;

	/**
	 * 父区域ID
	 */
	@ApiModelProperty("父区域ID")
	private Long parentId;

	/**
	 * 是否叶子节点
	 */
	@ApiModelProperty("是否叶子节点(true:叶子节点 false:非叶子节点)")
	private Boolean leaf;

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAreaId() {
		return areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getSequence() {
		return sequence;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
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

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
