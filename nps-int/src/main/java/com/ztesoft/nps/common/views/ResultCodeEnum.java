package com.ztesoft.nps.common.views;

public enum ResultCodeEnum {
	SUCCESS(200, "成功"),
	SUCCESS_NODATA(204,"成功"),
	UNAUTHORIZED(401, "用户未登录"),
	FORBIDDEN(403, "存在子节点"),
	NOT_FOUND(404, "对象不存在"),
	INNER_ERROR(500, "服务器内部错误"),
	PARAM_NOT_FOUND(400,"请求参数缺失");
	
	private int code;
	
	private String description;
	
	private ResultCodeEnum(int code, String description) {
		this.code = code;
		this.description = description;
	}

	public int getCode() {
		return this.code;
	}

	public String getDescription() {
		return this.description;
	}

	public static ResultCodeEnum codeOf(int code) {

		for (ResultCodeEnum result : values()) {
			if (result.getCode() == code) {
				return result;
			}
		}

		return null;
	}
}
