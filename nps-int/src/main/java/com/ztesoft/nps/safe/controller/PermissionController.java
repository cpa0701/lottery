package com.ztesoft.nps.safe.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.views.Status;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.RolePermission;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.query.PermissionQuery;
import com.ztesoft.nps.safe.service.PermissionService;
import com.ztesoft.nps.safe.service.RoleService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "/permissions")
@Api(value = "权限管理", description = "权限管理")
public class PermissionController {
	@Autowired
	private PermissionService permissionService;

	@Autowired
	private RoleService roleService;

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

	@GetMapping(value = "/{id}/roles")
	@ApiOperation(value = "查询权限关联的角色", notes = "查询权限关联的角色")
	public Result<List<Role>> findRolePermission(
			@ApiParam(value = "权限ID", required = true) @PathVariable Long id) {
		Permission permission = permissionService.findById(id);
		if (permission == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Role> roles = roleService.findByPermissionId(id);
		return Result.success(roles);
	}

	@PostMapping(value = "/{id}/roles")
	@ApiOperation(value = "为权限关联角色", notes = "为权限关联角色")
	public Result<Object> addRole(
			@ApiParam(value = "权限ID", required = true) @PathVariable Long id,
			@RequestBody RolePermission rolePermission) {
		Permission permission = permissionService.findById(id);
		if (permission == null) {
			throw new NpsObjectNotFoundException(id);
		}

		Role role = roleService.findById(rolePermission.getRoleId());
		if (role == null) {
			throw new NpsObjectNotFoundException(rolePermission.getRoleId());
		}

		User currentUser = UserUtils.getUser(session);
		rolePermission.setCreatedBy(currentUser.getAccount());
		rolePermission.setModifiedBy(currentUser.getAccount());

		rolePermission.setPermissionId(id);

		permissionService.addRole(rolePermission);

		return Result.success();
	}

	@DeleteMapping(value = "/{pid}/roles/{rid}")
	@ApiOperation(value = "删除权限关联的角色", notes = "删除权限关联的角色")
	public Result<Object> deletePermission(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long rid,
			@ApiParam(value = "权限ID", required = true) @PathVariable Long pid) {
		RolePermission rp = new RolePermission(rid, pid);

		permissionService.deleteRole(rp);

		return Result.success();
	}

	@DeleteMapping(value = "/{id}")
	@ApiOperation(value = "删除权限", notes = "删除权限")
	public Result<Object> delete(
			@ApiParam(value = "权限ID", required = true) @PathVariable Long id) {
		Permission permission = permissionService.findById(id);
		if (permission == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Role> roles = roleService.findByPermissionId(id);
		if (CollectionUtils.isNotEmpty(roles)) {
			throw new NpsDeleteException("权限被角色使用中，不能删除");
		}

		List<Permission> permissions = permissionService.findByParentId(id);
		if (CollectionUtils.isNotEmpty(permissions)) {
			throw new NpsDeleteException("权限下存在子节点，不能删除");
		}

		User currentUser = UserUtils.getUser(session);
		permission.setModifiedBy(currentUser.getAccount());

		permissionService.delete(permission);

		return Result.success();
	}
}
