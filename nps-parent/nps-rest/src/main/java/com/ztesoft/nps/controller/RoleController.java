package com.ztesoft.nps.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.Permission;
import com.ztesoft.nps.model.Role;
import com.ztesoft.nps.model.RolePermission;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.query.RoleQuery;
import com.ztesoft.nps.service.PermissionService;
import com.ztesoft.nps.service.RoleService;
import com.ztesoft.nps.utils.UserUtils;

@RestController
@RequestMapping(value = "/roles")
@Api(value = "角色管理", description = "角色管理")
public class RoleController {
	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

	@Autowired
	private HttpSession session;

	@GetMapping
	@ApiOperation(value = "查询角色列表", notes = "查询角色列表")
	public Result<List<Role>> findByCondition(RoleQuery condition) {
		List<Role> roles = roleService.findByCondition(condition);

		return Result.success(roles);
	}

	@PostMapping
	@ApiOperation(value = "新增角色", notes = "新增角色")
	public Result<Role> add(@RequestBody Role role) {
		User currentUser = UserUtils.getUser(session);
		role.setCreatedBy(currentUser.getAccount());
		role.setModifiedBy(currentUser.getAccount());

		Role r = roleService.add(role);

		return Result.success(r);
	}

	@GetMapping(value = "/{id}")
	@ApiOperation(value = "根据ID查询角色", notes = "根据ID查询角色")
	public Result<Role> findById(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long id) {
		Role role = roleService.findById(id);
		if (role == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(role);
	}

	@PutMapping(value = "/{id}")
	@ApiOperation(value = "更新角色信息", notes = "更新角色信息")
	public Result<Role> update(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long id,
			@RequestBody Role role) {
		Role oldRole = roleService.findById(id);
		if (oldRole == null) {
			throw new NpsObjectNotFoundException(id);
		}

		oldRole.setName(role.getName());
		oldRole.setDescription(role.getDescription());
		oldRole.setParentId(role.getParentId());

		User currentUser = UserUtils.getUser(session);
		oldRole.setModifiedBy(currentUser.getAccount());

		Role r = roleService.update(oldRole);

		return Result.success(r);
	}

	@GetMapping(value = "/{id}/permissions")
	@ApiOperation(value = "查询角色的权限", notes = "查询角色的权限")
	public Result<List<Permission>> findRolePermission(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long id) {
		Role role = roleService.findById(id);
		if (role == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Permission> permissions = permissionService.findByRoleId(id);
		return Result.success(permissions);
	}

	@PostMapping(value = "/{id}/permissions")
	@ApiOperation(value = "为角色增加权限", notes = "为角色增加权限")
	public Result<Object> addPermission(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long id,
			@RequestBody RolePermission rolePermission) {
		Role role = roleService.findById(id);
		if (role == null) {
			throw new NpsObjectNotFoundException(id);
		}

		Permission permission = permissionService.findById(rolePermission
				.getPermissionId());
		if (permission == null) {
			throw new NpsObjectNotFoundException(
					rolePermission.getPermissionId());
		}

		User currentUser = UserUtils.getUser(session);
		rolePermission.setCreatedBy(currentUser.getAccount());
		rolePermission.setModifiedBy(currentUser.getAccount());

		rolePermission.setRoleId(id);

		roleService.addPermission(rolePermission);

		return Result.success();
	}

	@DeleteMapping(value = "/{rid}/permissions/{pid}")
	@ApiOperation(value = "删除角色的权限", notes = "删除角色的权限")
	public Result<Object> deletePermission(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long rid,
			@ApiParam(value = "权限ID", required = true) @PathVariable Long pid) {
		RolePermission rp = new RolePermission(rid, pid);

		roleService.deletePermission(rp);

		return Result.success();
	}
}
