package com.ztesoft.nps.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.ResultCodeEnum;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;

/**
 * 统一异常处理
 * 
 * @author huyao
 *
 */
@ControllerAdvice
public class NpsExceptionHandler {
	private static final Logger logger = LoggerFactory.getLogger(NpsExceptionHandler.class);

	@ExceptionHandler(NpsObjectNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public Result<Object> objectNotFound(NpsObjectNotFoundException e) {
		logger.error("发生异常", e);
		return Result.failed(ResultCodeEnum.NOT_FOUND, e.getMessage());
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public Result<Object> innerException(Exception e) {
		logger.error("发生异常", e);
		return Result.failed(ResultCodeEnum.INNER_ERROR, e.getMessage());
	}
}
