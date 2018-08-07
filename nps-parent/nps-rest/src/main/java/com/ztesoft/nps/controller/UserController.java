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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.service.UserService;
import com.ztesoft.nps.utils.UserUtils;

@RestController
@RequestMapping(value = "/users")
@Api(value = "用户管理", description = "用户管理")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private HttpSession session;

	@GetMapping
	@ApiOperation(value = "根据部门ID查询用户", notes = "根据部门ID查询用户")
	public Result<PageInfo<User>> findByDeptId(
			@ApiParam(value = "当前页码") @RequestParam(required = true, defaultValue = "1") int pageNum,
			@ApiParam(value = "每页大小") @RequestParam(required = true, defaultValue = "15") int pageSize,
			@ApiParam(value = "部门ID") @RequestParam(required = true, defaultValue = "0") Long deptId) {
		List<User> users = userService.findByDeptId(pageNum, pageSize, deptId);

		PageInfo<User> page = new PageInfo<User>(users);
		return Result.success(page);
	}

	@PostMapping
	@ApiOperation(value = "新增用户", notes = "新增用户")
	public Result<User> add(@RequestBody User user) {
		User currentUser = UserUtils.getUser(session);
		user.setCreatedBy(currentUser.getAccount());
		user.setModifiedBy(currentUser.getAccount());

		userService.add(user);

		return Result.success(user);
	}

	@GetMapping(value = "/{id}")
	@ApiOperation(value = "根据ID查询用户", notes = "根据ID查询用户")
	public Result<User> findById(
			@ApiParam(value = "用户ID", required = true) @PathVariable Long id) {
		User user = userService.findById(id);
		if (user == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(user);
	}
}
