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
import com.ztesoft.nps.model.Department;
import com.ztesoft.nps.service.DepartmentService;

@RestController
@RequestMapping(value = "/departments")
@Api(value = "部门管理", description = "部门管理")
public class DepartmentController {

    @Autowired
	private DepartmentService departmentService;

	@GetMapping
	@ApiOperation(value = "根据父部门ID查询子部门列表", notes = "根据父部门ID查询子部门列表")
	public Result<List<Department>> findAll(
			@ApiParam(value = "父部门ID") @RequestParam(defaultValue = "0", required = true) Long parentId) {
		List<Department> depts = departmentService.findByParentId(parentId);

		return Result.success(depts);
	}

	@PostMapping
	@ApiOperation(value = "新增部门", notes = "新增部门")
	public Result<Department> add(@RequestBody Department dept) {
		// User user = UserUtil.getUser(request);
		// category.setCreator(user.getName());
		// category.setModifier(user.getName());

		departmentService.add(dept);

		return Result.success(dept);
	}

	@GetMapping(value = "/{id}")
	@ApiOperation(value = "根据ID查询部门", notes = "根据ID查询部门")
	public Result<Department> findById(
			@ApiParam(value = "部门ID", required = true) @PathVariable Long id) {
		Department dept = departmentService.findById(id);
		if (dept == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(dept);
	}

}
