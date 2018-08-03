package com.ztesoft.nps.common;

public enum ResultCodeEnum {
	SUCCESS(200, "成功"), NOT_FOUND(404, "对象不存在"), INNER_ERROR(500, "服务器内部错误");
	
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
