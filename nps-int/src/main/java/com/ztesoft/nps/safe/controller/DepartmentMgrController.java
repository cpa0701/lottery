package com.ztesoft.nps.safe.controller;

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
import com.ztesoft.nps.safe.model.Department;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.query.DepartmentQuery;
import com.ztesoft.nps.safe.service.DepartmentService;
import com.ztesoft.nps.safe.service.UserService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "deptMgr")
@Api(value = "部门管理", description = "部门管理")
public class DepartmentMgrController {
    @Autowired
	private DepartmentService departmentService;

	@Autowired
	private UserService userService;

	@Autowired
	private HttpSession session;

	@PostMapping("/deptList")
	@ApiOperation(value = "查询部门列表", notes = "查询部门列表")
	public Result<List<Department>> deptList(DepartmentQuery condition) {
		List<Department> depts = departmentService.findByCondition(condition);

		return Result.success(depts);
	}

	@PostMapping("/addDept")
	@ApiOperation(value = "新增部门", notes = "新增部门")
	public Result<Department> addDept(@RequestBody Department dept) {
		User currentUser = UserUtils.getUser(session);
		dept.setCreatedBy(currentUser.getAccount());
		dept.setModifiedBy(currentUser.getAccount());

		dept.setStatus(Status.VALID.getCode());
		Department d = departmentService.add(dept);

		return Result.success(d);
	}

	@PostMapping("/findDeptById")
	@ApiOperation(value = "根据ID查询部门", notes = "根据ID查询部门")
	public Result<Department> findDeptById(@RequestBody Long id) {
		Department dept = departmentService.findById(id);
		if (dept == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(dept);
	}

	@PostMapping("/updateDept")
	@ApiOperation(value = "更新部门信息", notes = "更新部门信息")
	public Result<Department> updateDept(@RequestBody Department department) {
		Department oldDepartment = departmentService.findById(department.getId());
		if (oldDepartment == null) {
			throw new NpsObjectNotFoundException(department.getId());
		}

		oldDepartment.setName(department.getName());
		oldDepartment.setRegionId(department.getRegionId());
		oldDepartment.setParentId(department.getParentId());
		oldDepartment.setStatus(department.getStatus());
		oldDepartment.setType(department.getType());
		oldDepartment.setLevel(department.getLevel());

		User currentUser = UserUtils.getUser(session);
		oldDepartment.setModifiedBy(currentUser.getAccount());

		Department d = departmentService.update(oldDepartment);

		return Result.success(d);
	}

	@PostMapping("/deleteDept")
	@ApiOperation(value = "删除部门", notes = "删除部门")
	public Result<Object> deleteDept(@RequestBody Long id) {
		Department department = departmentService.findById(id);
		if (department == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<User> users = userService.findByDeptId(id);
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
