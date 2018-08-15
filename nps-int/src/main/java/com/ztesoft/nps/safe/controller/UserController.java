package com.ztesoft.nps.safe.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.Status;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.UserRole;
import com.ztesoft.nps.safe.query.UserQuery;
import com.ztesoft.nps.safe.service.PermissionService;
import com.ztesoft.nps.safe.service.RoleService;
import com.ztesoft.nps.safe.service.UserService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "/users")
@Api(value = "用户管理", description = "用户管理")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

	@Autowired
	private HttpSession session;

	@GetMapping
	@ApiOperation(value = "查询用户列表", notes = "查询用户列表")
	public Result<PageInfo<User>> findByCondition(
			@ApiParam(value = "当前页码") @RequestParam(required = true, defaultValue = "1") int pageNum,
			@ApiParam(value = "每页大小") @RequestParam(required = true, defaultValue = "15") int pageSize,
			UserQuery condition) {
		List<User> users = userService.findByCondition(pageNum, pageSize,
				condition);

		// 清空密码和盐值
		users.stream().forEach(u -> {
			u.setPassword(null);
			u.setSalt(null);
		});

		PageInfo<User> page = new PageInfo<User>(users);
		return Result.success(page);
	}

	@PostMapping
	@ApiOperation(value = "新增用户", notes = "新增用户")
	public Result<User> add(@RequestBody User user) {
		User currentUser = UserUtils.getUser(session);
		user.setCreatedBy(currentUser.getAccount());
		user.setModifiedBy(currentUser.getAccount());

		user.setStatus(Status.VALID.getCode());

		User u = userService.add(user);
		// 清空密码和盐值
		u.setPassword(null);
		u.setSalt(null);

		return Result.success(u);
	}

	@GetMapping(value = "/{id}")
	@ApiOperation(value = "根据ID查询用户", notes = "根据ID查询用户")
	public Result<User> findById(
			@ApiParam(value = "用户ID", required = true) @PathVariable Long id) {
		User user = userService.findById(id);
		if (user == null) {
			throw new NpsObjectNotFoundException(id);
		}

		// 清空密码和盐值
		user.setPassword(null);
		user.setSalt(null);

		return Result.success(user);
	}

	@PutMapping(value = "/{id}")
	@ApiOperation(value = "更新用户信息", notes = "更新用户信息")
	public Result<User> update(
			@ApiParam(value = "用户ID", required = true) @PathVariable Long id,
			@RequestBody User user) {
		User oldUser = userService.findById(id);
		if (oldUser == null) {
			throw new NpsObjectNotFoundException(id);
		}

		oldUser.setNo(user.getNo());
		oldUser.setAccount(user.getAccount());
		oldUser.setName(user.getName());
		oldUser.setSex(user.getSex());
		oldUser.setCellphone(user.getCellphone());
		oldUser.setEmail(user.getEmail());
		oldUser.setIdentityCard(user.getIdentityCard());
		oldUser.setStatus(user.getStatus());
		oldUser.setPassword(user.getPassword());
		oldUser.setDeptId(user.getDeptId());
		oldUser.setRemark(user.getRemark());

		User currentUser = UserUtils.getUser(session);
		oldUser.setModifiedBy(currentUser.getAccount());

		User u = userService.update(oldUser);

		// 清空密码和盐值
		user.setPassword(null);
		user.setSalt(null);

		return Result.success(u);
	}

	@GetMapping(value = "/{id}/roles")
	@ApiOperation(value = "查询用户的角色", notes = "查询用户的角色")
	public Result<List<Role>> findUserRole(
			@ApiParam(value = "用户ID", required = true) @PathVariable Long id) {
		User user = userService.findById(id);
		if (user == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Role> roles = roleService.findByUserId(id);
		return Result.success(roles);
	}

	@PostMapping(value = "/{id}/roles")
	@ApiOperation(value = "为用户增加角色", notes = "为用户增加角色")
	public Result<Object> addRole(
			@ApiParam(value = "用户ID", required = true) @PathVariable Long id,
			@RequestBody UserRole userRole) {
		User user = userService.findById(id);
		if (user == null) {
			throw new NpsObjectNotFoundException(id);
		}

		Role role = roleService.findById(userRole.getRoleId());
		if (role == null) {
			throw new NpsObjectNotFoundException(userRole.getRoleId());
		}

		User currentUser = UserUtils.getUser(session);
		userRole.setCreatedBy(currentUser.getAccount());
		userRole.setModifiedBy(currentUser.getAccount());

		userRole.setUserId(id);

		userService.addRole(userRole);

		return Result.success();
	}

	@DeleteMapping(value = "/{uid}/roles/{rid}")
	@ApiOperation(value = "删除用户的角色", notes = "删除用户的角色")
	public Result<Object> deleteUser(
			@ApiParam(value = "角色ID", required = true) @PathVariable Long rid,
			@ApiParam(value = "用户ID", required = true) @PathVariable Long uid) {
		UserRole ur = new UserRole(uid, rid);

		userService.deleteRole(ur);

		return Result.success();
	}

	@GetMapping(value = "/{id}/permissions")
	@ApiOperation(value = "查询用户的权限", notes = "查询用户的权限")
	public Result<List<Permission>> findUserPermission(
			@ApiParam(value = "用户ID", required = true) @PathVariable Long id) {
		User user = userService.findById(id);
		if (user == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Permission> permissions = permissionService.findByUserId(id);
		return Result.success(permissions);
	}
}
