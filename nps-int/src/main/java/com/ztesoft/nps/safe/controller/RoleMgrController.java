package com.ztesoft.nps.safe.controller;

import com.ztesoft.nps.safe.model.query.*;
import com.ztesoft.utils.sys.util.StringUtil;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.RolePermission;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.UserRole;
import com.ztesoft.nps.safe.service.PermissionService;
import com.ztesoft.nps.safe.service.RoleService;
import com.ztesoft.nps.safe.service.UserService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "/roleMgr")
@Api(value = "角色管理", description = "角色管理")
public class RoleMgrController {
	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

	@Autowired
	private UserService userService;

	@Autowired
	private HttpSession session;

	@PostMapping("/roleList")
	@ApiOperation(value = "查询角色列表", notes = "查询角色列表")
	public Result<List<Role>> roleList(RoleQuery condition) {
		List<Role> roles = roleService.findByCondition(condition);

		return Result.success(roles);
	}

	@PostMapping("/addRole")
	@ApiOperation(value = "新增角色", notes = "新增角色")
	public Result<Role> addRole(@RequestBody Role role) {
		role.setCreatedBy(role.getUserId().toString());
		role.setModifiedBy(role.getUserId().toString());

		Role r = roleService.add(role);

		return Result.success(r);
	}

	@PostMapping("/findRoleById")
	@ApiOperation(value = "根据ID查询角色", notes = "根据ID查询角色")
	public Result<Role> findRoleById(@RequestBody RoleIdQuery condition) {
		Role role = roleService.findById(condition.getId());
		if (role == null) {
			throw new NpsObjectNotFoundException(condition.getId());
		}
		return Result.success(role);
	}

	@PostMapping("/updateRole")
	@ApiOperation(value = "更新角色信息", notes = "更新角色信息")
	public Result<Role> updateRole(@RequestBody Role role) {
		Role oldRole = roleService.findById(role.getId());
		if (oldRole == null) {
			throw new NpsObjectNotFoundException(role.getId());
		}

		oldRole.setName(role.getName());
		oldRole.setDescription(role.getDescription());
		oldRole.setParentId(role.getParentId());


		oldRole.setModifiedBy(role.getUserId().toString());

		Role r = roleService.update(oldRole);

		return Result.success(r);
	}

	@PostMapping("/findRolePermissionById")
	@ApiOperation(value = "查询角色的权限", notes = "查询角色的权限")
	public Result<List<Permission>> findRolePermissionById(@RequestBody RoleIdQuery condition) {
		Role role = roleService.findById(condition.getId());
		if (role == null) {
			throw new NpsObjectNotFoundException(condition.getId());
		}

		List<Permission> permissions = permissionService.findByRoleId(condition.getId());
		return Result.success(permissions);
	}

	@PostMapping("/addRolePermission")
	@ApiOperation(value = "为角色增加权限", notes = "为角色增加权限")
	public Result<Object> addRolePermission(@RequestBody RolePermission rolePermission) {
		Role role = roleService.findById(rolePermission.getRoleId());
		if (role == null) {
			throw new NpsObjectNotFoundException(rolePermission.getRoleId());
		}

		Permission permission = permissionService.findById(rolePermission
				.getPermissionId());
		if (permission == null) {
			throw new NpsObjectNotFoundException(
					rolePermission.getPermissionId());
		}

		rolePermission.setCreatedBy(rolePermission.getUserId().toString());
		rolePermission.setModifiedBy(rolePermission.getUserId().toString());

		roleService.addPermission(rolePermission);

		return Result.success();
	}

	@PostMapping("/deleteRolePermission")
	@ApiOperation(value = "删除角色的权限", notes = "删除角色的权限")
	public Result<Object> deleteRolePermission(@RequestBody DeletePermissionRoleBo bo) {
		RolePermission rp = new RolePermission(bo.getRid(), bo.getPid());

		roleService.deletePermission(rp);

		return Result.success();
	}

	@PostMapping("/roleUserList")
	@ApiOperation(value = "查询角色关联的用户", notes = "查询角色关联的用户")
	public Result<PageInfo<User>> roleUserList(@RequestBody RoleUserListBo bo) {
		Role role = roleService.findById(bo.getId());
		if (role == null) {
			throw new NpsObjectNotFoundException(bo.getId());
		}

		List<User> users = userService.findByRoleId(
				StringUtil.getInteger(bo.getPageNum()), StringUtil.getInteger(bo.getPageSize()), bo.getId());

		// 清空密码和盐值
		users.stream().forEach(s -> {
			s.setPassword(null);
			s.setSalt(null);
		});

		PageInfo<User> page = new PageInfo<User>(users);
		return Result.success(page);
	}

	@PostMapping("/addRoleUser")
	@ApiOperation(value = "为角色关联用户", notes = "为角色关联用户")
	public Result<Object> addRoleUser(@RequestBody UserRole userRole) {//关联角色没有添加userId
		Role role = roleService.findById(userRole.getRoleId());
		if (role == null) {
			throw new NpsObjectNotFoundException(userRole.getRoleId());
		}

		User user = userService.findById(userRole.getUserId());
		if (user == null) {
			throw new NpsObjectNotFoundException(userRole.getUserId());
		}

		userRole.setCreatedBy(userRole.getUserId().toString());
		userRole.setModifiedBy(userRole.getUserId().toString());

		userRole.setRoleId(userRole.getRoleId());

		roleService.addUser(userRole);

		return Result.success();
	}

	@PostMapping("/deleteRoleUser")
	@ApiOperation(value = "删除角色关联的用户", notes = "删除角色关联的用户")
	public Result<Object> deleteRoleUser(@RequestBody DeleteUserRoleBo bo) {
		UserRole ur = new UserRole(bo.getUid(), bo.getRid());

		roleService.deleteUser(ur);

		return Result.success();
	}

	@PostMapping("/deleteRole")
	@ApiOperation(value = "删除角色", notes = "删除角色")
	public Result<Object> deleteRole(@RequestBody RoleIdQuery condition) {
		Role role = roleService.findById(condition.getId());
		if (role == null) {
			throw new NpsObjectNotFoundException(condition.getId());
		}

		List<User> users = userService.findByRoleId(1, 10, condition.getId());
		if (CollectionUtils.isNotEmpty(users)) {
			throw new NpsDeleteException("角色被用户使用中，不能删除");
		}

		List<Role> roles = roleService.findByParentId(condition.getId());
		if (CollectionUtils.isNotEmpty(roles)) {
			throw new NpsDeleteException("角色下存在子节点，不能删除");
		}


		role.setModifiedBy(condition.getUserId().toString());

		roleService.delete(role);

		return Result.success();
	}
}
