package com.ztesoft.nps.controller;

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

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.Status;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.Department;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.service.DepartmentService;
import com.ztesoft.nps.service.UserService;
import com.ztesoft.nps.utils.UserUtils;

@RestController
@RequestMapping(value = "/departments")
@Api(value = "部门管理", description = "部门管理")
public class DepartmentController {
    @Autowired
	private DepartmentService departmentService;

	@Autowired
	private UserService userService;

	@Autowired
	private HttpSession session;

	@GetMapping
	@ApiOperation(value = "查询部门列表", notes = "查询部门列表")
	public Result<List<Department>> findAll(
			@ApiParam(value = "父部门ID") @RequestParam(required = false) Long parentId,
			@ApiParam(value = "区域ID") @RequestParam(required = false) Long regionId,
			@ApiParam(value = "部门名称") @RequestParam(required = false) String name) {
		List<Department> depts = departmentService.findAll(parentId, regionId,
				name);

		return Result.success(depts);
	}

	@PostMapping
	@ApiOperation(value = "新增部门", notes = "新增部门")
	public Result<Department> add(@RequestBody Department dept) {
		User currentUser = UserUtils.getUser(session);
		dept.setCreatedBy(currentUser.getAccount());
		dept.setModifiedBy(currentUser.getAccount());

		Department d = departmentService.add(dept);

		return Result.success(d);
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

	@PutMapping(value = "/{id}")
	@ApiOperation(value = "更新部门信息", notes = "更新部门信息")
	public Result<Department> update(
			@ApiParam(value = "部门ID", required = true) @PathVariable Long id,
			@RequestBody Department department) {
		Department oldDepartment = departmentService.findById(id);
		if (oldDepartment == null) {
			throw new NpsObjectNotFoundException(id);
		}

		// 只更部门名称和部门级别
		oldDepartment.setName(department.getName());
		oldDepartment.setLevel(department.getLevel());

		User currentUser = UserUtils.getUser(session);
		oldDepartment.setModifiedBy(currentUser.getAccount());

		Department d = departmentService.update(oldDepartment);

		return Result.success(d);
	}

	@DeleteMapping(value = "/{id}")
	@ApiOperation(value = "删除部门", notes = "删除部门")
	public Result<Object> delete(
			@ApiParam(value = "部门ID", required = true) @PathVariable Long id) {
		Department department = departmentService.findById(id);
		if (department == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<User> users = userService.findByDeptId(1, 10, id);
		if (CollectionUtils.isNotEmpty(users)) {
			throw new NpsDeleteException("部门下存在用户，不能删除");
		}

		List<Department> depts = departmentService.findByParentId(id);
		if (CollectionUtils.isNotEmpty(depts)) {
			throw new NpsDeleteException("部门下存在子节点，不能删除");
		}

		User currentUser = UserUtils.getUser(session);
		department.setStatus(Status.INVALID.getCode());
		department.setModifiedBy(currentUser.getAccount());

		departmentService.delete(department);

		return Result.success();
	}

}
