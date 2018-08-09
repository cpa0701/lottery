package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Department;
import com.ztesoft.nps.query.DepartmentQuery;

public interface DepartmentService {
	Department add(Department dept);

	Department findById(Long id);

	List<Department> findByCondition(DepartmentQuery condition);

	List<Department> findByParentId(Long id);

	List<Department> findByRegionId(Long id);

	Department update(Department dept);

	int delete(Department dept);
}
