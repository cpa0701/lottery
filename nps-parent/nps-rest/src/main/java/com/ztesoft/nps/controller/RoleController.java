package com.ztesoft.nps.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.Role;
import com.ztesoft.nps.service.RoleService;

@RestController
@RequestMapping(value = "/roles")
@Api(value = "角色管理", description = "角色管理")
public class RoleController {
	@Autowired
	private RoleService roleService;

	@GetMapping
	@ApiOperation(value = "根据父角色ID查询子角色列表", notes = "根据父角色ID查询子角色列表")
	public Result<List<Role>> findAll(
			@ApiParam(value = "父角色ID") @RequestParam(defaultValue = "0", required = true) Long parentId) {
		List<Role> roles = roleService.findByParentId(parentId);

		return Result.success(roles);
	}

	@PostMapping
	@ApiOperation(value = "新增角色", notes = "新增角色")
	public Result<Role> add(@RequestBody Role role) {
		// User user = UserUtil.getUser(request);
		// category.setCreator(user.getName());
		// category.setModifier(user.getName());

		roleService.add(role);

		return Result.success(role);
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
}
