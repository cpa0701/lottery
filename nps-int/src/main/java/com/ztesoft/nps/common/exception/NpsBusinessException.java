package com.ztesoft.nps.common.exception;

public class NpsBusinessException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public NpsBusinessException(String msg) {
		super(msg);
	}

	public NpsBusinessException(String msg, Throwable e) {
		super(msg, e);
	}
}
