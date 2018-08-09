package com.ztesoft.nps.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.Status;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.Permission;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.query.PermissionQuery;
import com.ztesoft.nps.service.PermissionService;
import com.ztesoft.nps.utils.UserUtils;

@RestController
@RequestMapping(value = "/permissions")
@Api(value = "权限管理", description = "权限管理")
public class PermissionController {
	@Autowired
	private PermissionService permissionService;

	@Autowired
	private HttpSession session;

	@PostMapping
	@ApiOperation(value = "新增权限", notes = "新增权限")
	public Result<Permission> add(@RequestBody Permission permission) {
		User currentUser = UserUtils.getUser(session);
		permission.setCreatedBy(currentUser.getAccount());
		permission.setModifiedBy(currentUser.getAccount());

		permission.setStatus(Status.VALID.getCode());

		Permission p = permissionService.add(permission);

		return Result.success(p);
	}

	@GetMapping(value = "/{id}")
	@ApiOperation(value = "根据ID查询权限", notes = "根据ID查询权限")
	public Result<Permission> findById(
			@ApiParam(value = "权限ID", required = true) @PathVariable Long id) {
		Permission permission = permissionService.findById(id);
		if (permission == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(permission);
	}

	@PutMapping(value = "/{id}")
	@ApiOperation(value = "更新权限信息", notes = "更新权限信息")
	public Result<Permission> update(
			@ApiParam(value = "权限ID", required = true) @PathVariable Long id,
			@RequestBody Permission permission) {
		Permission oldPermission = permissionService.findById(id);
		if (oldPermission == null) {
			throw new NpsObjectNotFoundException(id);
		}

		oldPermission.setName(permission.getName());
		oldPermission.setType(permission.getType());
		oldPermission.setUrl(permission.getUrl());
		oldPermission.setAppType(permission.getAppType());
		oldPermission.setStatus(permission.getStatus());
		oldPermission.setParentId(permission.getParentId());
		oldPermission.setDescription(permission.getDescription());

		User currentUser = UserUtils.getUser(session);
		oldPermission.setModifiedBy(currentUser.getAccount());

		Permission p = permissionService.update(oldPermission);

		return Result.success(p);
	}

	@GetMapping
	@ApiOperation(value = "查询权限列表", notes = "查询权限列表")
	public Result<List<Permission>> findByCondition(PermissionQuery condition) {
		List<Permission> permissions = permissionService
				.findByCondition(condition);

		return Result.success(permissions);
	}
}
