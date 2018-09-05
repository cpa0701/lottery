package com.ztesoft.nps.safe.controller;

import com.ztesoft.nps.safe.model.query.DeletePermissionRoleBo;
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
import com.ztesoft.nps.safe.model.query.PermissionQuery;
import com.ztesoft.nps.safe.service.PermissionService;
import com.ztesoft.nps.safe.service.RoleService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "/permissionMgr")
@Api(value = "权限管理", description = "权限管理")
public class PermissionMgrController {
	@Autowired
	private PermissionService permissionService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private HttpSession session;

	@PostMapping("/addPermission")
	@ApiOperation(value = "新增权限", notes = "新增权限")
	public Result<Permission> addPermission(@RequestBody Permission permission) {
		User currentUser = UserUtils.getUser(session);
		permission.setCreatedBy(currentUser.getAccount());
		permission.setModifiedBy(currentUser.getAccount());

		permission.setStatus(Status.VALID.getCode());

		Permission p = permissionService.add(permission);

		return Result.success(p);
	}

	@PostMapping("/findPermissionById")
	@ApiOperation(value = "根据ID查询权限", notes = "根据ID查询权限")
	public Result<Permission> findPermissionById(@RequestBody Long id) {
		Permission permission = permissionService.findById(id);
		if (permission == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(permission);
	}

	@PostMapping("/updatePermission")
	@ApiOperation(value = "更新权限信息", notes = "更新权限信息")
	public Result<Permission> updatePermission(@RequestBody Permission permission) {
		Permission oldPermission = permissionService.findById(permission.getId());
		if (oldPermission == null) {
			throw new NpsObjectNotFoundException(permission.getId());
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

	@PostMapping("/permissionList")
	@ApiOperation(value = "查询权限列表", notes = "查询权限列表")
	public Result<List<Permission>> permissionList(PermissionQuery condition) {
		List<Permission> permissions = permissionService
				.findByCondition(condition);

		return Result.success(permissions);
	}

	@PostMapping("/findRolePermission")
	@ApiOperation(value = "查询权限关联的角色", notes = "查询权限关联的角色")
	public Result<List<Role>> findRolePermission(@RequestBody Long id) {
		Permission permission = permissionService.findById(id);
		if (permission == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Role> roles = roleService.findByPermissionId(id);
		return Result.success(roles);
	}

	@PostMapping("/addPermissionRole")
	@ApiOperation(value = "为权限关联角色", notes = "为权限关联角色")
	public Result<Object> addPermissionRole(@RequestBody RolePermission rolePermission) {
		Permission permission = permissionService.findById(rolePermission.getPermissionId());
		if (permission == null) {
			throw new NpsObjectNotFoundException(rolePermission.getPermissionId());
		}

		Role role = roleService.findById(rolePermission.getRoleId());
		if (role == null) {
			throw new NpsObjectNotFoundException(rolePermission.getRoleId());
		}

		User currentUser = UserUtils.getUser(session);
		rolePermission.setCreatedBy(currentUser.getAccount());
		rolePermission.setModifiedBy(currentUser.getAccount());

		rolePermission.setPermissionId(rolePermission.getPermissionId());

		permissionService.addRole(rolePermission);

		return Result.success();
	}

	@PostMapping("/deletePermissionRole")
	@ApiOperation(value = "删除权限关联的角色", notes = "删除权限关联的角色")
	public Result<Object> deletePermissionRole(@RequestBody DeletePermissionRoleBo bo) {
		RolePermission rp = new RolePermission(bo.getRid(), bo.getPid());

		permissionService.deleteRole(rp);

		return Result.success();
	}

	@PostMapping("/deletePermission")
	@ApiOperation(value = "删除权限", notes = "删除权限")
	public Result<Object> deletePermission(@RequestBody Long id) {
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
