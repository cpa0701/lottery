package com.ztesoft.nps.query;

import io.swagger.annotations.ApiModelProperty;

/**
 * 区域查询条件
 * 
 * @author huyao
 *
 */
public class RegionQuery {
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
	 * 父区域ID
	 */
	@ApiModelProperty("父区域ID")
	private Long parentId;

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

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

}
