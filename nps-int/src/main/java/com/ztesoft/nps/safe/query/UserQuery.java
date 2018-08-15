package com.ztesoft.nps.safe.query;

import io.swagger.annotations.ApiModelProperty;

/**
 * 用户查询条件
 * 
 * @author huyao
 *
 */
public class UserQuery {
	/**
	 * 用户工号
	 */
	@ApiModelProperty("用户工号")
	private String no;

	/**
	 * 用户帐号
	 */
	@ApiModelProperty("用户帐号")
	private String account;

	/**
	 * 用户姓名
	 */
	@ApiModelProperty("用户姓名")
	private String name;

	/**
	 * 性别
	 */
	@ApiModelProperty("性别(M:男 F:女)")
	private String sex;

	/**
	 * 手机号
	 */
	@ApiModelProperty("手机号")
	private String cellphone;

	/**
	 * 邮箱
	 */
	@ApiModelProperty("邮箱")
	private String email;

	/**
	 * 身份证
	 */
	@ApiModelProperty("身份证")
	private String identityCard;

	/**
	 * 状态
	 */
	@ApiModelProperty("状态")
	private Integer status;

	/**
	 * 部门ID
	 */
	@ApiModelProperty("部门ID")
	private Long deptId;

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIdentityCard() {
		return identityCard;
	}

	public void setIdentityCard(String identityCard) {
		this.identityCard = identityCard;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Long getDeptId() {
		return deptId;
	}

	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}

}
