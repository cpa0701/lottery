package com.ztesoft.nps.common.exception;

public class NpsObjectNotFoundException extends NpsBusinessException {
	private static final long serialVersionUID = 1L;

	private Long id;

	public NpsObjectNotFoundException(Long id) {
		super("ID = " + id + "的对象不存在");
		this.id = id;
	}

	public NpsObjectNotFoundException(String msg) {
		super(msg);
	}

	public NpsObjectNotFoundException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public Long getId() {
		return id;
	}
}
