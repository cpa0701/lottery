package com.ztesoft.nps.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * 登录信息
 * 
 * @author huyao
 *
 */
@ApiModel
public class LoginQuery {
	/**
	 * 用户帐号
	 */
	@ApiModelProperty(value = "用户帐号", required = true)
	private String account;

	/**
	 * 帐号密码
	 */
	@ApiModelProperty(value = "帐号密码", required = true)
	private String password;

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
