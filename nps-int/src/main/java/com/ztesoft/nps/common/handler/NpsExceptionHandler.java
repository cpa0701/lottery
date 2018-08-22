package com.ztesoft.nps.common.handler;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.views.ResultCodeEnum;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;

/**
 * 统一异常处理
 * 
 * @author huyao
 *
 */
@ControllerAdvice
public class NpsExceptionHandler {
	private static final Logger logger = Logger.getLogger(NpsExceptionHandler.class);

	@ExceptionHandler(NpsObjectNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public Result<Object> objectNotFound(NpsObjectNotFoundException e) {
		logger.error("发生异常", e);
		// return Result.failed(ResultCodeEnum.NOT_FOUND, e.getMessage());
		return Result.failed(ResultCodeEnum.NOT_FOUND);
	}

	@ExceptionHandler(NpsDeleteException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public Result<Object> deleteException(NpsDeleteException e) {
		logger.error("发生异常", e);
		return Result.failed(ResultCodeEnum.FORBIDDEN, e.getMessage());
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public Result<Object> innerException(Exception e) {
		logger.error("发生异常", e);
		return Result.failed(ResultCodeEnum.INNER_ERROR, e.getMessage());
	}
}
