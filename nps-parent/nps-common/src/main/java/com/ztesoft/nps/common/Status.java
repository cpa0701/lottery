package com.ztesoft.nps.common;

public enum Status {
	VALID(1, "有效的"), INVALID(0, "失效的");

	private int code;

	private String description;

	private Status(int code, String description) {
		this.code = code;
		this.description = description;
	}

	public int getCode() {
		return this.code;
	}

	public String getDescription() {
		return this.description;
	}

	public static Status codeOf(int code) {

		for (Status result : values()) {
			if (result.getCode() == code) {
				return result;
			}
		}

		return null;
	}
}
