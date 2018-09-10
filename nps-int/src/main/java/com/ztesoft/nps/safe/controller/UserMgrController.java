package com.ztesoft.nps.safe.controller;

import com.ztesoft.nps.common.exception.NpsRequestParamException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.safe.model.query.DeleteUserRoleBo;
import com.ztesoft.nps.safe.model.query.UserIdQuery;
import com.ztesoft.utils.sys.util.StringUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.views.Status;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.UserRole;
import com.ztesoft.nps.safe.model.query.UserQuery;
import com.ztesoft.nps.safe.service.PermissionService;
import com.ztesoft.nps.safe.service.RoleService;
import com.ztesoft.nps.safe.service.UserService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "userMgr")
@Api(value = "用户管理", description = "用户管理")
public class UserMgrController {
	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

	@Autowired
	private HttpSession session;

	@PostMapping("/userList")
	@ApiOperation(value = "查询用户列表", notes = "查询用户列表")
	public Result<PageInfo<User>> userList(
			@ApiParam(value = "当前页码") @RequestParam(required = true, defaultValue = "1") int pageNum,
			@ApiParam(value = "每页大小") @RequestParam(required = true, defaultValue = "15") int pageSize,
			@RequestBody  UserQuery condition) {
		condition.setStatus(1);
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

	@PostMapping("/addUser")
	@ApiOperation(value = "新增用户", notes = "新增用户")
	public Result<User> addUser(@RequestBody User user) {

		user.setCreatedBy(user.getUserId().toString());
		user.setModifiedBy(user.getUserId().toString());

		user.setStatus(Status.VALID.getCode());

		User u = userService.add(user);
		// 清空密码和盐值
		u.setPassword(null);
		u.setSalt(null);

		return Result.success(u);
	}

	@PostMapping("/findUserById")
	@ApiOperation(value = "根据ID查询用户", notes = "根据ID查询用户")
	public Result<User> findUserById(@RequestBody UserIdQuery condition) {
		User user = userService.findById(condition.getId());
		if (user == null) {
			throw new NpsObjectNotFoundException(condition.getId());
		}

		// 清空密码和盐值
		user.setPassword(null);
		user.setSalt(null);

		return Result.success(user);
	}

	@PostMapping("/updateUser")
	@ApiOperation(value = "更新用户信息", notes = "更新用户信息")
	public Result<User> update(@RequestBody User user) {
		User oldUser = userService.findById(user.getId());
		if (oldUser == null) {
			throw new NpsObjectNotFoundException(user.getId());
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

		oldUser.setModifiedBy("1");

		User u = userService.update(oldUser);

		// 清空密码和盐值
		user.setPassword(null);
		user.setSalt(null);

		return Result.success(u);
	}

	@PostMapping("/findUserRole")
	@ApiOperation(value = "查询用户的角色", notes = "查询用户的角色")
	public Result<List<Role>> findUserRole(@RequestBody UserIdQuery condition) {
		User user = userService.findById(condition.getId());
		if (user == null) {
			throw new NpsObjectNotFoundException(condition.getId());
		}

		List<Role> roles = roleService.findByUserId(condition.getId());
		return Result.success(roles);
	}

	@PostMapping("/addRole")
	@ApiOperation(value = "为用户增加角色", notes = "为用户增加角色")
	public Result<Object> addRole(@RequestBody UserRole userRole) {
		User user = userService.findById(userRole.getUserId());
		if (user == null) {
			throw new NpsObjectNotFoundException(userRole.getUserId());
		}

		Role role = roleService.findById(userRole.getRoleId());
		if (role == null) {
			throw new NpsObjectNotFoundException(userRole.getRoleId());
		}


		userRole.setCreatedBy(userRole.getUserId().toString());
		userRole.setModifiedBy(userRole.getUserId().toString());

		userService.addRole(userRole);

		return Result.success();
	}

	@PostMapping("/deleteUserRole")
	@ApiOperation(value = "删除用户的角色", notes = "删除用户的角色")
	public Result<Object> deleteUserRole(@RequestBody DeleteUserRoleBo bo){
		if(bo.getUid()==null || bo.getRid()==null){
			throw new NpsRequestParamException(ConstantUtils.EXECPTION_REQUEST_PARAM_DEFICIENCY);
		}
		UserRole ur = new UserRole(bo.getUid(), bo.getRid());

		userService.deleteRole(ur);

		return Result.success();
	}

	@PostMapping("/findUserPermission")
	@ApiOperation(value = "查询用户的权限", notes = "查询用户的权限")
	public Result<List<Permission>> findUserPermission(@RequestBody UserIdQuery condition) {
		User user = userService.findById(condition.getId());
		if (user == null) {
			throw new NpsObjectNotFoundException(condition.getId());
		}

		List<Permission> permissions = permissionService.findByUserId(condition.getId());
		return Result.success(permissions);
	}
}
