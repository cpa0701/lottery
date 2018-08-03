package com.ztesoft.nps.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

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
	@ApiOperation(value = "查询部门", notes = "分页查询部门")
	public Result<PageInfo<Department>> findAll(
			@ApiParam(value = "当前页码") @RequestParam(required = true, defaultValue = "1") int pageNum,
			@ApiParam(value = "每页大小") @RequestParam(required = true, defaultValue = "15") int pageSize) {
		List<Department> depts = departmentService
				.findByPage(pageNum,
				pageSize);

		PageInfo<Department> page = new PageInfo<Department>(depts);
		return Result.success(page);
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
	@ApiOperation(value = "查询部门", notes = "根据ID查询部门")
	public Result<Department> findById(
			@ApiParam(value = "部门ID", required = true) @PathVariable Long id) {
		Department dept = departmentService.findById(id);
		if (dept == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(dept);
	}

	@PutMapping(value = "/{id}")
	@ApiOperation(value = "更新部门信息", notes = "更新部门信息")
	public Result<Department> update(
			@ApiParam(value = "部门ID", required = true) @PathVariable Long id,
			@RequestBody Department dept) {
		Department oldDept = departmentService.findById(id);
		if (oldDept == null) {
			throw new NpsObjectNotFoundException(id);
		}

		// oldDept.setName(dept.getName());
		// oldDept.setDescription(dept.getDescription());
		// oldDept.setParentId(dept.getParentId());

		// User user = UserUtil.getUser(request);
		// oldCategory.setModifier(user.getName());

		Department cate = departmentService.update(oldDept);

		return Result.success(cate);
	}

	@DeleteMapping(value = "/{id}")
	@ApiOperation(value = "删除部门", notes = "删除部门")
	public Result<Object> delete(
			@ApiParam(value = "部门ID", required = true) @PathVariable Long id) {
		Department dept = departmentService.findById(id);
		if (dept == null) {
			throw new NpsObjectNotFoundException(id);
		}

		departmentService.delete(dept);

		return Result.success();
	}

}
