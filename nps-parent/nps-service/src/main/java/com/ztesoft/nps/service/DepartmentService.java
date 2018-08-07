package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Department;

public interface DepartmentService {
	Department add(Department dept);

	Department findById(Long id);

	List<Department> findAll(Long parentId, Long regionId, String name);

	List<Department> findByParentId(Long id);

	List<Department> findByRegionId(Long id);

	Department update(Department dept);

	int delete(Department dept);
}
