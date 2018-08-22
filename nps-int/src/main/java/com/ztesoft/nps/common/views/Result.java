package com.ztesoft.nps.common.views;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * RESTFul API返回结果
 * 
 * @author huyao
 *
 * @param <T>
 *            携带的数据类型
 */
@ApiModel
public class Result<T> implements Serializable {
	private static final long serialVersionUID = 1L;

	@ApiModelProperty(value = "结果代码")
	private int code;

	@ApiModelProperty(value = "返回数据")
	private T data;

	@ApiModelProperty(value = "结果描述")
	private String description;

	public Result() {

	}

	public Result(ResultCodeEnum result) {
		this.code = result.getCode();
		this.description = result.getDescription();
	}

	public Result(ResultCodeEnum result, T data) {
		this.code = result.getCode();
		this.description = result.getDescription();
		this.data = data;
	}

	public Result(ResultCodeEnum result, String description) {
		this.code = result.getCode();
		this.description = description;
	}

	public Result(int code, String description) {
		this.code = code;
		this.description = description;
	}

	public Result(int code, String description, T data) {
		this.code = code;
		this.description = description;
		this.data = data;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static <T> Result<T> success(T data) {
		return new Result<T>(ResultCodeEnum.SUCCESS, data);
	}

	public static <T> Result<T> success() {
		return new Result<T>(ResultCodeEnum.SUCCESS_NODATA);
	}

	public static Result<Object> failed(ResultCodeEnum result) {
		return new Result<Object>(result);
	}

	public static Result<Object> failed(ResultCodeEnum result, String description) {
		return new Result<Object>(result, description);
	}

}
